import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentsDb, studentsDb } from "@/lib/database";
import type { Appointment, Pupil, InsertPupil } from "@shared/schema";
import { Calendar, Check, Clock, UserPlus, LogIn, ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleSlot } from "./schedule-slot";
import { generatePassword } from "@/lib/utils";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

export function BookingWidget() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCreatePupil, setShowCreatePupil] = useState(false);

  const { user, signIn, signUp, userProfile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Получаем ID тренера из профиля ученика
  const trainerId = useMemo(() => {
    // Если есть userProfile с trainer_id - используем его
    if (userProfile?.trainer_id) {
      console.log('✅ Using trainer_id from userProfile:', userProfile.trainer_id);
      return userProfile.trainer_id;
    }
    // Fallback на дефолтный ID тренера
    console.log('⚠️ Using fallback trainer ID');
    return "48938b26-eafd-494b-98d7-1eaffe36f758";
  }, [userProfile]);

  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => studentsDb.getByTrainerId(trainerId),
  });

  const currentPupil = useMemo(() => {
    if (!user) return null;
    return pupils.find(p => p.email === user.email || p.phone === (user as any)?.phone);
  }, [user, pupils]);

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  const occupiedTimes = useMemo(() => {
    // Создаем Map для подсчета количества записей на каждое время
    const map = new Map<string, number>();
    appointments.forEach(a => {
      if (a.date && a.time) {
        const key = `${a.date}|${a.time}`;
        map.set(key, (map.get(key) || 0) + 1);
      }
    });
    return map;
  }, [appointments]);

  const createAppointmentMutation = useMutation({
    mutationFn: async (payload: { date: string; time: string; pupilId: string }) => {
      return await appointmentsDb.create({
        trainerId,
        pupilId: payload.pupilId,
        date: payload.date,
        time: payload.time,
        status: 'pending',
      });
    },
    onSuccess: async (appointment) => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      
      // Отправляем уведомление тренеру о новой заявке
      if (currentPupil) {
        try {
          await fetch('/api/notifications/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'new-booking',
              appointment: appointment,
              student: {
                firstName: currentPupil.firstName,
                lastName: currentPupil.lastName,
                email: currentPupil.email,
                phone: currentPupil.phone
              },
              trainerEmail: 'petrusenkokv@yandex.ru'
            })
          });
          console.log('✅ Уведомление тренеру отправлено');
        } catch (error) {
          console.error('❌ Ошибка отправки уведомления:', error);
        }
      }
      
      toast({ 
        title: 'Заявка отправлена', 
        description: 'Ваша заявка ожидает подтверждения тренера. Вы получите уведомление после подтверждения.' 
      });
      setShowConfirmDialog(false);
      setSelectedSlot(null);
    },
    onError: (err: any) => {
      toast({ title: 'Ошибка', description: err?.message || 'Не удалось записаться', variant: 'destructive' });
    }
  });

  const createPupilMutation = useMutation({
    mutationFn: async (form: InsertPupil) => {
      return await studentsDb.create(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
      toast({ title: 'Профиль создан', description: 'Продолжите запись на выбранное время' });
      setShowCreatePupil(false);
      setShowConfirmDialog(true);
    },
    onError: (err: any) => {
      toast({ title: 'Ошибка', description: err?.message || 'Не удалось создать профиль', variant: 'destructive' });
    }
  });

  // Максимальное количество записей на один слот
  const maxSlotsPerTime = 2;

  const isOccupied = (date: string, time: string) => {
    const count = occupiedTimes.get(`${date}|${time}`) || 0;
    console.log(`🔍 Checking slot ${date} ${time}: ${count}/${maxSlotsPerTime} filled`);
    return count >= maxSlotsPerTime;
  };

  const handleSelectSlot = (time: string) => {
    if (isOccupied(selectedDate, time)) {
      toast({ title: 'Занято', description: 'Это время уже занято' });
      return;
    }
    setSelectedSlot(time);
    if (!user) {
      setShowAuthDialog(true);
      return;
    }
    
    // Если есть user, но нет currentPupil - это значит пользователь авторизован, но его профиль не в базе
    // В этом случае используем user.id напрямую для создания записи
    if (!currentPupil) {
      // Проверяем, есть ли userProfile (данные из auth)
      if (userProfile && userProfile.id && !userProfile.is_trainer) {
        console.log('✅ User is authenticated but not in pupils list, using auth ID:', userProfile.id);
        // Показываем диалог подтверждения, используя ID из профиля
        setShowConfirmDialog(true);
        return;
      }
      // Если совсем нет данных, показываем диалог создания профиля
      setShowCreatePupil(true);
      return;
    }
    
    setShowConfirmDialog(true);
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const handleCreatePupil = () => {
    if (!firstName || !lastName || !email || !phone || !birthDate) {
      toast({ title: 'Заполните поля', description: 'Пожалуйста, заполните все поля', variant: 'destructive' });
      return;
    }
    const form: InsertPupil = {
      trainerId,
      firstName,
      lastName,
      middleName: null,
      phone,
      email,
      password: generatePassword(12),
      birthDate,
      weight: null,
      height: null,
      goal: null,
      medicalNotes: null,
      photo: null,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      parentFirstName: null,
      parentLastName: null,
      parentMiddleName: null,
      parentPhone: null,
      parentEmail: null,
      parentSpecialInstructions: null,
      isParentRepresentative: false,
      privacyPolicyAccepted: false,
      privacyPolicyAcceptedDate: null,
      contractAccepted: false,
      contractAcceptedDate: null,
      educationConsentAccepted: false,
      educationConsentAcceptedDate: null,
    };
    createPupilMutation.mutate(form);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    
    // Определяем pupilId: либо из currentPupil, либо из userProfile
    let pupilId: string | undefined;
    if (currentPupil) {
      pupilId = currentPupil.id;
    } else if (userProfile && userProfile.id && !userProfile.is_trainer) {
      pupilId = userProfile.id;
    }
    
    if (!pupilId) {
      toast({ title: 'Ошибка', description: 'Не удалось определить ID пользователя', variant: 'destructive' });
      return;
    }
    
    createAppointmentMutation.mutate({ date: selectedDate, time: selectedSlot, pupilId });
  };

  const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const changeDay = (dir: -1 | 1) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + dir);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const changeMonth = (dir: -1 | 1) => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + dir);
    setCurrentMonth(d);
  };

  // Генерация дней месяца для календаря
  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay(); // 0 = Sunday
    
    // Добавляем пустые ячейки для выравнивания
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Добавляем все дни месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const appointmentsCount = appointments.filter(a => a.date === dateStr).length;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const isSelected = dateStr === selectedDate;
      
      days.push({
        date: day,
        dateStr,
        appointmentsCount,
        isToday,
        isSelected
      });
    }
    
    return days;
  };

  const handleDayClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setViewMode('day');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="space-y-3">
            {/* Заголовок по центру */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Запись на занятие</CardTitle>
              </div>
            </div>

            {/* Навигация по датам с переключателем режимов */}
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => viewMode === 'day' ? changeDay(-1) : changeMonth(-1)} 
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-semibold min-w-[180px] text-center">
                {viewMode === 'day' 
                  ? `${new Date(selectedDate).getDate()} ${monthNames[new Date(selectedDate).getMonth()]} ${new Date(selectedDate).getFullYear()}`
                  : `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`
                }
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => viewMode === 'day' ? changeDay(1) : changeMonth(1)} 
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Переключатель режимов */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('day')}
                  className={`text-xs px-3 py-1 h-7 ${
                    viewMode === 'day'
                      ? 'bg-white shadow-sm text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  День
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className={`text-xs px-3 py-1 h-7 ${
                    viewMode === 'month'
                      ? 'bg-white shadow-sm text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Месяц
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {viewMode === 'day' ? (
            // Вид по дням - сетка временных слотов
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {TIME_SLOTS.map(time => (
                <ScheduleSlot
                  key={time}
                  time={time}
                  date={selectedDate}
                  appointments={appointments}
                  pupils={pupils}
                  currentPupil={currentPupil || undefined}
                  isTrainer={false}
                  maxSlots={2}
                  onSlotClick={handleSelectSlot}
                />
              ))}
            </div>
          ) : (
            // Календарный вид на месяц
            <div className="space-y-3">
              {/* Дни недели */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Дни месяца */}
              <div className="grid grid-cols-7 gap-2">
                {getMonthDays().map((day, index) => (
                  <div key={index}>
                    {day ? (
                      <button
                        onClick={() => handleDayClick(day.dateStr)}
                        className={`
                          w-full h-14 rounded-lg px-2 py-1.5 text-sm font-medium transition-all relative
                          flex flex-col items-center justify-center gap-0.5
                          ${day.isToday ? 'ring-2 ring-green-400' : ''}
                          ${day.isSelected 
                            ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg scale-105' 
                            : day.appointmentsCount > 0
                              ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200 hover:from-yellow-100 hover:to-yellow-200'
                              : 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 border border-green-200 hover:from-green-100 hover:to-green-200'
                          }
                        `}
                      >
                        <span className="text-sm font-semibold">{day.date}</span>
                        {day.appointmentsCount > 0 && (
                          <Badge 
                            variant="outline"
                            className={`text-[9px] h-3.5 px-1 border-0 ${
                              day.isSelected 
                                ? 'bg-white/90 text-blue-600' 
                                : 'bg-yellow-500 text-white'
                            }`}
                          >
                            {day.appointmentsCount}
                          </Badge>
                        )}
                      </button>
                    ) : (
                      <div className="w-full h-14"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Легенда */}
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-600 border-t">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-green-50 to-green-100 border border-green-200"></div>
                  <span>Свободно</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200"></div>
                  <span>Есть записи</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <span>Выбран</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Auth dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Требуется авторизация</DialogTitle>
            <DialogDescription>Войдите или зарегистрируйтесь, чтобы записаться на выбранное время</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              onClick={() => {
                setShowAuthDialog(false);
                setLocation('/login');
              }} 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Войти
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAuthDialog(false);
                setLocation('/register');
              }} 
              className="w-full"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Зарегистрироваться
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create pupil dialog */}
      <Dialog open={showCreatePupil} onOpenChange={setShowCreatePupil}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ваши данные</DialogTitle>
            <DialogDescription>Укажите контактные данные для записи</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Имя</Label>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div>
              <Label>Фамилия</Label>
              <Input value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="md:col-span-1">
              <Label>Телефон</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="md:col-span-1">
              <Label>Дата рождения</Label>
              <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCreatePupil(false)}>Отмена</Button>
            <Button onClick={handleCreatePupil} disabled={createPupilMutation.isPending}>
              {createPupilMutation.isPending ? 'Сохранение...' : (<span className="inline-flex items-center gap-2"><UserPlus className="h-4 w-4" />Сохранить</span>)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Подтверждение записи</DialogTitle>
            <DialogDescription>
              {selectedSlot ? `Записаться на ${new Date(selectedDate).toLocaleDateString('ru-RU')} в ${selectedSlot}?` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded border border-blue-200 text-blue-700">
            <Clock className="h-4 w-4" />
            <div className="text-sm">Статус записи: ожидает подтверждения тренера</div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Отмена</Button>
            <Button onClick={handleConfirmBooking} disabled={createAppointmentMutation.isPending}>
              {createAppointmentMutation.isPending ? 'Записываем...' : (<span className="inline-flex items-center gap-2"><Check className="h-4 w-4" />Записаться</span>)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}





