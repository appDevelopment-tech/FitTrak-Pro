import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Save, Camera, Plus, Trash2, Award, Clock, Users, Calendar, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User as UserType } from "@shared/schema";
import type { DetailedExercise } from "@/lib/types";
import { ExerciseDetail } from "@/components/exercise/exercise-detail";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<DetailedExercise | null>(null);
  const [exercises, setExercises] = useState<DetailedExercise[]>([
    {
      id: 1,
      name: 'Жим в тренажёре сидя',
      category: 'Грудь',
      primaryMuscles: ['Большая грудная мышца'],
      secondaryMuscles: ['Передние дельты', 'Трицепс'],
      equipment: 'Тренажёр для жима сидя',
      difficulty: 'Легкий',
      description: 'Безопасное упражнение для развития грудных мышц на тренажёре',
      technique: [
        'Отрегулируйте высоту сиденья так, чтобы рукоятки были на уровне груди',
        'Сядьте с прямой спиной, плотно прижмитесь к спинке',
        'Возьмитесь за рукоятки нейтральным хватом',
        'Медленно выжмите рукоятки вперёд, сводя лопатки',
        'Плавно вернитесь в исходное положение, контролируя движение'
      ],
      commonMistakes: [
        'Неправильная высота сиденья',
        'Отрыв спины от спинки тренажёра',
        'Слишком быстрое выполнение',
        'Неполная амплитуда движения'
      ],
      tips: [
        'Держите лопатки сведёнными',
        'Контролируйте дыхание: выдох на усилии',
        'Не блокируйте локти в верхней точке'
      ]
    }
  ]);
  
  const [newExercise, setNewExercise] = useState({ 
    name: '', 
    category: '', 
    description: '', 
    primaryMuscles: [], 
    secondaryMuscles: [], 
    equipment: '', 
    difficulty: 'Легкий',
    technique: [],
    commonMistakes: [],
    tips: []
  });
  
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1'],
  });
  
  const addExercise = () => {
    if (newExercise.name && newExercise.category) {
      const exercise = {
        id: exercises.length + 1,
        ...newExercise,
        primaryMuscles: newExercise.primaryMuscles.length > 0 ? newExercise.primaryMuscles : [newExercise.category],
        secondaryMuscles: newExercise.secondaryMuscles.length > 0 ? newExercise.secondaryMuscles : [],
        technique: newExercise.technique.length > 0 ? newExercise.technique : ['Базовая техника выполнения'],
        commonMistakes: newExercise.commonMistakes.length > 0 ? newExercise.commonMistakes : ['Стандартные ошибки'],
        tips: newExercise.tips.length > 0 ? newExercise.tips : ['Общие рекомендации']
      };
      setExercises([...exercises, exercise]);
      setNewExercise({ 
        name: '', 
        category: '', 
        description: '', 
        primaryMuscles: [], 
        secondaryMuscles: [], 
        equipment: '', 
        difficulty: 'Легкий',
        technique: [],
        commonMistakes: [],
        tips: []
      });
    }
  };
  
  const removeExercise = (id: number) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const getExerciseCount = (category: string) => {
    return exercises.filter(exercise => exercise.category === category).length;
  };

  const getExercisesByGroup = (groupId: string) => {
    const categoryMap = {
      'chest': 'Грудь',
      'back': 'Спина', 
      'legs': 'Ноги',
      'shoulders': 'Плечи',
      'arms': 'Руки',
      'abs': 'Пресс'
    };
    const category = categoryMap[groupId as keyof typeof categoryMap];
    return exercises.filter(exercise => exercise.category === category);
  };

  const getMuscleGroupTitle = (groupId: string) => {
    const titleMap = {
      'chest': 'Грудные',
      'back': 'Спина',
      'legs': 'Ноги', 
      'shoulders': 'Дельты',
      'arms': 'Руки',
      'abs': 'Пресс'
    };
    return titleMap[groupId as keyof typeof titleMap] || groupId;
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Профиль тренера</h1>
        <p className="text-gray-600 mt-2">Управляйте своей информацией и инструментами для работы</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Личные данные</TabsTrigger>
          <TabsTrigger value="exercises">Упражнения</TabsTrigger>
          <TabsTrigger value="programs">Программы</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
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

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Библиотека упражнений</CardTitle>
              <p className="text-gray-600">Выберите группу мышц для просмотра упражнений</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Muscle Groups Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  className="group cursor-pointer bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('chest')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Грудные</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Грудь')} упражнений</p>
                </div>

                <div 
                  className="group cursor-pointer bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('back')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12h18m-9-9v18"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Спина</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Спина')} упражнений</p>
                </div>

                <div 
                  className="group cursor-pointer bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('legs')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2v20m0-20l8 8m-8-8L4 10"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Ноги</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Ноги')} упражнений</p>
                </div>

                <div 
                  className="group cursor-pointer bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('shoulders')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Дельты</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Плечи')} упражнений</p>
                </div>

                <div 
                  className="group cursor-pointer bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('arms')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Руки</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Руки')} упражнений</p>
                </div>

                <div 
                  className="group cursor-pointer bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-white text-center hover:scale-105 transition-transform"
                  onClick={() => setSelectedMuscleGroup('abs')}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Пресс</h3>
                  <p className="text-xs opacity-90">{getExerciseCount('Пресс')} упражнений</p>
                </div>
              </div>

              {/* Exercise List for Selected Muscle Group */}
              {selectedMuscleGroup && (
                <Card className="mt-6">
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Упражнения - {getMuscleGroupTitle(selectedMuscleGroup)}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedMuscleGroup(null)}
                      >
                        Закрыть
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4">
                      {getExercisesByGroup(selectedMuscleGroup).map((exercise) => (
                        <div key={exercise.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{exercise.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {exercise.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{exercise.category} • {exercise.equipment}</p>
                            <p className="text-sm text-gray-500">{exercise.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exercise.primaryMuscles.slice(0, 2).map((muscle, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {muscle}
                                </Badge>
                              ))}
                              {exercise.primaryMuscles.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{exercise.primaryMuscles.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedExercise(exercise)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExercise(exercise.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {getExercisesByGroup(selectedMuscleGroup).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          Упражнения для этой группы мышц пока не добавлены
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Add New Exercise Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Добавить новое упражнение</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Название упражнения"
                      value={newExercise.name}
                      onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={newExercise.category}
                      onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                    >
                      <option value="">Выберите группу мышц</option>
                      <option value="Грудь">Грудные</option>
                      <option value="Спина">Спина</option>
                      <option value="Ноги">Ноги</option>
                      <option value="Плечи">Дельты</option>
                      <option value="Руки">Руки</option>
                      <option value="Пресс">Пресс</option>
                    </select>
                    <Input
                      placeholder="Описание"
                      value={newExercise.description}
                      onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                    />
                    <div className="md:col-span-3">
                      <Button onClick={addExercise} className="w-full md:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить упражнение
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Всего учеников</p>
                    <p className="text-2xl font-bold text-gray-900">7</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Тренировок в месяце</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Часов работы</p>
                    <p className="text-2xl font-bold text-gray-900">168</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetail 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
}