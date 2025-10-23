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
import { Plus, Dumbbell, Search, Flame, Trash2, LogOut, Bell, BellRing } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRoleCheck } from "@/lib/role-guard";
// import { usePermissions } from "@/hooks/use-permissions";
// import { useNotifications } from "@/hooks/use-notifications";
// import { useReminders } from "@/hooks/use-reminders";
import { NotificationsPanel } from "@/components/ui/notifications-panel";
import { PWAInstallBanner, OfflineIndicator } from "@/components/ui/pwa-install-banner";
import { PageTransition } from "@/components/ui/page-transitions";
// Debug components removed for production
// import { SupabaseConnectionCheck } from "@/components/debug/supabase-connection-check";
// import { AuthModeToggle } from "@/components/debug/auth-mode-toggle";
import type { DashboardStats } from "@/lib/types";
import type { WorkoutSession, WorkoutProgram, User } from "@shared/schema";

export default function Dashboard() {
  const [activeView, setActiveView] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [location, setLocation] = useLocation();
  const { user, signOut } = useAuth();
  const { isTrainer } = useRoleCheck();
  
  // Check if user is accessing via admin route (which means they're a trainer)
  const isAdminRoute = location.includes('/admin/');
  const isTrainerUser = isTrainer || isAdminRoute;
  // const { userRole, isAdminOrTrainer } = usePermissions();

  // Обработка URL при загрузке страницы
  useEffect(() => {
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
  }, [location, isTrainerUser, setLocation]);

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

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* <RoleBasedSchedule 
              date={selectedDate.toISOString().split('T')[0]} 
              trainerId={1}
            /> */}
            <BookingWidget />
          </div>
        );
      case 'profile':
        // Дополнительная проверка доступа для раздела "Кабинет"
        if (!isTrainerUser) {
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Доступ запрещен
                </h3>
                <p className="text-gray-600">У вас нет прав для доступа к этому разделу</p>
              </div>
            </div>
          );
        }
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* <RoleBasedProfile /> */}
            <ProfileView />
          </div>
        );
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
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
                    alt="User Profile"
                    className="h-8 w-8 rounded-full border-2 border-primary/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user?.email || 'User'}
                </span>
              </div>
              
              {/* Notifications Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotifications(true)}
                className="relative text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-all duration-300"
              >
                {/* {unreadCount > 0 ? ( */}
                {false ? (
                  <BellRing className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
                {/* {unreadCount > 0 && ( */}
                {false && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {/* {unreadCount > 9 ? '9+' : unreadCount} */}
                    0
                  </span>
                )}
              </Button>
              
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

      {/* Notifications Panel */}
      <NotificationsPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* PWA Components */}
      <PWAInstallBanner />
      <OfflineIndicator />
    </div>
  );
}