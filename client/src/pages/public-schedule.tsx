import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, LogIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { studentsDb } from "@/lib/database";
import type { Pupil, Appointment } from "@shared/schema";
import { useLocation } from "wouter";

interface ScheduleSession {
  id: string;
  time: string;
  date: string;
  pupils: Pupil[];
  status: 'confirmed' | 'pending';
}

export default function PublicSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [, setLocation] = useLocation();

  const trainerId = '550e8400-e29b-41d4-a716-446655440000'; // Main trainer UUID

  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => fetch(`/api/trainers/${trainerId}/pupils`).then(res => res.json()),
  });

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => Promise.resolve([]), // Пока нет API для записей, возвращаем пустой массив
  });

  const allSessions: ScheduleSession[] = (appointments || []).map(apt => {
    const pupilData = (apt as any)?.students;
    const pupil = Array.isArray(pupilData) && pupilData.length > 0 ? pupilData[0] : pupils?.find(p => p?.id === apt?.pupilId);
    return {
      id: apt?.id || '',
      time: apt?.time || '',
      date: apt?.date || '',
      pupils: pupil ? [pupil] : [],
      status: (apt?.status as 'confirmed' | 'pending') || 'pending'
    };
  }).filter(s => s.time && s.date);

  const timeSlots = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

  const getSessionForTime = (date: Date, time: string) => {
    const dateString = date.toISOString().split('T')[0];
    return allSessions.find(s => s.date === dateString && s.time === time);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const renderDayView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {timeSlots.map(time => {
        const session = getSessionForTime(selectedDate, time);
        const isBusy = Boolean(session);
        const pupilsNames = (session?.pupils || []).map(p => `${p.firstName || ''} ${p.lastName || ''}`.trim()).join(', ');

        return (
          <div key={time} className={`flex flex-col gap-1 p-2 rounded-lg border aspect-[2/1] ${isBusy ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'}`} aria-label={`Слот ${time} ${isBusy ? 'занят' : 'свободен'}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">{time}</div>
              <div className={`w-2 h-2 rounded-full ${isBusy ? 'bg-red-500' : 'bg-green-500'}`} />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className={`text-xs font-medium ${isBusy ? 'text-gray-600' : 'text-green-700'}`}>
                {isBusy ? (pupilsNames || 'Занято') : 'Свободно'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  const renderMonthView = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const adjustDay = dayOfWeek === 0 ? -6 : 1;
    startDate.setDate(firstDay.getDate() - dayOfWeek + adjustDay);

    const days: { date: Date; sessionCount: number; isCurrentMonth: boolean; isToday: boolean }[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = current.getMonth() === month;
      const isToday = current.toDateString() === new Date().toDateString();
      const dateString = current.toISOString().split('T')[0];
      const sessionCount = allSessions.filter(s => s.date === dateString).length;
      days.push({ date: new Date(current), sessionCount, isCurrentMonth, isToday });
      current.setDate(current.getDate() + 1);
    }

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => (
            <div key={idx} className={`relative p-2 text-sm rounded-lg min-h-[60px] flex flex-col items-center justify-start border ${day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400'} ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}>
              <div className={`text-sm ${day.isToday ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>{day.date.getDate()}</div>
              {day.sessionCount > 0 && (
                <div className="mt-1">
                  {day.sessionCount <= 2 ? (
                    <div className="flex gap-1 justify-center">
                      {Array.from({ length: Math.min(day.sessionCount, 3) }).map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${day.sessionCount >= 2 ? 'bg-red-500' : 'bg-blue-500'}`} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-center">
                      <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{day.sessionCount}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <h1 className="text-lg font-semibold">Публичное расписание</h1>
            <p className="text-xs text-muted-foreground">Просмотр доступных и занятых слотов</p>
          </div>
        </div>
        <Button onClick={() => setLocation('/login')} className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base">Расписание</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['day', 'month'] as const).map(mode => (
                  <Button key={mode} variant={viewMode === mode ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode(mode)} className={`text-xs px-3 py-1 h-7 ${viewMode === mode ? (mode === 'day' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-green-500 text-white hover:bg-green-600') : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}>
                    {mode === 'day' ? 'День' : 'Месяц'}
                  </Button>
                ))}
              </div>

              {viewMode === 'day' ? (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => navigateDay('prev')} className="h-7 w-7 p-0"><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-sm font-medium min-w-[150px] text-center">
                    {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => navigateDay('next')} className="h-7 w-7 p-0"><ChevronRight className="h-4 w-4" /></Button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')} className="h-7 w-7 p-0"><ChevronLeft className="h-4 w-4" /></Button>
                  <span className="text-sm font-medium min-w-[150px] text-center">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')} className="h-7 w-7 p-0"><ChevronRight className="h-4 w-4" /></Button>
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

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /><span>Свободно</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /><span>Занято</span></div>
        <div className="ml-auto text-muted-foreground">Для записи войдите в систему</div>
      </div>
    </div>
  );
}












