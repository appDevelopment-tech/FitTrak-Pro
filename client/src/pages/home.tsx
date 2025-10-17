import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { LogIn, UserPlus, Calendar } from 'lucide-react';

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FitTrak-Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Система управления фитнес-тренировками
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <UserPlus className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>
                  Создайте аккаунт для записи на тренировки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setLocation('/register')}
                  className="w-full"
                >
                  Зарегистрироваться
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <LogIn className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Вход</CardTitle>
                <CardDescription>
                  Войдите в свой аккаунт
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setLocation('/login')}
                  variant="outline"
                  className="w-full"
                >
                  Войти
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Расписание</CardTitle>
                <CardDescription>
                  Просмотрите доступные слоты
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setLocation('/schedule')}
                  variant="outline"
                  className="w-full"
                >
                  Расписание
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Возможности системы
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Для учеников</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Регистрация и создание профиля</li>
                  <li>• Просмотр расписания тренировок</li>
                  <li>• Запись на тренировки</li>
                  <li>• Отслеживание прогресса</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Для тренеров</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Управление учениками</li>
                  <li>• Создание тренировочных программ</li>
                  <li>• Планирование расписания</li>
                  <li>• Аналитика и отчеты</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
