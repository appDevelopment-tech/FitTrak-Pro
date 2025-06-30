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
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setDate(1); // Начинаем с первого числа текущего месяца
    today.setHours(0, 0, 0, 0);
    return today;
  });

  // Генерация двух месяцев
  const generateTwoMonths = (): { month1: ExtendedCalendarDay[][], month2: ExtendedCalendarDay[][], month1Name: string, month2Name: string } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const month1 = new Date(currentDate);
    const month2 = new Date(currentDate);
    month2.setMonth(month2.getMonth() + 1);

    const generateMonthDays = (monthDate: Date): ExtendedCalendarDay[][] => {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // Корректируем для понедельника как первого дня недели
      const firstDayOfWeek = firstDay.getDay();
      const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - adjustedFirstDay);

      const days: ExtendedCalendarDay[] = [];

      for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
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

    const month1Days = generateMonthDays(month1);
    const month2Days = generateMonthDays(month2);
    
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    return {
      month1: month1Days,
      month2: month2Days,
      month1Name: `${monthNames[month1.getMonth()]} ${month1.getFullYear()}`,
      month2Name: `${monthNames[month2.getMonth()]} ${month2.getFullYear()}`
    };
  };

  const { month1, month2, month1Name, month2Name } = generateTwoMonths();

  const navigateMonths = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDayStatusColor = (day: ExtendedCalendarDay, isCurrentMonth: boolean) => {
    if (day.isToday) return "bg-blue-500 text-white";
    if (day.hasSession) return "bg-green-100 text-green-800 border-green-300";
    if (!isCurrentMonth) return "bg-gray-50 text-gray-300";
    return "bg-white text-gray-900 hover:bg-gray-50";
  };

  const renderMonth = (weeks: ExtendedCalendarDay[][], monthName: string, monthDate: Date) => {
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    return (
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
            {week.map((day, dayIndex) => {
              const isCurrentMonth = day.fullDate.getMonth() === monthDate.getMonth();
              return (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => onDateSelect?.(day.fullDate)}
                  className={`
                    relative p-2 text-sm border rounded-md transition-colors min-h-[36px] flex items-center justify-center
                    ${getDayStatusColor(day, isCurrentMonth)}
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
              );
            })}
          </div>
        ))}
      </div>
    );
  };

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
          {renderMonth(month1, month1Name, new Date(currentDate))}
          {renderMonth(month2, month2Name, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        </div>
      </CardContent>
    </Card>
  );
}