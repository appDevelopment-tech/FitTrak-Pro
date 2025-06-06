import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Edit, Save, Camera, Plus, Award, Clock, Users, Calendar, Filter, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User as UserType, Exercise } from "@shared/schema";
// Удалены анатомические изображения

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1'],
  });

  const { data: exercises = [] } = useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Грудь */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'грудь' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('грудь')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/chest-exercise.jpg" 
                          alt="Упражнения для груди" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">Г</div>
                      </div>
                      <div className="text-lg font-semibold">ГРУДЬ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Грудь</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для груди</p>
                </div>
              </CardContent>
            </Card>

            {/* Спина */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'спина' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('спина')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/back-exercise.jpg" 
                          alt="Упражнения для спины" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">С</div>
                      </div>
                      <div className="text-lg font-semibold">СПИНА</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Спина</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для спины</p>
                </div>
              </CardContent>
            </Card>

            {/* Ноги */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ноги' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ноги')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/legs-exercise.jpg" 
                          alt="Упражнения для ног" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">Н</div>
                      </div>
                      <div className="text-lg font-semibold">НОГИ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Ноги</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для ног</p>
                </div>
              </CardContent>
            </Card>

            {/* Руки */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'руки' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('руки')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/arms-exercise.jpg" 
                          alt="Упражнения для рук" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">Р</div>
                      </div>
                      <div className="text-lg font-semibold">РУКИ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Руки</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для рук</p>
                </div>
              </CardContent>
            </Card>

            {/* Плечи */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'плечи' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('плечи')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/shoulders-exercise.jpg" 
                          alt="Упражнения для плеч" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">П</div>
                      </div>
                      <div className="text-lg font-semibold">ПЛЕЧИ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Плечи</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для плеч</p>
                </div>
              </CardContent>
            </Card>

            {/* Ягодичные */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'ягодичные' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('ягодичные')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/glutes-exercise.jpg" 
                          alt="Упражнения для ягодичных" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">Я</div>
                      </div>
                      <div className="text-lg font-semibold">ЯГОДИЧНЫЕ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Ягодичные</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для ягодиц</p>
                </div>
              </CardContent>
            </Card>

            {/* Живот */}
            <Card 
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${selectedMuscleGroup === 'живот' ? 'border-orange-500 bg-orange-50' : 'border-transparent hover:border-orange-200'}`}
              onClick={() => handleMuscleGroupClick('живот')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="mb-2 w-20 h-20 flex items-center justify-center border-4 border-white rounded-lg bg-white/20 backdrop-blur-sm">
                        <img 
                          src="/abs-exercise.jpg" 
                          alt="Упражнения для живота" 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <div className="text-white text-2xl font-bold hidden">Ж</div>
                      </div>
                      <div className="text-lg font-semibold">ЖИВОТ</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Живот</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для пресса</p>
                </div>
              </CardContent>
            </Card>

            {/* Кардио */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2ZM12 21.5C16.14 21.5 19.5 18.14 19.5 14C19.5 9.86 16.14 6.5 12 6.5C7.86 6.5 4.5 9.86 4.5 14C4.5 18.14 7.86 21.5 12 21.5ZM12 8.5C15.04 8.5 17.5 10.96 17.5 14C17.5 17.04 15.04 19.5 12 19.5C8.96 19.5 6.5 17.04 6.5 14C6.5 10.96 8.96 8.5 12 8.5Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Кардио</h3>
                  <p className="text-sm text-gray-500 mt-1">Кардиотренировки</p>
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