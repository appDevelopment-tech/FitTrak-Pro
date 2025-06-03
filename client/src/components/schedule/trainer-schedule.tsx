import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, User, Plus, Trash2, Edit } from "lucide-react";

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

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  // Расписание тренера с данными по дням
  const allTrainerSessions: { [key: string]: TrainerSession[] } = {
    [new Date().toISOString().split('T')[0]]: [
      {
        id: 1,
        time: "09:00",
        studentName: "Иван Петров",
        status: "confirmed"
      },
      {
        id: 2,
        time: "11:00",
        studentName: "Мария Сидорова",
        status: "confirmed"
      },
      {
        id: 3,
        time: "14:00",
        studentName: "Александр Козлов",
        status: "pending"
      },
      {
        id: 4,
        time: "16:00",
        studentName: "Анна Волкова",
        status: "confirmed"
      },
      {
        id: 5,
        time: "18:00",
        studentName: "Сергей Морозов",
        status: "confirmed"
      }
    ]
  };

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    // Добавляем дни предыдущего месяца
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        hasSession: false,
        sessionCount: 0,
      });
    }
    
    // Добавляем дни текущего месяца
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === today.toDateString();
      const dateString = currentDate.toISOString().split('T')[0];
      const sessionsForDay = allTrainerSessions[dateString] || [];
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        hasSession: sessionsForDay.length > 0,
        sessionCount: sessionsForDay.length,
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
      setSelectedDate(newDate);
    }
  };

  const getSessionsForSelectedDate = (): TrainerSession[] => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return allTrainerSessions[dateString] || [];
  };

  const getSessionForTime = (time: string): TrainerSession | null => {
    const sessions = getSessionsForSelectedDate();
    return sessions.find(session => session.time === time) || null;
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>;
      case 'pending':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></div>;
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

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  const sessions = getSessionsForSelectedDate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Календарь месяца */}
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
                    onClick={() => handleDayClick(day)}
                    className={`
                      text-center py-2 relative rounded-lg transition-colors text-sm
                      ${!day.isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                      ${day.isToday && day.isCurrentMonth ? 'bg-orange-500 text-white font-semibold' : ''}
                      ${isSelected && !day.isToday ? 'bg-gray-200' : ''}
                    `}
                  >
                    {day.date}
                    {day.hasSession && !day.isToday && (
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {day.sessionCount}
                      </div>
                    )}
                    {day.hasSession && day.isToday && (
                      <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 bg-white text-orange-500 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {day.sessionCount}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Почасовое расписание */}
        <Card>
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                  {formatDate(selectedDate)}
                </CardTitle>
                {isToday(selectedDate) && (
                  <p className="text-sm text-orange-500 font-medium mt-1">Сегодня</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const session = getSessionForTime(time);
                
                return (
                  <div key={time} className="relative">
                    {session ? (
                      <div className={`rounded-lg p-3 border-2 transition-all hover:shadow-md cursor-pointer ${
                        session.status === 'confirmed' 
                          ? 'bg-green-50 border-green-200 hover:border-green-300' 
                          : session.status === 'pending'
                          ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}>
                        {/* Время в углу */}
                        <div className="absolute top-1 left-1">
                          <span className="text-[10px] font-mono text-gray-500 bg-white px-1 rounded">{time}</span>
                        </div>
                        
                        {/* Ученик */}
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-gray-800 truncate">{session.studentName}</h4>
                        </div>
                        
                        {/* Действия */}
                        <div className="flex justify-between items-center mt-2">
                          <div className={`w-2 h-2 rounded-full ${
                            session.status === 'confirmed' ? 'bg-green-500' : 
                            session.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/50">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:bg-red-50">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg p-3 border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors bg-gray-50/50 hover:bg-gray-100/50 cursor-pointer group">
                        <div className="absolute top-1 left-1">
                          <span className="text-[10px] font-mono text-gray-400">{time}</span>
                        </div>
                        <div className="flex items-center justify-center h-full min-h-[40px]">
                          <Plus className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

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
            <p className="text-2xl font-bold text-blue-500">
              {timeSlots.length - sessions.length}
            </p>
            <p className="text-sm text-gray-600">Свободно</p>
          </div>
        </Card>
      </div>
    </div>
  );
}