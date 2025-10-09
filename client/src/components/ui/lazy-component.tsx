import { lazy, Suspense, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  fallback?: React.ReactNode;
}

// HOC для создания ленивых компонентов
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);
  
  return function WrappedLazyComponent(props: React.ComponentProps<T> & LazyComponentProps) {
    return (
      <Suspense fallback={fallback || <DefaultFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Стандартный fallback
function DefaultFallback() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

// Предустановленные ленивые компоненты
export const LazyStudentsManagement = createLazyComponent(
  () => import('@/components/students/comprehensive-students-management'),
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Загрузка управления учениками...</p>
    </div>
  </div>
);

export const LazyWorkoutsManagement = createLazyComponent(
  () => import('@/components/workouts/workouts-management'),
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Загрузка управления тренировками...</p>
    </div>
  </div>
);

export const LazyExerciseManagement = createLazyComponent(
  () => import('@/components/exercise/exercise-management'),
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Загрузка управления упражнениями...</p>
    </div>
  </div>
);

export const LazyMuscleGroupsManagement = createLazyComponent(
  () => import('@/components/exercise/muscle-groups-management'),
  <div className="flex items-center justify-center p-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-sm text-muted-foreground">Загрузка управления группами мышц...</p>
    </div>
  </div>
);

