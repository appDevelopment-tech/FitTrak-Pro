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
  const getExerciseIcon = (name: string) => {
    if (name.includes('жим')) return '🏋️';
    if (name.includes('отжимания')) return '💪';
    if (name.includes('разведение') || name.includes('сведение')) return '🤲';
    if (name.includes('тяга')) return '🔄';
    if (name.includes('пуловер')) return '🔃';
    return '💪';
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