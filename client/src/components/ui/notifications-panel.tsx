import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  BellRing, 
  Check, 
  CheckCheck, 
  Trash2, 
  Settings, 
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useNotifications, type Notification } from '@/hooks/use-notifications';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Info className="h-4 w-4 text-blue-600" />;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'border-l-green-500 bg-green-50';
    case 'warning':
      return 'border-l-yellow-500 bg-yellow-50';
    case 'error':
      return 'border-l-red-500 bg-red-50';
    default:
      return 'border-l-blue-500 bg-blue-50';
  }
};

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  } = useNotifications();

  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'warning' | 'error'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      // Переход по ссылке
      window.location.href = notification.actionUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            <CardTitle>Уведомления</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Прочитать все
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Очистить
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <div className="px-6 pb-4">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'unread', 'success', 'warning', 'error'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="text-xs"
              >
                {filterType === 'all' && 'Все'}
                {filterType === 'unread' && 'Непрочитанные'}
                {filterType === 'success' && 'Успех'}
                {filterType === 'warning' && 'Предупреждение'}
                {filterType === 'error' && 'Ошибка'}
              </Button>
            ))}
          </div>
        </div>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Уведомлений нет</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      notification.read ? 'opacity-75' : ''
                    } ${getNotificationColor(notification.type)}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatDistanceToNow(notification.timestamp, { 
                              addSuffix: true, 
                              locale: ru 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

