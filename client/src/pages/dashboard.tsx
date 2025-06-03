import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { MobileNavigation } from "@/components/navigation/mobile-nav";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { CalendarView } from "@/components/schedule/calendar-view";
import { TodaySchedule } from "@/components/schedule/today-schedule";
import { TrainerCabinet } from "@/components/trainer/trainer-cabinet";
import { ProgressView } from "@/components/progress/progress-view";
import { Plus, BarChart3, Search, Flame, CheckCircle, Clock, Trophy } from "lucide-react";
import type { DashboardStats } from "@/lib/types";
import type { WorkoutSession, WorkoutProgram } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: dashboardStats } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard-stats/1'],
  });

  const { data: todaySessions = [] } = useQuery<(WorkoutSession & { program?: WorkoutProgram })[]>({
    queryKey: ['/api/workout-sessions/1', selectedDate.toISOString().split('T')[0]],
  });

  const { data: user } = useQuery({
    queryKey: ['/api/user/1'],
  });

  const handleStartWorkout = (sessionId: number) => {
    // Handle workout start logic
    console.log('Starting workout:', sessionId);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create':
        setActiveView('trainer');
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
    schedule: 'Расписание тренировок',
    workouts: 'Мои тренировки',
    progress: 'Прогресс тренировок',
    trainer: 'Кабинет тренера',
    profile: 'Профиль пользователя',
  };

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Сегодня"
                value={dashboardStats?.todayWorkouts || 0}
                icon={Flame}
                gradient="primary"
              />
              <StatsCard
                title="Выполнено"
                value={dashboardStats?.completedWorkouts || 0}
                icon={CheckCircle}
                gradient="success"
              />
              <StatsCard
                title="Время"
                value={dashboardStats?.totalTime || "0 мин"}
                icon={Clock}
                gradient="secondary"
              />
              <StatsCard
                title="Серия"
                value={dashboardStats?.streak || "0 дней"}
                icon={Trophy}
              />
            </div>

            {/* Calendar */}
            <div className="mb-6">
              <CalendarView onDateSelect={setSelectedDate} selectedDate={selectedDate} />
            </div>

            {/* Today's Schedule & Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <TodaySchedule sessions={todaySessions} onStartWorkout={handleStartWorkout} />
              
              {/* Quick Actions */}
              <Card className="p-6">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Быстрые действия</h3>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => handleQuickAction('create')}
                    className="w-full flex items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all justify-start h-auto"
                  >
                    <div className="bg-white bg-opacity-20 rounded-lg p-2 mr-4">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Создать тренировку</h4>
                      <p className="text-sm text-white text-opacity-90">Добавить новую программу</p>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => handleQuickAction('progress')}
                    variant="outline"
                    className="w-full flex items-center p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors justify-start h-auto border-0"
                  >
                    <div className="bg-gray-300 rounded-lg p-2 mr-4">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Посмотреть прогресс</h4>
                      <p className="text-sm text-gray-600">Статистика тренировок</p>
                    </div>
                  </Button>
                  
                  <Button
                    onClick={() => handleQuickAction('find-trainer')}
                    variant="outline"
                    className="w-full flex items-center p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors justify-start h-auto border-0"
                  >
                    <div className="bg-gray-300 rounded-lg p-2 mr-4">
                      <Search className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Найти тренера</h4>
                      <p className="text-sm text-gray-600">Персональные тренировки</p>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );
      case 'trainer':
        return <TrainerCabinet />;
      case 'progress':
        return <ProgressView />;
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
      {/* Desktop Sidebar */}
      <DesktopSidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {viewTitles[activeView as keyof typeof viewTitles]}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
                    alt="User Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user ? `${user.firstName} ${user.lastName}` : 'Загрузка...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeView={activeView} onViewChange={setActiveView} />

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-24 right-6 md:bottom-8 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg transition-all transform hover:scale-105 z-40 p-0"
        onClick={() => console.log('Quick start workout')}
      >
        <Play className="h-6 w-6" />
      </Button>
    </div>
  );
}
