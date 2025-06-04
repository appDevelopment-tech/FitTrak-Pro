import { Calendar, Dumbbell, TrendingUp, User } from "lucide-react";

interface MobileNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function MobileNavigation({ activeView, onViewChange }: MobileNavProps) {
  const navItems = [
    { id: 'schedule', label: 'Расписание', icon: Calendar },
    { id: 'workouts', label: 'Тренировки', icon: Dumbbell },
    { id: 'progress', label: 'Прогресс', icon: TrendingUp },
    { id: 'profile', label: 'Профиль тренера', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 md:hidden">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center p-2 ${
                isActive ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
