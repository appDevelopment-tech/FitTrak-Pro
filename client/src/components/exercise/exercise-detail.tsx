import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExerciseAnimation } from "./exercise-animation";
import { generateExerciseImage } from "@/components/ui/exercise-photos";
import { X, AlertTriangle, CheckCircle, Info, Edit, Trash2, Save, ArrowLeft } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exercisesDb } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: exercise.name,
    primaryMuscles: exercise.primaryMuscles,
    secondaryMuscles: exercise.secondaryMuscles,
    difficulty: exercise.difficulty,
    overview: exercise.overview,
    technique: exercise.technique,
    commonMistakes: exercise.commonMistakes,
    contraindications: exercise.contraindications,
    techniqueImageUrl: exercise.techniqueImageUrl || ''
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return await exercisesDb.update(exercise.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      setIsEditing(false);
      toast({
        title: "Упражнение обновлено",
        description: "Изменения успешно сохранены."
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить изменения. Попробуйте еще раз.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    // Ensure arrays are properly formatted
    const formattedData = {
      ...editForm,
      primaryMuscles: Array.isArray(editForm.primaryMuscles) 
        ? editForm.primaryMuscles 
        : (editForm.primaryMuscles as string).split(',').map((m: string) => m.trim()).filter((m: string) => m),
      secondaryMuscles: Array.isArray(editForm.secondaryMuscles) 
        ? editForm.secondaryMuscles 
        : (editForm.secondaryMuscles as string).split(',').map((m: string) => m.trim()).filter((m: string) => m),
      technique: Array.isArray(editForm.technique) 
        ? editForm.technique 
        : (editForm.technique as string).split('\n').filter((t: string) => t.trim()),
      commonMistakes: Array.isArray(editForm.commonMistakes) 
        ? editForm.commonMistakes 
        : (editForm.commonMistakes as string).split('\n').filter((t: string) => t.trim()),
      contraindications: Array.isArray(editForm.contraindications) 
        ? editForm.contraindications 
        : (editForm.contraindications as string).split('\n').filter((t: string) => t.trim()),
    };

    updateMutation.mutate(formattedData);
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкий':
      case 'начинающий':
        return 'bg-green-100 text-green-800';
      case 'средний':
        return 'bg-yellow-100 text-yellow-800';
      case 'продвинутый':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{exercise.name}</h2>
            <div className="mt-2">
              <Badge className={getDifficultyStyle(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
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
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleSave} disabled={updateMutation.isPending}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isEditing ? (
            // Форма редактирования
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название упражнения</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Сложность</Label>
                  <Select 
                    value={editForm.difficulty} 
                    onValueChange={(value) => setEditForm({ ...editForm, difficulty: value })}
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="легкий">Легкий</SelectItem>
                      <SelectItem value="средний">Средний</SelectItem>
                      <SelectItem value="продвинутый">Продвинутый</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="techniqueImageUrl">URL изображения техники</Label>
                  <Input
                    id="techniqueImageUrl"
                    value={editForm.techniqueImageUrl}
                    onChange={(e) => setEditForm({ ...editForm, techniqueImageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="overview">Обзор упражнения</Label>
                <Textarea
                  id="overview"
                  value={editForm.overview}
                  onChange={(e) => setEditForm({ ...editForm, overview: e.target.value })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="primaryMuscles">Основные мышцы (через запятую)</Label>
                <Input
                  id="primaryMuscles"
                  value={editForm.primaryMuscles.join(', ')}
                  onChange={(e) => setEditForm({ ...editForm, primaryMuscles: e.target.value.split(',').map(m => m.trim()) })}
                />
              </div>

              <div>
                <Label htmlFor="secondaryMuscles">Дополнительные мышцы (через запятую)</Label>
                <Input
                  id="secondaryMuscles"
                  value={editForm.secondaryMuscles.join(', ')}
                  onChange={(e) => setEditForm({ ...editForm, secondaryMuscles: e.target.value.split(',').map(m => m.trim()) })}
                />
              </div>

              <div>
                <Label htmlFor="technique">Техника выполнения (каждый пункт с новой строки)</Label>
                <Textarea
                  id="technique"
                  value={editForm.technique.join('\n')}
                  onChange={(e) => setEditForm({ ...editForm, technique: e.target.value.split('\n').filter(t => t.trim()) })}
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="commonMistakes">Частые ошибки (каждый пункт с новой строки)</Label>
                <Textarea
                  id="commonMistakes"
                  value={editForm.commonMistakes.join('\n')}
                  onChange={(e) => setEditForm({ ...editForm, commonMistakes: e.target.value.split('\n').filter(t => t.trim()) })}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="contraindications">Противопоказания (каждый пункт с новой строки)</Label>
                <Textarea
                  id="contraindications"
                  value={editForm.contraindications.join('\n')}
                  onChange={(e) => setEditForm({ ...editForm, contraindications: e.target.value.split('\n').filter(t => t.trim()) })}
                  rows={4}
                />
              </div>
            </div>
          ) : (
            // Обычный просмотр
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}