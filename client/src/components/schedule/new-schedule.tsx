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
import { ScheduleSlot } from "./schedule-slot";

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
  const { isWorkoutActive, getWorkoutProgramName } = useActiveWorkout();
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const trainerId = 1; // В реальном приложении это будет из контекста пользователя

  // Load students
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => studentsDb.getByTrainerId(trainerId),
  });

  // Load appointments
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Transform appointments to sessions
  const sessions: ScheduleSession[] = appointments.map(apt => {
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

  // Find current pupil
  const currentPupil = pupils.find(p => p.email === user?.email);

  // Check if current user is trainer or pupil
  const isCurrentUserTrainer = user?.user_metadata?.is_trainer === true;
  const isCurrentUserPupil = !isCurrentUserTrainer && currentPupil;

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: number) => {
      await appointmentsDb.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Занятие удалено" });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async (data: { id: number; status: string }) => {
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

  const handleToggleStatus = (sessionId: number) => {
    const session = appointments.find(s => s.id === sessionId);
    if (!session) return;

    updateAppointmentMutation.mutate({
      id: sessionId,
      status: session.status === 'confirmed' ? 'pending' : 'confirmed'
    });
  };

  const handleDeleteSession = (sessionId: number) => {
    deleteAppointmentMutation.mutate(sessionId);
  };

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
  };

  // Render day view
  const renderDayView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {timeSlots.map(time => (
        <ScheduleSlot
          key={time}
          time={time}
          date={selectedDate.toISOString().split('T')[0]}
          appointments={appointments}
          pupils={pupils}
          currentPupil={currentPupil}
          isTrainer={isCurrentUserTrainer}
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

  // Render month view
  const renderMonthView = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday = date.toDateString() === new Date().toDateString();
          const daySessions = getSessionsForDay(date);
          const totalSessions = daySessions.length;
          const confirmedSessions = daySessions.filter(s => s.status === 'confirmed').length;

          return (
            <div
              key={index}
              className={`
                p-2 min-h-[60px] border border-gray-200 cursor-pointer hover:bg-gray-50
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                ${isToday ? 'bg-blue-50 border-blue-300' : ''}
              `}
              onClick={() => {
                setSelectedDate(date);
                setViewMode('day');
              }}
            >
              <div className="text-sm font-medium text-gray-700 mb-1">
                {date.getDate()}
              </div>
              {totalSessions > 0 && (
                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Всего:</span>
                    <span className="font-medium">{totalSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600">Подтверждено:</span>
                    <span className="font-medium text-green-600">{confirmedSessions}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Расписание тренировок</h1>
          <p className="text-gray-600">
            {isCurrentUserTrainer ? 'Управление расписанием' : 'Просмотр доступных тренировок'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('day')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            День
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Месяц
          </Button>
        </div>
      </div>

      {/* Day View */}
      {viewMode === 'day' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {selectedDate.toLocaleDateString('ru-RU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Сегодня
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderDayView()}
          </CardContent>
        </Card>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Текущий месяц
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderMonthView()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}