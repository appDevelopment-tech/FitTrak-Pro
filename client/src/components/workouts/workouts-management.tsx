import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dumbbell, Plus, Edit, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import type { Exercise, User as UserType } from "@/../../shared/schema";

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  sessionsPerWeek: number;
  type: 'ready' | 'custom';
  exercises?: string[];
}

interface WorkoutsManagementProps {
  activeTab?: string;
}

export function WorkoutsManagement({ activeTab }: WorkoutsManagementProps) {
  const { activeWorkouts, addActiveWorkout, isWorkoutActive } = useActiveWorkout();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [editedPlan, setEditedPlan] = useState<WorkoutPlan | null>(null);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [currentWorkoutTab, setCurrentWorkoutTab] = useState<string>('ready-plans');

  const [customWorkout, setCustomWorkout] = useState({
    name: '',
    level: 'начальный',
    totalSessions: 1,
    sessionsPerWeek: 3,
    startDate: null as Date | null,
    startTime: '09:00',
    trainerNotes: '',
    exercises: [] as string[],
    timerEnabled: false
  });

  const { toast } = useToast();

  // Загрузка данных пользователя
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1']
  });

  // Загрузка упражнений
  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  // Готовые планы тренировок
  const readyPlans: WorkoutPlan[] = [
    {
      id: 1,
      name: "Начальная силовая тренировка",
      description: "Основы силовых упражнений для новичков",
      difficulty: "начальный",
      sessionsPerWeek: 2,
      type: 'ready',
      exercises: ["Приседания", "Отжимания", "Планка", "Подтягивания"]
    },
    {
      id: 2,
      name: "Базовая функциональная",
      description: "Функциональные движения для развития силы",
      difficulty: "базовый",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Берпи", "Выпады", "Жим лежа", "Становая тяга"]
    },
    {
      id: 3,
      name: "Средняя интенсивность",
      description: "Комплексная тренировка средней сложности",
      difficulty: "средний",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Подтягивания", "Приседания с весом", "Жим штанги", "Планка"]
    },
    {
      id: 4,
      name: "Высокоинтенсивная",
      description: "Интенсивная тренировка для опытных",
      difficulty: "высокий",
      sessionsPerWeek: 4,
      type: 'ready',
      exercises: ["Кроссфит", "Олимпийские подъемы", "Плиометрика", "Тяжелые приседания"]
    },
    {
      id: 5,
      name: "Кардио базовый",
      description: "Кардиотренировка для начинающих",
      difficulty: "базовый",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Бег", "Велосипед", "Эллипс", "Скакалка"]
    },
    {
      id: 6,
      name: "Выносливость продвинутый",
      description: "Развитие выносливости для опытных",
      difficulty: "высокий",
      sessionsPerWeek: 4,
      type: 'ready',
      exercises: ["Интервальный бег", "Лыжи", "Гребля", "Функциональные движения"]
    }
  ];

  // Группировка упражнений по группам мышц
  const muscleGroups = useMemo(() => {
    const groups: { [key: string]: Exercise[] } = {};
    
    exercises.forEach(exercise => {
      const primaryMuscle = exercise.primaryMuscles?.[0]?.toLowerCase() || 'другое';
      if (!groups[primaryMuscle]) {
        groups[primaryMuscle] = [];
      }
      groups[primaryMuscle].push(exercise);
    });

    return Object.entries(groups).map(([name, exerciseList]) => ({
      name,
      exercises: exerciseList
    }));
  }, [exercises]);

  // Функции для работы с упражнениями
  const handleOpenExerciseSelector = () => {
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
    setShowExerciseSelector(true);
  };

  const handleSelectMuscleGroup = (groupName: string) => {
    setSelectedMuscleGroup(groupName);
  };

  const handleToggleExercise = (exerciseName: string) => {
    setSelectedExercises(prev => {
      if (prev.includes(exerciseName)) {
        return prev.filter(e => e !== exerciseName);
      } else {
        return [...prev, exerciseName];
      }
    });
  };

  const handleAddSelectedExercises = () => {
    if (selectedExercises.length === 0) return;
    
    setCustomWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, ...selectedExercises]
    }));
    
    setShowExerciseSelector(false);
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
  };

  const handleSaveWorkout = () => {
    if (!customWorkout.name.trim() || customWorkout.exercises.length === 0) return;

    toast({
      title: "План сохранен",
      description: `План "${customWorkout.name}" сохранен в готовые планы и доступен для использования`,
    });
    
    // Сброс формы после сохранения
    setCustomWorkout({
      name: '',
      level: 'начальный',
      totalSessions: 1,
      sessionsPerWeek: 3,
      startDate: null,
      startTime: '09:00',
      trainerNotes: '',
      exercises: [],
      timerEnabled: false
    });
  };

  const handleEditPlan = (plan: WorkoutPlan) => {
    setEditingPlan(plan);
    setEditedPlan({ ...plan });
    setShowEditDialog(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'начальный': return 'bg-green-100 text-green-800';
      case 'базовый': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'высокий': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тренировки</h1>
          <p className="text-gray-600">Управление планами тренировок и создание новых программ</p>
        </div>
      </div>

      <Tabs 
        value={currentWorkoutTab} 
        onValueChange={setCurrentWorkoutTab}
        defaultValue="ready-plans" 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ready-plans">Готовые планы</TabsTrigger>
          <TabsTrigger value="create-workout">Создать тренировку</TabsTrigger>
        </TabsList>

        {/* Готовые планы */}
        <TabsContent value="ready-plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readyPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className="transition-all duration-200 hover:shadow-lg hover:border-gray-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge className={getDifficultyColor(plan.difficulty)}>
                      {plan.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Упражнения:</div>
                    <div className="flex flex-wrap gap-1">
                      {plan.exercises?.slice(0, 3).map((exercise, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                      {plan.exercises && plan.exercises.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.exercises.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditPlan(plan);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Редактировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Создать тренировку */}
        <TabsContent value="create-workout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Создание тренировки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Основная информация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workout-name">Название тренировки</Label>
                  <Input
                    id="workout-name"
                    placeholder="Введите название"
                    value={customWorkout.name}
                    onChange={(e) => setCustomWorkout(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workout-level">Уровень сложности</Label>
                  <select 
                    value={customWorkout.level} 
                    onChange={(e) => setCustomWorkout(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="начальный">Начальный</option>
                    <option value="базовый">Базовый</option>
                    <option value="средний">Средний</option>
                    <option value="высокий">Высокий</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="workout-description">Описание (необязательно)</Label>
                <Textarea
                  id="workout-description"
                  placeholder="Краткое описание тренировки"
                  value={customWorkout.trainerNotes}
                  onChange={(e) => setCustomWorkout(prev => ({ ...prev, trainerNotes: e.target.value }))}
                />
              </div>

              {/* Упражнения */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Упражнения</h3>
                  <Button
                    variant="outline"
                    onClick={handleOpenExerciseSelector}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить упражнения
                  </Button>
                </div>
                
                {customWorkout.exercises && customWorkout.exercises.length > 0 ? (
                  <div className="space-y-2">
                    {customWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                        <span>{exercise}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newExercises = [...customWorkout.exercises];
                            newExercises.splice(index, 1);
                            setCustomWorkout(prev => ({ ...prev, exercises: newExercises }));
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded">
                    Упражнения не добавлены
                  </div>
                )}
              </div>

              {/* Кнопки действий */}
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCustomWorkout({
                      name: '',
                      level: 'начальный',
                      totalSessions: 1,
                      sessionsPerWeek: 3,
                      startDate: null,
                      startTime: '09:00',
                      trainerNotes: '',
                      exercises: [],
                      timerEnabled: false
                    });
                  }}
                >
                  Очистить
                </Button>
                <Button 
                  disabled={!customWorkout.name.trim() || customWorkout.exercises.length === 0}
                  onClick={handleSaveWorkout}
                >
                  Сохранить план
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактирования готового плана */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирование плана тренировки</DialogTitle>
            <DialogDescription>
              Измените параметры готового плана тренировки
            </DialogDescription>
          </DialogHeader>
          
          {editedPlan && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-plan-name">Название плана</Label>
                  <Input
                    id="edit-plan-name"
                    value={editedPlan.name}
                    onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-plan-difficulty">Уровень</Label>
                  <select 
                    value={editedPlan.difficulty} 
                    onChange={(e) => setEditedPlan({ ...editedPlan, difficulty: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="начальный">Начальный</option>
                    <option value="базовый">Базовый</option>
                    <option value="средний">Средний</option>
                    <option value="высокий">Высокий</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-plan-description">Описание</Label>
                <Textarea
                  id="edit-plan-description"
                  value={editedPlan.description}
                  onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditDialog(false)}
                >
                  Отмена
                </Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "План обновлен",
                      description: `План "${editedPlan.name}" успешно обновлен`,
                    });
                    setShowEditDialog(false);
                  }}
                >
                  Сохранить изменения
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог выбора упражнений */}
      <Dialog open={showExerciseSelector} onOpenChange={setShowExerciseSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить упражнения</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {!selectedMuscleGroup ? (
              // Выбор группы мышц
              <div>
                <h3 className="text-lg font-semibold mb-4">Выберите группу мышц</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {muscleGroups.map((group) => (
                    <Card 
                      key={group.name}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSelectMuscleGroup(group.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-lg font-medium capitalize">{group.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {group.exercises.length} упражнений
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              // Выбор упражнений из группы
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedMuscleGroup('')}
                  >
                    ← Назад
                  </Button>
                  <h3 className="text-lg font-semibold capitalize">{selectedMuscleGroup}</h3>
                </div>
                
                <div className="space-y-2">
                  {muscleGroups
                    .find(group => group.name === selectedMuscleGroup)
                    ?.exercises.map((exercise) => (
                      <div 
                        key={exercise.id}
                        className={`p-3 border rounded cursor-pointer transition-colors ${
                          selectedExercises.includes(exercise.name)
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleToggleExercise(exercise.name)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{exercise.name}</span>
                          {selectedExercises.includes(exercise.name) && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                
                {selectedExercises.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Выбрано упражнений: {selectedExercises.length}
                    </div>
                    <div className="text-xs text-blue-600">
                      {selectedExercises.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowExerciseSelector(false);
                setSelectedMuscleGroup('');
                setSelectedExercises([]);
              }}
            >
              Отмена
            </Button>
            <Button 
              disabled={selectedExercises.length === 0}
              onClick={handleAddSelectedExercises}
            >
              Добавить выбранные ({selectedExercises.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}