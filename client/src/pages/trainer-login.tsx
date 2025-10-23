import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { User, Handshake, ArrowLeft } from 'lucide-react';

export default function TrainerLoginPage() {
  const [, setLocation] = useLocation();
  const { user, userProfile, loading, isAdmin } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Monitor auth state and redirect when trainer is logged in
  useEffect(() => {
    if (!loading && user && userProfile && isAdmin && !isRedirecting) {
      setIsRedirecting(true);
      // Use requestAnimationFrame to ensure auth state is fully settled
      requestAnimationFrame(() => {
        setLocation('/cabinet');
      });
    }
  }, [user, userProfile, loading, isAdmin, setLocation, isRedirecting]);

  const handleLoginSuccess = () => {
    // Don't redirect immediately - let the useEffect handle it
    // This ensures auth state is fully settled
  };

  const handleBackToMain = () => {
    setLocation('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center group mb-4">
            <div className="relative">
              <Handshake className="h-8 w-8 text-blue-700 neon-text" />
              <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-75 transition-opacity">
                <Handshake className="h-8 w-8 text-blue-700" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Константин, привет!</h1>
        </div>

        {/* Форма входа для тренеров */}
        <div className="space-y-4">
          <LoginForm
            onSuccess={handleLoginSuccess}
            userType="trainer"
          />
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={handleBackToMain}
              className="p-0 flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться к основному входу
            </Button>
          </div>
        </div>

        {/* Информация для тренеров */}
        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  );
}

