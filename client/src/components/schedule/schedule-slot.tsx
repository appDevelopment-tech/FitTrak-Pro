import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Appointment, Pupil } from '@shared/schema';
import { Calendar, UserPlus, UserMinus, Users, Check, Clock, Dumbbell, Trash2 } from 'lucide-react';

interface ScheduleSlotProps {
  time: string;
  date: string;
  appointments: Appointment[];
  pupils: Pupil[];
  currentPupil?: Pupil;
  isTrainer?: boolean;
  maxSlots?: number;
  onSlotClick?: (time: string) => void;
  onToggleStatus?: (appointmentId: string) => void;
  onDeleteAppointment?: (appointmentId: string) => void;
  onStartWorkout?: (pupilId: string) => void;
  isWorkoutActive?: (trainerId: string, pupilId: string) => boolean;
  trainerId?: string;
}

type SlotStatus = 'free' | 'available' | 'full' | 'user-booked';

interface SlotInfo {
  status: SlotStatus;
  count: number;
  maxSlots: number;
  userAppointment?: Appointment;
  allAppointments: Appointment[];
}

export function ScheduleSlot({
  time,
  date,
  appointments,
  pupils,
  currentPupil,
  isTrainer = false,
  maxSlots = 2,
  onSlotClick,
  onToggleStatus,
  onDeleteAppointment,
  onStartWorkout,
  isWorkoutActive,
  trainerId = "550e8400-e29b-41d4-a716-446655440000"
}: ScheduleSlotProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  // Фильтруем записи для данного времени и даты
  const slotAppointments = appointments.filter(apt => 
    apt.date === date && apt.time === time
  );

  // Определяем статус слота
  const getSlotInfo = (): SlotInfo => {
    const count = slotAppointments.length;
    const userAppointment = currentPupil 
      ? slotAppointments.find(apt => apt.pupilId === currentPupil.id)
      : undefined;

    let status: SlotStatus;
    if (userAppointment) {
      status = 'user-booked';
    } else if (count >= maxSlots) {
      status = 'full';
    } else if (count > 0) {
      status = 'available';
    } else {
      status = 'free';
    }

    return {
      status,
      count,
      maxSlots,
      userAppointment,
      allAppointments: slotAppointments
    };
  };

  const slotInfo = getSlotInfo();

  // Мутации для управления записями
  const createAppointmentMutation = useMutation({
    mutationFn: async (pupilId: string) => {
      return await api.appointments.create({
        trainerId: trainerId, // Use prop trainerId
        pupilId,
        date,
        time,
        status: 'pending'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: 'Запись создана',
        description: 'Вы успешно записались на тренировку'
      });
      setShowBookingDialog(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось записаться',
        variant: 'destructive'
      });
    }
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      return await api.appointments.delete(appointmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast({
        title: 'Запись отменена',
        description: 'Вы отменили запись на тренировку'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось отменить запись',
        variant: 'destructive'
      });
    }
  });

  // Обработчики событий
  const handleSlotClick = () => {
    if (onSlotClick) {
      onSlotClick(time);
      return;
    }

    if (slotInfo.status === 'user-booked' && slotInfo.userAppointment) {
      // Отменить запись
      deleteAppointmentMutation.mutate(slotInfo.userAppointment.id);
    } else if (slotInfo.status === 'free' || slotInfo.status === 'available') {
      // Записаться
      if (!currentPupil) {
        toast({
          title: 'Требуется авторизация',
          description: 'Необходимо войти в систему для записи',
          variant: 'destructive'
        });
        return;
      }
      createAppointmentMutation.mutate(currentPupil.id);
    }
  };

  // Получаем данные учеников для отображения
  const getPupilData = (appointment: Appointment): Pupil | undefined => {
    return pupils.find(p => p.id === appointment.pupilId);
  };

  // Определяем стили и иконки
  const getSlotStyles = () => {
    switch (slotInfo.status) {
      case 'free':
        return {
          bg: 'bg-green-50 hover:bg-green-100',
          border: 'border-green-200 hover:border-green-300',
          indicator: 'bg-green-500',
          text: 'text-green-700',
          icon: Calendar
        };
      case 'available':
        return {
          bg: 'bg-yellow-50 hover:bg-yellow-100',
          border: 'border-yellow-200 hover:border-yellow-300',
          indicator: 'bg-yellow-500',
          text: 'text-yellow-700',
          icon: UserPlus
        };
      case 'user-booked':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          border: 'border-blue-200 hover:border-blue-300',
          indicator: 'bg-blue-500',
          text: 'text-blue-700',
          icon: UserMinus
        };
      case 'full':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          indicator: 'bg-gray-400',
          text: 'text-gray-500',
          icon: Users
        };
    }
  };

  const styles = getSlotStyles();
  const IconComponent = styles.icon;

  // Определяем текст кнопки
  const getButtonText = () => {
    switch (slotInfo.status) {
      case 'free':
        return 'Записаться';
      case 'available':
        return 'Записаться';
      case 'user-booked':
        return 'Отменить';
      case 'full':
        return 'Заполнено';
    }
  };

  const isDisabled = slotInfo.status === 'full' || slotInfo.status === 'user-booked';

  return (
    <>
      <div
        className={`
          flex flex-col gap-2 p-3 rounded-lg transition-colors border cursor-pointer
          ${styles.bg} ${styles.border}
          ${isDisabled ? 'cursor-not-allowed opacity-60' : ''}
        `}
        onClick={isDisabled ? undefined : handleSlotClick}
      >
        {/* Заголовок с временем и индикатором */}
        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium ${styles.text}`}>
            {time}
          </div>
          <div className={`w-2 h-2 rounded-full ${styles.indicator}`} />
        </div>

        {/* Счетчик записей */}
        <div className="flex items-center justify-center">
          <Badge variant="outline" className={`text-xs ${styles.text}`}>
            {slotInfo.count}/{slotInfo.maxSlots}
          </Badge>
        </div>

        {/* Информация о записях */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
          {slotInfo.allAppointments.length > 0 ? (
            <div className="space-y-1">
              {isTrainer ? (
                // Тренер видит всех учеников
                slotInfo.allAppointments.map((appointment, index) => {
                  const pupil = getPupilData(appointment);
                  return (
                    <div key={appointment.id} className="text-xs truncate">
                      {pupil ? `${pupil.lastName} ${pupil.firstName.charAt(0)}.` : 'Неизвестный'}
                    </div>
                  );
                })
              ) : (
                // Обычный пользователь видит только свой статус
                <div className="text-xs text-center">
                  {slotInfo.status === 'user-booked' ? 'Вы записаны' : 'Есть места'}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-center text-gray-500">
              Свободно
            </div>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-center gap-1">
          {isTrainer && slotInfo.allAppointments.length > 0 ? (
            // Действия для тренера
            <>
              {onToggleStatus && slotInfo.allAppointments.map((appointment) => (
                <Button
                  key={`toggle-${appointment.id}`}
                  size="sm"
                  variant="ghost"
                  onClick={() => onToggleStatus(appointment.id)}
                  className="h-6 w-6 p-0"
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    appointment.status === 'confirmed' 
                      ? 'border-2 border-green-500 bg-green-50' 
                      : ''
                  }`}>
                    {appointment.status === 'confirmed' ? 
                      <Check className="h-2.5 w-2.5 text-green-600" /> : 
                      <Clock className="h-2.5 w-2.5 text-gray-400" />
                    }
                  </div>
                </Button>
              ))}
              {onStartWorkout && slotInfo.allAppointments.map((appointment) => {
                const pupil = getPupilData(appointment);
                if (!pupil || !isWorkoutActive) return null;
                return isWorkoutActive(trainerId, pupil.id) ? (
                  <Button
                    key={`workout-${appointment.id}`}
                    size="sm"
                    variant="ghost"
                    onClick={() => onStartWorkout(pupil.id)}
                    className="h-6 w-6 p-0"
                  >
                    <Dumbbell className="h-3 w-3" />
                  </Button>
                ) : null;
              })}
              {onDeleteAppointment && slotInfo.allAppointments.map((appointment) => (
                <Button
                  key={`delete-${appointment.id}`}
                  size="sm"
                  variant="ghost"
                  onClick={() => onDeleteAppointment(appointment.id)}
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              ))}
            </>
          ) : (
            // Обычная кнопка для пользователя
            <Button
              size="sm"
              variant={slotInfo.status === 'user-booked' ? 'destructive' : 'default'}
              disabled={isDisabled}
              className="text-xs h-6 px-2"
            >
              <IconComponent className="w-3 h-3 mr-1" />
              {getButtonText()}
            </Button>
          )}
        </div>
      </div>

      {/* Диалог подтверждения записи */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение записи</DialogTitle>
            <DialogDescription>
              Вы хотите записаться на тренировку {date} в {time}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Отмена
            </Button>
            <Button 
              onClick={() => {
                if (currentPupil) {
                  createAppointmentMutation.mutate(currentPupil.id);
                }
              }}
              disabled={createAppointmentMutation.isPending}
            >
              {createAppointmentMutation.isPending ? 'Запись...' : 'Подтвердить'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
