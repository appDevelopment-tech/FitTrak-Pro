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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Большая грудная мышца левая */}
                      <path d="M35 30 C30 25, 25 30, 25 40 C25 50, 30 55, 40 58 L45 60 C50 62, 55 60, 60 55 L60 45 C60 35, 55 30, 50 30 C45 30, 40 32, 35 30 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Большая грудная мышца правая */}
                      <path d="M85 30 C90 25, 95 30, 95 40 C95 50, 90 55, 80 58 L75 60 C70 62, 65 60, 60 55 L60 45 C60 35, 65 30, 70 30 C75 30, 80 32, 85 30 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Грудина */}
                      <path d="M55 30 L65 30 L65 65 L55 65 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Межреберные мышцы */}
                      <path d="M40 40 L50 40 M70 40 L80 40 M40 50 L50 50 M70 50 L80 50" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Трапециевидная мышца */}
                      <path d="M40 20 L60 15 L80 20 L90 40 L80 50 L60 45 L40 50 L30 40 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Широчайшая мышца спины левая */}
                      <path d="M25 45 C20 40, 15 45, 15 55 L15 75 C15 85, 25 90, 35 85 L45 80 L50 70 L45 60 L35 50 C30 45, 25 45, 25 45 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Широчайшая мышца спины правая */}
                      <path d="M95 45 C100 40, 105 45, 105 55 L105 75 C105 85, 95 90, 85 85 L75 80 L70 70 L75 60 L85 50 C90 45, 95 45, 95 45 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Ромбовидная мышца */}
                      <path d="M50 35 L40 45 L50 55 L60 45 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Позвоночник */}
                      <path d="M60 20 L60 90" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Четырехглавая мышца левого бедра */}
                      <path d="M30 20 C25 18, 20 22, 20 30 L20 50 C20 58, 25 65, 30 68 L35 70 C40 72, 42 75, 40 80 L38 90 C36 95, 40 100, 45 98 C48 97, 50 93, 48 88 L45 75 C43 70, 40 65, 35 60 L30 50 C28 40, 30 30, 30 20 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Четырехглавая мышца правого бедра */}
                      <path d="M90 20 C95 18, 100 22, 100 30 L100 50 C100 58, 95 65, 90 68 L85 70 C80 72, 78 75, 80 80 L82 90 C84 95, 80 100, 75 98 C72 97, 70 93, 72 88 L75 75 C77 70, 80 65, 85 60 L90 50 C92 40, 90 30, 90 20 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Икроножные мышцы */}
                      <path d="M35 75 C30 73, 25 78, 25 85 L25 95 C25 100, 30 105, 35 105 C40 105, 45 100, 45 95 L45 85 C45 78, 40 73, 35 75 Z" fill="rgba(255,255,255,0.8)"/>
                      <path d="M85 75 C90 73, 95 78, 95 85 L95 95 C95 100, 90 105, 85 105 C80 105, 75 100, 75 95 L75 85 C75 78, 80 73, 85 75 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Подколенные сухожилия */}
                      <path d="M40 50 L45 65 M80 50 L75 65" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Левое плечо (дельтовидная) */}
                      <path d="M20 30 C15 25, 10 30, 10 40 C10 50, 15 55, 20 55 L25 55 C30 55, 35 50, 35 45 L35 35 C35 30, 30 25, 25 30 L20 30 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Правое плечо (дельтовидная) */}
                      <path d="M100 30 C105 25, 110 30, 110 40 C110 50, 105 55, 100 55 L95 55 C90 55, 85 50, 85 45 L85 35 C85 30, 90 25, 95 30 L100 30 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Левый бицепс */}
                      <path d="M25 50 C20 48, 15 53, 15 60 L15 75 C15 82, 20 87, 25 87 C30 87, 35 82, 35 75 L35 60 C35 53, 30 48, 25 50 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Правый бицепс */}
                      <path d="M95 50 C100 48, 105 53, 105 60 L105 75 C105 82, 100 87, 95 87 C90 87, 85 82, 85 75 L85 60 C85 53, 90 48, 95 50 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Левое предплечье */}
                      <path d="M25 80 C22 78, 18 82, 18 88 L18 100 C18 105, 22 108, 25 108 C28 108, 32 105, 32 100 L32 88 C32 82, 28 78, 25 80 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Правое предплечье */}
                      <path d="M95 80 C98 78, 102 82, 102 88 L102 100 C102 105, 98 108, 95 108 C92 108, 88 105, 88 100 L88 88 C88 82, 92 78, 95 80 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Связующие линии */}
                      <path d="M35 45 L85 45 M25 75 L95 75" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Левая передняя дельта */}
                      <path d="M20 25 C15 20, 10 25, 10 35 C10 45, 15 50, 25 52 L30 53 C35 54, 40 50, 40 45 L40 35 C40 25, 35 20, 30 25 L20 25 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Правая передняя дельта */}
                      <path d="M100 25 C105 20, 110 25, 110 35 C110 45, 105 50, 95 52 L90 53 C85 54, 80 50, 80 45 L80 35 C80 25, 85 20, 90 25 L100 25 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Левая средняя дельта */}
                      <path d="M15 40 C10 35, 5 40, 5 50 C5 60, 10 65, 20 67 L25 68 C30 69, 35 65, 35 60 L35 50 C35 40, 30 35, 25 40 L15 40 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Правая средняя дельта */}
                      <path d="M105 40 C110 35, 115 40, 115 50 C115 60, 110 65, 100 67 L95 68 C90 69, 85 65, 85 60 L85 50 C85 40, 90 35, 95 40 L105 40 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Центральная часть (ключица) */}
                      <path d="M40 30 L80 30 C85 30, 90 35, 90 40 L85 40 L80 35 L40 35 L35 40 L30 40 C30 35, 35 30, 40 30 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Соединительные линии */}
                      <path d="M30 45 L90 45 M25 55 L95 55" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Большая ягодичная мышца левая */}
                      <path d="M25 35 C20 30, 15 35, 15 45 C15 55, 20 65, 30 70 L35 72 C40 75, 45 78, 50 80 L50 90 C50 95, 52 98, 55 98 C58 98, 60 95, 60 90 L60 80 C58 78, 55 75, 50 72 L45 70 C35 65, 30 55, 30 45 C30 35, 25 30, 25 35 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Большая ягодичная мышца правая */}
                      <path d="M95 35 C100 30, 105 35, 105 45 C105 55, 100 65, 90 70 L85 72 C80 75, 75 78, 70 80 L70 90 C70 95, 68 98, 65 98 C62 98, 60 95, 60 90 L60 80 C62 78, 65 75, 70 72 L75 70 C85 65, 90 55, 90 45 C90 35, 95 30, 95 35 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Средняя ягодичная мышца левая */}
                      <path d="M30 25 C25 22, 20 27, 20 35 C20 42, 25 47, 32 48 L38 49 C42 50, 45 47, 45 43 L45 35 C45 27, 40 22, 35 25 L30 25 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Средняя ягодичная мышца правая */}
                      <path d="M90 25 C95 22, 100 27, 100 35 C100 42, 95 47, 88 48 L82 49 C78 50, 75 47, 75 43 L75 35 C75 27, 80 22, 85 25 L90 25 Z" fill="rgba(255,255,255,0.8)"/>
                      {/* Седалищная кость */}
                      <path d="M50 75 L55 85 L65 85 L60 75 Z M50 75 L55 85 L45 85 L50 75 Z" fill="rgba(255,255,255,0.6)"/>
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
                    <svg className="w-16 h-16 text-white" fill="currentColor" stroke="currentColor" strokeWidth="1" viewBox="0 0 120 120">
                      {/* Прямая мышца живота верх */}
                      <path d="M45 20 C40 18, 35 22, 35 30 L35 45 C35 50, 40 55, 45 55 L75 55 C80 55, 85 50, 85 45 L85 30 C85 22, 80 18, 75 20 L75 30 L75 45 L45 45 L45 30 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Прямая мышца живота низ */}
                      <path d="M45 60 C40 58, 35 62, 35 70 L35 85 C35 90, 40 95, 45 95 L75 95 C80 95, 85 90, 85 85 L85 70 C85 62, 80 58, 75 60 L75 70 L75 85 L45 85 L45 70 Z" fill="rgba(255,255,255,0.9)"/>
                      {/* Кубики пресса - горизонтальные линии */}
                      <path d="M40 35 L80 35 M40 50 L80 50 M40 65 L80 65 M40 80 L80 80" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
                      {/* Центральная линия (белая линия живота) */}
                      <path d="M60 25 L60 90" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
                      {/* Косые мышцы левые */}
                      <path d="M25 45 C20 40, 15 45, 15 55 L15 70 C15 75, 20 80, 25 80 L35 80 L35 55 C35 50, 30 45, 25 45 Z" fill="rgba(255,255,255,0.7)"/>
                      {/* Косые мышцы правые */}
                      <path d="M95 45 C100 40, 105 45, 105 55 L105 70 C105 75, 100 80, 95 80 L85 80 L85 55 C85 50, 90 45, 95 45 Z" fill="rgba(255,255,255,0.7)"/>
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