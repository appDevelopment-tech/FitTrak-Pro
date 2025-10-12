import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'text-blue-600',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full ${color}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

interface LoadingDotsProps {
  className?: string;
  color?: string;
}

export function LoadingDots({ className = '', color = 'bg-blue-600' }: LoadingDotsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${color}`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

interface LoadingPulseProps {
  className?: string;
  color?: string;
}

export function LoadingPulse({ className = '', color = 'bg-blue-600' }: LoadingPulseProps) {
  return (
    <motion.div
      className={`w-8 h-8 rounded-full ${color} ${className}`}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className = '', lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-gray-200 rounded"
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className = '' }: LoadingCardProps) {
  return (
    <div className={`p-6 border rounded-lg ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="w-12 h-12 bg-gray-200 rounded-full"
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="flex-1 space-y-2">
          <motion.div
            className="h-4 bg-gray-200 rounded w-3/4"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="h-3 bg-gray-200 rounded w-1/2"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.4,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="h-3 bg-gray-200 rounded"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface LoadingOverlayProps {
  children: ReactNode;
  isLoading: boolean;
  text?: string;
}

export function LoadingOverlay({ children, isLoading, text = 'Загрузка...' }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-gray-600">{text}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface LoadingButtonProps {
  children: ReactNode;
  loading: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function LoadingButton({ 
  children, 
  loading, 
  onClick, 
  className = '',
  disabled = false
}: LoadingButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        bg-blue-600 text-white hover:bg-blue-700
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" color="text-white" />
          Загрузка...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}














