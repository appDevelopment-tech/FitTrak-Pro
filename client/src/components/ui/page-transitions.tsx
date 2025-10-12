import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
  delay?: number;
}

export function FadeTransition({ 
  children, 
  isVisible, 
  className = '',
  delay = 0
}: FadeTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export function SlideTransition({ 
  children, 
  isVisible, 
  direction = 'left',
  className = ''
}: SlideTransitionProps) {
  const directionVariants = {
    left: { x: -300, opacity: 0 },
    right: { x: 300, opacity: 0 },
    up: { y: -300, opacity: 0 },
    down: { y: 300, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={directionVariants[direction]}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={directionVariants[direction]}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ScaleTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
  scale?: number;
}

export function ScaleTransition({ 
  children, 
  isVisible, 
  className = '',
  scale = 0.8
}: ScaleTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface StaggerTransitionProps {
  children: ReactNode[];
  isVisible: boolean;
  className?: string;
  staggerDelay?: number;
}

export function StaggerTransition({ 
  children, 
  isVisible, 
  className = '',
  staggerDelay = 0.1
}: StaggerTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={className}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * staggerDelay,
                ease: "easeInOut"
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ModalTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}

export function ModalTransition({ 
  children, 
  isVisible, 
  onClose,
  className = ''
}: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DrawerTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export function DrawerTransition({ 
  children, 
  isVisible, 
  onClose,
  direction = 'right',
  className = ''
}: DrawerTransitionProps) {
  const directionVariants = {
    left: { x: '-100%' },
    right: { x: '100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={directionVariants[direction]}
            animate={{ x: 0, y: 0 }}
            exit={directionVariants[direction]}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              absolute bg-white shadow-xl
              ${direction === 'left' || direction === 'right' ? 'top-0 bottom-0 w-80' : ''}
              ${direction === 'top' || direction === 'bottom' ? 'left-0 right-0 h-80' : ''}
              ${direction === 'left' ? 'left-0' : ''}
              ${direction === 'right' ? 'right-0' : ''}
              ${direction === 'top' ? 'top-0' : ''}
              ${direction === 'bottom' ? 'bottom-0' : ''}
              ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}














