import React from 'react';

interface ExercisePhotoProps {
  className?: string;
}

// Генератор SVG изображений для упражнений
export const generateExerciseImage = (exerciseName: string, className = "w-16 h-16") => {
  const name = exerciseName.toLowerCase();
  
  // Упражнения для груди
  if (name.includes('жим') || name.includes('отжим') || name.includes('разведение') || name.includes('пуловер')) {
    return <ChestExercisePhoto className={className} />;
  }
  
  // Упражнения для спины
  if (name.includes('подтягива') || name.includes('тяга') || name.includes('гиперэкстенз') || name.includes('доброе утро')) {
    return <BackExercisePhoto className={className} />;
  }
  
  // Упражнения для ног
  if (name.includes('присед') || name.includes('выпад') || name.includes('болгар') || name.includes('подъем на носки')) {
    return <LegsExercisePhoto className={className} />;
  }
  
  // Упражнения для рук
  if (name.includes('бицепс') || name.includes('трицепс') || name.includes('сгибан') || name.includes('разгибан')) {
    return <ArmsExercisePhoto className={className} />;
  }
  
  // Упражнения для плеч
  if (name.includes('плеч') || name.includes('дельт') || name.includes('махи') || name.includes('подъем')) {
    return <ShouldersExercisePhoto className={className} />;
  }
  
  // Упражнения для ягодичных
  if (name.includes('ягодиц') || name.includes('мостик') || name.includes('ягодичный') || name.includes('хип траст')) {
    return <GlutesExercisePhoto className={className} />;
  }
  
  // Упражнения для пресса
  if (name.includes('скручива') || name.includes('планка') || name.includes('пресс') || name.includes('велосипед') || name.includes('подъем ног')) {
    return <AbsExercisePhoto className={className} />;
  }
  
  // Кардио упражнения
  if (name.includes('бег') || name.includes('прыж') || name.includes('альпинист') || name.includes('берпи') || name.includes('джампинг')) {
    return <CardioExercisePhoto className={className} />;
  }
  
  // Упражнения с резинкой
  if (name.includes('резин') || name.includes('эспандер')) {
    return <ResistanceBandExercisePhoto className={className} />;
  }
  
  // Функциональные упражнения
  if (name.includes('функцион') || name.includes('комплекс') || name.includes('круговая')) {
    return <FunctionalExercisePhoto className={className} />;
  }
  
  // Упражнения с собственным весом
  if (name.includes('собственн') || name.includes('вес тела')) {
    return <BodyweightExercisePhoto className={className} />;
  }
  
  // По умолчанию - универсальная иконка
  return <DefaultExercisePhoto className={className} />;
};

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
    <rect x="78" y="20" width="10" height="8" fill="#FDBCB4" rx="4"/>
    <rect x="112" y="20" width="10" height="8" fill="#FDBCB4" rx="4"/>
    
    {/* Подчеркнутые широчайшие */}
    <ellipse cx="75" cy="65" rx="8" ry="4" fill="#E74C3C" opacity="0.7"/>
    <ellipse cx="125" cy="65" rx="8" ry="4" fill="#E74C3C" opacity="0.7"/>
  </svg>
);

// Фото упражнения для ног - приседания
export const LegsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек в приседе */}
    <ellipse cx="100" cy="40" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="46" width="30" height="20" fill="#27AE60" rx="3"/> {/* Торс */}
    <rect x="85" y="66" width="12" height="20" fill="#2C5282" rx="2"/> {/* Левое бедро */}
    <rect x="103" y="66" width="12" height="20" fill="#2C5282" rx="2"/> {/* Правое бедро */}
    <rect x="85" y="86" width="12" height="15" fill="#34495E" rx="2"/> {/* Левая голень */}
    <rect x="103" y="86" width="12" height="15" fill="#34495E" rx="2"/> {/* Правая голень */}
    
    {/* Руки вперед для баланса */}
    <rect x="65" y="50" width="25" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="50" width="25" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Стопы */}
    <ellipse cx="91" cy="103" rx="8" ry="4" fill="#8B4513"/>
    <ellipse cx="109" cy="103" rx="8" ry="4" fill="#8B4513"/>
    
    {/* Подчеркнутые квадрицепсы */}
    <ellipse cx="91" cy="76" rx="6" ry="10" fill="#27AE60" opacity="0.7"/>
    <ellipse cx="109" cy="76" rx="6" ry="10" fill="#27AE60" opacity="0.7"/>
  </svg>
);

