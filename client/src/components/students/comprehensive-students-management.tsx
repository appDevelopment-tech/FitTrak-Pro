import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  Heart, 
  Target, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Edit,
  FileText,
  Shield,
  Activity,
  Dumbbell,
  Trash2
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import type { Pupil, InsertPupil, WorkoutProgram, Exercise } from "@shared/schema";

interface PupilsStats {
  totalPupils: number;
  todayBookings: number;
  confirmedToday: number;
  pendingToday: number;
}

interface PupilWithAge extends Pupil {
  age: number;
  isMinor: boolean;
}

export function ComprehensiveStudentsManagement() {
  const [selectedPupil, setSelectedPupil] = useState<PupilWithAge | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showWorkoutPlanDialog, setShowWorkoutPlanDialog] = useState(false);
  const [selectedPupilForWorkout, setSelectedPupilForWorkout] = useState<PupilWithAge | null>(null);
  const [showCreateWorkoutDialog, setShowCreateWorkoutDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedPlanForSchedule, setSelectedPlanForSchedule] = useState<any>(null);
  const [scheduleData, setScheduleData] = useState({
    startDate: null as Date | null,
    startTime: '09:00',
    sessionsPerWeek: 3,
    totalSessions: 8,
    selectedDates: [] as Date[],
    trainerNotes: ''
  });
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
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [showCalendarSelector, setShowCalendarSelector] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isWorkoutActive, removeActiveWorkout, addActiveWorkout, getActiveWorkout, activeWorkouts, getWorkoutProgramName } = useActiveWorkout();
  
  const trainerId = 1; // В реальном приложении это будет из контекста пользователя

  // Готовые планы тренировок
  const readyPlans = [
    {
      id: 1,
      name: "Все тело",
      description: "Комплексная тренировка всех групп мышц за одну сессию",
      difficulty: "начальный",
      sessionsPerWeek: 3,
      exercises: ["Приседания", "Отжимания", "Подтягивания", "Планка"]
    },
    {
      id: 2,
      name: "Тяни-толкай",
      description: "Разделение на тянущие и толкающие движения",
      difficulty: "базовый",
      sessionsPerWeek: 4,
      exercises: ["Становая тяга", "Жим лежа", "Тяга штанги", "Жим стоя"]
    },
    {
      id: 3,
      name: "Верх-низ",
      description: "Разделение тренировок на верх и низ тела",
      difficulty: "средний",
      sessionsPerWeek: 4,
      exercises: ["Приседания", "Жим лежа", "Становая тяга", "Подтягивания"]
    },
    {
      id: 4,
      name: "Грудь-спина-ноги",
      description: "Классический трехдневный сплит по группам мышц",
      difficulty: "средний",
      sessionsPerWeek: 3,
      exercises: ["Жим лежа", "Тяга штанги", "Приседания", "Жим стоя", "Подъемы на бицепс"]
    },
    {
      id: 5,
      name: "Силовой марафон",
      description: "Интенсивная программа для опытных спортсменов",
      difficulty: "высокий",
      sessionsPerWeek: 5,
      exercises: ["Становая тяга", "Приседания со штангой", "Жим лежа", "Подтягивания с весом", "Жим стоя"]
    },
    {
      id: 6,
      name: "Грудь-трицепс / Спина-бицепс / Ноги-плечи-живот",
      description: "Классический трехдневный сплит по группам мышц",
      difficulty: "высокий",
      sessionsPerWeek: 3,
      exercises: ["Жим лежа", "Французский жим", "Тяга штанги", "Подъемы на бицепс", "Приседания", "Жим стоя"]
    }
  ];

  // Получаем статистику учеников
  const { data: stats } = useQuery<PupilsStats>({
    queryKey: ['/api/pupils/stats/1'],
  });

  // Получаем список учеников
  const { data: pupils = [], isLoading } = useQuery<Pupil[]>({
    queryKey: ['/api/trainers/1/pupils'],
  });

  // Получаем упражнения для создания кастомных тренировок
  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  // Вычисляем возраст и статус несовершеннолетия для каждого ученика
  const pupilsWithAge: PupilWithAge[] = pupils.map(pupil => {
    const birthDate = new Date(pupil.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) 
      ? age - 1 
      : age;

    return {
      ...pupil,
      age: actualAge,
      isMinor: actualAge < 16
    };
  });

  // Функция для открытия диалога выбора плана тренировки
  const handleAssignWorkout = (pupil: PupilWithAge) => {
    setSelectedPupilForWorkout(pupil);
    setShowWorkoutPlanDialog(true);
  };

  // Функция для прикрепления плана тренировки к ученику
  const handleSelectPlan = (plan: any) => {
    setSelectedPlanForSchedule(plan);
    setScheduleData({
      startDate: null,
      startTime: '09:00',
      sessionsPerWeek: plan.sessionsPerWeek || 3,
      totalSessions: 8,
      selectedDates: [],
      trainerNotes: ''
    });
    setShowWorkoutPlanDialog(false);
    setShowScheduleDialog(true);
  };

  // Функция подтверждения расписания для готового плана
  const handleConfirmSchedule = async () => {
    if (!selectedPupilForWorkout || !selectedPlanForSchedule) return;

    try {
      // Сохраняем план в базе данных
      const response = await fetch(`/api/pupils/${selectedPupilForWorkout.id}/training-plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerId: trainerId,
          name: selectedPlanForSchedule.name,
          exercises: selectedPlanForSchedule.exercises || [],
          isActive: true,
          scheduleData: scheduleData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save training plan');
      }

      const savedPlan = await response.json();

      // Добавляем в локальное состояние с ID из базы данных
      const workoutProgram: WorkoutProgram = {
        id: savedPlan.id,
        name: selectedPlanForSchedule.name,
        level: selectedPlanForSchedule.difficulty,
        exercises: selectedPlanForSchedule.exercises || [],
        type: 'strength',
        duration: selectedPlanForSchedule.sessionsPerWeek,
        createdBy: trainerId,
      };

      addActiveWorkout(trainerId, selectedPupilForWorkout, workoutProgram);

      toast({
        title: "План прикреплен!",
        description: `План "${selectedPlanForSchedule.name}" прикреплен к ученику ${selectedPupilForWorkout.firstName} ${selectedPupilForWorkout.lastName}`,
      });

      // Закрываем все диалоги и сбрасываем состояние
      setShowScheduleDialog(false);
      setSelectedPupilForWorkout(null);
      setSelectedPlanForSchedule(null);
      setScheduleData({
        startDate: null,
        startTime: '09:00',
        sessionsPerWeek: 3,
        totalSessions: 8,
        selectedDates: [],
        trainerNotes: ''
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось прикрепить план тренировки",
        variant: "destructive",
      });
    }
  };

  // Функция для создания кастомной тренировки
  const handleCreateCustomWorkout = () => {
    setShowWorkoutPlanDialog(false);
    setShowCreateWorkoutDialog(true);
  };

  // Функция для сохранения кастомной тренировки
  const handleSaveCustomWorkout = async () => {
    if (!selectedPupilForWorkout || !customWorkout.name.trim()) return;

    try {
      // Сохраняем план в базе данных
      const response = await fetch(`/api/pupils/${selectedPupilForWorkout.id}/training-plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainerId: trainerId,
          name: customWorkout.name,
          exercises: customWorkout.exercises,
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save training plan');
      }

      const savedPlan = await response.json();

      // Добавляем в локальное состояние с ID из базы данных
      const workoutProgram: WorkoutProgram = {
        id: savedPlan.id,
        name: customWorkout.name,
        level: customWorkout.level,
        exercises: customWorkout.exercises,
        type: 'strength',
        duration: customWorkout.sessionsPerWeek,
        createdBy: trainerId,
      };

      addActiveWorkout(trainerId, selectedPupilForWorkout, workoutProgram);

      toast({
        title: "Тренировка создана!",
        description: `Кастомная тренировка "${customWorkout.name}" прикреплена к ученику ${selectedPupilForWorkout.firstName} ${selectedPupilForWorkout.lastName}`,
      });

      // Сброс состояний
      setShowCreateWorkoutDialog(false);
      setSelectedPupilForWorkout(null);
      setCustomWorkout({
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
      setSelectedExercises([]);
      setSelectedDates([]);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать тренировку",
        variant: "destructive",
      });
    }
  };

  // Группировка упражнений по группам мышц
  const muscleGroups = React.useMemo(() => {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'начальный': return 'bg-green-100 text-green-800';
      case 'базовый': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'высокий': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Фильтрация учеников по поисковому запросу
  const filteredPupils = pupilsWithAge
    .filter(pupil =>
      `${pupil.firstName} ${pupil.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pupil.phone.includes(searchTerm)
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName, 'ru'));

  // Мутация для создания ученика
  const createPupilMutation = useMutation({
    mutationFn: async (newPupil: InsertPupil) => {
      const response = await fetch('/api/pupils', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPupil)
      });
      if (!response.ok) throw new Error('Failed to create pupil');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/pupils'] });
      queryClient.invalidateQueries({ queryKey: ['/api/pupils/stats/1'] });
      setShowAddDialog(false);
      toast({
        title: "Успешно",
        description: "Ученик добавлен",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить ученика",
        variant: "destructive",
      });
    }
  });

  // Мутация для обновления ученика
  const updatePupilMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<InsertPupil> }) => {
      const response = await fetch(`/api/pupils/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update pupil');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/pupils'] });
      setShowEditDialog(false);
      setSelectedPupil(null);
      toast({
        title: "Успешно",
        description: "Данные ученика обновлены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные ученика",
        variant: "destructive",
      });
    }
  });

  const handlePupilClick = (pupil: PupilWithAge) => {
    setSelectedPupil(pupil);
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDocumentStatus = (pupil: PupilWithAge) => {
    const statuses = [];
    
    if (pupil.applicationSubmitted) {
      statuses.push({ label: "Заявление", status: "submitted", date: pupil.applicationDate });
    }
    
    if (pupil.rulesAccepted) {
      statuses.push({ label: "Согласие с правилами", status: "accepted", date: pupil.rulesAcceptedDate });
    }
    
    if (pupil.isMinor && pupil.parentalConsent) {
      statuses.push({ label: "Согласие родителей", status: "accepted", date: pupil.parentalConsentDate });
    }
    
    return statuses;
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Всего учеников</p>
              <p className="text-2xl font-bold">{stats?.totalPupils ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CalendarIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Записано на сегодня</p>
              <p className="text-2xl font-bold">{stats?.todayBookings ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Подтвердили</p>
              <p className="text-2xl font-bold">{stats?.confirmedToday ?? 0}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Ожидают подтверждения</p>
              <p className="text-2xl font-bold">{stats?.pendingToday ?? 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Поиск и добавление */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Поиск по имени или телефону..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить ученика
        </Button>
      </div>

      {/* Список учеников */}
      <div className="grid grid-cols-1 gap-2">
        {filteredPupils.map((pupil) => (
          <Card 
            key={pupil.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePupilClick(pupil)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {filteredPupils.findIndex(p => p.id === pupil.id) + 1}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium text-sm">
                      {pupil.lastName} {pupil.firstName} • {pupil.age} лет • {pupil.phone}
                    </div>
                    {isWorkoutActive(trainerId, pupil.id) && (
                      <div className="text-xs text-orange-600 font-medium">
                        План: {getActiveWorkout(trainerId, pupil.id)?.workoutProgram?.name || 'Активная тренировка'}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {pupil.isMinor && (
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Несовершеннолетний
                    </Badge>
                  )}
                  {pupil.medicalNotes && 
                   pupil.medicalNotes.trim() !== '' && 
                   !pupil.medicalNotes.toLowerCase().includes('здоров') &&
                   !pupil.medicalNotes.toLowerCase().includes('ограничений нет') && (
                    <Badge variant="destructive" className="text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      Ограничения
                    </Badge>
                  )}
                  
                  {/* Кнопки управления тренировками */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isWorkoutActive(trainerId, pupil.id)) {
                          // Переход к активной тренировке
                          toast({
                            title: "Открытие тренировки",
                            description: `Открываем активную тренировку для ${pupil.firstName} ${pupil.lastName}`,
                          });
                        } else {
                          // Прикрепить новый план
                          handleAssignWorkout(pupil);
                        }
                      }}
                      className={`h-8 w-8 p-0 transition-colors ${
                        isWorkoutActive(trainerId, pupil.id)
                          ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                      title={isWorkoutActive(trainerId, pupil.id) 
                        ? `Активная тренировка: ${getWorkoutProgramName(trainerId, pupil.id) || 'Неизвестный план'}`
                        : "Прикрепить тренировочный план"}
                    >
                      <Dumbbell className="h-4 w-4" />
                    </Button>
                    
                    {/* Кнопка удаления плана - показывается только при активной тренировке */}
                    {isWorkoutActive(trainerId, pupil.id) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={async (e) => {
                          e.stopPropagation();
                          
                          const activeWorkout = getActiveWorkout(trainerId, pupil.id);
                          const programName = getWorkoutProgramName(trainerId, pupil.id);
                          
                          if (!activeWorkout) return;
                          
                          // Подтверждение удаления
                          const confirmed = window.confirm(
                            `Удалить план "${programName || 'Тренировка'}" у ${pupil.firstName} ${pupil.lastName}?\n\nЭто действие нельзя отменить.`
                          );
                          
                          if (!confirmed) return;
                          
                          try {
                            // Удаляем план тренировки через API
                            const response = await fetch(`/api/training-plans/${activeWorkout.id}`, {
                              method: 'DELETE',
                            });
                            
                            if (response.ok) {
                              // Удаляем из локального состояния activeWorkouts
                              removeActiveWorkout(trainerId, pupil.id);
                              
                              toast({
                                title: "План удален",
                                description: `План "${programName || 'Тренировка'}" удален у ${pupil.firstName} ${pupil.lastName}`,
                              });
                            } else {
                              throw new Error('Failed to delete training plan');
                            }
                          } catch (error) {
                            toast({
                              title: "Ошибка",
                              description: "Не удалось удалить план тренировки",
                              variant: "destructive",
                            });
                          }
                        }}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Удалить план тренировки"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Диалог с профилем ученика */}
      <Dialog open={!!selectedPupil} onOpenChange={() => setSelectedPupil(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Профиль ученика
            </DialogTitle>
          </DialogHeader>
          
          {selectedPupil && (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Профиль</TabsTrigger>
                <TabsTrigger value="workouts">Тренировки</TabsTrigger>
                <TabsTrigger value="progress">Прогресс</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedPupil.photo || undefined} />
                    <AvatarFallback className="text-2xl">
                      {selectedPupil.firstName.charAt(0)}{selectedPupil.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedPupil.firstName} {selectedPupil.lastName} {selectedPupil.middleName}
                      </h2>
                      <p className="text-muted-foreground">{selectedPupil.age} лет</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedPupil.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedPupil.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Дата рождения: {formatDate(selectedPupil.birthDate)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {selectedPupil.weight && (
                          <div>Вес: {selectedPupil.weight} кг</div>
                        )}
                        {selectedPupil.height && (
                          <div>Рост: {selectedPupil.height} см</div>
                        )}
                        <div>Статус: {selectedPupil.status === 'active' ? 'Активен' : 'Неактивен'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Цели тренировок
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {selectedPupil.goal || "Цели не указаны"}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Ограничения по здоровью
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {selectedPupil.medicalNotes || "Ограничений нет"}
                    </p>
                  </div>
                  
                  {selectedPupil.isMinor && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Контакты родителей/опекунов
                        </h3>
                        <div className="mt-2 space-y-2">
                          <div>
                            ФИО: {selectedPupil.parentFirstName} {selectedPupil.parentLastName} {selectedPupil.parentMiddleName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{selectedPupil.parentPhone}</span>
                          </div>
                          {selectedPupil.parentEmail && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{selectedPupil.parentEmail}</span>
                            </div>
                          )}
                          {selectedPupil.parentSpecialInstructions && (
                            <div>
                              <p className="font-medium">Особые указания:</p>
                              <p className="text-muted-foreground">{selectedPupil.parentSpecialInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="workouts" className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Программы тренировок
                </h3>
                
                {/* Показываем прикрепленные планы тренировок */}
                {activeWorkouts.filter(workout => workout.pupilId === selectedPupil?.id).length > 0 ? (
                  <div className="space-y-4">
                    {activeWorkouts
                      .filter(workout => workout.pupilId === selectedPupil?.id)
                      .map((workout) => (
                        <Card key={workout.id} className="border border-orange-200 bg-orange-50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-orange-800">{workout.name}</h4>
                                <div className="flex gap-4 text-sm text-orange-700">
                                  <span>Уровень: {workout.level}</span>
                                  <span>Продолжительность: {workout.duration} недель</span>
                                </div>
                                <p className="text-sm text-orange-600">
                                  Статус: <Badge className="bg-orange-600 text-white">Активная</Badge>
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    // Удаляем план тренировки через API
                                    const response = await fetch(`/api/training-plans/${workout.id}`, {
                                      method: 'DELETE',
                                    });
                                    
                                    if (response.ok) {
                                      // Удаляем из локального состояния activeWorkouts
                                      removeActiveWorkout(workout.trainerId, workout.pupilId);
                                      
                                      toast({
                                        title: "План удален",
                                        description: `План "${workout.name}" успешно удален у ${selectedPupil?.firstName} ${selectedPupil?.lastName}`,
                                      });
                                    } else {
                                      throw new Error('Failed to delete training plan');
                                    }
                                  } catch (error) {
                                    toast({
                                      title: "Ошибка",
                                      description: "Не удалось удалить план тренировки",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Удалить
                              </Button>
                            </div>
                            
                            {workout.exercises && workout.exercises.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-orange-200">
                                <p className="text-sm font-medium text-orange-800 mb-2">Упражнения:</p>
                                <div className="flex flex-wrap gap-2">
                                  {workout.exercises.slice(0, 3).map((exercise, index) => (
                                    <Badge key={index} variant="outline" className="text-orange-700 border-orange-300">
                                      {exercise}
                                    </Badge>
                                  ))}
                                  {workout.exercises.length > 3 && (
                                    <Badge variant="outline" className="text-orange-700 border-orange-300">
                                      +{workout.exercises.length - 3} еще
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    }
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        У {selectedPupil?.firstName} пока нет прикрепленных программ тренировок
                      </p>
                      <Button
                        onClick={() => {
                          if (selectedPupil) {
                            handleAssignWorkout(selectedPupil);
                            setShowStudentDialog(false);
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Прикрепить план тренировки
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  История тренировок и результаты
                </h3>
                
                <Card>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">История тренировок пока пуста</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Документы и согласия
                </h3>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Заявление на обучение</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedPupil.applicationSubmitted 
                              ? `Подано: ${selectedPupil.applicationDate ? formatDate(selectedPupil.applicationDate) : 'Дата неизвестна'}`
                              : 'Не подано'
                            }
                          </p>
                        </div>
                        <Badge variant={selectedPupil.applicationSubmitted ? "default" : "secondary"}>
                          {selectedPupil.applicationSubmitted ? "Подано" : "Не подано"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Согласие с правилами</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedPupil.rulesAccepted 
                              ? `Принято: ${selectedPupil.rulesAcceptedDate ? formatDate(selectedPupil.rulesAcceptedDate) : 'Дата неизвестна'}`
                              : 'Не принято'
                            }
                          </p>
                        </div>
                        <Badge variant={selectedPupil.rulesAccepted ? "default" : "secondary"}>
                          {selectedPupil.rulesAccepted ? "Принято" : "Не принято"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {selectedPupil.isMinor && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Согласие родителей</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedPupil.parentalConsent 
                                ? `Получено: ${selectedPupil.parentalConsentDate ? formatDate(selectedPupil.parentalConsentDate) : 'Дата неизвестна'}`
                                : 'Не получено'
                              }
                            </p>
                          </div>
                          <Badge variant={selectedPupil.parentalConsent ? "default" : "destructive"}>
                            {selectedPupil.parentalConsent ? "Получено" : "Требуется"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог выбора плана тренировки */}
      <Dialog open={showWorkoutPlanDialog} onOpenChange={setShowWorkoutPlanDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Выбор плана тренировки
            </DialogTitle>
          </DialogHeader>
          
          {selectedPupilForWorkout && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <User className="h-5 w-5" />
                  <span className="font-medium">
                    Выбран ученик: {selectedPupilForWorkout.firstName} {selectedPupilForWorkout.lastName}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Выберите план тренировки для прикрепления
                </p>
              </div>

              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={handleCreateCustomWorkout}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Создать тренировку
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className="transition-all duration-200 hover:shadow-lg hover:border-blue-300 cursor-pointer"
                    onClick={() => handleSelectPlan(plan)}
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
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <strong>{plan.sessionsPerWeek}</strong> раз/неделю
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Упражнения:</h4>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог создания кастомной тренировки */}
      <Dialog open={showCreateWorkoutDialog} onOpenChange={setShowCreateWorkoutDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Создание тренировки
            </DialogTitle>
          </DialogHeader>
          
          {selectedPupilForWorkout && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <User className="h-5 w-5" />
                  <span className="font-medium">
                    Создание тренировки для: {selectedPupilForWorkout.firstName} {selectedPupilForWorkout.lastName}
                  </span>
                </div>
              </div>

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
                  <Select value={customWorkout.level} onValueChange={(value) => setCustomWorkout(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
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

                {/* Кнопка выбора дат */}
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
                    <div className="text-sm text-green-600">
                      ✓ Выбрано {selectedDates.length} дней для тренировок
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="workout-description">Заметки тренера (необязательно)</Label>
                <Textarea
                  id="workout-description"
                  placeholder="Дополнительные указания для ученика"
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
                  onClick={() => setShowCreateWorkoutDialog(false)}
                >
                  Отмена
                </Button>
                <Button 
                  disabled={!customWorkout.name.trim() || customWorkout.exercises.length === 0}
                  onClick={handleSaveCustomWorkout}
                >
                  Создать и прикрепить
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

      {/* Диалог выбора расписания для готового плана */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Настройка расписания тренировок
            </DialogTitle>
          </DialogHeader>
          
          {selectedPupilForWorkout && selectedPlanForSchedule && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <User className="h-5 w-5" />
                  <span className="font-medium">
                    {selectedPupilForWorkout.firstName} {selectedPupilForWorkout.lastName}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  План: <strong>{selectedPlanForSchedule.name}</strong>
                </p>
              </div>

              {/* Основные настройки */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start-date">Дата первой тренировки</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={scheduleData.startDate ? scheduleData.startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const newStartDate = e.target.value ? new Date(e.target.value) : null;
                      setScheduleData(prev => ({ 
                        ...prev, 
                        startDate: newStartDate,
                        selectedDates: [] // Сбрасываем выбранные даты
                      }));
                    }}
                  />
                </div>
                
                <div>
                  <Label htmlFor="start-time">Время тренировок</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={scheduleData.startTime}
                    onChange={(e) => setScheduleData(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="sessions-per-week">Тренировок в неделю</Label>
                  <Select 
                    value={scheduleData.sessionsPerWeek?.toString()} 
                    onValueChange={(value) => setScheduleData(prev => ({ ...prev, sessionsPerWeek: parseInt(value) }))}
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
              </div>

              <div>
                <Label htmlFor="total-sessions">Всего тренировок</Label>
                <Input
                  id="total-sessions"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="Количество"
                  value={scheduleData.totalSessions}
                  onChange={(e) => setScheduleData(prev => ({ ...prev, totalSessions: parseInt(e.target.value) || 1 }))}
                />
              </div>

              {/* Выбор конкретных дат */}
              <div className="space-y-3">
                <Label>Конкретные дни тренировок (необязательно)</Label>
                <Button
                  variant="outline"
                  onClick={() => setShowCalendarSelector(true)}
                  className="w-full"
                  disabled={!scheduleData.startDate}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {scheduleData.selectedDates.length > 0 
                    ? `Выбрано дней: ${scheduleData.selectedDates.length}` 
                    : 'Выберите конкретные дни'
                  }
                </Button>
                
                {!scheduleData.startDate && (
                  <p className="text-sm text-red-500">Сначала выберите дату первой тренировки</p>
                )}
                
                {scheduleData.selectedDates.length > 0 && (
                  <div className="text-sm text-green-600">
                    ✓ Выбрано {scheduleData.selectedDates.length} дней для тренировок
                  </div>
                )}
              </div>

              {/* Заметки тренера */}
              <div>
                <Label htmlFor="trainer-notes">Заметки тренера (необязательно)</Label>
                <Textarea
                  id="trainer-notes"
                  placeholder="Дополнительные указания для ученика"
                  value={scheduleData.trainerNotes}
                  onChange={(e) => setScheduleData(prev => ({ ...prev, trainerNotes: e.target.value }))}
                />
              </div>

              {/* Кнопки */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowScheduleDialog(false)} className="flex-1">
                  Отмена
                </Button>
                <Button 
                  onClick={handleConfirmSchedule}
                  disabled={!scheduleData.startDate}
                  className="flex-1"
                >
                  Прикрепить план
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог календаря */}
      <Dialog open={showCalendarSelector} onOpenChange={setShowCalendarSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Выберите дни тренировок</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {showScheduleDialog ? (
                `Выберите конкретные дни для тренировок (всего планируется: ${scheduleData.totalSessions})`
              ) : (
                `Нужно выбрать ${customWorkout.totalSessions} дней`
              )}
            </div>
            
            <Calendar
              mode="multiple"
              selected={showScheduleDialog ? scheduleData.selectedDates : selectedDates}
              onSelect={(dates) => {
                if (showScheduleDialog) {
                  setScheduleData(prev => ({ ...prev, selectedDates: dates || [] }));
                } else {
                  setSelectedDates(dates || []);
                }
              }}
              disabled={(date) => {
                const startDate = showScheduleDialog ? scheduleData.startDate : customWorkout.startDate;
                if (!startDate) return date < new Date();
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const currentDate = new Date(date);
                currentDate.setHours(0, 0, 0, 0);
                return currentDate < start;
              }}
              className="rounded-md border"
            />
            
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-muted-foreground">
                {showScheduleDialog ? (
                  `Выбрано: ${scheduleData.selectedDates.length} дней`
                ) : (
                  `Выбрано: ${selectedDates.length} из ${customWorkout.totalSessions}`
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCalendarSelector(false)}>
                  Готово
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}