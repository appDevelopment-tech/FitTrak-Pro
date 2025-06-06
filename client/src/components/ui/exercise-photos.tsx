import React from 'react';

interface ExercisePhotoProps {
  className?: string;
}

// Фото упражнения для груди - жим лежа
export const ChestExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Скамья */}
    <rect x="20" y="100" width="160" height="20" fill="#8B4513" stroke="#654321" strokeWidth="2"/>
    
    {/* Человек лежащий */}
    <ellipse cx="100" cy="95" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="100" width="30" height="15" fill="#4A90E2" rx="3"/> {/* Торс */}
    <rect x="85" y="115" width="12" height="20" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="115" width="12" height="20" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки с гантелью */}
    <rect x="70" y="102" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="102" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Штанга */}
    <rect x="60" y="85" width="80" height="8" fill="#2C3E50" rx="4"/>
    <circle cx="65" cy="89" r="12" fill="#34495E"/> {/* Левый блин */}
    <circle cx="135" cy="89" r="12" fill="#34495E"/> {/* Правый блин */}
    
    {/* Стойки */}
    <rect x="50" y="70" width="6" height="30" fill="#7F8C8D"/>
    <rect x="144" y="70" width="6" height="30" fill="#7F8C8D"/>
  </svg>
);

// Фото упражнения для спины - подтягивания
export const BackExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Перекладина */}
    <rect x="50" y="20" width="100" height="6" fill="#2C3E50" rx="3"/>
    
    {/* Человек подтягивающийся */}
    <ellipse cx="100" cy="50" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="56" width="30" height="20" fill="#E74C3C" rx="3"/> {/* Торс */}
    <rect x="85" y="76" width="12" height="25" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="76" width="12" height="25" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки держащие перекладину */}
    <rect x="80" y="26" width="6" height="30" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="114" y="26" width="6" height="30" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Кисти на перекладине */}
    <ellipse cx="83" cy="23" rx="4" ry="3" fill="#FDBCB4"/>
    <ellipse cx="117" cy="23" rx="4" ry="3" fill="#FDBCB4"/>
    
    {/* Мышцы спины (подчеркнуты) */}
    <path d="M90 60 Q100 65 110 60" stroke="#C0392B" strokeWidth="2" fill="none"/>
  </svg>
);

// Фото упражнения для ног - приседания
export const LegsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек в приседе */}
    <ellipse cx="100" cy="40" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="46" width="30" height="25" fill="#F39C12" rx="3"/> {/* Торс */}
    
    {/* Ноги в приседе */}
    <rect x="85" y="71" width="12" height="20" fill="#E74C3C" rx="2" transform="rotate(-15 91 81)"/> {/* Левое бедро */}
    <rect x="103" y="71" width="12" height="20" fill="#E74C3C" rx="2" transform="rotate(15 109 81)"/> {/* Правое бедро */}
    <rect x="80" y="90" width="12" height="18" fill="#2C5282" rx="2"/> {/* Левая голень */}
    <rect x="108" y="90" width="12" height="18" fill="#2C5282" rx="2"/> {/* Правая голень */}
    
    {/* Руки */}
    <rect x="70" y="48" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="48" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Штанга на плечах */}
    <rect x="60" y="42" width="80" height="6" fill="#2C3E50" rx="3"/>
    <circle cx="65" cy="45" r="8" fill="#34495E"/> {/* Левый блин */}
    <circle cx="135" cy="45" r="8" fill="#34495E"/> {/* Правый блин */}
    
    {/* Стопы */}
    <ellipse cx="86" cy="110" rx="8" ry="4" fill="#8B4513"/>
    <ellipse cx="114" cy="110" rx="8" ry="4" fill="#8B4513"/>
  </svg>
);

// Фото упражнения для рук - подъем гантелей на бицепс
export const ArmsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек стоящий */}
    <ellipse cx="100" cy="30" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="36" width="30" height="35" fill="#3498DB" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки с гантелями */}
    <rect x="65" y="40" width="6" height="20" fill="#FDBCB4" rx="2" transform="rotate(-30 68 50)"/> {/* Левое плечо */}
    <rect x="60" y="55" width="6" height="15" fill="#FDBCB4" rx="2" transform="rotate(45 63 62)"/> {/* Левое предплечье */}
    
    <rect x="129" y="40" width="6" height="20" fill="#FDBCB4" rx="2" transform="rotate(30 132 50)"/> {/* Правое плечо */}
    <rect x="134" y="55" width="6" height="15" fill="#FDBCB4" rx="2" transform="rotate(-45 137 62)"/> {/* Правое предплечье */}
    
    {/* Гантели */}
    <rect x="50" y="65" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="52" cy="67" r="3" fill="#34495E"/>
    <circle cx="60" cy="67" r="3" fill="#34495E"/>
    
    <rect x="138" y="65" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="140" cy="67" r="3" fill="#34495E"/>
    <circle cx="148" cy="67" r="3" fill="#34495E"/>
    
    {/* Стопы */}
    <ellipse cx="91" cy="103" rx="8" ry="4" fill="#8B4513"/>
    <ellipse cx="109" cy="103" rx="8" ry="4" fill="#8B4513"/>
    
    {/* Подчеркнутые бицепсы */}
    <ellipse cx="68" cy="45" rx="3" ry="5" fill="#E74C3C" opacity="0.7"/>
    <ellipse cx="132" cy="45" rx="3" ry="5" fill="#E74C3C" opacity="0.7"/>
  </svg>
);