// Фото упражнения для рук - сгибания на бицепс
export const ArmsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек стоящий */}
    <ellipse cx="100" cy="35" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="41" width="30" height="30" fill="#3498DB" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки согнуты с гантелями */}
    <rect x="70" y="45" width="6" height="15" fill="#FDBCB4" rx="2"/> {/* Левое плечо */}
    <rect x="65" y="60" width="6" height="12" fill="#FDBCB4" rx="2" transform="rotate(-45 68 66)"/> {/* Левое предплечье */}
    <rect x="124" y="45" width="6" height="15" fill="#FDBCB4" rx="2"/> {/* Правое плечо */}
    <rect x="129" y="60" width="6" height="12" fill="#FDBCB4" rx="2" transform="rotate(45 132 66)"/> {/* Правое предплечье */}
    
    {/* Гантели */}
    <rect x="55" y="55" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="57" cy="57" r="3" fill="#34495E"/>
    <circle cx="65" cy="57" r="3" fill="#34495E"/>
    
    <rect x="133" y="55" width="12" height="4" fill="#2C3E50" rx="2"/>
    <circle cx="135" cy="57" r="3" fill="#34495E"/>
    <circle cx="143" cy="57" r="3" fill="#34495E"/>
    
    {/* Подчеркнутые бицепсы */}
    <ellipse cx="68" cy="45" rx="3" ry="5" fill="#E74C3C" opacity="0.7"/>
    <ellipse cx="132" cy="45" rx="3" ry="5" fill="#E74C3C" opacity="0.7"/>
  </svg>
);

// Плечи - махи гантелями
export const ShouldersExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек стоя */}
    <ellipse cx="100" cy="40" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="46" width="30" height="25" fill="#4A90E2" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки с гантелями в стороны */}
    <rect x="50" y="52" width="30" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="120" y="52" width="30" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Гантели */}
    <rect x="45" y="50" width="10" height="10" fill="#2C3E50" rx="2"/> {/* Левая гантель */}
    <rect x="145" y="50" width="10" height="10" fill="#2C3E50" rx="2"/> {/* Правая гантель */}
  </svg>
);

// Ягодичные мышцы - мостик
export const GlutesExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Пол */}
    <rect x="0" y="130" width="200" height="20" fill="#E8E8E8"/>
    
    {/* Человек в мостике */}
    <ellipse cx="100" cy="75" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="80" width="30" height="15" fill="#E74C3C" rx="3"/> {/* Торс */}
    <rect x="85" y="95" width="12" height="35" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="95" width="12" height="35" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки на полу */}
    <rect x="70" y="85" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="85" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
  </svg>
);

// Фото упражнения для пресса - скручивания
export const AbsExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек лежащий на спине в скручивании */}
    <ellipse cx="100" cy="50" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="56" width="30" height="20" fill="#F39C12" rx="3"/> {/* Торс приподнят */}
    <rect x="85" y="76" width="12" height="18" fill="#E74C3C" rx="2" transform="rotate(45 91 85)"/> {/* Левое бедро */}
    <rect x="103" y="76" width="12" height="18" fill="#E74C3C" rx="2" transform="rotate(-45 109 85)"/> {/* Правое бедро */}
    <rect x="75" y="90" width="12" height="15" fill="#2C5282" rx="2" transform="rotate(-30 81 97)"/> {/* Левая голень */}
    <rect x="113" y="90" width="12" height="15" fill="#2C5282" rx="2" transform="rotate(30 119 97)"/> {/* Правая голень */}
    
    {/* Руки за головой */}
    <rect x="75" y="45" width="15" height="6" fill="#FDBCB4" rx="2" transform="rotate(-45 82 48)"/> {/* Левая рука */}
    <rect x="110" y="45" width="15" height="6" fill="#FDBCB4" rx="2" transform="rotate(45 117 48)"/> {/* Правая рука */}
    
    {/* Подчеркнутый пресс */}
    <rect x="90" y="60" width="20" height="12" fill="#F39C12" opacity="0.8" rx="2"/>
    <rect x="92" y="62" width="16" height="2" fill="#E67E22"/>
    <rect x="92" y="66" width="16" height="2" fill="#E67E22"/>
    <rect x="92" y="70" width="16" height="2" fill="#E67E22"/>
  </svg>
);

