import React from 'react';

interface MuscleIconProps {
  className?: string;
}

// Грудь - SVG иконка грудных мышц
export const ChestIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M30 25 C30 15, 40 10, 50 15 C60 10, 70 15, 70 25 L70 45 C70 55, 60 65, 50 65 C40 65, 30 55, 30 45 Z M25 35 C25 30, 30 25, 35 30 L35 50 C35 55, 30 60, 25 55 Z M75 35 C75 30, 70 25, 65 30 L65 50 C65 55, 70 60, 75 55 Z" />
  </svg>
);

// Спина - SVG иконка мышц спины
export const BackIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 15 C40 15, 35 20, 35 30 L35 70 C35 80, 40 85, 50 85 C60 85, 65 80, 65 70 L65 30 C65 20, 60 15, 50 15 Z M30 25 C25 25, 20 30, 20 35 L20 65 C20 70, 25 75, 30 75 Z M70 25 C75 25, 80 30, 80 35 L80 65 C80 70, 75 75, 70 75 Z M40 20 L60 20 M40 40 L60 40 M40 60 L60 60" strokeWidth="2" stroke="currentColor" fill="none" />
  </svg>
);

// Ноги - SVG иконка мышц ног
export const LegsIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M35 20 C30 20, 25 25, 25 30 L25 50 C25 55, 30 60, 35 60 L35 85 C35 90, 40 95, 45 95 C50 95, 55 90, 55 85 L55 60 C60 60, 65 55, 65 50 L65 30 C65 25, 60 20, 55 20 Z M65 20 C70 20, 75 25, 75 30 L75 50 C75 55, 70 60, 65 60 L65 85 C65 90, 60 95, 55 95 C50 95, 45 90, 45 85 L45 60 C40 60, 35 55, 35 50 L35 30 C35 25, 40 20, 45 20 Z" />
  </svg>
);

// Руки - SVG иконка мышц рук
export const ArmsIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M25 30 C20 30, 15 35, 15 40 L15 60 C15 65, 20 70, 25 70 C30 70, 35 65, 35 60 L35 40 C35 35, 30 30, 25 30 Z M75 30 C80 30, 85 35, 85 40 L85 60 C85 65, 80 70, 75 70 C70 70, 65 65, 65 60 L65 40 C65 35, 70 30, 75 30 Z M40 45 C40 40, 45 35, 50 35 C55 35, 60 40, 60 45 L60 55 C60 60, 55 65, 50 65 C45 65, 40 60, 40 55 Z" />
  </svg>
);

// Плечи - SVG иконка мышц плеч
export const ShouldersIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M20 40 C15 35, 15 25, 25 20 C35 15, 45 20, 50 30 C55 20, 65 15, 75 20 C85 25, 85 35, 80 40 C75 45, 65 45, 60 40 L60 60 C60 65, 55 70, 50 70 C45 70, 40 65, 40 60 L40 40 C35 45, 25 45, 20 40 Z" />
  </svg>
);

// Ягодичные - SVG иконка ягодичных мышц
export const GlutesIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M30 40 C25 35, 25 25, 35 25 C45 25, 50 35, 50 40 C50 35, 55 25, 65 25 C75 25, 75 35, 70 40 C70 50, 65 60, 60 65 L60 80 C60 85, 55 90, 50 90 C45 90, 40 85, 40 80 L40 65 C35 60, 30 50, 30 40 Z" />
  </svg>
);

// Живот - SVG иконка мышц пресса
export const AbsIcon: React.FC<MuscleIconProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M40 20 C35 20, 30 25, 30 30 L30 70 C30 75, 35 80, 40 80 L60 80 C65 80, 70 75, 70 70 L70 30 C70 25, 65 20, 60 20 Z M40 35 L60 35 M40 45 L60 45 M40 55 L60 55 M40 65 L60 65 M50 20 L50 80" strokeWidth="2" stroke="currentColor" />
  </svg>
);

// Компонент для получения иконки по названию группы мышц
export const getMuscleIcon = (muscleGroup: string, className?: string) => {
  switch (muscleGroup.toLowerCase()) {
    case 'грудь':
      return <ChestIcon className={className} />;
    case 'спина':
      return <BackIcon className={className} />;
    case 'ноги':
      return <LegsIcon className={className} />;
    case 'руки':
      return <ArmsIcon className={className} />;
    case 'плечи':
      return <ShouldersIcon className={className} />;
    case 'ягодичные':
      return <GlutesIcon className={className} />;
    case 'живот':
      return <AbsIcon className={className} />;
    default:
      return <div className={`${className} bg-gray-200 rounded-full flex items-center justify-center text-gray-500`}>?</div>;
  }
};