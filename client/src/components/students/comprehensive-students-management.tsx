import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertPupilSchema, updatePupilSchema } from "@shared/schema";
import { 
  User, 
  Phone, 
  Mail, 
  Heart, 
  Target, 
  AlertTriangle,
  Plus,
  Edit,
  FileText,
  Shield,
  Activity,
  Dumbbell,
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle
} from "lucide-react";
import { studentsDb, exercisesDb, trainingPlansDb } from "@/lib/database";
import { studentsAPI } from "@/lib/api";
import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import { useAuth } from "@/lib/auth";
import type { Pupil, InsertPupil, WorkoutProgram, Exercise } from "@shared/schema";
import { ProfileView } from "@/components/profile/profile-view";

interface PupilWithAge extends Pupil {
  age: number;
  isMinor: boolean;
}

interface ComprehensiveStudentsManagementProps {
  onSelectStudent?: (student: PupilWithAge) => void;
}

export function ComprehensiveStudentsManagement({ onSelectStudent }: ComprehensiveStudentsManagementProps) {
  const [selectedPupil, setSelectedPupil] = useState<PupilWithAge | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showWorkoutPlanDialog, setShowWorkoutPlanDialog] = useState(false);
  const [selectedPupilForWorkout, setSelectedPupilForWorkout] = useState<PupilWithAge | null>(null);
  const [showCreateWorkoutDialog, setShowCreateWorkoutDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedPlanForSchedule, setSelectedPlanForSchedule] = useState<any>(null);
  const [showActiveWorkoutDialog, setShowActiveWorkoutDialog] = useState(false);
  const [selectedActiveWorkout, setSelectedActiveWorkout] = useState<any>(null);
  const [scheduleData, setScheduleData] = useState({
    startDate: null as Date | null,
    startTime: '09:00',
    sessionsPerWeek: 3,
    totalSessions: 8,
    selectedDates: [] as Date[],
    dateTimes: {} as Record<string, string>, // Время для каждой конкретной даты
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

  // Get the trainer ID from the authenticated user
  const { user: authUser } = useAuth();
  const trainerId = authUser?.id || '2e6d1673-205a-4200-bc04-249dc2af269b';

  // Form configurations
  const addPupilForm = useForm({
    resolver: zodResolver(insertPupilSchema),
    defaultValues: {
      trainerId: trainerId, // Use authenticated user's ID
      firstName: "",
      lastName: "",
      password: "", // Required password for new pupils
      middleName: "",
      phone: "",
      email: "",
      birthDate: "",
      weight: null,
      height: null,
      goal: "",
      medicalNotes: "",
      status: "active",
      joinDate: new Date().toISOString().split('T')[0],
      // applicationSubmitted: true,
      // applicationDate: new Date().toISOString().split('T')[0],
      // rulesAccepted: true,
      // rulesAcceptedDate: new Date().toISOString().split('T')[0],
      parentalConsent: false,
    }
  });

  const editPupilForm = useForm<Partial<InsertPupil>>({
    resolver: zodResolver(updatePupilSchema),
  });

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

  // Получаем список учеников текущего тренера
  const { data: pupils = [], isLoading, error, refetch } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trainers/${trainerId}/pupils`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch pupils:', response.status, errorText);
          throw new Error(`Failed to fetch pupils: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching pupils:', error);
        throw error;
      }
    },
    enabled: !!trainerId, // Only run query if we have a trainer ID
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  // Получаем упражнения для создания кастомных тренировок
  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: () => exercisesDb.getAll(),
  });

  // Вычисляем возраст и статус несовершеннолетия для каждого ученика
  const pupilsWithAge: PupilWithAge[] = (pupils || []).map((pupil: Pupil) => {
    // Validate birth date before calculation
    if (!pupil.birthDate || isNaN(new Date(pupil.birthDate).getTime())) {
      return {
        ...pupil,
        age: 0,
        isMinor: false
      };
    }

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
      dateTimes: {},
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
      const savedPlan = await trainingPlansDb.create({
        trainerId: trainerId,
        pupilId: selectedPupilForWorkout.id,
        name: selectedPlanForSchedule.name,
        exercises: selectedPlanForSchedule.exercises || [],
        isActive: true,
      });

      // Добавляем в локальное состояние с ID из базы данных
      const workoutProgram: WorkoutProgram = {
        id: savedPlan.id,
        name: selectedPlanForSchedule.name,
        level: selectedPlanForSchedule.difficulty,
        exercises: selectedPlanForSchedule.exercises || [] as any,
        type: 'strength',
        duration: selectedPlanForSchedule.sessionsPerWeek,
        createdBy: trainerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addActiveWorkout(trainerId, selectedPupilForWorkout, workoutProgram);

      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });

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
        dateTimes: {},
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
      const savedPlan = await trainingPlansDb.create({
        trainerId: trainerId,
        pupilId: selectedPupilForWorkout.id,
        name: customWorkout.name,
        exercises: JSON.stringify(customWorkout.exercises),
        isActive: true,
      });

      // Добавляем в локальное состояние с ID из базы данных
      const workoutProgram: WorkoutProgram = {
        id: savedPlan.id,
        name: customWorkout.name,
        level: customWorkout.level,
        exercises: JSON.stringify(customWorkout.exercises) as any,
        type: 'strength',
        duration: customWorkout.sessionsPerWeek,
        createdBy: trainerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      addActiveWorkout(trainerId, selectedPupilForWorkout, workoutProgram);

      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });

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
  const muscleGroups = useMemo(() => {
    const groups: { [key: string]: Exercise[] } = {};
    
    exercises.forEach(exercise => {
      const primaryMusclesArray = (exercise.primaryMuscles as string[] | null) || [];
      const primaryMuscle = primaryMusclesArray[0]?.toLowerCase() || 'другое';
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
  const handleOpenExerciseSelector = useCallback(() => {
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
    setShowExerciseSelector(true);
  }, []);

  const handleSelectMuscleGroup = useCallback((groupName: string) => {
    setSelectedMuscleGroup(groupName);
  }, []);

  const handleToggleExercise = useCallback((exerciseName: string) => {
    setSelectedExercises(prev => {
      if (prev.includes(exerciseName)) {
        return prev.filter(e => e !== exerciseName);
      } else {
        return [...prev, exerciseName];
      }
    });
  }, []);

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
  const filteredPupils = useMemo(() => {
    return pupilsWithAge
      .filter(pupil =>
        `${pupil.firstName} ${pupil.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pupil.phone.includes(searchTerm)
      )
      .sort((a, b) => (a.lastName || '').localeCompare(b.lastName || '', 'ru'));
  }, [pupilsWithAge, searchTerm]);

  // Мутация для создания ученика
  const createPupilMutation = useMutation({
    mutationFn: async (newPupil: InsertPupil) => {
      const response = await fetch(`/api/trainers/${trainerId}/pupils`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPupil),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create pupil');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
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
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<InsertPupil> }) => {
      const response = await fetch(`/api/pupils/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update pupil');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
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

  // Мутация для удаления ученика
  const deletePupilMutation = useMutation({
    mutationFn: async (pupilId: string) => {
      return await studentsAPI.delete(pupilId);
    },
    onSuccess: (_, pupilId) => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
      setSelectedPupil(null);
      toast({
        title: "Успешно",
        description: "Ученик удален",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить ученика",
        variant: "destructive",
      });
    }
  });

  // Form submission handlers
  const onAddPupil = (data: any) => {
    createPupilMutation.mutate(data as InsertPupil);
  };

  const onEditPupil = (data: Partial<InsertPupil>) => {
    if (!selectedPupil) return;
    updatePupilMutation.mutate({ id: selectedPupil.id, updates: data });
  };

  const onDeletePupil = (pupilId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого ученика? Это действие нельзя отменить.')) {
      deletePupilMutation.mutate(pupilId);
    }
  };

  // Effect to update trainerId in the form when it changes
  useEffect(() => {
    if (trainerId) {
      addPupilForm.setValue('trainerId', trainerId);
    }
  }, [trainerId, addPupilForm]);

  // Effect to auto-refresh pupils data if empty on mount
  useEffect(() => {
    if (trainerId && pupils.length === 0 && !isLoading && !error) {
      console.log('🔄 Auto-refreshing pupils data on mount');
      refetch();
    }
  }, [trainerId, pupils.length, isLoading, error, refetch]);

  // Effect to populate edit form when selectedPupil changes
  useEffect(() => {
    if (selectedPupil && showEditDialog) {
      editPupilForm.reset({
        firstName: selectedPupil.firstName,
        lastName: selectedPupil.lastName,
        middleName: selectedPupil.middleName || "",
        phone: selectedPupil.phone,
        email: selectedPupil.email,
        birthDate: selectedPupil.birthDate,
        weight: selectedPupil.weight,
        height: selectedPupil.height,
        goal: selectedPupil.goal || "",
        medicalNotes: selectedPupil.medicalNotes || "",
      });
    }
  }, [selectedPupil, showEditDialog, editPupilForm]);

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
    const statuses: Array<{label: string, status: string, date?: string}> = [];
    
    // if (pupil.applicationSubmitted) {
    //   statuses.push({ label: "Заявление", status: "submitted", date: pupil.applicationDate });
    // }
    
    // if (pupil.rulesAccepted) {
    //   statuses.push({ label: "Согласие с правилами", status: "accepted", date: pupil.rulesAcceptedDate });
    // }
    
    // if (pupil.isMinor && pupil.parentalConsent) {
    //   statuses.push({ label: "Согласие родителей", status: "accepted", date: pupil.parentalConsentDate });
    // }
    
    return statuses;
  };

  return (
    <div className="space-y-6">
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
      {isLoading && pupils.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            <span className="text-gray-600">Загрузка учеников...</span>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-red-600">Ошибка загрузки учеников</div>
          </div>
        </div>
      ) : filteredPupils.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-gray-600">
            {searchTerm ? 'Ученики не найдены' : 'Ученики не добавлены'}
          </div>
        </div>
      ) : (
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
                    <div 
                      className="font-medium text-sm cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectStudent) {
                          onSelectStudent(pupil);
                        }
                      }}
                      title="Кликните для редактирования профиля"
                    >
                      {pupil.lastName} {pupil.firstName} • {pupil.age} лет • {pupil.phone}
                    </div>
                    {isWorkoutActive(trainerId, pupil.id) && (
                      <div className="text-xs text-orange-600 font-medium">
                        План: {getWorkoutProgramName(trainerId, pupil.id) || 'Активная тренировка'}
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
                          // Открыть активную тренировку
                          const activeWorkout = getActiveWorkout(trainerId, pupil.id);
                          if (activeWorkout) {
                            setSelectedActiveWorkout(activeWorkout);
                            setSelectedPupilForWorkout(pupil);
                            setShowActiveWorkoutDialog(true);
                          }
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

                    {/* Кнопка удаления */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePupil(pupil.id);
                      }}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Удалить ученика"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {/* Диалог с профилем ученика */}
      <Dialog open={!!selectedPupil} onOpenChange={() => setSelectedPupil(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Редактирование профиля ученика
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
                      {(selectedPupil.firstName || '?').charAt(0)}{(selectedPupil.lastName || '?').charAt(0)}
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
                    onClick={() => {
                      if (selectedPupil) {
                        setShowEditDialog(true);
                      } else {
                        toast({
                          title: "Ошибка",
                          description: "Ученик не выбран",
                          variant: "destructive",
                        });
                      }
                    }}
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
                                <h4 className="font-semibold text-orange-800">{workout.programName || 'Активная тренировка'}</h4>
                                <div className="flex gap-4 text-sm text-orange-700">
                                  <span>Уровень: {'Не указан'}</span>
                                  <span>Продолжительность: {'Не указана'}</span>
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
                                    await trainingPlansDb.delete(workout.id);
                                    
                                    // Удаляем из локального состояния activeWorkouts
                                    removeActiveWorkout(workout.trainerId, workout.pupilId);
                                    
      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
                                    
                                    toast({
                                      title: "План удален",
                                      description: `План "${workout.programName || 'активная тренировка'}" успешно удален у ${selectedPupil?.firstName} ${selectedPupil?.lastName}`,
                                    });
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
                            setShowEditDialog(false);
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
                            {/* {selectedPupil.applicationSubmitted 
                              ? `Подано: ${selectedPupil.applicationDate ? formatDate(selectedPupil.applicationDate) : 'Дата неизвестна'}`
                              : 'Не подано'
                            } */}
                            Не подано
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {/* {selectedPupil.applicationSubmitted ? "Подано" : "Не подано"} */}
                          Не подано
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
                            {/* {selectedPupil.rulesAccepted 
                              ? `Принято: ${selectedPupil.rulesAcceptedDate ? formatDate(selectedPupil.rulesAcceptedDate) : 'Дата неизвестна'}`
                              : 'Не принято'
                            } */}
                            Не принято
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {/* {selectedPupil.rulesAccepted ? "Принято" : "Не принято"} */}
                          Не принято
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
                              {/* {selectedPupil.parentalConsent 
                                ? `Получено: ${selectedPupil.parentalConsentDate ? formatDate(selectedPupil.parentalConsentDate) : 'Дата неизвестна'}`
                                : 'Не получено'
                              } */}
                              Не получено
                            </p>
                          </div>
                          <Badge variant="destructive">
                            {/* {selectedPupil.parentalConsent ? "Получено" : "Требуется"} */}
                            Требуется
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

      {/* Диалог просмотра активного тренировочного плана */}
      <Dialog open={showActiveWorkoutDialog} onOpenChange={setShowActiveWorkoutDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-orange-600" />
              Активный тренировочный план
            </DialogTitle>
          </DialogHeader>
          
          {selectedActiveWorkout && selectedPupilForWorkout && (
            <div className="space-y-6">
              {/* Информация об ученике и плане */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-orange-700">
                      <User className="h-5 w-5" />
                      <span className="font-medium">
                        {selectedPupilForWorkout.firstName} {selectedPupilForWorkout.lastName}
                      </span>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">
                      План: <strong>{selectedActiveWorkout.programName || 'Не указан'}</strong>
                    </p>
                    <p className="text-xs text-orange-500 mt-1">
                      Уровень: {'Не указан'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-orange-500">Статус</div>
                    <div className="text-sm font-medium text-orange-700">Активен</div>
                  </div>
                </div>
              </div>

              {/* Упражнения в плане */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Упражнения
                </h3>
                
                <div className="text-center py-8 text-muted-foreground">
                  Упражнения не указаны
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Детали плана
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Тип:</span>
                      <span className="ml-2 font-medium">
                        {'Не указан'}
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Продолжительность:</span>
                      <span className="ml-2 font-medium">
                        {selectedActiveWorkout.workoutProgram?.duration || 'Не указана'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">ID плана:</span>
                      <span className="ml-2 font-medium">
                        #{selectedActiveWorkout.workoutProgram?.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопки управления */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // TODO: Открыть диалог редактирования тренировочного плана
                    toast({
                      title: "Редактирование",
                      description: "Функция редактирования плана будет добавлена в следующем обновлении",
                    });
                  }}
                  className="flex-1"
                >
                  Редактировать
                </Button>
                <Button 
                  variant="destructive"
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Удалить план "${selectedActiveWorkout.programName || 'Unknown'}" у ${selectedPupilForWorkout.firstName} ${selectedPupilForWorkout.lastName}?\n\nЭто действие нельзя отменить.`
                    );
                    
                    if (!confirmed) return;
                    
                    try {
                      await trainingPlansDb.delete(selectedActiveWorkout.workoutProgram?.id);
                      
                      removeActiveWorkout(trainerId, selectedPupilForWorkout.id);
                      setShowActiveWorkoutDialog(false);
                      
      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
                      
                      toast({
                        title: "План удален",
                        description: `План тренировки удален у ${selectedPupilForWorkout.firstName} ${selectedPupilForWorkout.lastName}`,
                      });
                    } catch (error) {
                      toast({
                        title: "Ошибка",
                        description: "Не удалось удалить план тренировки",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="flex-1"
                >
                  Удалить
                </Button>
              </div>
            </div>
          )}
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

              {/* Редактирование времени для каждой выбранной даты */}
              {scheduleData.selectedDates.length > 0 && (
                <div className="space-y-3">
                  <Label>Время для каждого дня тренировки</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {scheduleData.selectedDates
                      .sort((a, b) => a.getTime() - b.getTime())
                      .map((date, index) => {
                        const dateKey = date.toISOString().split('T')[0];
                        const formattedDate = date.toLocaleDateString('ru-RU', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        });
                        
                        return (
                          <div key={dateKey} className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium min-w-0 flex-1">
                              {formattedDate}
                            </span>
                            <Input
                              type="time"
                              value={scheduleData.dateTimes[dateKey] || scheduleData.startTime}
                              onChange={(e) => {
                                setScheduleData(prev => ({
                                  ...prev,
                                  dateTimes: {
                                    ...prev.dateTimes,
                                    [dateKey]: e.target.value
                                  }
                                }));
                              }}
                              className="w-24 text-sm"
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Применить ко всем:</span>
                    <Input
                      type="time"
                      value={scheduleData.startTime}
                      onChange={(e) => {
                        const newTime = e.target.value;
                        setScheduleData(prev => {
                          // Обновляем время по умолчанию
                          const newDateTimes = { ...prev.dateTimes };
                          
                          // Применяем новое время ко всем выбранным датам
                          prev.selectedDates.forEach(date => {
                            const dateKey = date.toISOString().split('T')[0];
                            newDateTimes[dateKey] = newTime;
                          });
                          
                          return {
                            ...prev,
                            startTime: newTime,
                            dateTimes: newDateTimes
                          };
                        });
                      }}
                      className="w-24 text-xs"
                    />
                    <span className="text-xs text-muted-foreground">
                      Это изменит время для всех выбранных дней
                    </span>
                  </div>
                </div>
              )}

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
                `Выберите до ${scheduleData.totalSessions} дней для тренировок`
              ) : (
                `Нужно выбрать ${customWorkout.totalSessions} дней`
              )}
            </div>
            
            <Calendar
              mode="multiple"
              selected={showScheduleDialog ? scheduleData.selectedDates : selectedDates}
              onSelect={(dates) => {
                if (showScheduleDialog) {
                  const maxSessions = scheduleData.totalSessions;
                  const newDates = dates || [];
                  
                  // Ограничиваем количество выбранных дней
                  if (newDates.length <= maxSessions) {
                    setScheduleData(prev => {
                      // Обновляем времена для новых дат
                      const newDateTimes = { ...prev.dateTimes };
                      
                      // Добавляем время по умолчанию для новых дат
                      newDates.forEach(date => {
                        const dateKey = date.toISOString().split('T')[0];
                        if (!newDateTimes[dateKey]) {
                          newDateTimes[dateKey] = prev.startTime;
                        }
                      });
                      
                      // Удаляем времена для дат, которые больше не выбраны
                      const newDateKeys = newDates.map(date => date.toISOString().split('T')[0]);
                      Object.keys(newDateTimes).forEach(dateKey => {
                        if (!newDateKeys.includes(dateKey)) {
                          delete newDateTimes[dateKey];
                        }
                      });
                      
                      return { 
                        ...prev, 
                        selectedDates: newDates,
                        dateTimes: newDateTimes
                      };
                    });
                  }
                } else {
                  const maxSessions = customWorkout.totalSessions;
                  const newDates = dates || [];
                  
                  // Ограничиваем количество выбранных дней
                  if (newDates.length <= maxSessions) {
                    setSelectedDates(newDates);
                  }
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
              <div className="text-sm">
                {showScheduleDialog ? (
                  <div className="space-y-1">
                    <div className={scheduleData.selectedDates.length >= scheduleData.totalSessions ? "text-orange-600 font-medium" : "text-muted-foreground"}>
                      Выбрано: {scheduleData.selectedDates.length} из {scheduleData.totalSessions} дней
                    </div>
                    {scheduleData.selectedDates.length >= scheduleData.totalSessions && (
                      <div className="text-orange-600 text-xs">
                        Достигнут максимум. Снимите выделение с дня, чтобы выбрать другой.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className={selectedDates.length >= customWorkout.totalSessions ? "text-orange-600 font-medium" : "text-muted-foreground"}>
                      Выбрано: {selectedDates.length} из {customWorkout.totalSessions}
                    </div>
                    {selectedDates.length >= customWorkout.totalSessions && (
                      <div className="text-orange-600 text-xs">
                        Достигнут максимум. Снимите выделение с дня, чтобы выбрать другой.
                      </div>
                    )}
                  </div>
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

      {/* Add Student Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Добавить ученика
            </DialogTitle>
          </DialogHeader>
          
          <Form {...addPupilForm}>
            <form onSubmit={addPupilForm.handleSubmit(onAddPupil)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={addPupilForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя *</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия *</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите фамилию" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отчество</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите отчество" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дата рождения *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон *</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 123-45-67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль *</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Минимум 6 символов" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Вес (кг)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addPupilForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Рост (см)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={addPupilForm.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цели тренировок</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: похудение, набор мышечной массы" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={addPupilForm.control}
                name="medicalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ограничения по здоровью</FormLabel>
                    <FormControl>
                      <Input placeholder="Травмы, заболевания и т.д." {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Добавить ученика
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                  Отмена
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={showEditDialog && !!selectedPupil} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Редактировать ученика
            </DialogTitle>
          </DialogHeader>
          
          <Form {...editPupilForm}>
            <form onSubmit={editPupilForm.handleSubmit(onEditPupil)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editPupilForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя *</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Фамилия *</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите фамилию" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отчество</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите отчество" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дата рождения *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон *</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 123-45-67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Оставьте пустым, чтобы не изменять" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Вес (кг)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={editPupilForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Рост (см)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editPupilForm.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цели тренировок</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: похудение, набор мышечной массы" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editPupilForm.control}
                name="medicalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ограничения по здоровью</FormLabel>
                    <FormControl>
                      <Input placeholder="Травмы, заболевания и т.д." {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  Сохранить изменения
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                  Отмена
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

    </div>
  );
}