// Кардио - бег
export const CardioExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Беговая дорожка */}
    <rect x="20" y="120" width="160" height="10" fill="#666"/>
    
    {/* Человек бегущий */}
    <ellipse cx="100" cy="45" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="51" width="30" height="20" fill="#E74C3C" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="25" fill="#2C5282" rx="2" transform="rotate(10 91 83)"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="25" fill="#2C5282" rx="2" transform="rotate(-10 109 83)"/> {/* Правая нога */}
    
    {/* Руки в движении */}
    <rect x="70" y="53" width="20" height="6" fill="#FDBCB4" rx="2" transform="rotate(-20 80 56)"/> {/* Левая рука */}
    <rect x="110" y="53" width="20" height="6" fill="#FDBCB4" rx="2" transform="rotate(20 120 56)"/> {/* Правая рука */}
    
    {/* Линии движения */}
    <path d="M140 60 L160 55" stroke="#FFD700" strokeWidth="2"/>
    <path d="M140 70 L155 65" stroke="#FFD700" strokeWidth="2"/>
  </svg>
);

// Упражнения с резинкой
export const ResistanceBandExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек с резинкой */}
    <ellipse cx="100" cy="45" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="51" width="30" height="25" fill="#4A90E2" rx="3"/> {/* Торс */}
    <rect x="85" y="76" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="76" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки с резинкой */}
    <rect x="70" y="55" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="55" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Резинка */}
    <path d="M75 58 Q100 45 125 58" stroke="#FF6B6B" strokeWidth="4" fill="none"/>
    <circle cx="75" cy="58" r="3" fill="#FF6B6B"/> {/* Ручка левая */}
    <circle cx="125" cy="58" r="3" fill="#FF6B6B"/> {/* Ручка правая */}
  </svg>
);

// Функциональные упражнения
export const FunctionalExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Комплексное движение - берпи */}
    <ellipse cx="100" cy="40" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="46" width="30" height="20" fill="#E74C3C" rx="3"/> {/* Торс */}
    <rect x="85" y="66" width="12" height="20" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="66" width="12" height="20" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки в упоре */}
    <rect x="70" y="75" width="25" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="105" y="75" width="25" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Стрелки движения */}
    <path d="M50 30 L40 20" stroke="#FFA500" strokeWidth="3"/>
    <path d="M150 30 L160 20" stroke="#FFA500" strokeWidth="3"/>
  </svg>
);

// Упражнения с собственным весом
export const BodyweightExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Человек в отжимании */}
    <ellipse cx="100" cy="50" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="56" width="30" height="15" fill="#4A90E2" rx="3"/> {/* Торс */}
    <rect x="85" y="71" width="12" height="25" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="71" width="12" height="25" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки в упоре */}
    <rect x="70" y="65" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="65" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Текст "BW" (bodyweight) */}
    <text x="100" y="25" textAnchor="middle" fill="#2C3E50" fontSize="16" fontWeight="bold">BW</text>
  </svg>
);

// Универсальная иконка по умолчанию
export const DefaultExercisePhoto: React.FC<ExercisePhotoProps> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 200 150" className={className} fill="none">
    {/* Универсальная фигура человека */}
    <ellipse cx="100" cy="45" rx="8" ry="6" fill="#FDBCB4"/> {/* Голова */}
    <rect x="85" y="51" width="30" height="25" fill="#4A90E2" rx="3"/> {/* Торс */}
    <rect x="85" y="76" width="12" height="30" fill="#2C5282" rx="2"/> {/* Левая нога */}
    <rect x="103" y="76" width="12" height="30" fill="#2C5282" rx="2"/> {/* Правая нога */}
    
    {/* Руки */}
    <rect x="70" y="55" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Левая рука */}
    <rect x="110" y="55" width="20" height="6" fill="#FDBCB4" rx="2"/> {/* Правая рука */}
    
    {/* Иконка упражнения */}
    <circle cx="100" cy="25" r="12" fill="#FFA500" stroke="#FF8C00" strokeWidth="2"/>
    <text x="100" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">EX</text>
  </svg>
);

// Функция для получения изображения упражнения по группе мышц (совместимость)
export const getExercisePhoto = (muscleGroup: string, className = "w-16 h-16") => {
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