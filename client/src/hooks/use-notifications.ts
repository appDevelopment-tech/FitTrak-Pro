import { useState, useCallback, useEffect } from 'react';
import { useToast } from './use-toast';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  reminderTime: number; // minutes before appointment
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    inApp: true,
    reminderTime: 30
  });
  const { toast } = useToast();

  // Добавить уведомление
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Показать toast уведомление
    if (settings.inApp) {
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === 'error' ? 'destructive' : 'default'
      });
    }

    // Показать браузерное уведомление
    if (settings.push && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      });
    }
  }, [settings, toast]);

  // Отметить как прочитанное
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  // Отметить все как прочитанные
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Удалить уведомление
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Очистить все уведомления
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Запросить разрешение на уведомления
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  // Обновить настройки
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Получить количество непрочитанных
  const unreadCount = notifications.filter(n => !n.read).length;

  // Получить уведомления по типу
  const getNotificationsByType = useCallback((type: Notification['type']) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  // Получить последние уведомления
  const getRecentNotifications = useCallback((limit: number = 5) => {
    return notifications.slice(0, limit);
  }, [notifications]);

  return {
    notifications,
    settings,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    requestNotificationPermission,
    updateSettings,
    getNotificationsByType,
    getRecentNotifications
  };
}

