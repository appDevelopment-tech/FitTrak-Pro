# Система логирования и обработки ошибок FitTrak-Pro

## Обзор

Комплексная система логирования и обработки ошибок обеспечивает надежный мониторинг, отладку и пользовательский опыт в приложении FitTrak-Pro.

## Архитектура

### Серверная часть

- **Централизованное логирование**: `server/logger.ts`
- **Структурированные ошибки**: `AppError` класс с типами ошибок
- **Middleware**: Автоматическое логирование запросов и обработка ошибок
- **Мониторинг**: API эндпоинты для получения логов и проверки здоровья

### Клиентская часть

- **Обработка ошибок**: `client/src/lib/error-handler.ts`
- **Глобальное управление**: `client/src/components/providers/error-provider.tsx`
- **UI компоненты**: Отображение ошибок с возможностью повтора
- **Error Boundary**: Отлов критических ошибок React

## Использование

### 1. Серверное логирование

#### Базовое использование

```typescript
import { logger, AppError, AppErrorType, ErrorHandler } from './logger';

// Логирование
logger.info('User login attempt', { userId: '123' });
logger.warn('Rate limit exceeded', { ip: '192.168.1.1' });
logger.error('Database connection failed', error);

// Создание ошибок
throw new AppError(
  'Пользователь не найден',
  AppErrorType.NOT_FOUND_ERROR,
  404,
  true,
  { userId: '123' }
);

// Обработка ошибок
try {
  await someOperation();
} catch (error) {
  throw ErrorHandler.handleDatabaseError(error, req);
}
```

#### Middleware для автоматического логирования

```typescript
import { requestLogger, errorHandler } from './logger';

// В registerRoutes
app.use(requestLogger);  // Логирование всех запросов
app.use(errorHandler);   // Обработка всех ошибок
```

#### Доступные типы ошибок

```typescript
enum AppErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR'
}
```

### 2. Клиентская обработка ошибок

#### Использование в компонентах

```typescript
import { useErrorContext } from '@/components/providers/error-provider';

function MyComponent() {
  const { handleApiError, retryOperation } = useErrorContext();

  const handleSubmit = async (data) => {
    try {
      await apiCall(data);
    } catch (error) {
      // Автоматическая обработка с toast уведомлениями
      handleApiError(error);
    }
  };

  const handleRetry = async () => {
    await retryOperation(() => apiCall(data), 3);
  };
}
```

#### HOC для обработки ошибок

```typescript
import { withErrorHandling } from '@/components/providers/error-provider';

const MyComponent = withErrorHandling(({ handleApiError }) => {
  // Компонент с доступом к handleApiError
});
```

#### Доступные типы ошибок клиента

```typescript
enum ClientErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}
```

### 3. Компоненты отображения ошибок

#### GlobalErrorDisplay
Автоматически отображает ошибки в правом верхнем углу экрана.

#### ErrorDisplay
```typescript
<ErrorDisplay 
  error={clientError}
  onDismiss={() => removeError(index)}
  showDetails={true}
/>
```

#### RetryableError
```typescript
<RetryableError
  error={clientError}
  onRetry={handleRetry}
  isRetrying={isRetrying}
/>
```

#### CriticalError
```typescript
<CriticalError
  error={clientError}
  onReport={() => reportError()}
/>
```

### 4. Error Boundary

Автоматически отлавливает критические ошибки React и отображает пользователю понятное сообщение.

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Мониторинг и отладка

### 1. API эндпоинты

#### Получение логов
```bash
GET /api/logs?level=error&limit=50
```

Ответ:
```json
{
  "logs": [...],
  "total": 25,
  "level": "error",
  "limit": 50
}
```

#### Проверка здоровья системы
```bash
GET /api/health
```

Ответ:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-14T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "production"
}
```

### 2. Структура лога

```typescript
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: {
    userId?: string;
    requestId?: string;
    endpoint?: string;
    method?: string;
    userAgent?: string;
    ip?: string;
  };
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  data?: Record<string, any>;
}
```

### 3. Уровни логирования

- **ERROR**: Критические ошибки, требующие внимания
- **WARN**: Предупреждения, потенциальные проблемы
- **INFO**: Информационные сообщения, важные события
- **DEBUG**: Детальная информация для отладки

## Конфигурация

### 1. Переменные окружения

```bash
NODE_ENV=production          # Режим работы
LOG_LEVEL=info              # Минимальный уровень логирования
MAX_LOGS=1000              # Максимальное количество логов в памяти
```

### 2. Настройка логирования

```typescript
// В server/logger.ts
const logger = Logger.getInstance();

