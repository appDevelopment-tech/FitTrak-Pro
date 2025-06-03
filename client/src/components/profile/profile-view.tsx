import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Calendar, Edit3, Save } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User as UserType } from "@shared/schema";

export function ProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+7 (999) 123-45-67",
    dateOfBirth: "1990-01-15",
  });

  const { data: user } = useQuery<UserType>({
    queryKey: ['/api/user/1'],
  });

  const handleEdit = () => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: "+7 (999) 123-45-67",
        dateOfBirth: "1990-01-15",
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Профиль пользователя</h2>
        <p className="text-gray-600">Управление личными данными</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                alt="Фото профиля"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {user ? `${user.firstName} ${user.lastName}` : 'Загрузка...'}
            </h3>
            <p className="text-gray-500 mb-4">
              {user?.isTrainer ? 'Персональный тренер' : 'Спортсмен'}
            </p>
            <Button variant="outline" className="w-full">
              Изменить фото
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Личная информация
                </CardTitle>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                      Отмена
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-800 py-2">{user?.firstName || 'Не указано'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2">
                    Фамилия
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-800 py-2">{user?.lastName || 'Не указано'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-800 py-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      {user?.email || 'Не указано'}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-800 py-2 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {formData.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700 mb-2">
                    Дата рождения
                  </Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-800 py-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      {new Date(formData.dateOfBirth).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </Label>
                  <p className="text-gray-800 py-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    {user?.isTrainer ? 'Персональный тренер' : 'Спортсмен'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Статистика активности
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">47</p>
              <p className="text-sm text-gray-600">Тренировок завершено</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">94</p>
              <p className="text-sm text-gray-600">Часов в зале</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">12.5</p>
              <p className="text-sm text-gray-600">Тонн поднято</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">7</p>
              <p className="text-sm text-gray-600">Дней подряд</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}