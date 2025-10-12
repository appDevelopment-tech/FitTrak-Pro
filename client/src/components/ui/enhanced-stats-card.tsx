import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from './animated-card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EnhancedStatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
  delay?: number;
  className?: string;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600'
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'text-yellow-600',
    border: 'border-yellow-200',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600'
  }
};

export function EnhancedStatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
  delay = 0,
  className = ''
}: EnhancedStatsCardProps) {
  const colors = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter 
                  value={value} 
                  className="text-2xl font-bold text-gray-900"
                />
                {trend && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                    className={`flex items-center gap-1 text-sm font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{Math.abs(trend.value)}%</span>
                  </motion.div>
                )}
              </div>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: delay + 0.3 }}
                  className="text-sm text-gray-500 mt-1"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className={`p-3 rounded-full ${colors.bg} ${colors.icon}`}
            >
              {icon}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AnimatedProgressCardProps {
  title: string;
  value: number;
  max: number;
  subtitle?: string;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
  delay?: number;
  className?: string;
}

export function AnimatedProgressCard({
  title,
  value,
  max,
  subtitle,
  icon,
  color = 'blue',
  delay = 0,
  className = ''
}: AnimatedProgressCardProps) {
  const colors = colorVariants[color];
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter 
                  value={value} 
                  className="text-2xl font-bold text-gray-900"
                />
                <span className="text-sm text-gray-500">/ {max}</span>
              </div>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className={`p-3 rounded-full ${colors.bg} ${colors.icon}`}
            >
              {icon}
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Прогресс</span>
              <span className="font-medium">{percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface AnimatedChartCardProps {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange';
  delay?: number;
  className?: string;
}

export function AnimatedChartCard({
  title,
  children,
  icon,
  color = 'blue',
  delay = 0,
  className = ''
}: AnimatedChartCardProps) {
  const colors = colorVariants[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className={`p-2 rounded-full ${colors.bg} ${colors.icon}`}
            >
              {icon}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}