// Настройка уровня логирования
if (process.env.NODE_ENV === 'production') {
  logger.setLevel(LogLevel.INFO);
} else {
  logger.setLevel(LogLevel.DEBUG);
}
```

## Лучшие практики

### 1. Серверное логирование

- **Контекст**: Всегда включайте контекст запроса (userId, requestId, endpoint)
- **Уровни**: Используйте правильные уровни логирования
- **Структура**: Логируйте структурированные данные, а не строки
- **Производительность**: Не логируйте в критических путях выполнения

### 2. Клиентская обработка ошибок

- **Пользовательский опыт**: Показывайте понятные сообщения пользователю
- **Повторные попытки**: Реализуйте автоматические повторы для сетевых ошибок
- **Критические ошибки**: Отдельно обрабатывайте критические ошибки
- **Отчеты**: Отправляйте ошибки на сервер для мониторинга

### 3. Безопасность

- **Чувствительные данные**: Не логируйте пароли, токены, персональные данные
- **Стеки**: В production не показывайте stack traces пользователю
- **IP адреса**: Логируйте IP для безопасности, но соблюдайте GDPR

## Расширение системы

### 1. Добавление нового типа ошибки

```typescript
// Сервер
enum AppErrorType {
  // ... существующие типы
  CUSTOM_ERROR = 'CUSTOM_ERROR'
}

// Клиент
enum ClientErrorType {
  // ... существующие типы
  CUSTOM_ERROR = 'CUSTOM_ERROR'
}
```

### 2. Интеграция с внешними системами

```typescript
// Sentry
import * as Sentry from '@sentry/node';

logger.error('Error occurred', error, context);
Sentry.captureException(error);

// LogRocket
import LogRocket from 'logrocket';

LogRocket.captureException(error);
```

### 3. Кастомные обработчики ошибок

```typescript
class CustomErrorHandler extends ErrorHandler {
  static handleCustomError(error: Error, req: Request): AppError {
    // Кастомная логика обработки
    return new AppError(
      'Custom error message',
      AppErrorType.CUSTOM_ERROR,
      400,
      true
    );
  }
}
```

## Отладка

### 1. Просмотр логов в development

```typescript
// В консоли браузера
console.log('Client errors:', errors);

// В терминале сервера
npm run dev  # Логи выводятся в консоль
```

### 2. Мониторинг в production

```bash
# Получение логов через API
curl -H "Authorization: Bearer token" \
     "https://api.fittrak.pro/logs?level=error&limit=100"

# Проверка здоровья
curl "https://api.fittrak.pro/health"
```

### 3. Анализ ошибок

- **Частота**: Какие ошибки происходят чаще всего
- **Контекст**: В каких условиях возникают ошибки
- **Пользователи**: Какие пользователи сталкиваются с ошибками
- **Время**: В какое время происходят ошибки

## Миграция существующего кода

### 1. Замена console.log

```typescript
// Было
console.log('User logged in:', userId);

// Стало
logger.info('User logged in', { userId });
```

### 2. Замена try-catch

```typescript
// Было
try {
  await operation();
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error' });
}

// Стало
try {
  await operation();
} catch (error) {
  throw ErrorHandler.handleUnexpectedError(error, req);
}
```

### 3. Замена toast уведомлений

```typescript
// Было
catch (error) {
  toast({
    title: 'Error',
    description: error.message,
    variant: 'destructive'
  });
}

// Стало
catch (error) {
  handleApiError(error); // Автоматически показывает toast
}
```

## Примеры

### Полный пример серверного эндпоинта

```typescript
app.post("/api/users", validateBody(createUserSchema), async (req: ValidatedRequest, res) => {
  const context = createRequestContext(req);
  
  try {
    const userData = req.validatedData!;
    
    logger.info('Creating user', context, { email: userData.email });
    
    const user = await storage.createUser(userData);
    
    logger.info('User created successfully', context, { userId: user.id });
    
    res.status(201).json(user);
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('User creation failed', error as Error, context);
    throw ErrorHandler.handleUnexpectedError(error as Error, req);
  }
});
```

### Полный пример клиентского компонента

```typescript
function UserForm() {
  const { handleApiError, retryOperation, isRetrying } = useErrorContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await retryOperation(() => createUser(data), 3);
      toast({ description: 'Пользователь создан' });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <button disabled={isSubmitting || isRetrying}>
        {isSubmitting ? 'Создание...' : 'Создать'}
      </button>
    </form>
  );
}
```

## Заключение

Система логирования и обработки ошибок FitTrak-Pro обеспечивает:

- **Надежность**: Централизованная обработка всех ошибок
- **Отладка**: Детальное логирование для быстрого решения проблем
- **Мониторинг**: API для отслеживания состояния системы
- **UX**: Понятные сообщения об ошибках для пользователей
- **Масштабируемость**: Легкое расширение и интеграция с внешними системами

Система готова к использованию в production и может быть легко расширена по мере роста приложения.
