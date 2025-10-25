import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";

import { ChevronLeft, ChevronRight, Clock, Plus, Check, Trash2, Dumbbell, Calendar, Users, Settings } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { studentsDb, appointmentsDb } from "@/lib/database";
import type { Pupil, Appointment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import { useLocation } from "wouter";
import { ScheduleSlot } from "./schedule-slot";

interface ScheduleSession {
  id: string;
  time: string;
  date: string;
  pupils: Pupil[];
  status: 'confirmed' | 'pending';
}

export function CompactSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isWorkoutActive, getWorkoutProgramName } = useActiveWorkout();
  const [, setLocation] = useLocation();

  const { user: authUser } = useAuth();
  const trainerId = authUser?.id || '';

  // Load students - используем тот же метод что и в учениках
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => studentsDb.getByTrainerId(trainerId),
  });

  // Load appointments - используем тот же метод что и в учениках
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Transform appointments to sessions
  const sessions: ScheduleSession[] = appointments.map(apt => {
    // Use pupil data from JOIN query, fallback to pupils array
    const pupilData = (apt as any)?.students;
    const pupil = Array.isArray(pupilData) && pupilData.length > 0 ? pupilData[0] : pupils.find(p => p.id === apt.pupilId);
    
    return {
      id: apt.id,
      time: apt.time,
      date: apt.date,
      pupils: pupil ? [pupil] : [],
      status: apt.status as 'confirmed' | 'pending'
    };
  });



  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: string) => {
      await appointmentsDb.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Занятие удалено" });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async (data: { id: string; status: string }) => {
      await appointmentsDb.update(data.id, { status: data.status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
    },
  });

  // Time slots from 8:00 to 20:00 with 1-hour intervals
  const timeSlots = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

  // Helper functions
  const getSessionsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return sessions.filter(s => s.date === dateString);
  };

  const getSessionForTime = (date: Date, time: string) => {
    const dateString = date.toISOString().split('T')[0];
    return sessions.find(s => s.date === dateString && s.time === time);
  };





  const handleToggleStatus = (sessionId: string) => {
    const session = appointments.find(s => s.id === sessionId);
    if (!session) return;

    updateAppointmentMutation.mutate({
      id: sessionId,
      status: session.status === 'confirmed' ? 'pending' : 'confirmed'
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteAppointmentMutation.mutate(sessionId);
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
  };

  // Render functions
  const renderDayView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {timeSlots.map(time => (
        <ScheduleSlot
          key={time}
          time={time}
          date={selectedDate.toISOString().split('T')[0]}
          appointments={appointments}
          pupils={pupils}
          currentPupil={undefined} // В компактном расписании нет текущего пользователя
          isTrainer={true} // Это компонент для тренера
          maxSlots={2}
          onToggleStatus={handleToggleStatus}
          onDeleteAppointment={handleDeleteSession}
          onStartWorkout={(pupilId) => setLocation(`/cabinet?tab=create-workout&pupilId=${pupilId}&action=start`)}
          isWorkoutActive={isWorkoutActive}
          trainerId={trainerId}
        />
      ))}
    </div>
  );



  const renderMonthView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() || 7) + 1);

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 35; i++) {
      const isCurrentMonth = current.getMonth() === month;
      const isToday = current.toDateString() === new Date().toDateString();
      const dateString = current.toISOString().split('T')[0];
      const sessionsOnDate = sessions.filter(s => s.date === dateString);

      days.push({
        date: current.getDate(),
        fullDate: new Date(current),
        isCurrentMonth,
        isToday,
        sessionCount: sessionsOnDate.length
      });

      current.setDate(current.getDate() + 1);
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                if (day.isCurrentMonth) {
                  setSelectedDate(day.fullDate);
                  setViewMode('day');
                }
              }}
              className={`
                p-2 text-sm rounded transition-colors relative
                ${!day.isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                ${day.isToday ? 'bg-blue-500 text-white' : ''}
                ${selectedDate.toDateString() === day.fullDate.toDateString() && !day.isToday ? 'bg-gray-200' : ''}
              `}
            >
              {day.date}
              {day.sessionCount > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    {day.sessionCount}
                  </Badge>
                </div>
              )}
            </button>
          ))}
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
              <CardTitle className="text-lg">Расписание</CardTitle>
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

              {/* Month navigation */}
              {viewMode === 'month' && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[120px] text-center">
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

              {/* Date navigation for day view */}
              {viewMode === 'day' && (
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