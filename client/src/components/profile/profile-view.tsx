import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Save, Camera, Plus, Award, Clock, Users, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User as UserType } from "@shared/schema";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1'],
  });
  
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
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M35 25 C25 20, 15 25, 15 35 C15 45, 25 50, 35 45 L35 55 C35 65, 45 70, 50 70 C55 70, 65 65, 65 55 L65 45 C75 50, 85 45, 85 35 C85 25, 75 20, 65 25 L65 35 C65 45, 55 50, 50 50 C45 50, 35 45, 35 35 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Грудь</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для груди</p>
                </div>
              </CardContent>
            </Card>

            {/* Спина */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M50 15 C40 15, 30 20, 25 30 L20 40 C18 45, 20 50, 25 50 L30 50 L30 65 C30 75, 40 85, 50 85 C60 85, 70 75, 70 65 L70 50 L75 50 C80 50, 82 45, 80 40 L75 30 C70 20, 60 15, 50 15 Z M50 25 C55 25, 60 28, 62 32 L65 40 L60 40 L60 60 C60 65, 55 70, 50 70 C45 70, 40 65, 40 60 L40 40 L35 40 L38 32 C40 28, 45 25, 50 25 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Спина</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для спины</p>
                </div>
              </CardContent>
            </Card>

            {/* Ноги */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M30 20 C25 15, 20 20, 20 30 L20 50 C20 55, 22 60, 25 63 L25 75 C25 80, 30 85, 35 85 C40 85, 45 80, 45 75 L45 50 L55 50 L55 75 C55 80, 60 85, 65 85 C70 85, 75 80, 75 75 L75 63 C78 60, 80 55, 80 50 L80 30 C80 20, 75 15, 70 20 L70 30 C70 45, 60 50, 50 50 C40 50, 30 45, 30 30 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Ноги</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для ног</p>
                </div>
              </CardContent>
            </Card>

            {/* Руки */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M15 35 C10 30, 5 35, 5 45 L5 60 C5 65, 10 70, 15 70 L20 70 L20 75 C20 80, 25 85, 30 85 C35 85, 40 80, 40 75 L40 45 L40 25 C40 20, 45 15, 50 15 C55 15, 60 20, 60 25 L60 45 L60 75 C60 80, 65 85, 70 85 C75 85, 80 80, 80 75 L80 70 L85 70 C90 70, 95 65, 95 60 L95 45 C95 35, 90 30, 85 35 L85 55 L80 55 L80 45 L60 45 L40 45 L20 45 L20 55 L15 55 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Руки</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для рук</p>
                </div>
              </CardContent>
            </Card>

            {/* Плечи */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M15 25 C10 20, 5 25, 5 35 L5 50 C5 55, 10 60, 15 60 L20 60 L25 55 L35 50 L40 45 L45 40 L50 35 L55 40 L60 45 L65 50 L75 55 L80 60 L85 60 C90 60, 95 55, 95 50 L95 35 C95 25, 90 20, 85 25 L85 40 L75 45 L65 40 L55 35 L50 30 L45 35 L35 40 L25 45 L15 40 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Плечи</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для плеч</p>
                </div>
              </CardContent>
            </Card>

            {/* Ягодичные */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M20 40 C15 35, 10 40, 10 50 C10 60, 15 65, 20 65 L25 65 C30 70, 35 75, 40 75 L40 85 C40 90, 45 95, 50 95 C55 95, 60 90, 60 85 L60 75 C65 75, 70 70, 75 65 L80 65 C85 65, 90 60, 90 50 C90 40, 85 35, 80 40 L80 50 C80 55, 75 60, 70 60 L65 60 C60 55, 55 50, 50 50 C45 50, 40 55, 35 60 L30 60 C25 60, 20 55, 20 50 Z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">Ягодичные</h3>
                  <p className="text-sm text-gray-500 mt-1">Упражнения для ягодиц</p>
                </div>
              </CardContent>
            </Card>

            {/* Живот */}
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                      <path d="M35 25 C30 20, 25 25, 25 35 L25 45 C25 50, 30 55, 35 55 L65 55 C70 55, 75 50, 75 45 L75 35 C75 25, 70 20, 65 25 L65 35 L65 45 L35 45 L35 35 Z M30 60 C25 55, 20 60, 20 70 L20 80 C20 85, 25 90, 30 90 L70 90 C75 90, 80 85, 80 80 L80 70 C80 60, 75 55, 70 60 L70 70 L70 80 L30 80 L30 70 Z"/>
                    </svg>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}