import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CalendarDay {
  date: number;
  fullDate: Date;
  isToday: boolean;
  hasSession: boolean;
  sessionCount: number;
  isCurrentMonth: boolean;
}

interface TwoMonthCalendarProps {
  onDateSelect?: (date: Date) => void;
  sessions?: any[];
}

export function TwoMonthCalendar({ onDateSelect, sessions = [] }: TwoMonthCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const generateMonthDays = (monthDate: Date): CalendarDay[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Корректируем для понедельника как первого дня недели
    const firstDayOfWeek = firstDay.getDay();
    const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - adjustedFirstDay);

    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const currentDateLoop = new Date(startDate);
      currentDateLoop.setDate(startDate.getDate() + i);
      
      const sessionCount = sessions.filter(session => {
        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);
        return sessionDate.getTime() === currentDateLoop.getTime();
      }).length;

      days.push({
        date: currentDateLoop.getDate(),
        fullDate: new Date(currentDateLoop),
        isToday: currentDateLoop.getTime() === today.getTime(),
        hasSession: sessionCount > 0,
        sessionCount,
        isCurrentMonth: currentDateLoop.getMonth() === month
      });
    }

    return days;
  };

  const getDayStatusColor = (day: CalendarDay) => {
    if (day.isToday) return "bg-blue-500 text-white";
    if (day.hasSession) return "bg-green-100 text-green-800 border-green-300";
    if (!day.isCurrentMonth) return "bg-gray-50 text-gray-300";
    return "bg-white text-gray-900 hover:bg-gray-50";
  };

  const navigateMonths = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const month1 = new Date(currentDate);
  const month2 = new Date(currentDate);
  month2.setMonth(month2.getMonth() + 1);

  const month1Days = generateMonthDays(month1);
  const month2Days = generateMonthDays(month2);

  const month1Name = `${monthNames[month1.getMonth()]} ${month1.getFullYear()}`;
  const month2Name = `${monthNames[month2.getMonth()]} ${month2.getFullYear()}`;

  // Группируем дни по неделям
  const groupByWeeks = (days: CalendarDay[]) => {
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  const month1Weeks = groupByWeeks(month1Days);
  const month2Weeks = groupByWeeks(month2Days);

  const renderMonth = (weeks: CalendarDay[][], monthName: string) => (
    <div className="space-y-1">
      <h3 className="text-center font-medium text-gray-900 mb-3">{monthName}</h3>
      
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
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Расписание</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonths('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date();
                today.setDate(1);
                setCurrentDate(today);
              }}
            >
              Сегодня
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonths('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {renderMonth(month1Weeks, month1Name)}
          {renderMonth(month2Weeks, month2Name)}
        </div>
      </CardContent>
    </Card>
  );
}