import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Edit, Save, Camera, Plus, Award, Clock, Users, Calendar, Filter, Search, X, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User as UserType, Exercise, InsertExercise } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getExercisePhoto } from "@/components/ui/exercise-photos";
import { ImageUpload } from "@/components/ui/image-upload";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [muscleImages, setMuscleImages] = useState<Record<string, string>>({});
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const { toast } = useToast();
  
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1'],
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });

  // Мутации для упражнений
  const createExerciseMutation = useMutation({
    mutationFn: (data: InsertExercise) => apiRequest('/api/exercises', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      setIsExerciseDialogOpen(false);
      setEditingExercise(null);
      toast({ title: "Упражнение создано", description: "Новое упражнение успешно добавлено" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось создать упражнение", variant: "destructive" });
    }
  });

  const updateExerciseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<InsertExercise> }) => 
      apiRequest(`/api/exercises/${id}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      setIsExerciseDialogOpen(false);
      setEditingExercise(null);
      toast({ title: "Упражнение обновлено", description: "Изменения успешно сохранены" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось обновить упражнение", variant: "destructive" });
    }
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/exercises/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      toast({ title: "Упражнение удалено", description: "Упражнение успешно удалено" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось удалить упражнение", variant: "destructive" });
    }
  });

  // Фильтрация упражнений
  const filteredExercises = exercises.filter(exercise => {
    const matchesMuscleGroup = !selectedMuscleGroup || exercise.primaryMuscles.includes(selectedMuscleGroup);
    const matchesSearch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMuscleGroup && matchesSearch;
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

  const handleImageUpload = (muscleGroup: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setMuscleImages(prev => ({
          ...prev,
          [muscleGroup]: imageUrl
        }));
        // Сохранение в localStorage для постоянного хранения
        localStorage.setItem(`muscle-image-${muscleGroup}`, imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      setMuscleImages(prev => {
        const updated = { ...prev };
        delete updated[muscleGroup];
        return updated;
      });
      localStorage.removeItem(`muscle-image-${muscleGroup}`);
    }
  };

  // Функции для управления упражнениями
  const handleCreateExercise = () => {
    setEditingExercise(null);
    setIsExerciseDialogOpen(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsExerciseDialogOpen(true);
  };

  const handleDeleteExercise = (exerciseId: number) => {
    if (confirm('Вы уверены, что хотите удалить это упражнение?')) {
      deleteExerciseMutation.mutate(exerciseId);
    }
  };

  // Загрузка сохраненных изображений при монтировании компонента
  useEffect(() => {
    const muscleGroups = ['грудь', 'спина', 'ноги', 'руки', 'плечи', 'ягодичные', 'живот'];
    const savedImages: Record<string, string> = {};
    
    muscleGroups.forEach(group => {
      const savedImage = localStorage.getItem(`muscle-image-${group}`);
      if (savedImage) {
        savedImages[group] = savedImage;
      }
    });
    
    setMuscleImages(savedImages);
  }, []);
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Профиль тренера</h1>
        <p className="text-gray-600 mt-2">Управляйте своей информацией и инструментами для работы</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Личные данные</TabsTrigger>
          <TabsTrigger value="exercises">Упражнения</TabsTrigger>
          <TabsTrigger value="programs">Программы</TabsTrigger>
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
                    <Button
                      size="sm"
                      className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                      variant="secondary"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Имя</Label>
                      {isEditing ? (
                        <Input defaultValue={user?.firstName || "Александр"} />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">{user?.firstName || "Александр"}</div>
                      )}
                    </div>
                    <div>
                      <Label>Фамилия</Label>
                      {isEditing ? (
                        <Input defaultValue={user?.lastName || "Петров"} />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">{user?.lastName || "Петров"}</div>
                      )}
                    </div>
                    <div>
                      <Label>Отчество</Label>
                      {isEditing ? (
                        <Input defaultValue="Иванович" />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">Иванович</div>
                      )}
                    </div>
                    <div>
                      <Label>Дата рождения</Label>
                      {isEditing ? (
                        <Input type="date" defaultValue="1990-03-15" />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">15 марта 1990</div>
                      )}
                    </div>
                    <div>
                      <Label>Email</Label>
                      {isEditing ? (
                        <Input type="email" defaultValue={user?.email || "alexander.petrov@email.com"} />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">{user?.email || "alexander.petrov@email.com"}</div>
                      )}
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      {isEditing ? (
                        <Input defaultValue="+7 (999) 123-45-67" />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">+7 (999) 123-45-67</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label>О себе</Label>
                    {isEditing ? (
                      <Textarea 
                        defaultValue="Персональный тренер с 5-летним опытом работы. Специализируюсь на силовых тренировках и функциональном тренинге."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md">
                        Персональный тренер с 5-летним опытом работы. Специализируюсь на силовых тренировках и функциональном тренинге.
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Специализация</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Силовые тренировки</Badge>
                      <Badge variant="secondary">Функциональный тренинг</Badge>
                      <Badge variant="secondary">Похудение</Badge>
                      <Badge variant="secondary">Реабилитация</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                {isEditing ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Программы тренировок</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Создайте свою первую программу</h3>
                <p className="text-gray-500 mb-4">Объединяйте упражнения в полноценные тренировочные программы</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать программу
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Группы мышц</h2>
            <Button
              variant={isEditingImages ? "default" : "outline"}
              onClick={() => setIsEditingImages(!isEditingImages)}
              className="flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>{isEditingImages ? "Сохранить" : "Изменить изображения"}</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Грудь */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'грудь' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('грудь')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['грудь']}
                            onImageChange={(file) => handleImageUpload('грудь', file)}
                            className="w-16 h-16"
                            placeholder="Грудь"
                          />
                        ) : muscleImages['грудь'] ? (
                          <img src={muscleImages['грудь']} alt="Упражнения для груди" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('грудь', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">ГРУДЬ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Спина */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'спина' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('спина')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['спина']}
                            onImageChange={(file) => handleImageUpload('спина', file)}
                            className="w-16 h-16"
                            placeholder="Спина"
                          />
                        ) : muscleImages['спина'] ? (
                          <img src={muscleImages['спина']} alt="Упражнения для спины" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('спина', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">СПИНА</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ноги */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ноги' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ноги')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['ноги']}
                            onImageChange={(file) => handleImageUpload('ноги', file)}
                            className="w-16 h-16"
                            placeholder="Ноги"
                          />
                        ) : muscleImages['ноги'] ? (
                          <img src={muscleImages['ноги']} alt="Упражнения для ног" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('ноги', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">НОГИ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Руки */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'руки' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('руки')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['руки']}
                            onImageChange={(file) => handleImageUpload('руки', file)}
                            className="w-16 h-16"
                            placeholder="Руки"
                          />
                        ) : muscleImages['руки'] ? (
                          <img src={muscleImages['руки']} alt="Упражнения для рук" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('руки', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">РУКИ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Плечи */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'плечи' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('плечи')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['плечи']}
                            onImageChange={(file) => handleImageUpload('плечи', file)}
                            className="w-16 h-16"
                            placeholder="Плечи"
                          />
                        ) : muscleImages['плечи'] ? (
                          <img src={muscleImages['плечи']} alt="Упражнения для плеч" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('плечи', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">ПЛЕЧИ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ягодичные */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ягодичные' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ягодичные')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['ягодичные']}
                            onImageChange={(file) => handleImageUpload('ягодичные', file)}
                            className="w-16 h-16"
                            placeholder="Ягодичные"
                          />
                        ) : muscleImages['ягодичные'] ? (
                          <img src={muscleImages['ягодичные']} alt="Упражнения для ягодичных" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('ягодичные', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">ЯГОДИЧНЫЕ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Живот */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'живот' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('живот')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['живот']}
                            onImageChange={(file) => handleImageUpload('живот', file)}
                            className="w-16 h-16"
                            placeholder="Живот"
                          />
                        ) : muscleImages['живот'] ? (
                          <img src={muscleImages['живот']} alt="Упражнения для живота" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('живот', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">ЖИВОТ</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Кардио */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'кардио' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('кардио')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        {isEditingImages ? (
                          <ImageUpload
                            currentImage={muscleImages['кардио']}
                            onImageChange={(file) => handleImageUpload('кардио', file)}
                            className="w-16 h-16"
                            placeholder="Кардио"
                          />
                        ) : muscleImages['кардио'] ? (
                          <img src={muscleImages['кардио']} alt="Кардиотренировки" className="w-16 h-16 object-cover rounded" />
                        ) : (
                          getExercisePhoto('кардио', 'w-16 h-16')
                        )}
                      </div>
                      <div className="text-lg font-semibold">КАРДИО</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Панель выбора упражнений */}
          {selectedMuscleGroup && (
            <Card className="mt-8 border-2 border-orange-200 bg-orange-50/50 animate-in slide-in-from-top-5 duration-500" data-exercise-panel>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Упражнения для группы: {selectedMuscleGroup}
                </CardTitle>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredExercises.map((exercise) => (
                        <Card key={exercise.id} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                              <Badge variant={exercise.difficulty === 'начинающий' ? 'secondary' : exercise.difficulty === 'средний' ? 'default' : 'destructive'}>
                                {exercise.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{exercise.overview}</p>
                            <div className="space-y-2">
                              <div className="text-xs text-gray-600">
                                <p className="font-medium">Основные группы мышц:</p>
                                <p>{exercise.primaryMuscles.join(', ')}</p>
                              </div>
                              {exercise.secondaryMuscles.length > 0 && (
                                <div className="text-xs text-gray-600">
                                  <p className="font-medium">Вспомогательные группы мышц:</p>
                                  <p>{exercise.secondaryMuscles.join(', ')}</p>
                                </div>
                              )}
                              <Button size="sm" className="w-full">
                                Добавить в программу
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
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
    </div>
  );
}