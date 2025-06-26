import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { MobileNavigation } from "@/components/navigation/mobile-nav";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { CalendarView } from "@/components/schedule/calendar-view";
import { TodaySchedule } from "@/components/schedule/today-schedule";


import { ProfileView } from "@/components/profile/profile-view";
import { NewSchedule } from "@/components/schedule/new-schedule";
import { StudentsManagement } from "@/components/students/students-management";
import { Plus, BarChart3, Search, Flame, Trash2, Users } from "lucide-react";
import type { DashboardStats } from "@/lib/types";
import type { WorkoutSession, WorkoutProgram, User } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleViewChange = (view: string) => {
    setActiveView(view);
    // Обновляем URL параметры для корректной навигации
    const url = new URL(window.location.href);
    if (view === 'students') {
      url.searchParams.set('section', 'students');
    } else if (view === 'profile') {
      url.searchParams.set('section', 'profile');
    } else {
      url.searchParams.delete('section');
    }
    window.history.pushState({}, '', url);

  };

  const { data: dashboardStats } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard-stats/1'],
  });

  const { data: todaySessions = [] } = useQuery<(WorkoutSession & { program?: WorkoutProgram })[]>({
    queryKey: ['/api/workout-sessions/1', selectedDate.toISOString().split('T')[0]],
  });

  const { data: user } = useQuery<User>({
    queryKey: ['/api/user/1'],
  });

  const handleStartWorkout = (sessionId: number) => {
    // Handle workout start logic
    console.log('Starting workout:', sessionId);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create':
        setActiveView('profile');
        break;
      case 'progress':
        setActiveView('progress');
        break;
      case 'find-trainer':
        // Handle find trainer logic
        break;
    }
  };

  const viewTitles = {
    schedule: 'Расписание',
    students: 'Список учеников',
    profile: 'Кабинет',
  };

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return <NewSchedule />;
      case 'students':
        return <StudentsManagement />;
      case 'profile':
        return <ProfileView />;

      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {viewTitles[activeView as keyof typeof viewTitles]}
              </h3>
              <p className="text-gray-600">Раздел в разработке</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">FitTrak Pro</span>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
                    alt="User Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Александр Петров'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="border-t border-gray-200">
            <nav className="flex space-x-8 px-0 py-0">
              <button
                onClick={() => setActiveView('schedule')}
                className={`${
                  activeView === 'schedule'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors`}
              >
                Расписание
              </button>
              <button
                onClick={() => setActiveView('students')}
                className={`${
                  activeView === 'students'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors`}
              >
                Ученики
              </button>
              <button
                onClick={() => setActiveView('profile')}
                className={`${
                  activeView === 'profile'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors`}
              >
                Кабинет
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
}
