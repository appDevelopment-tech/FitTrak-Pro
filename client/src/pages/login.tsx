import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { LoginForm } from '@/components/auth/login-form';
import { RegistrationForm } from '@/components/auth/registration-form';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Button } from '@/components/ui/button';
import { User, Dumbbell } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot-password';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { user, userProfile, loading } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Monitor auth state and redirect when user is logged in
  useEffect(() => {
    if (!loading && user && userProfile && !isRedirecting && authMode === 'login') {
      setIsRedirecting(true);
      // Use requestAnimationFrame to ensure auth state is fully settled
      requestAnimationFrame(() => {
        setLocation('/dashboard');
      });
    }
  }, [user, userProfile, loading, setLocation, isRedirecting, authMode]);

  const handleLoginSuccess = () => {
    // Don't redirect immediately - let the useEffect handle it
    // This ensures auth state is fully settled
  };

  const handleRegistrationSuccess = () => {
    setAuthMode('login');
  };

  const handleForgotPasswordSuccess = () => {
    // Остаемся в режиме forgot-password для показа сообщения об успехе
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Тренер Константин</h1>
        </div>

        {/* Формы авторизации */}
        {authMode === 'login' && (
          <div className="space-y-4">
            <LoginForm
              onSuccess={handleLoginSuccess}
              onForgotPassword={() => setAuthMode('forgot-password')}
              userType="pupil"
            />
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setAuthMode('register')}
                className="p-0"
              >
                Нет аккаунта? Зарегистрироваться
              </Button>
            </div>
          </div>
        )}

        {authMode === 'register' && (
          <div className="space-y-4">
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setAuthMode('login')}
                className="p-0"
              >
                Уже есть аккаунт? Войти
              </Button>
            </div>
          </div>
        )}

        {authMode === 'forgot-password' && (
          <ForgotPasswordForm
            onBack={() => setAuthMode('login')}
            onSuccess={handleForgotPasswordSuccess}
          />
        )}

        {/* Информация для пользователей */}
        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  );
}