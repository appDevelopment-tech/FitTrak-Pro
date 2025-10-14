import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { appointmentsDb } from '@/lib/database';
import { useNotifications } from './use-notifications';
import type { Appointment, Pupil } from '@shared/schema';

export interface ReminderSettings {
  enabled: boolean;
  timeBeforeAppointment: number; // minutes
  reminderTypes: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export function useReminders() {
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: true,
    timeBeforeAppointment: 30,
    reminderTypes: {
      email: true,
      push: true,
      inApp: true
    }
  });

  const { addNotification } = useNotifications();
  const trainerId = '550e8400-e29b-41d4-a716-446655440000'; // Main trainer UUID

  // Получаем все записи на тренировки
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Функция для проверки и отправки напоминаний
  const checkAndSendReminders = useCallback(() => {
    if (!settings.enabled) return;

    const now = new Date();
    const reminderTime = settings.timeBeforeAppointment;

    appointments.forEach((appointment) => {
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
      const timeDiff = appointmentDateTime.getTime() - now.getTime();
      const minutesUntilAppointment = Math.floor(timeDiff / (1000 * 60));

      // Проверяем, нужно ли отправить напоминание
      if (minutesUntilAppointment > 0 && minutesUntilAppointment <= reminderTime) {
        const pupil = (appointment as any)?.students;
        const pupilName = pupil ? `${pupil.firstName} ${pupil.lastName}` : 'Ученик';

        // Отправляем уведомление
        if (settings.reminderTypes.inApp) {
          addNotification({
            type: 'info',
            title: 'Напоминание о тренировке',
            message: `Тренировка с ${pupilName} через ${minutesUntilAppointment} минут`,
            actionUrl: `/cabinet?tab=schedule&date=${appointment.date}`
          });
        }

        // Здесь можно добавить отправку email и push уведомлений
        if (settings.reminderTypes.email) {
          // TODO: Реализовать отправку email
          console.log(`Email напоминание для ${pupilName} о тренировке в ${appointment.time}`);
        }

        if (settings.reminderTypes.push && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(`Тренировка с ${pupilName}`, {
            body: `Через ${minutesUntilAppointment} минут`,
            icon: '/favicon.ico'
          });
        }
      }
    });
  }, [appointments, settings, addNotification]);

  // Проверяем напоминания каждую минуту
  useEffect(() => {
    if (!settings.enabled) return;

    const interval = setInterval(checkAndSendReminders, 60000); // Каждую минуту
    return () => clearInterval(interval);
  }, [checkAndSendReminders, settings.enabled]);

  // Обновить настройки
  const updateSettings = useCallback((newSettings: Partial<ReminderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Получить предстоящие тренировки
  const getUpcomingAppointments = useCallback((hours: number = 24) => {
    const now = new Date();
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000);

    return appointments.filter(appointment => {
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
      return appointmentDateTime >= now && appointmentDateTime <= futureTime;
    });
  }, [appointments]);

  // Получить тренировки на сегодня
  const getTodayAppointments = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === today);
  }, [appointments]);

  // Получить тренировки на завтра
  const getTomorrowAppointments = useCallback(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === tomorrowString);
  }, [appointments]);

  return {
    settings,
    updateSettings,
    checkAndSendReminders,
    getUpcomingAppointments,
    getTodayAppointments,
    getTomorrowAppointments
  };
}

