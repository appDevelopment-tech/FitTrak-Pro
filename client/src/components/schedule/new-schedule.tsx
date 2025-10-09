import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ChevronLeft, ChevronRight, Clock, Plus, Check, Trash2, Dumbbell, Calendar, Settings } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { studentsDb, appointmentsDb } from "@/lib/database";
import type { Pupil, Appointment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

interface ScheduleSession {
  id: number;
  time: string;
  date: string;
  pupils: Pupil[];
  status: 'confirmed' | 'pending';
}

export function NewSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');


  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { isWorkoutActive } = useActiveWorkout();

  const trainerId = 1; // В реальном приложении это будет из контекста пользователя

  // Load students - используем тот же метод что и в учениках
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId], // Используем тот же ключ что и в учениках
    queryFn: () => studentsDb.getByTrainerId(trainerId),
  });

  // Determine if current user is a pupil and find their data
  const currentPupil = user ? pupils.find(pupil => 
    pupil.email === user.email || 
    pupil.phone === user.phone ||
    `${pupil.firstName} ${pupil.lastName}` === user.user_metadata?.full_name
  ) : null;

  const isCurrentUserPupil = !!currentPupil;

  // Load appointments with pupil data - используем тот же метод что и в учениках
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Transform appointments to sessions
  const allSessions: ScheduleSession[] = (appointments || []).map(apt => {
    // Use pupil data from JOIN query, fallback to pupils array
    const pupilData = (apt as any)?.students;
    const pupil = Array.isArray(pupilData) && pupilData.length > 0 ? pupilData[0] : pupils?.find(p => p?.id === apt?.pupilId);
    
    return {
      id: apt?.id || 0,
      time: apt?.time || '',
      date: apt?.date || '',
      pupils: pupil ? [pupil] : [],
      status: (apt?.status as 'confirmed' | 'pending') || 'pending'
    };
  }).filter(session => session.time && session.date);

  // Filter sessions for current pupil if they are a pupil
  const sessions = isCurrentUserPupil && currentPupil 
    ? allSessions.filter(session => 
        session.pupils?.some(pupil => pupil.id === currentPupil.id)
      )
    : allSessions;

  // Time slots from 8:00 to 20:00
  const timeSlots = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

  // Helper functions
  const getSessionForTime = (date: Date, time: string) => {
    const dateString = date.toISOString().split('T')[0];
    return sessions.find(s => s.date === dateString && s.time === time);
  };





  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: number) => {
      await appointmentsDb.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Занятие удалено" });
    },
    onError: (error) => {
      toast({ 
        title: "Ошибка", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async (data: { id: number; status: string }) => {
      await appointmentsDb.update(data.id, { status: data.status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Статус изменен" });
    },
    onError: (error) => {
      toast({ 
        title: "Ошибка", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });





  const handleToggleStatus = (sessionId: number) => {
    const session = appointments.find(s => s.id === sessionId);
    if (!session) return;

    updateAppointmentMutation.mutate({
      id: sessionId,
      status: session.status === 'confirmed' ? 'pending' : 'confirmed'
    });
  };

  const handleDeleteSession = (sessionId: number) => {
    if (window.confirm('Точно удалить это занятие?')) {
      deleteAppointmentMutation.mutate(sessionId);
    }
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
  };

  // Render day view
  const renderDayView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {timeSlots.map(time => {
        const session = getSessionForTime(selectedDate, time);
        
        return (
          <div key={time} className={`flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors border aspect-[2/1] ${
            session && isCurrentUserPupil && session.pupils?.some(p => currentPupil && p.id === currentPupil.id)
              ? 'bg-blue-50 border-blue-300 hover:bg-blue-100' 
              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
          }`}>
            <div className="flex-1 min-h-0 min-w-0 overflow-hidden flex items-center justify-center">
              {session ? (
                <div className="flex flex-col justify-between h-full w-full p-1">
                  {/* Верхняя строка: Время */}
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium text-gray-600">{time}</div>
                  </div>
                  
                  {/* Средняя строка: Имя ученика */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <div className="text-center">
                      <span className="text-xs font-medium truncate leading-tight max-w-full block">
                        {(session.pupils || []).length === 0 ? 'Нет учеников' : 
                          (session.pupils || []).map((p, index) => {
                            const firstName = p?.firstName || '';
                            const lastName = p?.lastName || '';
                            const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
                            const isCurrentUser = isCurrentUserPupil && currentPupil && p.id === currentPupil.id;
                            
                            return (
                              <span key={p.id}>
                                {isCurrentUser ? (
                                  <span className="bg-blue-100 text-blue-700 px-1 rounded font-semibold">
                                    {fullName} (Вы)
                                  </span>
                                ) : (
                                  <span className="font-medium">{fullName}</span>
                                )}
                                {index < (session.pupils || []).length - 1 && ', '}
                              </span>
                            );
                          })
                        }
                      </span>
                    </div>
                  </div>
                  
                  {/* Нижняя строка: Кнопки и счетчик */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {/* Часы для переключения статуса - теперь слева */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleStatus(session.id)}
                        className="h-5 w-5 p-0"
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          session.status === 'confirmed' 
                            ? 'border-2 border-green-500 bg-green-50' 
                            : ''
                        }`}>
                          {session.status === 'confirmed' ? 
                            <Check className="h-2.5 w-2.5 text-green-600" /> : 
                            <Clock className="h-2.5 w-2.5 text-gray-400" />
                          }
                        </div>
                      </Button>
                      <div className={`text-xs font-medium ${
                        (session.pupils?.length || 0) >= 2 ? 'text-red-500' : 'text-orange-500'
                      }`}>
                        {session.pupils?.length || 0}/2
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {session.pupils && session.pupils[0] && isWorkoutActive(trainerId, session.pupils[0].id) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setLocation(`/cabinet?tab=create-workout&pupilId=${session.pupils[0].id}&action=start`)}
                          className="h-5 w-5 p-0 text-green-600"
                        >
                          <Dumbbell className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteSession(session.id)}
                        className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full w-full p-1">
                  {/* Верхняя строка: Время */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-600">{time}</div>
                    <div className="w-2 h-2" /> {/* Пустое место для статуса */}
                  </div>
                  
                  {/* Средняя строка: Свободно */}
                  <div className="flex-1 flex items-center justify-center min-h-0">
                    <div className="text-center">
                      <div className="text-xs font-medium leading-tight text-blue-600">
                        Свободно
                      </div>
                    </div>
                  </div>
                  
                  {/* Нижняя строка: Счетчик */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-blue-500">
                      0/2
                    </div>
                    <div className="w-16" /> {/* Пустое место для кнопок */}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Render month view
  const renderMonthView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Начинаем с понедельника
    const dayOfWeek = firstDay.getDay();
    const adjustDay = dayOfWeek === 0 ? -6 : 1; // Воскресенье (0) считаем как -6 дней к понедельнику
    startDate.setDate(firstDay.getDate() - dayOfWeek + adjustDay);

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) { // 6 недель × 7 дней
      const isCurrentMonth = current.getMonth() === month;
      const isToday = current.toDateString() === new Date().toDateString();
      const isSelected = selectedDate.toDateString() === current.toDateString();
      
      // Проверяем количество занятий на эту дату
      const dateString = current.toISOString().split('T')[0];
      const sessionsOnDate = sessions.filter(s => s.date === dateString);
      const sessionCount = sessionsOnDate.length;
      
      days.push({
        date: current.getDate(),
        fullDate: new Date(current),
        isCurrentMonth,
        isToday,
        isSelected,
        sessionCount,
        hasSessions: sessionCount > 0
      });

      current.setDate(current.getDate() + 1);
    }

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
      <div>
        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Дни месяца */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedDate(day.fullDate);
                setViewMode('day'); // Переключаемся на вид дня
              }}
              className={`
                relative p-2 text-sm rounded-lg transition-all duration-200 min-h-[60px] flex flex-col items-center justify-start
                ${!day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'text-gray-900 bg-white hover:bg-blue-50'}
                ${day.isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                ${day.isSelected && !day.isToday ? 'ring-2 ring-blue-300 bg-blue-100' : ''}
                ${day.hasSessions ? 'font-semibold' : ''}
                hover:shadow-md
                border border-gray-200
              `}
            >
              {/* Число месяца */}
              <div className={`text-sm ${day.isToday ? 'text-blue-600 font-bold' : ''}`}>
                {day.date}
              </div>
              
              {/* Индикатор занятий */}
              {day.hasSessions && (
                <div className="mt-1">
                  {day.sessionCount <= 2 ? (
                    // Показываем точки для небольшого количества
                    <div className="flex gap-1 justify-center">
                      {Array.from({ length: Math.min(day.sessionCount, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            day.sessionCount >= 2 ? 'bg-red-500' : 'bg-blue-500'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    // Показываем число для большого количества
                    <div className="text-xs text-center">
                      <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {day.sessionCount}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Подпись для сегодня */}
              {day.isToday && (
                <div className="text-xs text-blue-600 mt-1">Сегодня</div>
              )}
            </button>
          ))}
        </div>
        
        {/* Легенда */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>1 занятие</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>2+ занятия</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 ring-2 ring-blue-500 rounded-full"></div>
            <span>Сегодня</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="text-lg">Расписание</CardTitle>
                {isCurrentUserPupil && currentPupil && (
                  <div className="text-xs text-blue-600 font-medium">
                    Вы вошли как: {currentPupil.firstName} {currentPupil.lastName}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['day', 'month'] as const).map(mode => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={`text-xs px-3 py-1 h-7 transition-all duration-200 ${
                      viewMode === mode 
                        ? mode === 'day' 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {mode === 'day' ? 'День' : 'Месяц'}
                  </Button>
                ))}
              </div>

              {/* Date navigation */}
              {viewMode === 'day' ? (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() - 1);
                      setSelectedDate(newDate);
                    }}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[150px] text-center">
                    {selectedDate.toLocaleDateString('ru-RU', { 
                      day: 'numeric', 
                      month: 'short'
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() + 1);
                      setSelectedDate(newDate);
                    }}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[150px] text-center">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {viewMode === 'day' && renderDayView()}
          {viewMode === 'month' && renderMonthView()}
        </CardContent>
      </Card>




    </div>
  );
}
