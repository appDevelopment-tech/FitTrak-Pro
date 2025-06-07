import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseAnimation } from "./exercise-animation";
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";

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
}

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
}

export function ExerciseDetail({ exercise, onClose }: ExerciseDetailProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкий':
      case 'начинающий': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'продвинутый':
      case 'сложный': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Animation and Description */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
              <ExerciseAnimation exerciseName={exercise.name} className="w-48 h-48" />
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