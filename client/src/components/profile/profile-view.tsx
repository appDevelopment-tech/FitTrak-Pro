import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { User, Filter, Search, Users, Dumbbell, Calendar, Upload, Edit2, Image, Settings, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exercisesDb, studentsDb } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { User as UserType, Exercise, Pupil } from "@shared/schema";
import { getExercisePhoto } from "@/components/ui/exercise-photos";
import { ExerciseDetail } from "@/components/exercise/exercise-detail";
import { StudentsManagement } from "@/components/students/students-management";

// Интерфейс для пользователя в профиле
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  birthDate?: string;
  email: string;
  phone?: string;
  photo?: string;
  isTrainer?: boolean;
  role?: string;
}
import {
  LazyWorkoutsManagement,
  LazyExerciseManagement,
  LazyMuscleGroupsManagement
} from "@/components/ui/lazy-component";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { PhotoUpload } from "./photo-upload";

export function ProfileView({ 
  isStudent = false, 
  onClose, 
  selectedStudent = null,
  onSelectStudent
}: { 
  isStudent?: boolean; 
  onClose?: () => void; 
  selectedStudent?: Pupil | null;
  onSelectStudent?: (student: Pupil) => void;
}) {
  console.log('ProfileView props:', { isStudent, selectedStudent: selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'none', hasOnClose: !!onClose });
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Debug logging for isEditing state
  useEffect(() => {
    console.log('isEditing state changed:', isEditing);
  }, [isEditing]);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExerciseForDetail, setSelectedExerciseForDetail] = useState<Exercise | null>(null);
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [selectedMuscleForImageUpload, setSelectedMuscleForImageUpload] = useState<string>("");
  const [showMuscleGroupManagement, setShowMuscleGroupManagement] = useState(false);
  const [showExerciseManagement, setShowExerciseManagement] = useState(false);
  const [customMuscleImages, setCustomMuscleImages] = useState<Record<string, string>>({});
  const [selectedPupil, setSelectedPupil] = useState<Pupil | null>(null);
  const [selectedDateFromSchedule, setSelectedDateFromSchedule] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle photo change with automatic save
  const handlePhotoChange = (photo: string | null) => {
    console.log('Photo changed, auto-saving:', photo);
    console.log('Selected student:', selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'none');
    console.log('Is student mode:', isStudent);
    setProfilePhoto(photo);
    
    // Auto-save photo immediately (including null for deletion)
    updatePhotoMutation.mutate(photo);
  };
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location] = useLocation();
  const { refreshUserProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState<string>("profile");

  // Get the trainer ID from the authenticated user
  const { user: authUser } = useAuth();
  const trainerId = authUser?.id || "b55005cc-2362-4faa-80e4-406bafbbe76b";

  // Debug logging for auth user
  useEffect(() => {
    console.log('Auth user changed:', authUser);
    console.log('Trainer ID:', trainerId);
  }, [authUser, trainerId]);

  const { data: user, error: userError, isLoading: userLoading } = useQuery<any>({
    queryKey: ['user', selectedStudent ? selectedStudent.email : authUser?.email, isStudent],
    queryFn: async () => {
      try {
        // Если нет подключения к Supabase, возвращаем mock данные
        if (!supabase) {
          console.log('Supabase not available, using mock data');
          return {
            id: 'mock-id',
            username: '',
            password: '',
            firstName: selectedStudent ? selectedStudent.firstName : 'Тестовый',
            lastName: selectedStudent ? selectedStudent.lastName : 'Пользователь',
            middleName: '',
            birthDate: '1990-01-01',
            email: selectedStudent ? selectedStudent.email : 'test@example.com',
            phone: '+7 (999) 123-45-67',
            photo: null,
            isTrainer: !isStudent && !selectedStudent,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
      // If we have a selected student, load their profile
      if (selectedStudent) {
        console.log('Loading selected student profile:', selectedStudent.email);
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('email', selectedStudent.email)
          .single();

        if (error) {
          console.error('Error fetching selected student profile:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Selected student profile not found');
        }

        const transformedData: UserType = {
          id: data.id,
          username: '',
          password: '',
          firstName: data.first_name,
          lastName: data.last_name,
          middleName: data.middle_name,
          birthDate: data.birth_date,
          email: data.email,
          phone: data.phone,
          photo: data.photo,
          isTrainer: false,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };

        console.log('Selected student profile loaded:', transformedData);
        return transformedData;
      }
      
      if (isStudent) {
        // For students, load from students table
        console.log('Fetching student profile for email:', authUser?.email);
        console.log('isStudent flag:', isStudent);
        
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('email', authUser?.email)
          .single();

        if (error) {
          console.error('Error fetching student profile:', error);
          throw error;
        }

        if (!data) {
          throw new Error('Student profile not found');
        }

        // Transform student data to UserType format
        const transformedData: UserType = {
          id: data.id,
          username: '', // Students don't have username
          password: '', // Students don't have password in this context
          firstName: data.first_name,
          lastName: data.last_name,
          middleName: data.middle_name,
          birthDate: data.birth_date,
          email: data.email,
          phone: data.phone,
          photo: data.photo,
          isTrainer: false,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };

        console.log('Student profile loaded:', transformedData);
        return transformedData;
      } else {
        // For trainers, load from users table
        console.log('Fetching trainer profile for email:', authUser?.email);
      const { data, error } = await supabase
        .from('users')
        .select('*')
          .eq('email', authUser?.email)
        .single();

      if (error) {
          console.error('Error fetching trainer profile:', error);
        throw error;
      }

        if (!data) {
          throw new Error('Trainer profile not found');
        }

        // Transform trainer data to UserType format
        const transformedData: UserType = {
          id: data.id,
          username: data.username,
          password: data.password,
          firstName: data.first_name,
          lastName: data.last_name,
          middleName: data.middle_name,
          birthDate: data.birth_date,
          email: data.email,
          phone: data.phone,
          photo: data.photo || localStorage.getItem(`trainer_photo_${data.email}`) || null,
          isTrainer: data.is_trainer,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };

        console.log('Trainer profile loaded:', transformedData);
        return transformedData;
      }
    } catch (error) {
      console.error('Error in queryFn:', error);
      // Возвращаем mock данные при ошибке
      return {
        id: 'mock-id',
        username: '',
        password: '',
        firstName: selectedStudent ? selectedStudent.firstName : 'Тестовый',
        lastName: selectedStudent ? selectedStudent.lastName : 'Пользователь',
        middleName: '',
        birthDate: '1990-01-01',
        email: selectedStudent ? selectedStudent.email : 'test@example.com',
        phone: '+7 (999) 123-45-67',
        photo: null,
        isTrainer: !isStudent && !selectedStudent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    },
    enabled: !!authUser?.email || !!selectedStudent, // Only run query if we have a user email or selected student
    retry: false, // Не повторять запрос при ошибке
    onError: (error: any) => {
      console.error('Error loading user profile:', error);
    }
  });

  // Log when user data changes
  useEffect(() => {
    console.log('User data changed:', user);
    console.log('User error:', userError);
    console.log('User loading:', userLoading);
  }, [user, userError, userLoading]);

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: () => exercisesDb.getAll(),
  });

  // Load muscle groups from database
  const { data: muscleGroups = [] } = useQuery<{ id: string; name: string; description: string | null }[]>({
    queryKey: ['muscleGroups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('id, name, description')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Form schema for user profile editing
  const userProfileSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    middleName: z.string().optional(),
    birthDate: z.string().min(1, "Дата рождения обязательна"),
    email: z.string().email("Некорректный email"),
    phone: z.string().min(1, "Телефон обязателен"),
    photo: z.string().optional(),
  });

  type UserProfileForm = z.infer<typeof userProfileSchema>;

  const form = useForm<UserProfileForm>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      middleName: user?.middleName || "",
      birthDate: user?.birthDate || "",
      email: user?.email || "",
      phone: user?.phone || "",
      photo: user?.photo || "",
    },
  });

  // Update form when user data loads
  useEffect(() => {
    console.log('Form update effect - user:', user);
    if (user) {
      console.log('Resetting form with user data:', user);
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        middleName: user.middleName || "",
        birthDate: user.birthDate || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || "",
      });
    }
  }, [user, form]);

  // Mutation for updating only photo
  const updatePhotoMutation = useMutation({
    mutationFn: async (photo: string | null) => {
      console.log('Updating photo only:', photo);
      
      // If we have a selected student, update their photo
      if (selectedStudent) {
        console.log('Updating selected student photo for email:', selectedStudent.email);
        const { data: updated, error } = await supabase
          .from('students')
          .update({ photo })
          .eq('email', selectedStudent.email)
          .select()
          .single();

        if (error) {
          console.error('Error updating selected student photo:', error);
          throw error;
        }

        return updated;
      }
      
      if (isStudent) {
        // Update student photo
        const { data: updated, error } = await supabase
          .from('students')
          .update({ photo })
          .eq('email', authUser?.email)
          .select()
          .single();

        if (error) {
          console.error('Error updating student photo:', error);
          throw error;
        }

        return updated;
      } else {
        // Update trainer photo
        console.log('Updating trainer photo for email:', authUser?.email);
        console.log('Photo data to save:', photo);
        
        // Try to update in database first
        const { data: updated, error } = await supabase
          .from('users')
          .update({ photo })
          .eq('email', authUser?.email)
          .select()
          .single();

        if (error) {
          console.error('Error updating trainer photo in database:', error);
          console.error('Error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // If database update fails, save to localStorage as fallback
          console.log('Saving trainer photo to localStorage as fallback');
          localStorage.setItem(`trainer_photo_${authUser?.email}`, photo || '');
          
          // Return mock data for successful localStorage save
          return {
            id: authUser?.id,
            email: authUser?.email,
            photo: photo
          };
        }

        return updated;
      }
    },
    onSuccess: () => {
      const emailToInvalidate = selectedStudent ? selectedStudent.email : authUser?.email;
      queryClient.invalidateQueries({ queryKey: ['user', emailToInvalidate, isStudent] });
      // Refresh user profile in auth context to update header photo (only for current user)
      if (!selectedStudent) {
        refreshUserProfile();
      }
      toast({
        title: "Успешно",
        description: "Фото обновлено",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: `Не удалось обновить фото: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation for updating user profile
  const updateUserMutation = useMutation({
    mutationFn: async (data: UserProfileForm) => {
      console.log('Updating user profile with:', data);
      
      // If we have a selected student, update their profile
      if (selectedStudent) {
        console.log('Updating selected student profile for email:', selectedStudent.email);
        console.log('Selected student data to update:', data);
        
        const { data: updated, error } = await supabase
          .from('students')
          .update({
            first_name: data.firstName,
            last_name: data.lastName,
            middle_name: data.middleName || null,
            birth_date: data.birthDate,
            email: data.email,
            phone: data.phone,
          })
          .eq('email', selectedStudent.email)
          .select()
          .single();

        if (error) {
          console.error('Error updating selected student profile:', error);
          throw error;
        }
        console.log('Selected student profile updated (raw):', updated);

        const transformedData: UserType = {
          id: updated.id,
          username: '',
          password: '',
          firstName: updated.first_name,
          lastName: updated.last_name,
          middleName: updated.middle_name,
          birthDate: updated.birth_date,
          email: updated.email,
          phone: updated.phone,
          photo: updated.photo,
          isTrainer: false,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        };

        return transformedData;
      }
      
      if (isStudent) {
        // Update student profile
        console.log('Updating student profile for email:', authUser?.email);
        console.log('Student data to update:', data);
        
        const { data: updated, error } = await supabase
          .from('students')
          .update({
            first_name: data.firstName,
            last_name: data.lastName,
            middle_name: data.middleName || null,
            birth_date: data.birthDate,
            email: data.email,
            phone: data.phone,
          })
          .eq('email', authUser?.email)
          .select()
          .single();

        if (error) {
          console.error('Error updating student profile:', error);
          throw error;
        }
        console.log('Student profile updated (raw):', updated);

        // Transform snake_case to camelCase
        const transformedData: UserType = {
          id: updated.id,
          username: '',
          password: '',
          firstName: updated.first_name,
          lastName: updated.last_name,
          middleName: updated.middle_name,
          birthDate: updated.birth_date,
          email: updated.email,
          phone: updated.phone,
          photo: updated.photo,
          isTrainer: false,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        };

        return transformedData;
      } else {
        // Update trainer profile
      const { data: updated, error } = await supabase
        .from('users')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName || null,
          birth_date: data.birthDate,
          email: data.email,
          phone: data.phone,
        })
          .eq('email', authUser?.email)
        .select()
        .single();

      if (error) {
          console.error('Error updating trainer profile:', error);
        throw error;
      }
        console.log('Trainer profile updated (raw):', updated);

      // Transform snake_case to camelCase
      const transformedData: UserType = {
        id: updated.id,
        username: updated.username,
        password: updated.password,
        firstName: updated.first_name,
        lastName: updated.last_name,
        middleName: updated.middle_name,
        birthDate: updated.birth_date,
        email: updated.email,
        phone: updated.phone,
          photo: updated.photo,
        isTrainer: updated.is_trainer,
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
      };

      return transformedData;
      }
    },
    onSuccess: () => {
      const emailToInvalidate = selectedStudent ? selectedStudent.email : authUser?.email;
      queryClient.invalidateQueries({ queryKey: ['user', emailToInvalidate, isStudent] });
      console.log('Setting isEditing to false after successful save');
      setIsEditing(false);
      toast({
        title: "Успешно",
        description: "Профиль обновлен",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive",
      });
    },
  });

  // Загружаем учеников для поиска выбранного ученика из URL
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => studentsDb.getByTrainerId(trainerId),
    enabled: !!authUser?.id, // Only run query if we have a user ID
  });

  // Обработка URL параметров
  useEffect(() => {
    // Используем window.location.search для получения параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    const pupilId = urlParams.get('pupilId');
    const selectedDate = urlParams.get('date');
    




    // Устанавливаем вкладку сразу при наличии параметра
    if (tab) {
      setActiveTab(tab);
    }
    // Не сбрасываем на profile если нет параметра - оставляем текущую вкладку

    if (pupilId && pupils.length > 0) {
      const pupil = pupils.find(p => p.id === pupilId);
      if (pupil) {
        setSelectedPupil(pupil);
      }
    }

    if (selectedDate) {
      setSelectedDateFromSchedule(selectedDate);
    }
  }, [location, pupils]);

  // Обновляем URL при смене вкладки
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newTab);
    window.history.pushState({}, '', url);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => exercisesDb.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      toast({
        title: "Упражнение удалено",
        description: "Упражнение было успешно удалено."
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить упражнение. Попробуйте еще раз.",
        variant: "destructive"
      });
    }
  });

  // Фильтрация и сортировка упражнений
  const filteredExercises = useMemo(() => {
    return exercises
      .filter(exercise => {
        const primaryMuscles = Array.isArray(exercise.primaryMuscles) ? exercise.primaryMuscles : JSON.parse(exercise.primaryMuscles as string || '[]');
        const matchesMuscleGroup = !selectedMuscleGroup || (primaryMuscles as string[]).includes(selectedMuscleGroup);
        const matchesSearch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesMuscleGroup && matchesSearch;
      })
      .sort((a, b) => {
        // Определяем порядок сложности
        const difficultyOrder = {
          'легкий': 1,
          'начинающий': 1,
          'средний': 2,
          'продвинутый': 3
        };
        
        const aDifficulty = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 2;
        const bDifficulty = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 2;
        
        return aDifficulty - bDifficulty;
      });
  }, [exercises, selectedMuscleGroup, searchTerm]);

  const handleMuscleGroupClick = useCallback((muscleGroup: string) => {
    setSelectedMuscleGroup(muscleGroup);
    
    // Прокрутка к панели упражнений через небольшую задержку
    setTimeout(() => {
      const exercisePanel = document.querySelector('[data-exercise-panel]');
      if (exercisePanel) {
        exercisePanel.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }, []);

  const handleImageUpload = useCallback((muscleGroup: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedMuscleForImageUpload(muscleGroup);
    setShowImageUploadDialog(true);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCustomMuscleImages(prev => ({
          ...prev,
          [selectedMuscleForImageUpload]: imageUrl
        }));
        setShowImageUploadDialog(false);
        toast({
          title: "Изображение загружено",
          description: `Изображение для группы "${selectedMuscleForImageUpload}" успешно обновлено.`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetMuscleImage = (muscleGroup: string) => {
    setCustomMuscleImages(prev => {
      const newImages = { ...prev };
      delete newImages[muscleGroup];
      return newImages;
    });
    setShowImageUploadDialog(false);
    toast({
      title: "Изображение сброшено",
      description: `Изображение для группы "${muscleGroup}" восстановлено по умолчанию.`
    });
  };

  const getMuscleGroupImage = (muscleGroup: string) => {
    return customMuscleImages[muscleGroup] || null;
  };

  // Get gradient color for muscle group
  const getMuscleGroupGradient = (index: number) => {
    const gradients = [
      'from-red-400 to-red-600',      // грудь
      'from-blue-400 to-blue-600',    // спина
      'from-green-400 to-green-600',  // ноги
      'from-purple-400 to-purple-600', // руки
      'from-yellow-400 to-yellow-600', // плечи
      'from-pink-400 to-pink-600',    // ягодичные
      'from-orange-400 to-orange-600', // живот
      'from-indigo-400 to-indigo-600', // кардио
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Close button for students and selected student */}
      {(isStudent || selectedStudent) && onClose && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {isStudent ? 'Нажмите ✕ чтобы вернуться к расписанию' : 'Нажмите ✕ чтобы вернуться к списку учеников'}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {(isStudent || selectedStudent) ? (
          // Прямое отображение профиля для учеников без вкладок
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {selectedStudent ? `Профиль ${selectedStudent.firstName} ${selectedStudent.lastName}` : 
                   isStudent ? 'Мой профиль' : 'Основная информация'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="text-center">
                    <PhotoUpload
                      currentPhoto={user?.photo || profilePhoto}
                      onPhotoChange={handlePhotoChange}
                      userName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
                    />
                    {updatePhotoMutation.isPending && (
                      <div className="text-center text-sm text-muted-foreground mt-2">
                        Сохранение фото...
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <form onSubmit={form.handleSubmit((data) => {
                      console.log('Form submitted with data:', data);
                      console.log('isStudent flag in form:', isStudent);
                      // Photo is saved automatically, so we don't include it in form submission
                      updateUserMutation.mutate(data);
                    })}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Имя</Label>
                          {isEditing ? (
                            <Input
                              {...form.register("firstName")}
                              className={form.formState.errors.firstName ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.firstName || ""}</div>
                          )}
                          {form.formState.errors.firstName && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>Фамилия</Label>
                          {isEditing ? (
                            <Input
                              {...form.register("lastName")}
                              className={form.formState.errors.lastName ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.lastName || ""}</div>
                          )}
                          {form.formState.errors.lastName && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>Отчество</Label>
                          {isEditing ? (
                            <Input
                              {...form.register("middleName")}
                              className={form.formState.errors.middleName ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.middleName || ""}</div>
                          )}
                          {form.formState.errors.middleName && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.middleName.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>Дата рождения</Label>
                          {isEditing ? (
                            <Input
                              type="date"
                              {...form.register("birthDate")}
                              className={form.formState.errors.birthDate ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.birthDate || ""}</div>
                          )}
                          {form.formState.errors.birthDate && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.birthDate.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>Email</Label>
                          {isEditing ? (
                            <Input
                              type="email"
                              {...form.register("email")}
                              className={form.formState.errors.email ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.email || ""}</div>
                          )}
                          {form.formState.errors.email && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          {isEditing ? (
                            <Input
                              type="tel"
                              {...form.register("phone")}
                              className={form.formState.errors.phone ? "border-red-500" : ""}
                            />
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.phone || ""}</div>
                          )}
                          {form.formState.errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Button variant="outline" type="button" onClick={() => {
                              setIsEditing(false);
                              form.reset();
                              // Don't clear profilePhoto as it's saved automatically
                            }}>
                              Отмена
                            </Button>
                            <Button type="submit" disabled={updateUserMutation.isPending}>
                              {updateUserMutation.isPending ? "Сохранение..." : "Сохранить"}
                            </Button>
                          </div>
                        ) : (
                          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                            <Edit2 className="h-4 w-4" />
                            Редактировать
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Обычное отображение с вкладками для тренера
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Тренер</TabsTrigger>
              <TabsTrigger value="students">Ученики</TabsTrigger>
              <TabsTrigger value="exercises">Упражнения</TabsTrigger>
              <TabsTrigger value="programs">Тренировки</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {selectedStudent ? `Профиль ${selectedStudent.firstName} ${selectedStudent.lastName}` : 
                 isStudent ? 'Мой профиль' : 'Основная информация'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center">
                  <PhotoUpload
                    currentPhoto={user?.photo || profilePhoto}
                    onPhotoChange={handlePhotoChange}
                    userName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
                  />
                  {updatePhotoMutation.isPending && (
                    <div className="text-center text-sm text-muted-foreground mt-2">
                      Сохранение фото...
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <form onSubmit={form.handleSubmit((data) => {
                    console.log('Form submitted with data:', data);
                    console.log('isStudent flag in form:', isStudent);
                    // Photo is saved automatically, so we don't include it in form submission
                    updateUserMutation.mutate(data);
                  })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Имя</Label>
                        {isEditing ? (
                          <Input
                            {...form.register("firstName")}
                            className={form.formState.errors.firstName ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.firstName || ""}</div>
                        )}
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Фамилия</Label>
                        {isEditing ? (
                          <Input
                            {...form.register("lastName")}
                            className={form.formState.errors.lastName ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.lastName || ""}</div>
                        )}
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Отчество</Label>
                        {isEditing ? (
                          <Input {...form.register("middleName")} />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.middleName || ""}</div>
                        )}
                      </div>
                      <div>
                        <Label>Дата рождения</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            {...form.register("birthDate")}
                            className={form.formState.errors.birthDate ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">
                            {user?.birthDate ? new Date(user.birthDate).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) : ""}
                          </div>
                        )}
                        {form.formState.errors.birthDate && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.birthDate.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Email</Label>
                        {isEditing ? (
                          <Input
                            type="email"
                            {...form.register("email")}
                            className={form.formState.errors.email ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.email || ""}</div>
                        )}
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Label>Телефон</Label>
                        {isEditing ? (
                          <Input
                            {...form.register("phone")}
                            className={form.formState.errors.phone ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md text-gray-900 font-medium">{user?.phone || ""}</div>
                        )}
                        {form.formState.errors.phone && (
                          <p className="text-sm text-red-500 mt-1">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <Button variant="outline" type="button" onClick={() => {
                            setIsEditing(false);
                            form.reset();
                            // Don't clear profilePhoto as it's saved automatically
                          }}>
                            Отмена
                          </Button>
                          <Button type="submit" disabled={updateUserMutation.isPending}>
                            {updateUserMutation.isPending ? "Сохранение..." : "Сохранить"}
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                          <Edit2 className="h-4 w-4" />
                          Редактировать
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {!(isStudent || selectedStudent) && (
          <>
        <TabsContent value="students">
          <StudentsManagement onSelectStudent={onSelectStudent} />
        </TabsContent>

        <TabsContent value="programs">
          <LazyWorkoutsManagement activeTab={activeTab} />
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Группы мышц</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowExerciseManagement(true)}
                className="flex items-center gap-2"
              >
                <Dumbbell className="h-4 w-4" />
                Управление упражнениями
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMuscleGroupManagement(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Управление группами
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {muscleGroups.map((muscleGroup, index) => (
              <Card
                key={muscleGroup.id}
                className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === muscleGroup.name ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
                onClick={() => handleMuscleGroupClick(muscleGroup.name)}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage(muscleGroup.name) ? (
                      <img
                        src={getMuscleGroupImage(muscleGroup.name)!}
                        alt={muscleGroup.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getMuscleGroupGradient(index)} flex items-center justify-center`}>
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto(muscleGroup.name, 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload(muscleGroup.name, e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">{muscleGroup.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>

          {/* Панель выбора упражнений */}
          {selectedMuscleGroup && (
            <Card className="mt-8 border-2 border-orange-200 bg-orange-50/50 animate-in slide-in-from-top-5 duration-500" data-exercise-panel>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Упражнения для группы: {selectedMuscleGroup}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Фильтры */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Поиск упражнений</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Найти упражнение..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Список упражнений */}
                <div className="space-y-4">
                  {filteredExercises.length > 0 ? (
                    <div className="space-y-2">
                      {filteredExercises.map((exercise) => (
                        <div key={exercise.id} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                          <h4 
                            className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => setSelectedExerciseForDetail(exercise)}
                          >
                            {exercise.name}
                          </h4>
                          <Badge variant="outline" 
                                 data-difficulty={exercise.difficulty} 
                                 className={`text-xs ${
                                   exercise.difficulty === 'легкий' || exercise.difficulty === 'начинающий' 
                                     ? 'difficulty-easy-force' 
                                     : exercise.difficulty === 'средний'
                                     ? 'difficulty-medium-force'
                                     : exercise.difficulty === 'продвинутый'
                                     ? 'difficulty-hard-force'
                                     : ''
                                 }`}>
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Упражнения не найдены для группы "{selectedMuscleGroup}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        </>
        )}
        </Tabs>
        )}

      {/* Диалог для отображения полного обзора упражнения */}
      {selectedExerciseForDetail && (
        <ExerciseDetail
          exercise={{
            ...selectedExerciseForDetail,
            primaryMuscles: Array.isArray(selectedExerciseForDetail.primaryMuscles) ? selectedExerciseForDetail.primaryMuscles : JSON.parse(selectedExerciseForDetail.primaryMuscles as string || '[]'),
            secondaryMuscles: Array.isArray(selectedExerciseForDetail.secondaryMuscles) ? selectedExerciseForDetail.secondaryMuscles : JSON.parse(selectedExerciseForDetail.secondaryMuscles as string || '[]'),
            technique: Array.isArray(selectedExerciseForDetail.technique) ? selectedExerciseForDetail.technique : JSON.parse(selectedExerciseForDetail.technique as string || '[]'),
            commonMistakes: Array.isArray(selectedExerciseForDetail.commonMistakes) ? selectedExerciseForDetail.commonMistakes : JSON.parse(selectedExerciseForDetail.commonMistakes as string || '[]'),
            contraindications: Array.isArray(selectedExerciseForDetail.contraindications) ? selectedExerciseForDetail.contraindications : JSON.parse(selectedExerciseForDetail.contraindications as string || '[]')
          }}
          onClose={() => setSelectedExerciseForDetail(null)}
          onDelete={(exerciseId) => {
            deleteMutation.mutate(exerciseId);
            setSelectedExerciseForDetail(null);
          }}
        />
      )}

      {/* Диалог для загрузки изображений */}
      <Dialog open={showImageUploadDialog} onOpenChange={setShowImageUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Изменить изображение группы мышц</DialogTitle>
            <DialogDescription>
              Загрузите собственное изображение или восстановите изображение по умолчанию
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Выберите новое изображение для группы "{selectedMuscleForImageUpload}"
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Загрузить изображение
              </Button>
              {customMuscleImages[selectedMuscleForImageUpload] && (
                <Button
                  variant="outline"
                  onClick={() => resetMuscleImage(selectedMuscleForImageUpload)}
                  className="w-full"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Восстановить по умолчанию
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Muscle Groups Management Dialog */}
      <Dialog open={showMuscleGroupManagement} onOpenChange={setShowMuscleGroupManagement}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Управление группами мышц</DialogTitle>
            <DialogDescription>
              Добавляйте, редактируйте и удаляйте группы мышц
            </DialogDescription>
          </DialogHeader>
          <LazyMuscleGroupsManagement />
        </DialogContent>
      </Dialog>

      {/* Exercise Management Dialog */}
      <Dialog open={showExerciseManagement} onOpenChange={setShowExerciseManagement}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Управление упражнениями</DialogTitle>
            <DialogDescription>
              Добавляйте, редактируйте и удаляйте упражнения для каждой группы мышц
            </DialogDescription>
          </DialogHeader>
          <LazyExerciseManagement />
        </DialogContent>
      </Dialog>
    </div>
  );
}