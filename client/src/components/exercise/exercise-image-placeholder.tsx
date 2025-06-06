import { Card, CardContent } from "@/components/ui/card";
import { Camera, Image as ImageIcon } from "lucide-react";

interface ExerciseImagePlaceholderProps {
  exerciseName: string;
  muscleGroup: string;
  className?: string;
}

export function ExerciseImagePlaceholder({ 
  exerciseName, 
  muscleGroup, 
  className = "w-full h-32" 
}: ExerciseImagePlaceholderProps) {
  // Создаем детализированную SVG-иллюстрацию для каждого типа упражнения
  const getExerciseIllustration = (name: string) => {
    const exerciseName = name.toLowerCase();
    
    if (exerciseName.includes('жим штанги лежа')) {
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full">
          {/* Скамья */}
          <rect x="40" y="110" width="200" height="12" fill="#8B4513" rx="4"/>
          <rect x="50" y="122" width="12" height="25" fill="#654321" rx="2"/>
          <rect x="218" y="122" width="12" height="25" fill="#654321" rx="2"/>
          
          {/* Человек */}
          <ellipse cx="140" cy="85" rx="18" ry="12" fill="#FFB366"/>
          <rect x="122" y="97" width="36" height="18" fill="#4A90E2" rx="3"/>
          <rect x="115" y="115" width="50" height="8" fill="#2E5A87" rx="2"/>
          
          {/* Штанга */}
          <rect x="80" y="55" width="120" height="6" fill="#333" rx="3"/>
          <circle cx="75" cy="58" r="8" fill="#666"/>
          <circle cx="205" cy="58" r="8" fill="#666"/>
          
          {/* Руки */}
          <rect x="105" y="70" width="6" height="30" fill="#FFB366" rx="3"/>
          <rect x="169" y="70" width="6" height="30" fill="#FFB366" rx="3"/>
          
          {/* Стойки */}
          <rect x="70" y="40" width="6" height="30" fill="#888" rx="2"/>
          <rect x="204" y="40" width="6" height="30" fill="#888" rx="2"/>
          
          <text x="140" y="155" textAnchor="middle" className="text-xs fill-white font-medium">
            Жим штанги лежа
          </text>
        </svg>
      );
    }
    
    if (exerciseName.includes('становая тяга')) {
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full">
          {/* Пол */}
          <rect x="0" y="140" width="280" height="8" fill="#666"/>
          
          {/* Штанга на полу */}
          <rect x="60" y="130" width="160" height="10" fill="#333" rx="5"/>
          <circle cx="55" cy="135" r="12" fill="#444"/>
          <circle cx="225" cy="135" r="12" fill="#444"/>
          
          {/* Человек в наклоне */}
          <ellipse cx="140" cy="70" rx="18" ry="12" fill="#FFB366"/>
          <rect x="122" y="82" width="36" height="18" fill="#4A90E2" rx="3" transform="rotate(15 140 91)"/>
          <rect x="127" y="100" width="26" height="30" fill="#2E5A87" rx="2" transform="rotate(8 140 115)"/>
          
          {/* Руки к штанге */}
          <rect x="115" y="95" width="6" height="35" fill="#FFB366" rx="3" transform="rotate(12 118 112)"/>
          <rect x="159" y="95" width="6" height="35" fill="#FFB366" rx="3" transform="rotate(-12 162 112)"/>
          
          <text x="140" y="155" textAnchor="middle" className="text-xs fill-white font-medium">
            Становая тяга
          </text>
        </svg>
      );
    }
    
    if (exerciseName.includes('отжимания')) {
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full">
          {/* Пол */}
          <rect x="0" y="135" width="280" height="8" fill="#666"/>
          
          {/* Человек в планке */}
          <ellipse cx="140" cy="80" rx="18" ry="12" fill="#FFB366"/>
          <rect x="122" y="92" width="36" height="18" fill="#4A90E2" rx="3"/>
          <rect x="127" y="110" width="26" height="35" fill="#2E5A87" rx="2"/>
          
          {/* Руки в упоре */}
          <rect x="100" y="105" width="8" height="30" fill="#FFB366" rx="4"/>
          <rect x="172" y="105" width="8" height="30" fill="#FFB366" rx="4"/>
          
          {/* Ладони на полу */}
          <ellipse cx="104" cy="138" rx="8" ry="4" fill="#FFB366"/>
          <ellipse cx="176" cy="138" rx="8" ry="4" fill="#FFB366"/>
          
          {/* Стрелки движения */}
          <path d="M 140 60 L 140 45 M 135 50 L 140 45 L 145 50" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
          <path d="M 140 100 L 140 115 M 135 110 L 140 115 L 145 110" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
          
          <text x="140" y="155" textAnchor="middle" className="text-xs fill-white font-medium">
            Отжимания
          </text>
        </svg>
      );
    }
    
    if (exerciseName.includes('подтягивания')) {
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full">
          {/* Турник */}
          <rect x="50" y="30" width="180" height="8" fill="#333" rx="4"/>
          <rect x="45" y="25" width="12" height="18" fill="#666" rx="2"/>
          <rect x="223" y="25" width="12" height="18" fill="#666" rx="2"/>
          
          {/* Человек висит */}
          <ellipse cx="140" cy="70" rx="18" ry="12" fill="#FFB366"/>
          <rect x="122" y="82" width="36" height="18" fill="#4A90E2" rx="3"/>
          <rect x="127" y="100" width="26" height="30" fill="#2E5A87" rx="2"/>
          
          {/* Руки на турнике */}
          <rect x="115" y="38" width="6" height="35" fill="#FFB366" rx="3"/>
          <rect x="159" y="38" width="6" height="35" fill="#FFB366" rx="3"/>
          
          {/* Ноги */}
          <rect x="132" y="130" width="6" height="20" fill="#2E5A87" rx="2"/>
          <rect x="142" y="130" width="6" height="20" fill="#2E5A87" rx="2"/>
          
          {/* Стрелка движения вверх */}
          <path d="M 140 50 L 140 35 M 135 40 L 140 35 L 145 40" stroke="#4CAF50" strokeWidth="2" fill="none"/>
          
          <text x="140" y="155" textAnchor="middle" className="text-xs fill-white font-medium">
            Подтягивания
          </text>
        </svg>
      );
    }
    
    // Универсальная иллюстрация для других упражнений
    return (
      <svg viewBox="0 0 280 160" className="w-full h-full">
        {/* Человек с гантелями */}
        <ellipse cx="140" cy="60" rx="20" ry="15" fill="#FFB366"/>
        <rect x="115" y="75" width="50" height="22" fill="#4A90E2" rx="4"/>
        <rect x="125" y="97" width="30" height="40" fill="#2E5A87" rx="3"/>
        
        {/* Руки */}
        <rect x="85" y="80" width="8" height="30" fill="#FFB366" rx="4"/>
        <rect x="187" y="80" width="8" height="30" fill="#FFB366" rx="4"/>
        
        {/* Гантели */}
        <rect x="70" y="75" width="20" height="8" fill="#333" rx="2"/>
        <circle cx="65" cy="79" r="6" fill="#444"/>
        <circle cx="95" cy="79" r="6" fill="#444"/>
        
        <rect x="190" y="75" width="20" height="8" fill="#333" rx="2"/>
        <circle cx="185" cy="79" r="6" fill="#444"/>
        <circle cx="215" cy="79" r="6" fill="#444"/>
        
        {/* Ноги */}
        <rect x="132" y="137" width="6" height="25" fill="#2E5A87" rx="2"/>
        <rect x="142" y="137" width="6" height="25" fill="#2E5A87" rx="2"/>
        
        <text x="140" y="155" textAnchor="middle" className="text-xs fill-white font-medium">
          {exerciseName.split(' ').slice(0, 2).join(' ')}
        </text>
      </svg>
    );
  };

  const getExerciseColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-700',
      'from-green-500 to-green-700', 
      'from-purple-500 to-purple-700',
      'from-orange-500 to-orange-700',
      'from-red-500 to-red-700',
      'from-indigo-500 to-indigo-700',
      'from-pink-500 to-pink-700',
      'from-teal-500 to-teal-700'
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Card className={`${className} overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors`}>
      <CardContent className="p-0 h-full">
        <div className={`h-full bg-gradient-to-br ${getExerciseColor(exerciseName)} flex flex-col items-center justify-center text-white relative`}>
          <div className="absolute top-2 right-2">
            <Camera className="h-4 w-4 opacity-60" />
          </div>
          
          <div className="flex-1 flex items-center justify-center p-2">
            {getExerciseIllustration(exerciseName)}
          </div>
          
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center">
            <div className="bg-black bg-opacity-40 rounded-full px-3 py-1 flex items-center gap-2">
              <ImageIcon className="h-3 w-3" />
              <span className="text-xs font-medium">Добавить фото</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}