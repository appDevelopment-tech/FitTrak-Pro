import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from './auth';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ('trainer' | 'pupil')[];
  fallbackPath?: string;
}

export function RoleGuard({ children, allowedRoles, fallbackPath = '/login' }: RoleGuardProps) {
  const [, setLocation] = useLocation();
  const { user, pupil, loading } = useAuth();
  const { userRole } = useRoleCheck();

  // Обрабатываем редиректы в useEffect
  useEffect(() => {
    console.log('🔍 RoleGuard useEffect:', {
      loading,
      user: user ? { id: user.id, email: user.email } : null,
      pupil: pupil ? { id: pupil.id, email: pupil.email } : null,
      userRole,
      allowedRoles,
      fallbackPath
    });

    if (loading) return;

    // Проверяем, есть ли авторизованный пользователь
    if (!user && !pupil) {
      console.log('❌ No user or pupil, redirecting to:', fallbackPath);
      setLocation(fallbackPath);
      return;
    }

    // Даем больше времени на определение роли пользователя
    if (!userRole && user) {
      console.log('⏳ User exists but role not determined, waiting...');
      // Если пользователь есть, но роль еще не определена, ждем еще немного
      const timer = setTimeout(() => {
        if (!userRole) {
          console.log('❌ Role still not determined after timeout, redirecting to:', fallbackPath);
          setLocation(fallbackPath);
        }
      }, 2000); // Увеличиваем время ожидания до 2 секунд
      
      return () => clearTimeout(timer);
    }

    if (!userRole) {
      console.log('❌ No userRole, redirecting to:', fallbackPath);
      setLocation(fallbackPath);
      return;
    }

    if (!allowedRoles.includes(userRole as 'trainer' | 'pupil')) {
      console.log('❌ User role not allowed:', userRole, 'allowed:', allowedRoles);
      // Редирект в зависимости от роли
      if (userRole === 'trainer') {
        console.log('🔄 Redirecting trainer to /cabinet');
        setLocation('/cabinet');
      } else {
        console.log('🔄 Redirecting pupil to /dashboard');
        setLocation('/dashboard');
      }
    } else {
      console.log('✅ User role allowed:', userRole);
    }
  }, [user, pupil, loading, userRole, allowedRoles, fallbackPath, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Проверка доступа...</div>
      </div>
    );
  }

  // Проверяем, есть ли авторизованный пользователь
  if (!user && !pupil) {
    return null;
  }

  if (!userRole) {
    return null;
  }

  if (!allowedRoles.includes(userRole as 'trainer' | 'pupil')) {
    return null;
  }

  return <>{children}</>;
}

// Хук для проверки роли
export function useRoleCheck() {
  const { user, pupil } = useAuth();
  
  const isTrainer = user && (user as any).user_metadata?.is_trainer;
  const isPupil = user && pupil !== null;
  
  console.log('🔍 Role check:', {
    user: user ? { id: user.id, email: user.email } : null,
    user_metadata: user ? (user as any).user_metadata : null,
    pupil: pupil ? { id: pupil.id, email: pupil.email } : null,
    isTrainer,
    isPupil,
    userRole: isTrainer ? 'trainer' : (isPupil ? 'pupil' : null)
  });
  
  return {
    isTrainer,
    isPupil,
    userRole: isTrainer ? 'trainer' : (isPupil ? 'pupil' : null),
  };
}

// Компонент для условного рендеринга на основе роли
interface RoleBasedRenderProps {
  children: ReactNode;
  trainer?: ReactNode;
  pupil?: ReactNode;
  fallback?: ReactNode;
}

export function RoleBasedRender({ children, trainer, pupil, fallback }: RoleBasedRenderProps) {
  const { isTrainer, isPupil } = useRoleCheck();

  if (isTrainer && trainer) {
    return <>{trainer}</>;
  }

  if (isPupil && pupil) {
    return <>{pupil}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
