import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Clock, Plus, Check, Trash2, Users, Search, AlertCircle, UserPlus, Dumbbell } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Pupil } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { TwoMonthCalendar } from "./two-month-calendar";
import { useActiveWorkout } from "@/contexts/ActiveWorkoutContext";
import { useLocation } from "wouter";

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
  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  // Загружаем сессии из localStorage при инициализации
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('schedule_sessions') || '[]');
    setSessions(savedSessions);
  }, []);

  // Синхронизируем изменения сессий с localStorage
  useEffect(() => {
    localStorage.setItem('schedule_sessions', JSON.stringify(sessions));
  }, [sessions]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ sessionId: number; pupilId: number } | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isWorkoutActive, getWorkoutProgramName } = useActiveWorkout();
  const [, setLocation] = useLocation();

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

  // Получить сессии для выбранного дня
  const getSessionsForDay = () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return sessions.filter(s => s.date === dateString);
  };

  // Получить сессию для конкретного времени
  const getSessionForTime = (time: string) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
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

    // Правильно форматируем дату без сдвига часовых поясов
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
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

  const handleToggleSessionStatus = (sessionId: number) => {
    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { 
        ...s, 
        status: s.status === 'confirmed' ? 'pending' : 'confirmed' 
      } : s
    ));
  };

  const handleDeleteClick = (sessionId: number, pupilId: number) => {
    setDeleteTarget({ sessionId, pupilId });
    setShowDeleteDialog(true);
  };

  const handleDeleteOneSession = () => {
    if (!deleteTarget) return;
    
    setSessions(prev => prev.map(s => {
      if (s.id === deleteTarget.sessionId) {
        const updatedPupils = s.pupils.filter(p => p.id !== deleteTarget.pupilId);
        if (updatedPupils.length === 0) {
          return null; // Удаляем сессию если учеников не осталось
        }
        return { ...s, pupils: updatedPupils };
      }
      return s;
    }).filter(Boolean) as ScheduleSession[]);
    
    setShowDeleteDialog(false);
    setDeleteTarget(null);
  };

  const handleDeleteTrainingPlan = () => {
    if (!deleteTarget) return;
    
    // Удаляем ученика из всех сессий (весь тренировочный план)
    setSessions(prev => prev.map(s => {
      const updatedPupils = s.pupils.filter(p => p.id !== deleteTarget.pupilId);
      if (updatedPupils.length === 0) {
        return null; // Удаляем сессию если учеников не осталось
      }
      return { ...s, pupils: updatedPupils };
    }).filter(Boolean) as ScheduleSession[]);
    
    setShowDeleteDialog(false);
    setDeleteTarget(null);
    
    toast({
      title: "Успешно",
      description: "Тренировочный план удален",
    });
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newDate);
  };

  const renderCalendar = (days: CalendarDay[], month: Date) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-lg">
            {monthNames[month.getMonth()]} {month.getFullYear()}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
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
                p-2 text-sm rounded hover:bg-blue-50 transition-colors text-center flex items-center justify-center min-h-[36px]
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
        {/* Левая колонка - двухмесячный календарь */}
        <div className="lg:col-span-1">
          <TwoMonthCalendar 
            onDateSelect={setSelectedDate}
            sessions={sessions}
          />
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
                        <div className="flex items-center gap-3 flex-wrap">
                          {session.pupils.map(pupil => (
                            <div key={pupil.id} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border">
                              <span className="text-sm font-medium">
                                {pupil.lastName} {pupil.firstName}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleToggleSessionStatus(session.id)}
                                  className={`p-1.5 rounded-full transition-colors ${
                                    session.status === 'confirmed' 
                                      ? 'text-green-600 bg-green-100 hover:bg-green-200' 
                                      : 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200'
                                  }`}
                                  title={session.status === 'confirmed' ? 'Снять подтверждение' : 'Подтвердить'}
                                >
                                  {session.status === 'confirmed' ? 
                                    <Check className="h-4 w-4" /> : 
                                    <Clock className="h-4 w-4" />
                                  }
                                </button>
                                <button
                                  onClick={() => {
                                    const trainerId = 1; // Получаем из контекста пользователя

                                    if (isWorkoutActive(trainerId, pupil.id)) {
                                      // Если тренировка активна - открываем ее
                                      toast({
                                        title: "Открытие тренировки",
                                        description: `Открываем активную тренировку для ${pupil.firstName} ${pupil.lastName}`,
                                      });
                                      // Переходим в кабинет с вкладкой создания тренировки для выполнения
                                      setLocation(`/cabinet?tab=create-workout&pupilId=${pupil.id}&action=start`);
                                    } else {
                                      // Если тренировка не активна - переходим к выбору планов
                                      toast({
                                        title: "Прикрепление плана",
                                        description: `Выберите план тренировки для ${pupil.firstName} ${pupil.lastName}`,
                                      });
                                      // Переходим в кабинет с вкладкой готовых планов для выбора
                                      setLocation(`/cabinet?tab=programs&pupilId=${pupil.id}`);
                                    }
                                  }}
                                  className={`p-1.5 rounded-full transition-colors ${
                                    isWorkoutActive(1, pupil.id)
                                      ? 'text-orange-600 bg-orange-100 hover:bg-orange-200'
                                      : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
                                  }`}
                                  title={isWorkoutActive(1, pupil.id) 
                                    ? `Открыть активную тренировку: ${getWorkoutProgramName(1, pupil.id) || 'План'}` 
                                    : "Прикрепить тренировочный план"}
                                >
                                  <Dumbbell className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(session.id, pupil.id)}
                                  className="p-1.5 rounded-full text-red-600 bg-red-100 hover:bg-red-200 transition-colors"
                                  title="Удалить из расписания"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
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
                        title="Добавить ученика"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
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
            <DialogDescription>
              Выберите одного или нескольких учеников для записи на тренировку
            </DialogDescription>
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

      {/* Диалог подтверждения удаления */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Удалить тренировку</DialogTitle>
            <DialogDescription>
              Выберите действие для ученика
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              Что вы хотите удалить?
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleDeleteOneSession}
                variant="outline"
                className="justify-start h-auto py-3 px-4"
              >
                <div className="text-left">
                  <div className="font-medium">Удалить одну тренировку</div>
                  <div className="text-sm text-gray-500">Только эту запись на выбранное время</div>
                </div>
              </Button>
              
              <Button
                onClick={handleDeleteTrainingPlan}
                variant="outline"
                className="justify-start h-auto py-3 px-4 border-red-200 hover:bg-red-50"
              >
                <div className="text-left">
                  <div className="font-medium text-red-600">Удалить весь тренировочный план</div>
                  <div className="text-sm text-red-500">Все записи этого ученика в расписании</div>
                </div>
              </Button>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}