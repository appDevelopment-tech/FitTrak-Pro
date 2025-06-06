import React from 'react';

interface MuscleImageProps {
  className?: string;
}

// Грудь - детализированная анатомическая иллюстрация
export const ChestMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Большая грудная мышца */}
    <path d="M70 60 C50 50, 40 70, 45 90 L45 120 C50 140, 70 150, 100 145 C130 150, 150 140, 155 120 L155 90 C160 70, 150 50, 130 60 L100 75 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Малая грудная мышца */}
    <path d="M80 70 C75 65, 70 75, 75 85 L75 100 C80 110, 90 115, 100 110 C110 115, 120 110, 125 100 L125 85 C130 75, 125 65, 120 70 L100 80 Z" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    
    {/* Межреберные мышцы */}
    <g stroke="#8E44AD" strokeWidth="1" fill="none">
      <path d="M60 90 L140 90"/>
      <path d="M65 105 L135 105"/>
      <path d="M70 120 L130 120"/>
    </g>
    
    {/* Ключица */}
    <path d="M50 45 C70 40, 130 40, 150 45" stroke="#34495E" strokeWidth="3" fill="none"/>
    
    {/* Грудина */}
    <path d="M100 50 L100 140" stroke="#2C3E50" strokeWidth="4" fill="none"/>
  </svg>
);

// Спина - широчайшие, трапециевидные, ромбовидные мышцы
export const BackMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Трапециевидная мышца */}
    <path d="M100 20 L60 40 L40 80 L70 90 L100 70 L130 90 L160 80 L140 40 Z" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    
    {/* Широчайшие мышцы спины */}
    <path d="M40 90 C20 100, 15 130, 30 150 L50 170 C70 180, 90 170, 100 150 L100 120 L70 90 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    <path d="M160 90 C180 100, 185 130, 170 150 L150 170 C130 180, 110 170, 100 150 L100 120 L130 90 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Ромбовидные мышцы */}
    <path d="M80 60 L100 50 L120 60 L110 80 L100 85 L90 80 Z" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    
    {/* Позвоночник */}
    <path d="M100 20 L100 180" stroke="#2C3E50" strokeWidth="3" fill="none"/>
    
    {/* Лопатки */}
    <path d="M70 45 C65 50, 65 70, 75 75 L85 70 L85 50 Z" 
          fill="none" stroke="#34495E" strokeWidth="2"/>
    <path d="M130 45 C135 50, 135 70, 125 75 L115 70 L115 50 Z" 
          fill="none" stroke="#34495E" strokeWidth="2"/>
  </svg>
);

// Ноги - квадрицепс, бицепс бедра, икроножные
export const LegMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Квадрицепс (передняя часть бедра) */}
    <path d="M60 20 C50 25, 45 40, 50 60 L55 100 C60 120, 70 130, 75 140 L80 150 C85 160, 90 165, 95 170 L95 185" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    <path d="M140 20 C150 25, 155 40, 150 60 L145 100 C140 120, 130 130, 125 140 L120 150 C115 160, 110 165, 105 170 L105 185" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Бицепс бедра (задняя часть) */}
    <path d="M70 30 C75 35, 80 50, 75 80 L70 110 C65 125, 70 135, 75 145" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    <path d="M130 30 C125 35, 120 50, 125 80 L130 110 C135 125, 130 135, 125 145" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    
    {/* Икроножные мышцы */}
    <path d="M85 150 C80 155, 75 170, 80 185 L85 195" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="2"/>
    <path d="M115 150 C120 155, 125 170, 120 185 L115 195" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="2"/>
    
    {/* Коленные суставы */}
    <circle cx="85" cy="150" r="8" fill="none" stroke="#34495E" strokeWidth="2"/>
    <circle cx="115" cy="150" r="8" fill="none" stroke="#34495E" strokeWidth="2"/>
  </svg>
);

