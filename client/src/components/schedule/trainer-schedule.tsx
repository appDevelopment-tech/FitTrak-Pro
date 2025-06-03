import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, User, Plus, Trash2, Edit, Calendar } from "lucide-react";

interface TrainerSession {
  id: number;
  time: string;
  studentName: string;
  status: 'confirmed' | 'pending' | 'free';
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasSession: boolean;
  sessionCount: number;
}

export function TrainerSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  // Примерные данные сессий
  const sessions: TrainerSession[] = [
    { id: 1, time: '09:00', studentName: 'Анна Петрова', status: 'confirmed' },
    { id: 2, time: '11:00', studentName: 'Михаил Сидоров', status: 'pending' },
    { id: 3, time: '14:00', studentName: 'Елена Козлова', status: 'confirmed' },
    { id: 4, time: '16:00', studentName: 'Дмитрий Волков', status: 'pending' },
    { id: 5, time: '18:00', studentName: 'София Морозова', status: 'confirmed' },
  ];

  const getSessionForTime = (time: string) => {
    return sessions.find(session => session.time === time);
  };

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = current.getMonth() === month;
      const isToday = current.toDateString() === new Date().toDateString();
      
      days.push({
        date: current.getDate(),
        isCurrentMonth,
        isToday,
        hasSession: isCurrentMonth && Math.random() > 0.7,
        sessionCount: Math.floor(Math.random() * 4)
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
      setSelectedDate(newDate);
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
    return date.toDateString() === new Date().toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Переключатель вида */}
      <div className="flex justify-end items-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'day' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('day')}
            className="text-xs"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Сегодня
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('month')}
            className="text-xs"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Месяц
          </Button>
        </div>
      </div>

      {viewMode === 'day' ? (
        <Card>
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                  {formatDate(selectedDate)}
                </CardTitle>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                  className="p-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                  className="p-1"
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
                  <div key={time} className="flex items-center py-3 px-4 hover:bg-gray-50">
                    {/* Время */}
                    <div className="w-20 flex-shrink-0">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">{time}</span>
                      </div>
                    </div>

                    {/* Содержимое */}
                    <div className="flex-1 ml-4">
                      {session ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              session.status === 'confirmed' ? 'bg-green-500' : 
                              session.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-800">{session.studentName}</h4>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                              На тренировку
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 p-1">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Свободно</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Добавить ученика
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
      ) : (
        <Card>
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                {monthName}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isSelected = selectedDate && 
                  selectedDate.getDate() === day.date && 
                  selectedDate.getMonth() === currentMonth.getMonth() &&
                  day.isCurrentMonth;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleDayClick(day);
                      setViewMode('day');
                    }}
                    className={`
                      text-center py-2 relative rounded-lg transition-colors text-sm
                      ${!day.isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                      ${day.isToday ? 'bg-orange-100 text-orange-800 font-bold' : ''}
                      ${isSelected ? 'bg-blue-100 text-blue-800 font-semibold' : ''}
                    `}
                  >
                    {day.date}
                    {day.hasSession && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Статистика дня */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-500">{sessions.length}</p>
            <p className="text-sm text-gray-600">Тренировок</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {sessions.filter(s => s.status === 'confirmed').length}
            </p>
            <p className="text-sm text-gray-600">Подтверждено</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {sessions.filter(s => s.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Ожидает</p>
          </div>
        </Card>
      </div>
    </div>
  );
}