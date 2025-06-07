import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Exercise, InsertExercise } from "@shared/schema";

interface ExerciseFormData {
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  difficulty: string;
  overview: string;
  technique: string[];
  commonMistakes: string[];
  contraindications: string[];
  muscleImageUrl?: string;
}

const muscleGroups = ['грудь', 'спина', 'ноги', 'руки', 'плечи', 'ягодичные', 'живот'];
const difficultyLevels = ['начинающий', 'средний', 'продвинутый'];

export function ExerciseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMuscle, setFilterMuscle] = useState<string>("");

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: exercises = [], isLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertExercise) => apiRequest('/api/exercises', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      setIsCreateDialogOpen(false);
      toast({ title: "Упражнение создано успешно" });
    },
    onError: () => {
      toast({ title: "Ошибка при создании упражнения", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertExercise> }) => 
      apiRequest(`/api/exercises/${id}`, 'PUT', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      setIsEditDialogOpen(false);
      toast({ title: "Упражнение обновлено успешно" });
    },
    onError: () => {
      toast({ title: "Ошибка при обновлении упражнения", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/exercises/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      toast({ title: "Упражнение удалено успешно" });
    },
    onError: () => {
      toast({ title: "Ошибка при удалении упражнения", variant: "destructive" });
    }
  });

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = !filterMuscle || exercise.primaryMuscles.includes(filterMuscle);
    return matchesSearch && matchesMuscle;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold">Управление упражнениями</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Добавить упражнение
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новое упражнение</DialogTitle>
            </DialogHeader>
            <ExerciseForm 
              onSubmit={(data) => createMutation.mutate(data)}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Фильтры */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск упражнений..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={filterMuscle} onValueChange={setFilterMuscle}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Группа мышц" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все группы</SelectItem>
                  {muscleGroups.map(muscle => (
                    <SelectItem key={muscle} value={muscle}>{muscle}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список упражнений */}
      {isLoading ? (
        <div className="text-center py-8">Загрузка упражнений...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {exercise.primaryMuscles.map(muscle => (
                    <Badge key={muscle} variant="default">{muscle}</Badge>
                  ))}
                  {exercise.secondaryMuscles.map(muscle => (
                    <Badge key={muscle} variant="secondary">{muscle}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Сложность:</span>
                  <Badge variant={exercise.difficulty === 'средний' ? 'secondary' : 
                               exercise.difficulty === 'продвинутый' ? 'destructive' : 'default'}
                         className={exercise.difficulty === 'легкий' || exercise.difficulty === 'начинающий' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' : 
                                   exercise.difficulty === 'средний' ? '' :
                                   exercise.difficulty === 'продвинутый' ? '' : ''}>
                    {exercise.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{exercise.overview}</p>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setIsViewDialogOpen(true);
                    }}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Просмотр
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
                          onClick={() => deleteMutation.mutate(exercise.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Удалить
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredExercises.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          Упражнения не найдены. Попробуйте изменить фильтры или создать новое упражнение.
        </div>
      )}

      {/* Диалоги */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать упражнение</DialogTitle>
          </DialogHeader>
          {selectedExercise && (
            <ExerciseForm 
              exercise={selectedExercise}
              onSubmit={(data) => updateMutation.mutate({ id: selectedExercise.id, data })}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Просмотр упражнения</DialogTitle>
          </DialogHeader>
          {selectedExercise && <ExerciseView exercise={selectedExercise} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ExerciseFormProps {
  exercise?: Exercise;
  onSubmit: (data: InsertExercise) => void;
  isLoading: boolean;
}

function ExerciseForm({ exercise, onSubmit, isLoading }: ExerciseFormProps) {
  const [formData, setFormData] = useState<ExerciseFormData>({
    name: exercise?.name || "",
    primaryMuscles: exercise?.primaryMuscles || [],
    secondaryMuscles: exercise?.secondaryMuscles || [],
    difficulty: exercise?.difficulty || "",
    overview: exercise?.overview || "",
    technique: exercise?.technique || [""],
    commonMistakes: exercise?.commonMistakes || [""],
    contraindications: exercise?.contraindications || [""],
    muscleImageUrl: exercise?.muscleImageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: InsertExercise = {
      ...formData,
      technique: formData.technique.filter(item => item.trim() !== ""),
      commonMistakes: formData.commonMistakes.filter(item => item.trim() !== ""),
      contraindications: formData.contraindications.filter(item => item.trim() !== ""),
      createdBy: 1, // ID текущего тренера
    };

    onSubmit(submitData);
  };

  const addArrayItem = (field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const updateArrayItem = (field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: keyof Pick<ExerciseFormData, 'technique' | 'commonMistakes' | 'contraindications'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Название упражнения *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>



        <div className="space-y-2">
          <Label htmlFor="difficulty">Сложность *</Label>
          <Select 
            value={formData.difficulty} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите сложность" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="muscleImageUrl">Ссылка на изображение мышц</Label>
          <Input
            id="muscleImageUrl"
            value={formData.muscleImageUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, muscleImageUrl: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="overview">Обзор упражнения *</Label>
        <Textarea
          id="overview"
          value={formData.overview}
          onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
          rows={3}
          required
        />
      </div>

      {/* Основные мышцы */}
      <div className="space-y-2">
        <Label>Основные группы мышц *</Label>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map(muscle => (
            <Badge
              key={muscle}
              variant={formData.primaryMuscles.includes(muscle) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  primaryMuscles: prev.primaryMuscles.includes(muscle)
                    ? prev.primaryMuscles.filter(m => m !== muscle)
                    : [...prev.primaryMuscles, muscle]
                }));
              }}
            >
              {muscle}
            </Badge>
          ))}
        </div>
      </div>

      {/* Вспомогательные мышцы */}
      <div className="space-y-2">
        <Label>Вспомогательные группы мышц</Label>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map(muscle => (
            <Badge
              key={muscle}
              variant={formData.secondaryMuscles.includes(muscle) ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  secondaryMuscles: prev.secondaryMuscles.includes(muscle)
                    ? prev.secondaryMuscles.filter(m => m !== muscle)
                    : [...prev.secondaryMuscles, muscle]
                }));
              }}
            >
              {muscle}
            </Badge>
          ))}
        </div>
      </div>

      {/* Техника выполнения */}
      <div className="space-y-2">
        <Label>Техника выполнения *</Label>
        {formData.technique.map((step, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={step}
              onChange={(e) => updateArrayItem('technique', index, e.target.value)}
              placeholder={`Шаг ${index + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem('technique', index)}
              disabled={formData.technique.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('technique')}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить шаг
        </Button>
      </div>

      {/* Частые ошибки */}
      <div className="space-y-2">
        <Label>Частые ошибки и их исправление</Label>
        {formData.commonMistakes.map((mistake, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={mistake}
              onChange={(e) => updateArrayItem('commonMistakes', index, e.target.value)}
              placeholder={`Ошибка ${index + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem('commonMistakes', index)}
              disabled={formData.commonMistakes.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('commonMistakes')}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить ошибку
        </Button>
      </div>

      {/* Противопоказания */}
      <div className="space-y-2">
        <Label>Противопоказания</Label>
        {formData.contraindications.map((contraindication, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={contraindication}
              onChange={(e) => updateArrayItem('contraindications', index, e.target.value)}
              placeholder={`Противопоказание ${index + 1}`}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem('contraindications', index)}
              disabled={formData.contraindications.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('contraindications')}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить противопоказание
        </Button>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Сохранение..." : exercise ? "Обновить" : "Создать"}
        </Button>
      </div>
    </form>
  );
}

interface ExerciseViewProps {
  exercise: Exercise;
}

function ExerciseView({ exercise }: ExerciseViewProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'легкий':
      case 'начинающий': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'продвинутый': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Основная информация</h3>
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Название:</span> {exercise.name}</div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Сложность:</span> 
              <Badge className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Группы мышц</h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-sm">Основные:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {exercise.primaryMuscles.map(muscle => (
                  <Badge key={muscle} variant="default">{muscle}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-sm">Вспомогательные:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {exercise.secondaryMuscles.map(muscle => (
                  <Badge key={muscle} variant="secondary">{muscle}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Обзор</h3>
        <p className="text-sm text-gray-600">{exercise.overview}</p>
      </div>

      {exercise.muscleImageUrl && (
        <div>
          <h3 className="font-semibold mb-2">Схема мышц</h3>
          <img 
            src={exercise.muscleImageUrl} 
            alt="Схема задействованных мышц"
            className="max-w-full h-auto rounded-lg border"
          />
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2">Техника выполнения</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {exercise.technique.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Частые ошибки</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {exercise.commonMistakes.map((mistake, index) => (
            <li key={index}>{mistake}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Противопоказания</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {exercise.contraindications.map((contraindication, index) => (
            <li key={index}>{contraindication}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}