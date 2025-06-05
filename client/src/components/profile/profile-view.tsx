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
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Упражнения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Инструменты тренера</h3>
                <p className="text-gray-500 mb-4">Здесь будут размещены инструменты для работы с упражнениями</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}