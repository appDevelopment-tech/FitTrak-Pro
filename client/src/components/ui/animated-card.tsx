import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  hover?: boolean;
}

const directionVariants = {
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
  left: { x: 20, opacity: 0 },
  right: { x: -20, opacity: 0 }
};

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  duration = 0.5,
  hover = true
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      whileHover={hover ? { 
        y: -5, 
        transition: { duration: 0.2 } 
      } : {}}
      className={className}
    >
      <Card className="transition-all duration-300 hover:shadow-lg">
        {children}
      </Card>
    </motion.div>
  );
}

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  loading = false
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${variant === 'default' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
        ${variant === 'outline' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' : ''}
        ${variant === 'ghost' ? 'text-gray-700 hover:bg-gray-100' : ''}
        ${size === 'sm' ? 'px-3 py-1.5 text-sm' : ''}
        ${size === 'lg' ? 'px-6 py-3 text-lg' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Загрузка...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 1, className = '' }: AnimatedCounterProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
}

interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  className = '', 
  color = 'bg-blue-600' 
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className={`h-2 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

interface AnimatedListProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function AnimatedList({ 
  children, 
  staggerDelay = 0.1, 
  className = '' 
}: AnimatedListProps) {
  return (
    <motion.div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * staggerDelay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}






