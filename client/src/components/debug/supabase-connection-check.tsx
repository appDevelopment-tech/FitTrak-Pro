import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface ConnectionStatus {
  envVars: 'loading' | 'success' | 'error';
  supabaseClient: 'loading' | 'success' | 'error';
  databaseConnection: 'loading' | 'success' | 'error';
  authService: 'loading' | 'success' | 'error';
}

interface CheckResult {
  status: 'loading' | 'success' | 'error';
  message: string;
  details?: any;
}

export function SupabaseConnectionCheck() {
  const [isVisible, setIsVisible] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    envVars: 'loading',
    supabaseClient: 'loading',
    databaseConnection: 'loading',
    authService: 'loading',
  });
  const [results, setResults] = useState<Record<string, CheckResult>>({});

  const checkEnvironmentVariables = async (): Promise<CheckResult> => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        status: 'error',
        message: 'Переменные окружения не настроены',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
          url: supabaseUrl || 'не задан',
        }
      };
    }

    if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('supabase.co')) {
      return {
        status: 'error',
        message: 'Некорректный URL Supabase',
        details: { url: supabaseUrl }
      };
    }

    if (!supabaseAnonKey.startsWith('eyJ')) {
      return {
        status: 'error',
        message: 'Некорректный формат ключа',
        details: { keyLength: supabaseAnonKey.length }
      };
    }

    return {
      status: 'success',
      message: 'Переменные окружения настроены корректно',
      details: {
        url: supabaseUrl,
        keyLength: supabaseAnonKey.length,
      }
    };
  };

  const checkSupabaseClient = async (): Promise<CheckResult> => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Переменные окружения не настроены');
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      return {
        status: 'success',
        message: 'Клиент Supabase создан успешно',
        details: { clientCreated: true }
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: 'Ошибка создания клиента Supabase',
        details: { error: error.message }
      };
    }
  };

  const checkDatabaseConnection = async (): Promise<CheckResult> => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Переменные окружения не настроены');
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      // Пробуем выполнить простой запрос
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        return {
          status: 'error',
          message: 'Ошибка подключения к базе данных',
          details: { error: error.message, code: error.code }
        };
      }

      return {
        status: 'success',
        message: 'Подключение к базе данных успешно',
        details: { dataReceived: true }
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: 'Ошибка проверки базы данных',
        details: { error: error.message }
      };
    }
  };

  const checkAuthService = async (): Promise<CheckResult> => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Переменные окружения не настроены');
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      // Пробуем получить текущую сессию
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          status: 'error',
          message: 'Ошибка сервиса аутентификации',
          details: { error: error.message }
        };
      }

      return {
        status: 'success',
        message: 'Сервис аутентификации работает',
        details: { hasSession: !!data.session }
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: 'Ошибка проверки аутентификации',
        details: { error: error.message }
      };
    }
  };

  const runAllChecks = async () => {
    setConnectionStatus({
      envVars: 'loading',
      supabaseClient: 'loading',
      databaseConnection: 'loading',
      authService: 'loading',
    });

    // Проверка переменных окружения
    const envResult = await checkEnvironmentVariables();
    setResults(prev => ({ ...prev, envVars: envResult }));
    setConnectionStatus(prev => ({ ...prev, envVars: envResult.status }));

    if (envResult.status === 'error') {
      setConnectionStatus(prev => ({
        ...prev,
        supabaseClient: 'error',
        databaseConnection: 'error',
        authService: 'error',
      }));
      return;
    }

    // Проверка клиента Supabase
    const clientResult = await checkSupabaseClient();
    setResults(prev => ({ ...prev, supabaseClient: clientResult }));
    setConnectionStatus(prev => ({ ...prev, supabaseClient: clientResult.status }));

    if (clientResult.status === 'error') {
      setConnectionStatus(prev => ({
        ...prev,
        databaseConnection: 'error',
        authService: 'error',
      }));
      return;
    }

    // Проверка подключения к базе данных
    const dbResult = await checkDatabaseConnection();
    setResults(prev => ({ ...prev, databaseConnection: dbResult }));
    setConnectionStatus(prev => ({ ...prev, databaseConnection: dbResult.status }));

    // Проверка сервиса аутентификации
    const authResult = await checkAuthService();
    setResults(prev => ({ ...prev, authService: authResult }));
    setConnectionStatus(prev => ({ ...prev, authService: authResult.status }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'loading':
        return <Badge variant="secondary">Проверка...</Badge>;
      case 'success':
        return <Badge variant="default" className="bg-green-500">OK</Badge>;
      case 'error':
        return <Badge variant="destructive">Ошибка</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const allChecksPassed = Object.values(connectionStatus).every(status => status === 'success');

  if (!isVisible) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200"
        >
          🔍 Проверить Supabase
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Card className="w-96 bg-white border border-gray-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            🔍 Диагностика Supabase
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Переменные окружения */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(connectionStatus.envVars)}
              <span className="text-sm">Переменные окружения</span>
            </div>
            {getStatusBadge(connectionStatus.envVars)}
          </div>

          {/* Клиент Supabase */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(connectionStatus.supabaseClient)}
              <span className="text-sm">Клиент Supabase</span>
            </div>
            {getStatusBadge(connectionStatus.supabaseClient)}
          </div>

          {/* База данных */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(connectionStatus.databaseConnection)}
              <span className="text-sm">База данных</span>
            </div>
            {getStatusBadge(connectionStatus.databaseConnection)}
          </div>

          {/* Аутентификация */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(connectionStatus.authService)}
              <span className="text-sm">Аутентификация</span>
            </div>
            {getStatusBadge(connectionStatus.authService)}
          </div>

          {/* Общий статус */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Общий статус</span>
              {allChecksPassed ? (
                <Badge variant="default" className="bg-green-500">Готов к работе</Badge>
              ) : (
                <Badge variant="destructive">Требует настройки</Badge>
              )}
            </div>
          </div>

          {/* Кнопка проверки */}
          <Button
            onClick={runAllChecks}
            className="w-full"
            size="sm"
          >
            Запустить проверку
          </Button>

          {/* Детали ошибок */}
          {Object.entries(results).map(([key, result]) => {
            if (result.status === 'error') {
              return (
                <Alert key={key} variant="destructive">
                  <AlertDescription className="text-xs">
                    <strong>{key}:</strong> {result.message}
                    {result.details && (
                      <pre className="mt-1 text-xs bg-red-50 p-1 rounded overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    )}
                  </AlertDescription>
                </Alert>
              );
            }
            return null;
          })}

          {/* Инструкции по настройке */}
          {!allChecksPassed && (
            <Alert>
              <AlertDescription className="text-xs">
                <strong>Для настройки:</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Создайте проект на supabase.com</li>
                  <li>Создайте файл .env с переменными</li>
                  <li>Настройте базу данных (см. SUPABASE_SETUP.md)</li>
                </ol>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

