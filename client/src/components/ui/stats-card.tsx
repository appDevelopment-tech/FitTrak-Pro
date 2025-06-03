import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  gradient?: 'primary' | 'secondary' | 'success' | 'default';
}

export function StatsCard({ title, value, subtitle, icon: Icon, gradient = 'default' }: StatsCardProps) {
  const gradientClasses = {
    primary: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white',
    secondary: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white',
    success: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
  };

  const iconClasses = {
    primary: 'bg-white bg-opacity-20 text-white',
    secondary: 'bg-white bg-opacity-20 text-white',
    success: 'bg-white bg-opacity-20 text-white',
    default: 'bg-gray-100 text-gray-600'
  };

  return (
    <Card className={`p-4 ${gradientClasses[gradient]}`}>
      <div className="flex items-center">
        <div className={`rounded-lg p-2 mr-3 ${iconClasses[gradient]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className={`text-xs font-medium ${gradient === 'default' ? 'text-gray-500' : 'text-white text-opacity-90'}`}>
            {title}
          </p>
          <p className={`text-lg font-bold ${gradient === 'default' ? 'text-gray-800' : 'text-white'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs ${gradient === 'default' ? 'text-gray-500' : 'text-white text-opacity-90'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
