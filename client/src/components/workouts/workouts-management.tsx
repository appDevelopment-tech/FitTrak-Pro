import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dumbbell, Plus, Edit, Calendar as CalendarIcon, Clock, Target, CheckCircle, AlertCircle, Users, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import type { Exercise, Pupil, WorkoutProgram, User as UserType } from "@/../../shared/schema";

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
  const [editingPlan, setEditingPlan] = useState<WorkoutProgram | null>(null);
  const [editedPlan, setEditedPlan] = useState<WorkoutProgram | null>(null);
  const [showCalendarSelector, setShowCalendarSelector] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
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
  const queryClient = useQueryClient();

  // Загрузка данных пользователя и учеников
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1']
  });

  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['/api/trainers/1/pupils']
  });

  // Загрузка готовых планов тренировок из API
  const { data: workoutPrograms = [], isLoading: workoutProgramsLoading } = useQuery<WorkoutProgram[]>({
    queryKey: ['/api/workout-programs']
  });

  const trainerId = user?.id || 1;

  // Мутация для обновления планов тренировок
  const updateWorkoutProgramMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<WorkoutProgram> }) => {
      const response = await fetch(`/api/workout-programs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update workout program');
      }
      return response.json();
    },
    onSuccess: () => {
      // Инвалидируем кэш для workout programs
      queryClient.invalidateQueries({ queryKey: ['/api/workout-programs'] });
    },
  });

  const handleSelectPlan = (plan: WorkoutProgram) => {
    // Готовые планы больше не прикрепляются к ученикам
    // Они служат только как шаблоны для просмотра
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Высокий';
      default: return level;
    }
  };

  // Загрузка упражнений из API
  const { data: exercises = [], isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  // Группировка упражнений по группам мышц
  const muscleGroups = useMemo(() => {
    const groups: { [key: string]: Exercise[] } = {};
    
    exercises.forEach(exercise => {
      // Используем первую группу мышц из primaryMuscles как основную группу
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

  // Функции для редактирования готовых планов
  const handleEditPlan = (plan: WorkoutProgram) => {
    setEditingPlan(plan);
    setEditedPlan({ ...plan });
    setShowEditDialog(true);
  };

  const handleSaveEditedPlan = () => {
    if (!editedPlan) return;

    updateWorkoutProgramMutation.mutate(
      {
        id: editedPlan.id,
        updates: editedPlan,
      },
      {
        onSuccess: () => {
          toast({
            title: "Успешно",
            description: `План "${editedPlan.name}" обновлен`,
          });
          setShowEditDialog(false);
          setEditingPlan(null);
          setEditedPlan(null);
        },
        onError: () => {
          toast({
            title: "Ошибка",
            description: "Не удалось обновить план тренировки",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingPlan(null);
    setEditedPlan(null);
  };

  const handleOpenExerciseSelector = () => {
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
    setShowExerciseSelector(true);
  };

  const handleAddExercisesToCustomWorkout = () => {
    if (selectedExercises.length === 0) return;
    
    setCustomWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, ...selectedExercises]
    }));
    
    setShowExerciseSelector(false);
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
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
    
    if (editedPlan) {
      // For the database WorkoutProgram type, exercises is a JSONB field
      const currentExercises = Array.isArray(editedPlan.exercises) ? editedPlan.exercises : [];
      const newExercises = selectedExercises.map(name => ({ name }));
      setEditedPlan({
        ...editedPlan,
        exercises: [...currentExercises, ...newExercises]
      });
    } else {
      // Для создания новой тренировки
      setCustomWorkout(prev => ({
        ...prev,
        exercises: [...prev.exercises, ...selectedExercises]
      }));
    }
    
    setShowExerciseSelector(false);
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
  };

  const removeExerciseFromEditedPlan = (index: number) => {
    if (!editedPlan) return;
    const currentExercises = Array.isArray(editedPlan.exercises) ? editedPlan.exercises : [];
    const newExercises = [...currentExercises];
    newExercises.splice(index, 1);
    setEditedPlan({
      ...editedPlan,
      exercises: newExercises
    });
  };

  const moveExercise = (fromIndex: number, toIndex: number) => {
    if (!editedPlan) return;
    const currentExercises = Array.isArray(editedPlan.exercises) ? editedPlan.exercises : [];
    const newExercises = [...currentExercises];
    const [moved] = newExercises.splice(fromIndex, 1);
    newExercises.splice(toIndex, 0, moved);
    setEditedPlan({
      ...editedPlan,
      exercises: newExercises
    });
  };

  // Функции для создания кастомной тренировки
  const canConfirmSchedule = selectedDates.length === customWorkout.totalSessions;

  const handleCreateWorkout = () => {
    if (!canConfirmSchedule || !customWorkout.name.trim() || !customWorkout.startDate) return;

    // Здесь бы была логика создания тренировки
    toast({
      title: "Тренировка создана",
      description: `Тренировка "${customWorkout.name}" успешно создана`,
    });

    // Сбрасываем форму
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
    setSelectedDates([]);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !customWorkout.startDate) return;

    const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());
    
    if (isSelected) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
    } else if (selectedDates.length < customWorkout.totalSessions) {
      setSelectedDates(prev => [...prev, date].sort((a, b) => a.getTime() - b.getTime()));
    }
  };

  const handleConfirmDates = () => {
    setShowCalendarSelector(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Тренировки</h2>
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
          {workoutProgramsLoading ? (
            <div className="text-center py-8">
              <div className="text-lg">Загрузка планов тренировок...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workoutPrograms.map((program) => {
                const exercisesArray = Array.isArray(program.exercises) ? program.exercises : [];
                return (
                  <Card 
                    key={program.id} 
                    className="transition-all duration-200 hover:shadow-lg hover:border-gray-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <Badge className={getDifficultyColor(program.level)}>
                          {getLevelText(program.level)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <strong>{program.duration}</strong> мин
                        </span>
                        <span className="flex items-center gap-1">
                          Тип: <strong>{program.type}</strong>
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Упражнения:</h4>
                        <div className="flex flex-wrap gap-1">
                          {exercisesArray.slice(0, 3).map((exercise: any, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {exercise.name || exercise}
                            </Badge>
                          ))}
                          {exercisesArray.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{exercisesArray.length - 3}
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
                            handleEditPlan(program);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Редактировать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Создать тренировку */}
        <TabsContent value="create-workout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Создать индивидуальную тренировку
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
                  <Label htmlFor="workout-level">Уровень ученика</Label>
                  <Select value={customWorkout.level} onValueChange={(value) => setCustomWorkout(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger id="workout-level">
                      <SelectValue placeholder="Выберите уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="начальный">Начальный</SelectItem>
                      <SelectItem value="базовый">Базовый</SelectItem>
                      <SelectItem value="средний">Средний</SelectItem>
                      <SelectItem value="высокий">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* График тренировок */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">График тренировок</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="start-date">Дата первой тренировки</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={customWorkout.startDate ? customWorkout.startDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const newStartDate = e.target.value ? new Date(e.target.value) : null;
                        setCustomWorkout(prev => ({ 
                          ...prev, 
                          startDate: newStartDate
                        }));
                        
                        // Сбрасываем выбранные даты при изменении даты первой тренировки
                        if (newStartDate) {
                          setSelectedDates(selectedDates.filter(date => {
                            const dateOnly = new Date(date);
                            dateOnly.setHours(0, 0, 0, 0);
                            const startDateOnly = new Date(newStartDate);
                            startDateOnly.setHours(0, 0, 0, 0);
                            return dateOnly >= startDateOnly;
                          }));
                        }
                      }}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sessions-per-week">Тренировок в неделю</Label>
                    <Select 
                      value={customWorkout.sessionsPerWeek?.toString()} 
                      onValueChange={(value) => setCustomWorkout(prev => ({ ...prev, sessionsPerWeek: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 раз в неделю</SelectItem>
                        <SelectItem value="2">2 раза в неделю</SelectItem>
                        <SelectItem value="3">3 раза в неделю</SelectItem>
                        <SelectItem value="4">4 раза в неделю</SelectItem>
                        <SelectItem value="5">5 раз в неделю</SelectItem>
                        <SelectItem value="6">6 раз в неделю</SelectItem>
                        <SelectItem value="7">Ежедневно</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="total-sessions">Всего тренировок</Label>
                    <Input
                      id="total-sessions"
                      type="number"
                      min="1"
                      placeholder="Количество"
                      value={customWorkout.totalSessions}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, totalSessions: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                </div>

                {/* Выбор дней и времени */}
                <div className="space-y-3">
                  <Label>Дни и время тренировок</Label>
                  <Button
                    variant="outline"
                    onClick={() => setShowCalendarSelector(true)}
                    className="w-full"
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {selectedDates.length > 0 
                      ? `Выбрано дней: ${selectedDates.length} из ${customWorkout.totalSessions}` 
                      : 'Выберите дни в календаре'
                    }
                  </Button>
                  
                  {selectedDates.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-3 bg-gray-50">
                      {selectedDates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{date.toLocaleDateString('ru-RU')}</span>
                          <Input
                            type="time"
                            defaultValue={customWorkout.startTime}
                            className="w-24 h-8"
                            onChange={(e) => {
                              // Здесь можно сохранить индивидуальное время для каждой тренировки
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {customWorkout.totalSessions > selectedDates.length && (
                    <div className="text-sm text-amber-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Необходимо выбрать еще {customWorkout.totalSessions - selectedDates.length} дней
                    </div>
                  )}
                </div>
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

              {/* Дополнительные настройки */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Дополнительные настройки</h3>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <Label className="text-base font-medium">Таймер</Label>
                    <p className="text-sm text-muted-foreground">Включить таймер для отдыха между упражнениями</p>
                  </div>
                  <Button
                    variant={customWorkout.timerEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCustomWorkout(prev => ({ ...prev, timerEnabled: !prev.timerEnabled }))}
                  >
                    {customWorkout.timerEnabled ? "Включен" : "Выключен"}
                  </Button>
                </div>

                <div>
                  <Label htmlFor="trainer-notes">Заметки тренера</Label>
                  <Textarea
                    id="trainer-notes"
                    placeholder="Дополнительные заметки или инструкции..."
                    value={customWorkout.trainerNotes}
                    onChange={(e) => setCustomWorkout(prev => ({ ...prev, trainerNotes: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex justify-center gap-4 pt-4 border-t">
                <Button
                  variant="outline"
                  disabled={!canConfirmSchedule || !customWorkout.name.trim()}
                  onClick={() => {
                    // Функция для выбора ученика (перенаправляет на расписание)
                    window.location.href = '/cabinet?tab=schedule';
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Выбрать ученика
                </Button>
                
                <Button 
                  disabled={!canConfirmSchedule || !customWorkout.name.trim()}
                  onClick={() => {
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
                    setSelectedDates([]);
                  }}
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
                  <Label htmlFor="edit-plan-level">Уровень</Label>
                  <Select 
                    value={editedPlan.level} 
                    onValueChange={(value) => setEditedPlan({ ...editedPlan, level: value })}
                  >
                    <SelectTrigger id="edit-plan-level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Начальный</SelectItem>
                      <SelectItem value="intermediate">Средний</SelectItem>
                      <SelectItem value="advanced">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-plan-type">Тип тренировки</Label>
                  <Select 
                    value={editedPlan.type} 
                    onValueChange={(value) => setEditedPlan({ ...editedPlan, type: value })}
                  >
                    <SelectTrigger id="edit-plan-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Силовая</SelectItem>
                      <SelectItem value="cardio">Кардио</SelectItem>
                      <SelectItem value="functional">Функциональная</SelectItem>
                      <SelectItem value="stretching">Растяжка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-plan-duration">Продолжительность (мин)</Label>
                  <Input
                    id="edit-plan-duration"
                    type="number"
                    min="1"
                    value={editedPlan.duration}
                    onChange={(e) => setEditedPlan({ ...editedPlan, duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Упражнения</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenExerciseSelector}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Добавить упражнение
                  </Button>
                </div>
                <div className="space-y-2">
                  {(() => {
                    const exercisesArray = Array.isArray(editedPlan.exercises) ? editedPlan.exercises : [];
                    return exercisesArray.map((exercise: any, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => index > 0 && moveExercise(index, index - 1)}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => index < exercisesArray.length - 1 && moveExercise(index, index + 1)}
                            disabled={index === exercisesArray.length - 1}
                          >
                            ↓
                          </Button>
                        </div>
                        <div className="flex-1 p-2 border rounded bg-gray-50">
                          {exercise.name || exercise}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeExerciseFromEditedPlan(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Отмена
                </Button>
                <Button onClick={handleSaveEditedPlan}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог календаря */}
      <Dialog open={showCalendarSelector} onOpenChange={setShowCalendarSelector}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Выберите дни тренировок</DialogTitle>
            <DialogDescription>
              Выберите {customWorkout.totalSessions} дней для проведения тренировок
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => setSelectedDates(dates || [])}
              className="rounded-md border"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                // Если выбрана дата первой тренировки, не разрешать выбирать даты раньше неё
                if (customWorkout.startDate) {
                  const startDate = new Date(customWorkout.startDate);
                  startDate.setHours(0, 0, 0, 0);
                  return date < startDate;
                }
                
                // Иначе не разрешать выбирать даты раньше сегодняшнего дня
                return date < today;
              }}
            />
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowCalendarSelector(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button 
                onClick={() => setShowCalendarSelector(false)}
                className="flex-1"
                disabled={selectedDates.length === 0}
              >
                Подтвердить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог выбора упражнений */}
      <Dialog open={showExerciseSelector} onOpenChange={setShowExerciseSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить упражнения</DialogTitle>
            <DialogDescription>
              Выберите группу мышц, затем выберите упражнения для добавления в план
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {exercisesLoading ? (
              <div className="text-center py-8">
                <div className="text-lg">Загрузка упражнений...</div>
              </div>
            ) : !selectedMuscleGroup ? (
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
            {selectedMuscleGroup && selectedExercises.length > 0 && (
              <Button onClick={handleAddSelectedExercises}>
                Добавить выбранные ({selectedExercises.length})
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
}