// Фото упражнения для плеч - жим гантелей стоя
export const ShouldersExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек стоящий */}
    <ellipse cx="100" cy="30" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="36" width="30" height="35" fill="#9B59B6" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки подняты вверх с гантелями */}
    <rect x="70" y="20" width="6" height="25" fill="#FDBCB4" rx="2" transform="rotate(-15 73 32)"/> {/* Левая рука */}
    <rect x="124" y="20" width="6" height="25" fill="#FDBCB4" rx="2" transform="rotate(15 127 32)"/> {/* Правая рука */}
    
    {/* Гантели над головой */}
    <rect x="60" y="15" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="62" cy="17" r="3" fill="#34495E"/>
    <circle cx="70" cy="17" r="3" fill="#34495E"/>
    
    <rect x="128" y="15" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="130" cy="17" r="3" fill="#34495E"/>
    <circle cx="138" cy="17" r="3" fill="#34495E"/>
    
    {/* Подчеркнутые дельты */}
    <ellipse cx="78" cy="40" rx="5" ry="3" fill="#F39C12" opacity="0.8"/>
    <ellipse cx="122" cy="40" rx="5" ry="3" fill="#F39C12" opacity="0.8"/>
    
    {/* Стопы */}
    <ellipse cx="91" cy="103" rx="8" ry="4" fill="#8B4513"/>
    <ellipse cx="109" cy="103" rx="8" ry="4" fill="#8B4513"/>
  </svg>
);

// Фото упражнения для ягодичных - выпады
export const GlutesExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек в выпаде - полностью центрирован */}
    <ellipse cx="100" cy="40" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="46" width="30" height="28" fill="#E91E63" rx="3"/> {/* Торс */}
    
    {/* Ноги в выпаде - центрированы относительно торса */}
    <rect x="92" y="74" width="12" height="22" fill="#E74C3C" rx="2"/> {/* Переднее бедро */}
    <rect x="92" y="95" width="12" height="18" fill="#2C5282" rx="2"/> {/* Передняя голень */}
    
    <rect x="96" y="78" width="12" height="18" fill="#E74C3C" rx="2" transform="rotate(-20 102 87)"/> {/* Заднее бедро */}
    <rect x="106" y="92" width="12" height="15" fill="#2C5282" rx="2" transform="rotate(-40 112 99)"/> {/* Задняя голень */}
    
    {/* Руки на поясе - центрированы */}
    <rect x="75" y="50" width="13" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="112" y="50" width="13" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Подчеркнутые ягодицы - точно по центру */}
    <ellipse cx="100" cy="70" rx="8" ry="5" fill="#F39C12" opacity="0.8"/>
    
    {/* Стопы - центрированы */}
    <ellipse cx="98" cy="115" rx="7" ry="4" fill="#8B4513"/>
    <ellipse cx="114" cy="108" rx="6" ry="3" fill="#8B4513" transform="rotate(-20 114 108)"/>
  </svg>
);

// Фото упражнения для живота - скручивания
export const AbsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Коврик */}
    <rect x="30" y="90" width="140" height="50" fill="#8E44AD" opacity="0.3" rx="5"/>
    
    {/* Человек лежащий, делающий скручивания */}
    <ellipse cx="100" cy="75" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="81" width="30" height="20" fill="#FF6B35" rx="3" transform="rotate(-15 100 91)"/> {/* Торс приподнят */}
    
    {/* Ноги согнуты */}
    <rect x="85" y="100" width="12" height="18" fill="#E74C3C" rx="2" transform="rotate(45 91 109)"/> {/* Левое бедро */}
    <rect x="103" y="100" width="12" height="18" fill="#E74C3C" rx="2" transform="rotate(-45 109 109)"/> {/* Правое бедро */}
    <rect x="75" y="115" width="12" height="15" fill="#2C5282" rx="2" transform="rotate(-30 81 122)"/> {/* Левая голень */}
    <rect x="113" y="115" width="12" height="15" fill="#2C5282" rx="2" transform="rotate(30 119 122)"/> {/* Правая голень */}
    
    {/* Руки за головой */}
    <rect x="75" y="70" width="15" height="6" fill="#FDBCB4" rx="2" transform="rotate(-45 82 73)"/> {/* Левая рука */}
    <rect x="110" y="70" width="15" height="6" fill="#FDBCB4" rx="2" transform="rotate(45 117 73)"/> {/* Правая рука */}
    
    {/* Подчеркнутый пресс */}
    <rect x="90" y="85" width="20" height="12" fill="#F39C12" opacity="0.8" rx="2" transform="rotate(-15 100 91)"/>
    <path d="M92 87 L98 87 M102 87 L108 87 M94 92 L106 92" stroke="#E67E22" strokeWidth="1" transform="rotate(-15 100 91)"/>
    
    {/* Стопы */}
    <ellipse cx="75" cy="130" rx="6" ry="3" fill="#8B4513" transform="rotate(-30 75 130)"/>
    <ellipse cx="125" cy="130" rx="6" ry="3" fill="#8B4513" transform="rotate(30 125 130)"/>
  </svg>
);

// Компонент для получения фотографии упражнения по названию группы мышц
export const getExercisePhoto = (muscleGroup: string, className?: string) => {
  switch (muscleGroup.toLowerCase()) {
    case 'грудь':
      return <ChestExercisePhoto className={className} />;
    case 'спина':
      return <BackExercisePhoto className={className} />;
    case 'ноги':
      return <LegsExercisePhoto className={className} />;
    case 'руки':
      return <ArmsExercisePhoto className={className} />;
    case 'плечи':
      return <ShouldersExercisePhoto className={className} />;
    case 'ягодичные':
      return <GlutesExercisePhoto className={className} />;
    case 'живот':
      return <AbsExercisePhoto className={className} />;
    default:
      return <div className={`${className} bg-gray-200 rounded-full flex items-center justify-center text-gray-500`}>?</div>;
  }
};