// Руки - бицепс, трицепс, предплечье
export const ArmMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Плечевые кости */}
    <path d="M30 40 L30 110" stroke="#34495E" strokeWidth="4" fill="none"/>
    <path d="M170 40 L170 110" stroke="#34495E" strokeWidth="4" fill="none"/>
    
    {/* Бицепс */}
    <path d="M20 45 C15 50, 15 70, 25 85 L35 95 C40 100, 45 95, 40 85 L30 70 C25 55, 25 50, 30 45" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    <path d="M180 45 C185 50, 185 70, 175 85 L165 95 C160 100, 155 95, 160 85 L170 70 C175 55, 175 50, 170 45" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Трицепс */}
    <path d="M35 50 C45 55, 50 70, 45 85 L40 95 C35 105, 25 100, 30 90 L35 75 C40 60, 40 55, 35 50" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    <path d="M165 50 C155 55, 150 70, 155 85 L160 95 C165 105, 175 100, 170 90 L165 75 C160 60, 160 55, 165 50" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    
    {/* Предплечья */}
    <path d="M25 110 C20 115, 20 135, 30 150 L35 160 C40 170, 45 175, 50 180" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="2"/>
    <path d="M175 110 C180 115, 180 135, 170 150 L165 160 C160 170, 155 175, 150 180" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="2"/>
    
    {/* Локтевые суставы */}
    <circle cx="30" cy="110" r="6" fill="none" stroke="#34495E" strokeWidth="2"/>
    <circle cx="170" cy="110" r="6" fill="none" stroke="#34495E" strokeWidth="2"/>
    
    {/* Центральная связка между руками */}
    <path d="M60 100 L140 100" stroke="#8E44AD" strokeWidth="2" strokeDasharray="5,5"/>
  </svg>
);

// Плечи - дельтовидные мышцы
export const ShoulderMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Дельтовидные мышцы */}
    <path d="M40 80 C20 70, 10 50, 25 35 C40 20, 60 25, 75 40 L100 60 L125 40 C140 25, 160 20, 175 35 C190 50, 180 70, 160 80 L140 90 C130 95, 120 90, 115 80 L100 70 L85 80 C80 90, 70 95, 60 90 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Передняя дельта */}
    <path d="M70 50 C60 45, 55 55, 65 65 L80 75 C85 80, 90 75, 85 65 L75 55" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    <path d="M130 50 C140 45, 145 55, 135 65 L120 75 C115 80, 110 75, 115 65 L125 55" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    
    {/* Средняя дельта */}
    <path d="M50 70 C45 65, 50 75, 60 80 L75 85 C80 90, 85 85, 80 75 L70 70" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="1"/>
    <path d="M150 70 C155 65, 150 75, 140 80 L125 85 C120 90, 115 85, 120 75 L130 70" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="1"/>
    
    {/* Ключицы */}
    <path d="M50 30 C70 25, 130 25, 150 30" stroke="#34495E" strokeWidth="3" fill="none"/>
    
    {/* Акромиальные отростки */}
    <circle cx="50" cy="40" r="8" fill="none" stroke="#2C3E50" strokeWidth="2"/>
    <circle cx="150" cy="40" r="8" fill="none" stroke="#2C3E50" strokeWidth="2"/>
  </svg>
);

// Ягодичные мышцы
export const GluteMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Большая ягодичная мышца */}
    <path d="M60 70 C40 65, 30 80, 35 100 L40 130 C45 150, 60 160, 80 155 L100 150 L120 155 C140 160, 155 150, 160 130 L165 100 C170 80, 160 65, 140 70 L100 85 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Средняя ягодичная мышца */}
    <path d="M70 80 C65 75, 60 85, 70 95 L85 105 C90 110, 95 105, 90 95 L80 85" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="1"/>
    <path d="M130 80 C135 75, 140 85, 130 95 L115 105 C110 110, 105 105, 110 95 L120 85" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="1"/>
    
    {/* Малая ягодичная мышца */}
    <path d="M80 90 C75 85, 85 95, 95 100 C105 95, 115 85, 120 90 L110 100 C105 105, 95 105, 90 100 Z" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    
    {/* Крестец */}
    <path d="M95 60 L95 90 L105 90 L105 60 Z" 
          fill="#34495E" stroke="#2C3E50" strokeWidth="1"/>
    
    {/* Копчик */}
    <path d="M97 90 L97 100 L103 100 L103 90" 
          fill="#34495E" stroke="#2C3E50" strokeWidth="1"/>
    
    {/* Подвздошные кости */}
    <path d="M60 65 C55 60, 65 70, 75 75" stroke="#2C3E50" strokeWidth="2" fill="none"/>
    <path d="M140 65 C145 60, 135 70, 125 75" stroke="#2C3E50" strokeWidth="2" fill="none"/>
  </svg>
);

