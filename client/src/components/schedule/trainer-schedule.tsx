import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, User, Plus } from "lucide-react";

interface TrainerSession {
  id: number;
  time: string;
  clientName: string;
  workoutType: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'free';
  notes?: string;
}

export function TrainerSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  // Пример данных расписания тренера
  const trainerSessions: TrainerSession[] = [
    {
      id: 1,
      time: "09:00",
      clientName: "Иван Петров",
      workoutType: "Силовая тренировка",
      duration: 90,
      status: "confirmed",
      notes: "Работа над верхом тела"
    },
    {
      id: 2,
      time: "11:00",
      clientName: "Мария Сидорова",
      workoutType: "Кардио",
      duration: 60,
      status: "confirmed",
      notes: "Подготовка к марафону"
    },
    {
      id: 3,
      time: "14:00",
      clientName: "Александр Козлов",
      workoutType: "Функциональная",
      duration: 60,
      status: "pending",
      notes: "Новый клиент"
    },
    {
      id: 4,
      time: "16:00",
      clientName: "Анна Волкова",
      workoutType: "Растяжка",
      duration: 45,
      status: "confirmed",
      notes: "Восстановление после травмы"
    },
    {
      id: 5,
      time: "18:00",
      clientName: "Сергей Морозов",
      workoutType: "Силовая тренировка",
      duration: 75,
      status: "confirmed",
      notes: "Работа над ногами"
    }
  ];

  const navigateDay = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const getSessionForTime = (time: string): TrainerSession | null => {
    return trainerSessions.find(session => session.time === time) || null;
  };

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'Силовая тренировка':
        return 'bg-orange-500';
      case 'Кардио':
        return 'bg-blue-500';
      case 'Функциональная':
        return 'bg-green-500';
      case 'Растяжка':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Подтверждено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      case 'free':
        return <Badge className="bg-gray-100 text-gray-800">Свободно</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                Расписание на {formatDate(selectedDate)}
              </CardTitle>
              {isToday(selectedDate) && (
                <p className="text-sm text-orange-500 font-medium mt-1">Сегодня</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDay('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="px-4"
              >
                Сегодня
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDay('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {timeSlots.map((time) => {
              const session = getSessionForTime(time);
              
              return (
                <div key={time} className="flex min-h-[80px]">
                  {/* Время */}
                  <div className="w-20 flex-shrink-0 p-4 border-r border-gray-100 bg-gray-50">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{time}</span>
                    </div>
                  </div>

                  {/* Содержимое слота */}
                  <div className="flex-1 p-4">
                    {session ? (
                      <div className={`rounded-lg p-4 ${getWorkoutTypeColor(session.workoutType)} bg-opacity-10 border-l-4`} 
                           style={{borderLeftColor: getWorkoutTypeColor(session.workoutType).replace('bg-', '#')}}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <User className="h-4 w-4 text-gray-600 mr-2" />
                              <h4 className="font-semibold text-gray-800">{session.clientName}</h4>
                              {getStatusBadge(session.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{session.workoutType}</p>
                            <p className="text-xs text-gray-500">
                              Длительность: {session.duration} мин
                            </p>
                            {session.notes && (
                              <p className="text-xs text-gray-600 mt-2 italic">
                                {session.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Изменить
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              Отменить
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Button
                          variant="ghost"
                          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full h-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Добавить клиента
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Статистика дня */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-500">{trainerSessions.length}</p>
            <p className="text-sm text-gray-600">Тренировок</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {trainerSessions.filter(s => s.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-600">Подтверждено</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">
              {timeSlots.length - trainerSessions.length}
            </p>
            <p className="text-sm text-gray-600">Свободно</p>
          </div>
        </Card>
      </div>
    </div>
  );
}