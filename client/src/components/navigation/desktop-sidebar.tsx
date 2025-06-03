import { Calendar, Dumbbell, TrendingUp, User, Presentation } from "lucide-react";

interface DesktopSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function DesktopSidebar({ activeView, onViewChange }: DesktopSidebarProps) {
  const navItems = [
    { id: 'schedule', label: 'Расписание', icon: Calendar },
    { id: 'workouts', label: 'Тренировки', icon: Dumbbell },
    { id: 'progress', label: 'Прогресс', icon: TrendingUp },
    { id: 'trainer', label: 'Кабинет тренера', icon: Presentation },
    { id: 'profile', label: 'Профиль', icon: User },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-100">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center">
            <div className="bg-orange-500 text-white rounded-lg p-2 mr-3">
              <Dumbbell className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-800">FitTrack Pro</span>
          </div>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
