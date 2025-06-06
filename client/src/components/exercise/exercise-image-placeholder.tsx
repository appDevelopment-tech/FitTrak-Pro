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
  // Создаем уникальный цвет для каждого упражнения на основе названия
  const getExerciseColor = (name: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-pink-400 to-pink-600',
      'from-teal-400 to-teal-600'
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getExerciseIcon = (name: string) => {
    if (name.includes('жим')) return '🏋️';
    if (name.includes('отжимания')) return '💪';
    if (name.includes('разведение') || name.includes('сведение')) return '🤲';
    if (name.includes('тяга')) return '🔄';
    if (name.includes('пуловер')) return '🔃';
    return '💪';
  };

  return (
    <Card className={`${className} overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors`}>
      <CardContent className="p-0 h-full">
        <div className={`h-full bg-gradient-to-br ${getExerciseColor(exerciseName)} flex flex-col items-center justify-center text-white relative`}>
          <div className="absolute top-2 right-2">
            <Camera className="h-4 w-4 opacity-60" />
          </div>
          
          <div className="text-center p-4">
            <div className="text-3xl mb-2">{getExerciseIcon(exerciseName)}</div>
            <h3 className="font-semibold text-sm leading-tight mb-1">
              {exerciseName}
            </h3>
            <p className="text-xs opacity-80">
              {muscleGroup}
            </p>
          </div>
          
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center">
            <div className="bg-black bg-opacity-30 rounded-full px-2 py-1 flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              <span className="text-xs">Добавить фото</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}