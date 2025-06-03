import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarDay } from "@/lib/types";

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export function CalendarView({ onDateSelect, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: CalendarDay[] = [];
    
    // Add previous month's days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isToday: false,
        hasWorkout: false,
      });
    }
    
    // Add current month's days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === today.toDateString();
      
      // Mock workout data - in real app this would come from props
      const hasWorkout = [8, 15, 22].includes(day);
      const workoutType = day === 8 ? 'strength' : day === 15 ? 'cardio' : 'functional';
      
      days.push({
        date: day,
        isCurrentMonth: true,
        isToday,
        hasWorkout,
        workoutType: hasWorkout ? workoutType : undefined,
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

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
      onDateSelect(newDate);
    }
  };

  const getWorkoutIndicatorColor = (workoutType?: string) => {
    switch (workoutType) {
      case 'strength':
        return 'bg-orange-500';
      case 'cardio':
        return 'bg-blue-500';
      case 'functional':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
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
                  text-center py-3 relative rounded-lg transition-colors
                  ${!day.isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                  ${day.isToday && day.isCurrentMonth ? 'bg-orange-500 text-white font-semibold' : ''}
                  ${isSelected && !day.isToday ? 'bg-gray-200' : ''}
                `}
              >
                {day.date}
                {day.hasWorkout && (
                  <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${getWorkoutIndicatorColor(day.workoutType)}`} />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
