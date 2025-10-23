import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogIn, Calendar, Dumbbell } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { BookingWidget } from "@/components/schedule/booking-widget";
import { PWAInstallBanner, OfflineIndicator } from "@/components/ui/pwa-install-banner";

export default function PublicSchedule() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

        return (
    <div className="min-h-screen animated-bg">
      {/* Простой заголовок без кабинета */}
      <header className="glass-effect border-b border-border/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Dumbbell className="h-8 w-8 text-gradient neon-text" />
                <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
                  <Dumbbell className="h-8 w-8 text-gradient" />
                </div>
              </div>
              <span className="text-xl font-black text-gradient neon-text" style={{ fontFamily: 'Space Grotesk' }}>
                Тренер Константин
              </span>
            </div>

            {/* Кнопка ВХОД */}
            {!user && (
              <Button 
                onClick={() => setLocation('/login')}
                className="neon-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <LogIn className="h-4 w-4 mr-2" />
                ВХОД
              </Button>
            )}

            {/* Если пользователь авторизован - показываем его имя и кнопку выхода в кабинет */}
            {user && (
              <div className="flex items-center space-x-3">
                <div className="glass-effect px-4 py-2 rounded-full border border-border/20">
                  <span className="text-sm font-medium text-foreground">
                    {user.email}
                  </span>
                </div>
                <Button 
                  onClick={() => setLocation('/dashboard')}
                  className="neon-button bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Мой кабинет
                </Button>
                </div>
              )}
            </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/80 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Виджет расписания */}
            <BookingWidget />
          </div>
        </div>
      </main>

      {/* PWA Components */}
      <PWAInstallBanner />
      <OfflineIndicator />
    </div>
  );
}

