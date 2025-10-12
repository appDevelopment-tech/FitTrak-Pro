import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentsDb, studentsDb } from "@/lib/database";
import type { Appointment, Pupil, InsertPupil } from "@shared/schema";
import { Calendar, Check, Clock, UserPlus } from "lucide-react";
import { ScheduleSlot } from "./schedule-slot";

const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
const TRAINER_ID = 1;

export function BookingWidget() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCreatePupil, setShowCreatePupil] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', TRAINER_ID],
    queryFn: () => studentsDb.getByTrainerId(TRAINER_ID),
  });

  const currentPupil = useMemo(() => {
    if (!user) return null;
    return pupils.find(p => p.email === user.email || p.phone === (user as any)?.phone);
  }, [user, pupils]);

  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', TRAINER_ID],
    queryFn: () => appointmentsDb.getByTrainerId(TRAINER_ID),
  });

  const occupiedTimes = useMemo(() => {
    const map = new Set<string>();
    appointments.forEach(a => {
      if (a.date && a.time) {
        map.add(`${a.date}|${a.time}`);
      }
    });
    return map;
  }, [appointments]);

  const createAppointmentMutation = useMutation({
    mutationFn: async (payload: { date: string; time: string; pupilId: number }) => {
      await appointmentsDb.create({
        trainerId: TRAINER_ID,
        pupilId: payload.pupilId,
        date: payload.date,
        time: payload.time,
        status: 'pending',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', TRAINER_ID] });
      toast({ title: 'Готово', description: 'Вы записаны на выбранное время' });
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
      queryClient.invalidateQueries({ queryKey: ['students', TRAINER_ID] });
      toast({ title: 'Профиль создан', description: 'Продолжите запись на выбранное время' });
      setShowCreatePupil(false);
      setShowConfirmDialog(true);
    },
    onError: (err: any) => {
      toast({ title: 'Ошибка', description: err?.message || 'Не удалось создать профиль', variant: 'destructive' });
    }
  });

  const isOccupied = (date: string, time: string) => occupiedTimes.has(`${date}|${time}`);

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
    if (!currentPupil) {
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
      trainerId: TRAINER_ID,
      firstName,
      lastName,
      middleName: '',
      phone,
      email,
      password: 'default_password', // TODO: Generate proper password
      birthDate,
      weight: null,
      height: null,
      goal: '',
      medicalNotes: '',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      // applicationSubmitted: true,
      // applicationDate: new Date().toISOString().split('T')[0],
      // rulesAccepted: true,
      // rulesAcceptedDate: new Date().toISOString().split('T')[0],
      // parentalConsent: false,
    };
    createPupilMutation.mutate(form);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    if (!currentPupil) return; // safeguarded by dialog logic
    createAppointmentMutation.mutate({ date: selectedDate, time: selectedSlot, pupilId: currentPupil.id });
  };

  const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

  const changeDay = (dir: -1 | 1) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + dir);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle className="text-lg">Запись на занятие</CardTitle>
                <div className="text-xs text-muted-foreground">Выберите удобное время</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => changeDay(-1)} className="h-7 w-7 p-0">◀</Button>
              <span className="text-sm font-medium min-w-[160px] text-center">
                {new Date(selectedDate).getDate()} {monthNames[new Date(selectedDate).getMonth()]} {new Date(selectedDate).getFullYear()}
              </span>
              <Button variant="ghost" size="sm" onClick={() => changeDay(1)} className="h-7 w-7 p-0">▶</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
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
        </CardContent>
      </Card>

      {/* Auth dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Войдите, чтобы записаться</DialogTitle>
            <DialogDescription>Создайте аккаунт или войдите, чтобы подтвердить запись на выбранное время</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Button onClick={async () => { await signIn('', ''); setShowAuthDialog(false); if (!currentPupil) { setShowCreatePupil(true); } else { setShowConfirmDialog(true); } }} className="w-full">
              Войти как тест-пользователь
            </Button>
            <Button variant="outline" onClick={async () => { await signUp('', '', {}); setShowAuthDialog(false); setShowCreatePupil(true); }} className="w-full">
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





