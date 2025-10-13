import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export function AuthModeToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRealAuth, setIsRealAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Проверяем текущий режим при загрузке
  useEffect(() => {
    const checkAuthMode = async () => {
      try {
        // Пробуем получить переменные окружения
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (supabaseUrl && supabaseKey) {
          // Пробуем создать клиент Supabase
          const { createClient } = await import('@supabase/supabase-js');
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          // Пробуем выполнить простой запрос
          const { error } = await supabase.auth.getSession();
          
          if (!error) {
            setIsRealAuth(true);
          }
        }
      } catch (error) {
        console.log('Supabase не настроен:', error);
        setIsRealAuth(false);
      }
    };

    checkAuthMode();
  }, []);

  const toggleAuthMode = async () => {
    setIsLoading(true);
    
    try {
      if (isRealAuth) {
        // Переключаем в тестовый режим
        setIsRealAuth(false);
        // Здесь можно добавить логику для переключения режима
      } else {
        // Проверяем, настроен ли Supabase
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseKey) {
          alert('Supabase не настроен! Создайте файл .env с переменными VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY');
          return;
        }
        
        // Пробуем подключиться к Supabase
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          alert(`Ошибка подключения к Supabase: ${error.message}`);
          return;
        }
        
        setIsRealAuth(true);
      }
    } catch (error: any) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
        >
          🔧 Auth Mode
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="w-80 bg-purple-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-purple-800 flex items-center justify-between">
            🔧 Режим аутентификации
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-purple-600 hover:text-purple-800"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">Текущий режим:</span>
            <Badge variant={isRealAuth ? "default" : "secondary"}>
              {isRealAuth ? "Реальная" : "Тестовая"}
            </Badge>
          </div>
          
          <div className="flex items-start space-x-2">
            {isRealAuth ? (
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
            )}
            <div className="text-xs text-purple-600">
              {isRealAuth ? (
                <div>
                  <p className="font-medium text-green-700">Реальная аутентификация активна</p>
                  <p>Используется Supabase для входа и регистрации</p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-yellow-700">Тестовый режим активен</p>
                  <p>Настройте Supabase для реальной аутентификации</p>
                </div>
              )}
            </div>
          </div>
          
          <Button
            onClick={toggleAuthMode}
            disabled={isLoading}
            className="w-full"
            size="sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Проверка...
              </>
            ) : (
              isRealAuth ? "Переключить в тестовый режим" : "Переключить в реальный режим"
            )}
          </Button>
          
          {!isRealAuth && (
            <Alert>
              <AlertDescription className="text-xs">
                <p className="font-medium text-yellow-800 mb-1">Для настройки Supabase:</p>
                <ol className="list-decimal list-inside space-y-1 text-yellow-700">
                  <li>Создайте проект на supabase.com</li>
                  <li>Скопируйте URL и ключ</li>
                  <li>Создайте файл .env с переменными</li>
                  <li>Настройте базу данных (см. SUPABASE_SETUP.md)</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}
          
          {isRealAuth && (
            <Alert>
              <AlertDescription className="text-xs text-green-700">
                <p className="font-medium mb-1">✅ Supabase настроен и готов к работе!</p>
                <p>Теперь вы можете регистрировать пользователей и использовать реальную аутентификацию.</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

