import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExtendedCalendarDay {
  date: number;
  fullDate: Date;
  isToday: boolean;
  hasSession: boolean;
  sessionCount: number;
  isWeekend: boolean;
}

interface ExtendedCalendarProps {
  onDateSelect?: (date: Date) => void;
  sessions?: any[];
}

export function ExtendedCalendar({ onDateSelect, sessions = [] }: ExtendedCalendarProps) {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  // Генерация 60 дней начиная с сегодня
  const generate60Days = (baseDate: Date): ExtendedCalendarDay[][] => {
    const days: ExtendedCalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 60; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);
      
      const sessionCount = sessions.filter(session => {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === currentDate.getTime();
      }).length;

      days.push({
        date: currentDate.getDate(),
        fullDate: new Date(currentDate),
        isToday: currentDate.getTime() === today.getTime(),
        hasSession: sessionCount > 0,
        sessionCount,
        isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6
      });
    }

    // Группируем по неделям (7 дней в ряду)
    const weeks: ExtendedCalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  const weeks = generate60Days(startDate);

  const navigateWeeks = (direction: 'prev' | 'next') => {
    const newStartDate = new Date(startDate);
    if (direction === 'prev') {
      newStartDate.setDate(startDate.getDate() - 7);
    } else {
      newStartDate.setDate(startDate.getDate() + 7);
    }
    setStartDate(newStartDate);
  };

  const formatDateRange = () => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 59);
    
    const startMonth = startDate.toLocaleDateString('ru-RU', { month: 'long' });
    const endMonth = endDate.toLocaleDateString('ru-RU', { month: 'long' });
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${year}`;
    } else {
      return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} - ${endMonth} ${year}`;
    }
  };

  const getDayStatusColor = (day: ExtendedCalendarDay) => {
    if (day.isToday) return "bg-blue-500 text-white";
    if (day.hasSession) return "bg-green-100 text-green-800 border-green-300";
    if (day.isWeekend) return "bg-gray-50 text-gray-400";
    return "bg-white text-gray-900 hover:bg-gray-50";
  };

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Расписание на 60 дней</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{formatDateRange()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeeks('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStartDate(new Date())}
            >
              Сегодня
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeeks('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Легенда */}
        <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Сегодня</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Занятые дни</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
            <span>Свободные дни</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-50 rounded"></div>
            <span>Выходные</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-1">
          {/* Заголовки дней недели */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Календарные недели */}
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => onDateSelect?.(day.fullDate)}
                  className={`
                    relative p-2 text-sm border rounded-md transition-colors min-h-[36px] flex items-center justify-center
                    ${getDayStatusColor(day)}
                  `}
                >
                  <span className="text-center">
                    {day.date}
                  </span>
                  
                  {day.hasSession && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1">
                      <Badge variant="secondary" className="text-xs px-1 py-0 h-4 min-w-4">
                        {day.sessionCount}
                      </Badge>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Всего дней: 60</span>
            <span>Занятых дней: {weeks.flat().filter(d => d.hasSession).length}</span>
            <span>Свободных дней: {weeks.flat().filter(d => !d.hasSession && !d.isWeekend).length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}