import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { User, Filter, Search, Users, Dumbbell, Calendar, Upload, Edit2, Image } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exercisesDb, studentsDb } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { User as UserType, Exercise, Pupil } from "@shared/schema";
import { getExercisePhoto } from "@/components/ui/exercise-photos";
import { ExerciseDetail } from "@/components/exercise/exercise-detail";
import { StudentsManagement } from "@/components/students/students-management";
import { WorkoutsManagement } from "@/components/workouts/workouts-management";
import { useLocation } from "wouter";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExerciseForDetail, setSelectedExerciseForDetail] = useState<Exercise | null>(null);
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [selectedMuscleForImageUpload, setSelectedMuscleForImageUpload] = useState<string>("");
  const [customMuscleImages, setCustomMuscleImages] = useState<Record<string, string>>({});
  const [selectedPupil, setSelectedPupil] = useState<Pupil | null>(null);
  const [selectedDateFromSchedule, setSelectedDateFromSchedule] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location] = useLocation();
  
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  const { data: user } = useQuery<UserType>({
    queryKey: ['user'],
    queryFn: async () => ({
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@fittrak.pro',
      phone: '+7 (999) 123-45-67',
      birthDate: '1990-01-01',
      middleName: '',
    } as UserType),
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: () => exercisesDb.getAll(),
  });

  // Form schema for user profile editing
  const userProfileSchema = z.object({
    firstName: z.string().min(1, "Имя обязательно"),
    lastName: z.string().min(1, "Фамилия обязательна"),
    middleName: z.string().optional(),
    birthDate: z.string().min(1, "Дата рождения обязательна"),
    email: z.string().email("Некорректный email"),
    phone: z.string().min(1, "Телефон обязателен"),
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
    },
  });

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        middleName: user.middleName || "",
        birthDate: user.birthDate || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, form]);

  // Mutation for updating user profile
  const updateUserMutation = useMutation({
    mutationFn: async (data: UserProfileForm) => {
      // For now, just return success (no user table in Supabase yet)
      return Promise.resolve(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
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
    queryKey: ['students'],
    queryFn: () => studentsDb.getAll(),
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
      const pupil = pupils.find(p => p.id === parseInt(pupilId));
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
    mutationFn: (id: number) => exercisesDb.delete(id),
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
  const filteredExercises = exercises
    .filter(exercise => {
      const matchesMuscleGroup = !selectedMuscleGroup || exercise.primaryMuscles.includes(selectedMuscleGroup);
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

  const handleMuscleGroupClick = (muscleGroup: string) => {
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
  };

  const handleImageUpload = (muscleGroup: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedMuscleForImageUpload(muscleGroup);
    setShowImageUploadDialog(true);
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <CardTitle className="text-xl font-semibold">Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <form onSubmit={form.handleSubmit((data) => updateUserMutation.mutate(data))}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Имя</Label>
                        {isEditing ? (
                          <Input 
                            {...form.register("firstName")}
                            className={form.formState.errors.firstName ? "border-red-500" : ""}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-md">{user?.firstName || ""}</div>
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
                          <div className="p-3 bg-gray-50 rounded-md">{user?.lastName || ""}</div>
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
                          <div className="p-3 bg-gray-50 rounded-md">{user?.middleName || ""}</div>
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
                          <div className="p-3 bg-gray-50 rounded-md">
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
                          <div className="p-3 bg-gray-50 rounded-md">{user?.email || ""}</div>
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
                          <div className="p-3 bg-gray-50 rounded-md">{user?.phone || ""}</div>
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
                          }}>
                            Отмена
                          </Button>
                          <Button type="submit" disabled={updateUserMutation.isPending}>
                            {updateUserMutation.isPending ? "Сохранение..." : "Сохранить"}
                          </Button>
                        </div>
                      ) : (
                        <Button onClick={() => setIsEditing(true)}>
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

        <TabsContent value="students">
          <StudentsManagement />
        </TabsContent>

        <TabsContent value="programs">
          <WorkoutsManagement activeTab={activeTab} />
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Группы мышц</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Грудь */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'грудь' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('грудь')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  {/* Верхняя часть с изображением */}
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('грудь') ? (
                      <img 
                        src={getMuscleGroupImage('грудь')!} 
                        alt="Грудь" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('грудь', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('грудь', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Нижняя часть с текстом */}
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">ГРУДЬ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Спина */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'спина' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('спина')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('спина') ? (
                      <img 
                        src={getMuscleGroupImage('спина')!} 
                        alt="Спина" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('спина', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('спина', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">СПИНА</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ноги */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ноги' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ноги')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('ноги') ? (
                      <img 
                        src={getMuscleGroupImage('ноги')!} 
                        alt="Ноги" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('ноги', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('ноги', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">НОГИ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Руки */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'руки' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('руки')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('руки') ? (
                      <img 
                        src={getMuscleGroupImage('руки')!} 
                        alt="Руки" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center rounded-lg">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('руки', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('руки', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">РУКИ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Плечи */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'плечи' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('плечи')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('плечи') ? (
                      <img 
                        src={getMuscleGroupImage('плечи')!} 
                        alt="Плечи" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('плечи', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('плечи', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">ПЛЕЧИ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ягодичные */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ягодичные' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ягодичные')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('ягодичные') ? (
                      <img 
                        src={getMuscleGroupImage('ягодичные')!} 
                        alt="Ягодичные" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('ягодичные', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('ягодичные', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">ЯГОДИЧНЫЕ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Живот */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'живот' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('живот')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('живот') ? (
                      <img 
                        src={getMuscleGroupImage('живот')!} 
                        alt="Живот" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('живот', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('живот', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">ЖИВОТ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Кардио */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'кардио' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('кардио')}
            >
              <CardContent className="p-3">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-32 overflow-hidden rounded-lg">
                    {getMuscleGroupImage('кардио') ? (
                      <img 
                        src={getMuscleGroupImage('кардио')!} 
                        alt="Кардио" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                        <div className="w-16 h-16 text-white">
                          {getExercisePhoto('кардио', 'w-16 h-16')}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                      onClick={(e) => handleImageUpload('кардио', e)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white text-center">
                    <div className="text-lg font-semibold text-gray-800 uppercase">КАРДИО</div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
      </Tabs>

      {/* Диалог для отображения полного обзора упражнения */}
      {selectedExerciseForDetail && (
        <ExerciseDetail
          exercise={selectedExerciseForDetail}
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
    </div>
  );
}