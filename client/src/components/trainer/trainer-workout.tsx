import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Play, Square, Timer, TrendingUp, Calendar, Clock, Zap, Heart, Target, Plus, Minus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Exercise, User as UserType, TrainerWorkout, InsertTrainerWorkout } from "@shared/schema";

interface ExerciseSet {
  reps: number;
  weight: number;
  restTime: number;
  completed: boolean;
}

interface WorkoutExercise {
  name: string;
  sets: ExerciseSet[];
  notes?: string;
}

export function TrainerWorkout() {
  const [activeWorkout, setActiveWorkout] = useState<Partial<InsertTrainerWorkout> | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Загрузка данных пользователя
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1']
  });

  // Загрузка упражнений
  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  // Загрузка истории тренировок тренера
  const { data: workoutHistory = [] } = useQuery<TrainerWorkout[]>({
    queryKey: ['/api/trainers/1/workouts'],
    enabled: !!user
  });

  // Создание новой тренировки
  const createWorkoutMutation = useMutation({
    mutationFn: async (data: InsertTrainerWorkout) => {
      return apiRequest(`/api/trainers/1/workouts`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/workouts'] });
      toast({
        title: "Тренировка сохранена!",
        description: "Ваша тренировка успешно записана в историю",
      });
    },
  });

  // Таймеры
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkoutActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            toast({
              title: "Отдых завершен!",
              description: "Время начинать следующий подход",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [restTimer, toast]);

  const startWorkout = () => {
    const now = new Date();
    const startTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setActiveWorkout({
      trainerId: 1,
      name: "Тренировка тренера",
      date: now.toISOString().split('T')[0],
      startTime,
      exercises: [],
      totalDuration: 0,
      calories: 0,
      notes: "",
      feeling: "хорошо",
      energy: 7,
      mood: "спокойное"
    });
    
    setIsWorkoutActive(true);
    setWorkoutTimer(0);
    setCurrentExerciseIndex(0);
    setCurrentSetIndex(0);
    
    toast({
      title: "Тренировка началась!",
      description: "Добавьте упражнения для начала тренировки",
    });
  };

  const endWorkout = () => {
    if (!activeWorkout) return;
    
    const now = new Date();
    const endTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const totalDuration = Math.floor(workoutTimer / 60);
    const estimatedCalories = Math.round(totalDuration * 8); // Приблизительно 8 калорий в минуту
    
    const workoutData: InsertTrainerWorkout = {
      ...activeWorkout,
      endTime,
      totalDuration,
      calories: estimatedCalories,
      exercises: activeWorkout.exercises || []
    } as InsertTrainerWorkout;
    
    createWorkoutMutation.mutate(workoutData);
    
    setActiveWorkout(null);
    setIsWorkoutActive(false);
    setWorkoutTimer(0);
    setRestTimer(0);
  };

  const addExerciseToWorkout = (exerciseName: string) => {
    if (!activeWorkout) return;
    
    const newExercise: WorkoutExercise = {
      name: exerciseName,
      sets: [{ reps: 10, weight: 0, restTime: 90, completed: false }],
      notes: ""
    };
    
    setActiveWorkout(prev => ({
      ...prev,
      exercises: [...(prev?.exercises || []), newExercise]
    }));
    
    setShowExerciseSelector(false);
    toast({
      title: "Упражнение добавлено",
      description: `${exerciseName} добавлено в тренировку`,
    });
  };

  const addSet = (exerciseIndex: number) => {
    if (!activeWorkout) return;
    
    const newSet: ExerciseSet = { reps: 10, weight: 0, restTime: 90, completed: false };
    const updatedExercises = [...(activeWorkout.exercises || [])];
    updatedExercises[exerciseIndex].sets.push(newSet);
    
    setActiveWorkout(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: number | boolean) => {
    if (!activeWorkout) return;
    
    const updatedExercises = [...(activeWorkout.exercises || [])];
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      [field]: value
    };
    
    setActiveWorkout(prev => ({
      ...prev,
      exercises: updatedExercises
    }));
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    updateSet(exerciseIndex, setIndex, 'completed', true);
    
    const restTime = (activeWorkout?.exercises?.[exerciseIndex]?.sets[setIndex]?.restTime || 90);
    setRestTimer(restTime);
    
    toast({
      title: "Подход завершен!",
      description: `Отдых ${restTime} секунд`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentExercise = activeWorkout?.exercises?.[currentExerciseIndex];
  const completedSets = currentExercise?.sets.filter(set => set.completed).length || 0;
  const totalSets = currentExercise?.sets.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Моя тренировка</h2>
        </div>
        {!isWorkoutActive ? (
          <Button onClick={startWorkout} className="bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Начать тренировку
          </Button>
        ) : (
          <Button onClick={endWorkout} variant="destructive">
            <Square className="h-4 w-4 mr-2" />
            Завершить тренировку
          </Button>
        )}
      </div>

      <Tabs defaultValue={isWorkoutActive ? "active" : "history"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Активная тренировка</TabsTrigger>
          <TabsTrigger value="history">История тренировок</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {isWorkoutActive && activeWorkout ? (
            <>
              {/* Информационная панель */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Время тренировки</p>
                        <p className="text-2xl font-bold">{formatTime(workoutTimer)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Упражнений</p>
                        <p className="text-2xl font-bold">{activeWorkout.exercises?.length || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Отдых</p>
                        <p className="text-2xl font-bold">{restTimer > 0 ? formatTime(restTimer) : "—"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Подходы</p>
                        <p className="text-2xl font-bold">{completedSets}/{totalSets}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Управление упражнениями */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Упражнения</CardTitle>
                    <Button onClick={() => setShowExerciseSelector(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить упражнение
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeWorkout.exercises?.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addSet(exerciseIndex)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {exercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium w-12">#{setIndex + 1}</span>
                            
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                placeholder="Повторы"
                                value={set.reps}
                                onChange={(e) => updateSet(exerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                                className="w-20 h-8"
                              />
                              <span className="text-xs text-muted-foreground">повт</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                placeholder="Вес"
                                value={set.weight}
                                onChange={(e) => updateSet(exerciseIndex, setIndex, 'weight', parseFloat(e.target.value) || 0)}
                                className="w-20 h-8"
                              />
                              <span className="text-xs text-muted-foreground">кг</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                placeholder="Отдых"
                                value={set.restTime}
                                onChange={(e) => updateSet(exerciseIndex, setIndex, 'restTime', parseInt(e.target.value) || 0)}
                                className="w-20 h-8"
                              />
                              <span className="text-xs text-muted-foreground">сек</span>
                            </div>
                            
                            <Button
                              size="sm"
                              variant={set.completed ? "default" : "outline"}
                              onClick={() => completeSet(exerciseIndex, setIndex)}
                              disabled={set.completed}
                            >
                              {set.completed ? <Check className="h-4 w-4" /> : "Выполнить"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {(!activeWorkout.exercises || activeWorkout.exercises.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      Добавьте упражнения для начала тренировки
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Готовы к тренировке?</h3>
                <p className="text-muted-foreground mb-4">Начните новую тренировку и отслеживайте свой прогресс</p>
                <Button onClick={startWorkout} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Начать тренировку
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutHistory.map((workout) => (
              <Card key={workout.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{workout.name}</CardTitle>
                    <Badge variant="outline">
                      {new Date(workout.date).toLocaleDateString('ru-RU')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{workout.startTime} - {workout.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      <span>{workout.totalDuration} мин</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>{workout.exercises.length} упражнений</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      <span>{workout.calories} ккал</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Самочувствие:</span>
                    <Badge variant={workout.feeling === 'отлично' ? 'default' : 'secondary'}>
                      {workout.feeling}
                    </Badge>
                  </div>
                  
                  {workout.notes && (
                    <p className="text-sm text-muted-foreground italic">
                      "{workout.notes}"
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {workoutHistory.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">История пуста</h3>
                <p className="text-muted-foreground">Проведите первую тренировку, чтобы увидеть историю</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Диалог выбора упражнений */}
      <Dialog open={showExerciseSelector} onOpenChange={setShowExerciseSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить упражнение</DialogTitle>
            <DialogDescription>
              Выберите упражнение для добавления в тренировку
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {exercises.map((exercise) => (
              <Card 
                key={exercise.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addExerciseToWorkout(exercise.name)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium">{exercise.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exercise.primaryMuscles?.map((muscle, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}