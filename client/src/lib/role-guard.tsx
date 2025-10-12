import { ReactNode } from 'react';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Проверка доступа...</div>
      </div>
    );
  }

  // Проверяем, есть ли авторизованный пользователь
  if (!user && !pupil) {
    setLocation(fallbackPath);
    return null;
  }

  // Определяем роль пользователя
  let userRole: 'trainer' | 'pupil';
  if (user && (user as any).user_metadata?.is_trainer) {
    userRole = 'trainer';
  } else if (pupil) {
    userRole = 'pupil';
  } else {
    setLocation(fallbackPath);
    return null;
  }

  if (!allowedRoles.includes(userRole)) {
    // Редирект в зависимости от роли
    if (userRole === 'trainer') {
      setLocation('/admin/dashboard');
    } else {
      setLocation('/dashboard');
    }
    return null;
  }

  return <>{children}</>;
}

// Хук для проверки роли
export function useRoleCheck() {
  const { user, pupil } = useAuth();
  
  const isTrainer = user && (user as any).user_metadata?.is_trainer;
  const isPupil = pupil !== null;
  
  return {
    isTrainer,
    isPupil,
    userRole: isTrainer ? 'trainer' : 'pupil',
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
