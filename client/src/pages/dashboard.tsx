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
import { TrainerCabinet } from "@/components/trainer/trainer-cabinet";
import { ProgressView } from "@/components/progress/progress-view";
import { ProfileView } from "@/components/profile/profile-view";
import { TrainerSchedule } from "@/components/schedule/trainer-schedule";
import { Plus, BarChart3, Search, Flame, CheckCircle, Clock, Trophy, Trash2 } from "lucide-react";
import type { DashboardStats } from "@/lib/types";
import type { WorkoutSession, WorkoutProgram } from "@shared/schema";

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
    students: 'Ученики',
    workouts: 'Мои тренировки',
    progress: 'Прогресс тренировок',
    trainer: 'Кабинет тренера',
    profile: 'Профиль пользователя',
  };

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return <TrainerSchedule />;
      case 'students':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card>
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">Список учеников</CardTitle>
                  <Button className="text-xs">
                    <Plus className="h-4 w-4 mr-1" />
                    Добавить ученика
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {[
                    { id: 1, name: 'Анна Петрова', phone: '+7 (999) 123-45-67', email: 'anna@email.com' },
                    { id: 2, name: 'Михаил Сидоров', phone: '+7 (999) 234-56-78', email: 'mikhail@email.com' },
                    { id: 3, name: 'Елена Козлова', phone: '+7 (999) 345-67-89', email: 'elena@email.com' },
                    { id: 4, name: 'Дмитрий Волков', phone: '+7 (999) 456-78-90', email: 'dmitry@email.com' },
                    { id: 5, name: 'София Морозова', phone: '+7 (999) 567-89-01', email: 'sofia@email.com' },
                    { id: 6, name: 'Алексей Иванов', phone: '+7 (999) 678-90-12', email: 'alexey@email.com' },
                    { id: 7, name: 'Мария Смирнова', phone: '+7 (999) 789-01-23', email: 'maria@email.com' },
                  ].map((student) => (
                    <div key={student.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">{student.name}</h4>
                          <p className="text-xs text-gray-500">{student.phone}</p>
                          <p className="text-xs text-gray-400">{student.email}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'trainer':
        return <TrainerCabinet />;
      case 'progress':
        return <ProgressView />;
      case 'profile':
        return <ProfileView />;
      case 'workouts':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Мои тренировки</h2>
              <p className="text-gray-600">История и управление тренировочными программами</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    Активные программы
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Силовая тренировка верха</h4>
                          <p className="text-sm text-white text-opacity-90">90 минут • Средний уровень</p>
                          <p className="text-sm text-white text-opacity-90 mt-1">3 упражнения</p>
                        </div>
                        <Button size="sm" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Кардио тренировка</h4>
                          <p className="text-sm text-white text-opacity-90">60 минут • Начальный уровень</p>
                          <p className="text-sm text-white text-opacity-90 mt-1">2 упражнения</p>
                        </div>
                        <Button size="sm" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    История тренировок
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-green-500 bg-opacity-10 rounded-lg p-2 mr-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Силовая тренировка верха</p>
                          <p className="text-sm text-gray-600">Вчера, 14:00-16:00</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">Завершена</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-500 bg-opacity-10 rounded-lg p-2 mr-3">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Кардио тренировка</p>
                          <p className="text-sm text-gray-600">2 дня назад, 18:00-19:00</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">Завершена</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-gray-400 bg-opacity-10 rounded-lg p-2 mr-3">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Силовая тренировка верха</p>
                          <p className="text-sm text-gray-600">3 дня назад, 14:00-16:00</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-red-600">Пропущена</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
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
      <DesktopSidebar activeView={activeView} onViewChange={handleViewChange} />

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
      <MobileNavigation activeView={activeView} onViewChange={handleViewChange} />

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
