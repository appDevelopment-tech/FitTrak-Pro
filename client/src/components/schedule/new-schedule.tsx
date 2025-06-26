import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Clock, Plus, Check, Trash2, Users, Search, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Pupil } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ScheduleSession {
  id: number;
  time: string;
  date: string;
  pupils: Pupil[];
  status: 'confirmed' | 'pending';
}

interface CalendarDay {
  date: number;
  fullDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasSession: boolean;
}

export function NewSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth1, setCurrentMonth1] = useState(new Date());
  const [currentMonth2, setCurrentMonth2] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPupils, setSelectedPupils] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPupilForm, setShowAddPupilForm] = useState(false);
  const [newPupilData, setNewPupilData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [sessions, setSessions] = useState<ScheduleSession[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Загружаем учеников
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['/api/trainers/1/pupils'],
  });

  // Мутация для создания нового ученика
  const createPupilMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/trainers/1/pupils', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/pupils'] });
      setShowAddPupilForm(false);
      setNewPupilData({ firstName: '', lastName: '', phone: '', email: '' });
      toast({
        title: "Успешно",
        description: "Ученик добавлен",
      });
    },
  });

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  // Генерация календарных дней
  const generateCalendarDays = (baseDate: Date): CalendarDay[] => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      days.push({
        date: currentDate.getDate(),
        fullDate: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        hasSession: sessions.some(s => s.date === currentDate.toISOString().split('T')[0])
      });
    }

    return days;
  };

  const calendar1Days = generateCalendarDays(currentMonth1);
  const calendar2Days = generateCalendarDays(currentMonth2);

  // Получить сессии для выбранного дня
  const getSessionsForDay = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return sessions.filter(s => s.date === dateString);
  };

  // Получить сессию для конкретного времени
  const getSessionForTime = (time: string) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return sessions.find(s => s.date === dateString && s.time === time);
  };

  // Фильтрованные ученики для поиска
  const filteredPupils = pupils.filter(pupil => 
    `${pupil.firstName} ${pupil.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pupil.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pupil.phone.includes(searchTerm)
  );

  // Обработчики
  const handleDateClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.fullDate);
    }
  };

  const handleAddPupil = (time: string) => {
    setSelectedTime(time);
    setSelectedPupils([]);
    setSearchTerm('');
    setShowAddDialog(true);
  };

  const handlePupilToggle = (pupilId: number) => {
    setSelectedPupils(prev => 
      prev.includes(pupilId) 
        ? prev.filter(id => id !== pupilId)
        : [...prev, pupilId]
    );
  };

  const checkConflicts = (time: string, pupilIds: number[]) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const existingSession = getSessionForTime(time);
    const selectedPupilNames = pupils.filter(p => pupilIds.includes(p.id)).map(p => `${p.firstName} ${p.lastName}`);

    // Проверка на повторную запись того же ученика на то же время
    if (existingSession) {
      const duplicates = pupilIds.filter(id => 
        existingSession.pupils.some(p => p.id === id)
      );
      
      if (duplicates.length > 0) {
        const duplicateNames = pupils.filter(p => duplicates.includes(p.id)).map(p => `${p.firstName} ${p.lastName}`);
        toast({
          title: "Ошибка",
          description: `Ученик ${duplicateNames.join(', ')} уже записан!`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Проверка на запись того же ученика в другое время в тот же день
    const dayConflicts = sessions.filter(s => 
      s.date === dateString && 
      s.time !== time &&
      s.pupils.some(p => pupilIds.includes(p.id))
    );

    if (dayConflicts.length > 0) {
      const conflictTimes = dayConflicts.map(s => s.time).join(', ');
      const confirmAdd = window.confirm(
        `Внимание! Ученик записан на ${conflictTimes}. Вы точно хотите добавить на ${time}?`
      );
      if (!confirmAdd) return false;
    }

    // Проверка на добавление в группу
    if (existingSession && existingSession.pupils.length > 0) {
      const existingNames = existingSession.pupils.map(p => `${p.firstName} ${p.lastName}`).join(', ');
      const confirmGroup = window.confirm(
        `На это время записан ${existingNames}. Добавить в группу?`
      );
      if (!confirmGroup) return false;
    }

    return true;
  };

  const handleConfirmAdd = () => {
    if (selectedPupils.length === 0) return;

    if (!checkConflicts(selectedTime, selectedPupils)) {
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    const existingSession = getSessionForTime(selectedTime);
    const newPupils = pupils.filter(p => selectedPupils.includes(p.id));

    if (existingSession) {
      // Добавляем к существующей сессии
      const updatedSession = {
        ...existingSession,
        pupils: [...existingSession.pupils, ...newPupils]
      };
      setSessions(prev => prev.map(s => 
        s.id === existingSession.id ? updatedSession : s
      ));
    } else {
      // Создаем новую сессию
      const newSession: ScheduleSession = {
        id: Date.now(),
        time: selectedTime,
        date: dateString,
        pupils: newPupils,
        status: 'pending'
      };
      setSessions(prev => [...prev, newSession]);
    }

    setShowAddDialog(false);
    setSelectedPupils([]);
    setSearchTerm('');
  };

  const handleQuickAddPupil = () => {
    if (!newPupilData.firstName || !newPupilData.lastName || !newPupilData.phone || !newPupilData.email) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    createPupilMutation.mutate({
      ...newPupilData,
      trainerId: 1,
      joinDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleConfirmSession = (sessionId: number) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, status: 'confirmed' } : s
    ));
  };

  const handleRemovePupil = (sessionId: number, pupilId: number) => {
    setSessions(prev => prev.map(s => {
      if (s.id === sessionId) {
        const updatedPupils = s.pupils.filter(p => p.id !== pupilId);
        if (updatedPupils.length === 0) {
          return null; // Удаляем сессию если учеников не осталось
        }
        return { ...s, pupils: updatedPupils };
      }
      return s;
    }).filter(Boolean) as ScheduleSession[]);
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const navigateMonth = (direction: 'prev' | 'next', monthNumber: 1 | 2) => {
    if (monthNumber === 1) {
      const newDate = new Date(currentMonth1);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      setCurrentMonth1(newDate);
    } else {
      const newDate = new Date(currentMonth2);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      setCurrentMonth2(newDate);
    }
  };

  const renderCalendar = (days: CalendarDay[], currentMonth: Date, monthNumber: 1 | 2) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev', monthNumber)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-lg">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next', monthNumber)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={`
                p-2 text-sm rounded hover:bg-blue-50 transition-colors
                ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                ${day.isToday ? 'bg-blue-100 font-semibold' : ''}
                ${selectedDate.toDateString() === day.fullDate.toDateString() ? 'bg-blue-500 text-white' : ''}
                ${day.hasSession ? 'border-2 border-orange-300' : ''}
              `}
            >
              {day.date}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - календари */}
        <div className="lg:col-span-1">
          {renderCalendar(calendar1Days, currentMonth1, 1)}
          {renderCalendar(calendar2Days, currentMonth2, 2)}
        </div>

        {/* Правая колонка - расписание дня */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Расписание на {selectedDate.toLocaleDateString('ru-RU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timeSlots.map(time => {
                const session = getSessionForTime(time);
                
                return (
                  <div key={time} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 w-16">{time}</span>
                      
                      {session ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          {session.pupils.map(pupil => (
                            <div key={pupil.id} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                              <span className="text-sm font-medium">
                                {pupil.lastName} {pupil.firstName}
                              </span>
                              <button
                                onClick={() => handleConfirmSession(session.id)}
                                className={`p-1 rounded-full ${
                                  session.status === 'confirmed' 
                                    ? 'text-green-600 bg-green-100' 
                                    : 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200'
                                }`}
                              >
                                {session.status === 'confirmed' ? 
                                  <Check className="h-3 w-3" /> : 
                                  <Clock className="h-3 w-3" />
                                }
                              </button>
                              <button
                                onClick={() => handleRemovePupil(session.id, pupil.id)}
                                className="p-1 rounded-full text-red-600 bg-red-100 hover:bg-red-200"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">Свободно</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddPupil(time)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить ученика
                      </Button>
                      
                      {session && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Тренировка
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Диалог добавления ученика */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить ученика на {selectedTime}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск по имени, email или телефону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Список учеников */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredPupils.length > 0 ? (
                filteredPupils.map(pupil => (
                  <div key={pupil.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Checkbox
                      checked={selectedPupils.includes(pupil.id)}
                      onCheckedChange={() => handlePupilToggle(pupil.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{pupil.lastName} {pupil.firstName}</p>
                      <p className="text-sm text-gray-500">{pupil.phone} • {pupil.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Ученики не найдены
                </div>
              )}
            </div>

            {/* Быстрое добавление ученика */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Добавить нового ученика</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddPupilForm(!showAddPupilForm)}
                >
                  {showAddPupilForm ? 'Скрыть' : 'Показать форму'}
                </Button>
              </div>

              {showAddPupilForm && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Имя*</Label>
                    <Input
                      value={newPupilData.firstName}
                      onChange={(e) => setNewPupilData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Введите имя"
                    />
                  </div>
                  <div>
                    <Label>Фамилия*</Label>
                    <Input
                      value={newPupilData.lastName}
                      onChange={(e) => setNewPupilData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Введите фамилию"
                    />
                  </div>
                  <div>
                    <Label>Телефон*</Label>
                    <Input
                      value={newPupilData.phone}
                      onChange={(e) => setNewPupilData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label>Email*</Label>
                    <Input
                      type="email"
                      value={newPupilData.email}
                      onChange={(e) => setNewPupilData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      onClick={handleQuickAddPupil}
                      disabled={createPupilMutation.isPending}
                      className="w-full"
                    >
                      {createPupilMutation.isPending ? 'Добавление...' : 'Добавить ученика'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Кнопки действий */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Отмена
              </Button>
              <Button 
                onClick={handleConfirmAdd}
                disabled={selectedPupils.length === 0}
              >
                Добавить ({selectedPupils.length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}