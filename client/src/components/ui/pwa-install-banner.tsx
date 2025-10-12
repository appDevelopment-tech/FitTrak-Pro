import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Download, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, isOnline, installPWA } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Показываем баннер только если PWA можно установить и не установлено
    if (isInstallable && !isInstalled) {
      const dismissed = localStorage.getItem('pwa-banner-dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    }
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    await installPWA();
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (!showBanner || isDismissed || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Smartphone className="h-6 w-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">
                Установить FitTrak Pro
              </h3>
              <p className="text-xs text-blue-100 mb-3">
                Добавьте приложение на главный экран для быстрого доступа
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Установить
                </Button>
                
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 text-xs"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowIndicator(true);
    } else {
      // Скрываем индикатор через 2 секунды после восстановления соединения
      const timer = setTimeout(() => setShowIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showIndicator) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className={`${isOnline ? 'bg-green-600' : 'bg-red-600'} text-white border-0 shadow-lg`}>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span className="text-sm font-medium">Соединение восстановлено</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span className="text-sm font-medium">Нет соединения с интернетом</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}