// Мышцы живота - прямые, косые
export const AbdominalMuscleImage: React.FC<MuscleImageProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none">
    {/* Прямая мышца живота */}
    <path d="M80 40 C70 45, 65 60, 70 80 L75 120 C80 140, 90 150, 100 155 C110 150, 120 140, 125 120 L130 80 C135 60, 130 45, 120 40 L100 45 Z" 
          fill="#E74C3C" stroke="#C0392B" strokeWidth="2"/>
    
    {/* Кубики пресса */}
    <g fill="#C0392B" stroke="#A93226" strokeWidth="1">
      <rect x="85" y="60" width="12" height="15" rx="2"/>
      <rect x="103" y="60" width="12" height="15" rx="2"/>
      <rect x="85" y="80" width="12" height="15" rx="2"/>
      <rect x="103" y="80" width="12" height="15" rx="2"/>
      <rect x="85" y="100" width="12" height="15" rx="2"/>
      <rect x="103" y="100" width="12" height="15" rx="2"/>
      <rect x="85" y="120" width="12" height="15" rx="2"/>
      <rect x="103" y="120" width="12" height="15" rx="2"/>
    </g>
    
    {/* Внешние косые мышцы */}
    <path d="M50 70 C40 75, 35 90, 45 110 L60 130 C70 140, 80 135, 75 120 L65 100 C60 85, 55 80, 50 70" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    <path d="M150 70 C160 75, 165 90, 155 110 L140 130 C130 140, 120 135, 125 120 L135 100 C140 85, 145 80, 150 70" 
          fill="#3498DB" stroke="#2980B9" strokeWidth="2"/>
    
    {/* Внутренние косые мышцы */}
    <path d="M65 85 C70 90, 75 105, 70 115 L65 125 C60 130, 55 125, 60 115 L65 105 C70 95, 70 90, 65 85" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    <path d="M135 85 C130 90, 125 105, 130 115 L135 125 C140 130, 145 125, 140 115 L135 105 C130 95, 130 90, 135 85" 
          fill="#F39C12" stroke="#E67E22" strokeWidth="1"/>
    
    {/* Белая линия */}
    <path d="M100 40 L100 155" stroke="#ECF0F1" strokeWidth="2" fill="none"/>
    
    {/* Ребра */}
    <g stroke="#34495E" strokeWidth="1" fill="none">
      <path d="M70 45 C75 40, 125 40, 130 45"/>
      <path d="M65 55 C70 50, 130 50, 135 55"/>
    </g>
  </svg>
);

// Компонент для получения изображения по названию группы мышц
export const getMuscleImage = (muscleGroup: string, className?: string) => {
  switch (muscleGroup.toLowerCase()) {
    case 'грудь':
      return <ChestMuscleImage className={className} />;
    case 'спина':
      return <BackMuscleImage className={className} />;
    case 'ноги':
      return <LegMuscleImage className={className} />;
    case 'руки':
      return <ArmMuscleImage className={className} />;
    case 'плечи':
      return <ShoulderMuscleImage className={className} />;
    case 'ягодичные':
      return <GluteMuscleImage className={className} />;
    case 'живот':
      return <AbdominalMuscleImage className={className} />;
    default:
      return <div className={`${className} bg-gray-200 rounded-full flex items-center justify-center text-gray-500`}>?</div>;
  }
};