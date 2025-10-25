import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { CalendarView } from "@/components/schedule/calendar-view";
import { TodaySchedule } from "@/components/schedule/today-schedule";
import { ProfileView } from "@/components/profile/profile-view";
import { NewSchedule } from "@/components/schedule/new-schedule";
import { BookingWidget } from "@/components/schedule/booking-widget";
// import { RoleBasedSchedule } from "@/components/schedule/role-based-schedule";
// import { RoleBasedProfile } from "@/components/profile/role-based-profile";
// import { PermissionGuard, AdminGuard, PupilGuard } from "@/components/auth/permission-guard";
import { Plus, Dumbbell, Search, Flame, Trash2, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRoleCheck } from "@/lib/role-guard";
// import { usePermissions } from "@/hooks/use-permissions";
// import { useNotifications } from "@/hooks/use-notifications";
// import { useReminders } from "@/hooks/use-reminders";
import { PWAInstallBanner, OfflineIndicator } from "@/components/ui/pwa-install-banner";
import { PageTransition } from "@/components/ui/page-transitions";
// Debug components removed for production
// import { SupabaseConnectionCheck } from "@/components/debug/supabase-connection-check";
// import { AuthModeToggle } from "@/components/debug/auth-mode-toggle";
import type { DashboardStats } from "@/lib/types";
import type { WorkoutSession, WorkoutProgram, User, Pupil } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState<Pupil | null>(null);
  const [location, setLocation] = useLocation();
  const { user, userProfile, signOut, loading } = useAuth();
  const { isTrainer } = useRoleCheck();
  
  // Debug logging for userProfile changes
  useEffect(() => {
    console.log('Dashboard userProfile changed:', {
      hasPhoto: !!userProfile?.photo,
      firstName: userProfile?.first_name,
      lastName: userProfile?.last_name,
      middleName: userProfile?.middle_name,
      displayName: userProfile?.first_name && userProfile?.last_name
        ? `${userProfile.first_name} ${userProfile.last_name}`
        : user?.email || 'User',
      fullProfile: userProfile
    });
  }, [userProfile]);
  
  // Check if user is accessing via admin route (which means they're a trainer)
  const isAdminRoute = location.includes('/admin/');
  const isTrainerUser = isTrainer || isAdminRoute;
  // const { userRole, isAdminOrTrainer } = usePermissions();

  // Обработка URL при загрузке страницы
  useEffect(() => {
    // Ждем завершения загрузки аутентификации
    if (loading) return;
    
    const currentPath = location.split('?')[0];
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const tab = urlParams.get('tab');
    
    if (currentPath === '/cabinet') {
      // Проверяем, может ли пользователь получить доступ к кабинету
      if (isTrainerUser) {
        setActiveView('profile');
      } else {
        // Редиректим учеников на расписание
        setActiveView('schedule');
        setLocation('/dashboard');
      }
    } else if (currentPath.startsWith('/admin/dashboard')) {
      // Admin dashboard routes for trainers
      if (isTrainerUser) {
        if (tab) {
          setActiveView(tab);
        } else {
          setActiveView('schedule');
        }
      } else {
        // Redirect non-trainers to student dashboard
        setActiveView('schedule');
        setLocation('/dashboard');
      }
    } else if (currentPath === '/dashboard' || currentPath === '/') {
      setActiveView('schedule');
    }
  }, [location, isTrainerUser, setLocation, loading]);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    // Обновляем URL параметры для корректной навигации
    const url = new URL(window.location.href);
    if (view === 'profile') {
      url.searchParams.set('section', 'profile');
    } else {
      url.searchParams.delete('section');
    }
    window.history.pushState({}, '', url);
  };

  // const { unreadCount } = useNotifications();
  // const { getTodayAppointments, getTomorrowAppointments } = useReminders();

  const handleStartWorkout = (sessionId: number) => {
    // Handle workout start logic
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
    profile: 'Кабинет',
  };

  // Показываем индикатор загрузки пока идет проверка аутентификации
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* <RoleBasedSchedule 
              date={selectedDate.toISOString().split('T')[0]} 
              trainerId={userProfile?.id || ''}
            /> */}
            <BookingWidget />
          </div>
        );
      case 'profile':
        if (selectedStudent) {
          // Профиль выбранного ученика (тренер редактирует)
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProfileView 
                isStudent={false}
                selectedStudent={selectedStudent}
                onClose={() => {
                  setSelectedStudent(null);
                  setActiveView('profile');
                }}
              />
            </div>
          );
        } else if (isTrainerUser) {
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProfileView 
                onSelectStudent={(student) => {
                  setSelectedStudent(student);
                  setActiveView('profile');
                }}
              />
            </div>
          );
        } else {
          // Профиль ученика
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ProfileView 
                isStudent={true} 
                onClose={() => setActiveView('schedule')}
              />
            </div>
          );
        }
      case 'progress':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Прогресс
              </h3>
              <p className="text-gray-600">Раздел в разработке</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {viewTitles[activeView as keyof typeof viewTitles] || 'Неизвестный раздел'}
              </h3>
              <p className="text-gray-600">Раздел в разработке</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Neon Header */}
      <header className="glass-effect border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center group">
                <div className="relative">
                  <Dumbbell className="h-8 w-8 text-gradient neon-text" />
                  <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
                    <Dumbbell className="h-8 w-8 text-gradient" />
                  </div>
                </div>
                <span className="ml-3 text-xl font-black text-gradient neon-text" style={{ fontFamily: 'Space Grotesk' }}>
                  Тренер Константин
                </span>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 glass-effect px-4 py-2 rounded-full border border-border/20">
                <div className="relative">
                  <img
                    src={userProfile?.photo || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"}
                    alt="User Profile"
                    className="h-8 w-8 rounded-full border-2 border-primary/50"
                    onLoad={() => console.log('Header photo loaded:', userProfile?.photo ? 'custom photo' : 'default photo')}
                    onError={() => console.log('Header photo failed to load:', userProfile?.photo)}
                  />
                </div>
                <span 
                  className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => {
                    if (!isTrainerUser) {
                      setActiveView('profile');
                    }
                  }}
                >
                  {userProfile?.first_name && userProfile?.last_name
                    ? `${userProfile.first_name} ${userProfile.last_name}`
                    : user?.email || 'User'
                  }
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={async () => { await signOut(); setLocation('/'); }}
                className="text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Neon Navigation */}
          <nav className="flex space-x-2">
            {/* Показываем расписание только для тренеров */}
            {isTrainerUser && (
              <button
                onClick={() => setActiveView('schedule')}
                className={`${
                  activeView === 'schedule'
                    ? 'neon-button text-primary-foreground px-6 py-2 rounded-full'
                    : 'text-muted-foreground hover:text-foreground px-6 py-2 rounded-full hover:bg-accent/20 transition-all duration-300'
                } font-medium text-sm`}
              >
                Расписание
              </button>
            )}

            {/* Показываем профиль только для тренеров */}
            {isTrainerUser && (
              <button
                onClick={() => setActiveView('profile')}
                className={`${
                  activeView === 'profile'
                    ? 'neon-button text-primary-foreground px-6 py-2 rounded-full'
                    : 'text-muted-foreground hover:text-foreground px-6 py-2 rounded-full hover:bg-accent/20 transition-all duration-300'
                } font-medium text-sm`}
              >
                Кабинет
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none"></div>
        <div className="relative z-10">
          <PageTransition>
            {renderContent()}
          </PageTransition>
        </div>
      </main>

      {/* PWA Components */}
      <PWAInstallBanner />
      <OfflineIndicator />
    </div>
  );
}