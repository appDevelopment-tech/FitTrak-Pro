import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseAnimation } from "./exercise-animation";
import { generateExerciseImage } from "@/components/ui/exercise-photos";
import { X, AlertTriangle, CheckCircle, Info, Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Exercise {
  id: number;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  overview: string;
  technique: string[];
  commonMistakes: string[];
  contraindications: string[];
  muscleImageUrl?: string | null;
  techniqueImageUrl?: string | null;
}

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
  onEdit?: (exercise: Exercise) => void;
  onDelete?: (exerciseId: number) => void;
}

export function ExerciseDetail({ exercise, onClose, onEdit, onDelete }: ExerciseDetailProps) {
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкий':
      case 'начинающий': return { backgroundColor: '#dbeafe', color: '#1e40af', borderColor: '#93c5fd' };
      case 'средний': return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#86efac' };
      case 'продвинутый':
      case 'сложный': return { backgroundColor: '#fecaca', color: '#991b1b', borderColor: '#fca5a5' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" 
                     data-difficulty={exercise.difficulty}
                     className={
                       exercise.difficulty === 'легкий' || exercise.difficulty === 'начинающий' 
                         ? 'difficulty-easy-force' 
                         : exercise.difficulty === 'средний'
                         ? 'difficulty-medium-force'
                         : exercise.difficulty === 'продвинутый'
                         ? 'difficulty-hard-force'
                         : ''
                     }>
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(exercise)}>
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Удалить упражнение?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие нельзя отменить. Упражнение "{exercise.name}" будет удалено навсегда.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => {
                        onDelete(exercise.id);
                        onClose();
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Technique Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {exercise.techniqueImageUrl ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Техника выполнения</h4>
                  <img
                    src={exercise.techniqueImageUrl}
                    alt={`Техника выполнения ${exercise.name}`}
                    className="w-full rounded-lg border bg-white shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = '<p class="text-gray-500 text-center p-4">Изображение не найдено</p>';
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                  {generateExerciseImage(exercise.name, "w-48 h-36 border bg-white rounded-lg shadow-sm")}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Обзор упражнения</h3>
              <p className="text-gray-700 leading-relaxed">{exercise.overview}</p>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Основные мышцы:</h4>
                <div className="flex flex-wrap gap-2">
                  {exercise.primaryMuscles?.map((muscle, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800">
                      {muscle}
                    </Badge>
                  )) || <span className="text-gray-500">Не указано</span>}
                </div>
              </div>

              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium text-gray-900 mb-2">Вспомогательные мышцы:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondaryMuscles.map((muscle, index) => (
                      <Badge key={index} variant="secondary">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Technique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Техника выполнения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {exercise.technique?.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                )) || <span className="text-gray-500">Техника выполнения не указана</span>}
              </ol>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Частые ошибки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exercise.commonMistakes?.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{mistake}</span>
                  </li>
                )) || <span className="text-gray-500">Частые ошибки не указаны</span>}
              </ul>
            </CardContent>
          </Card>

          {/* Contraindications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-orange-500" />
                Противопоказания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exercise.contraindications?.map((contraindication, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{contraindication}</span>
                  </li>
                )) || <span className="text-gray-500">Противопоказания не указаны</span>}
              </ul>
            </CardContent>
          </Card>

          {/* Safety Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800">Важно</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Перед выполнением упражнения обязательно разомнитесь. При наличии травм или заболеваний 
                  проконсультируйтесь с врачом или тренером.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}