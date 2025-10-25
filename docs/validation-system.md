# Система валидации FitTrak-Pro

## Обзор

Система валидации FitTrak-Pro обеспечивает консистентную валидацию данных как на клиенте, так и на сервере, используя Zod схемы и централизованную обработку ошибок.

## Архитектура

### Серверная валидация

- **Middleware валидации**: `server/validation.ts`
- **Схемы валидации**: Используются существующие Zod схемы из `@shared/schema`
- **Обработка ошибок**: Централизованная обработка с детальными сообщениями

### Клиентская валидация

- **Утилиты валидации**: `client/src/lib/validation.ts`
- **Компоненты ошибок**: `client/src/components/ui/validation-errors.tsx`
- **Интеграция с формами**: React Hook Form + Zod resolver

## Использование

### 1. Серверная валидация

#### Базовое использование middleware

```typescript
import { validateBody, validateParams, validateQuery } from './validation';

// Валидация тела запроса
app.post('/api/users', validateBody(insertUserSchema), async (req: ValidatedRequest, res) => {
  const userData = req.validatedData!; // Типизированные данные
  // ...
});

// Валидация параметров
app.get('/api/users/:id', validateParams(uuidParamSchema), async (req: ValidatedRequest, res) => {
  const { id } = req.validatedData!;
  // ...
});

// Валидация query параметров
app.get('/api/users', validateQuery(searchQuerySchema), async (req: ValidatedRequest, res) => {
  const { search, page } = req.validatedData!;
  // ...
});
```

#### Доступные схемы валидации

```typescript
// Параметры
uuidParamSchema          // { id: string }
trainerIdParamSchema     // { trainerId: string }
pupilIdParamSchema       // { pupilId: string }
userIdParamSchema        // { userId: string }
exerciseIdParamSchema    // { id: string }
sessionIdParamSchema     // { id: string }
appointmentIdParamSchema // { id: string }

// Query параметры
dateQuerySchema          // { date: string }
muscleGroupQuerySchema   // { muscleGroup: string }

// Обновления
updateUserSchema
updatePupilSchema
updateExerciseSchema
updateWorkoutProgramSchema
updateAppointmentSchema
```

### 2. Клиентская валидация

#### Использование в формах

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientValidationSchemas, useFormValidation, handleApiError } from '@/lib/validation';
import { FormErrors, FieldError } from '@/components/ui/validation-errors';

function MyForm() {
  const { validationErrors, setErrors, clearErrors } = useFormValidation();
  
  const form = useForm({
    resolver: zodResolver(clientValidationSchemas.login),
  });

  const onSubmit = async (data) => {
    clearErrors();
    
    try {
      await apiCall(data);
    } catch (error) {
      // Обработка ошибок валидации с сервера
      if (handleApiError(error, setErrors)) {
        return;
      }
      
      // Общие ошибки
      toast.error('Произошла ошибка');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Общие ошибки формы */}
      <FormErrors errors={validationErrors} />
      
      <div>
        <input {...form.register('email')} />
        {/* Ошибки валидации поля */}
        <FieldError errors={validationErrors} fieldName="email" />
        {/* Ошибки React Hook Form */}
        {form.formState.errors.email && (
          <p className="text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
    </form>
  );
}
```

#### Доступные схемы валидации

```typescript
clientValidationSchemas.login              // Вход
clientValidationSchemas.pupilRegistration  // Регистрация ученика
clientValidationSchemas.exercise           // Создание упражнения
clientValidationSchemas.workoutProgram     // Программа тренировки
clientValidationSchemas.appointment       // Запись на тренировку
clientValidationSchemas.userProfile       // Профиль пользователя
clientValidationSchemas.forgotPassword    // Сброс пароля
```

### 3. Компоненты ошибок

#### FormErrors - общие ошибки формы

```typescript
<FormErrors 
  errors={validationErrors} 
  dismissible={true}
  onDismiss={() => clearErrors()}
/>
```

#### FieldError - ошибки конкретного поля

```typescript
<FieldError 
  errors={validationErrors} 
  fieldName="email" 
/>
```

#### ValidationErrors - универсальный компонент

```typescript
<ValidationErrors 
  errors={validationErrors}
  fieldName="email"        // Для ошибок поля
  showIcon={true}
  className="text-red-500"
/>
```

### 4. Хуки и утилиты

#### useFormValidation

```typescript
const {
  validationErrors,    // Текущие ошибки
  clearErrors,         // Очистить все ошибки
  setErrors,           // Установить ошибки
  addError,            // Добавить ошибку
  removeError,         // Удалить ошибку поля
  hasError,            // Проверить наличие ошибки
  getFieldError,       // Получить ошибку поля
  getGeneralErrors     // Получить общие ошибки
} = useFormValidation();
```

#### useValidationErrors

```typescript
const {
  getFieldError,       // Получить ошибку поля
  getFieldErrors,      // Получить все ошибки поля
  hasFieldError,       // Проверить наличие ошибки
  getGeneralErrors,    // Получить общие ошибки
  formatErrors         // Форматировать ошибки
} = useValidationErrors();
```

## Обработка ошибок

### Структура ошибки валидации

```typescript
interface ValidationError {
  field: string;    // Поле с ошибкой
  message: string;  // Сообщение об ошибке
  code: string;     // Код ошибки
}
```

### Ответ сервера при ошибке валидации

```json
{
  "message": "Ошибка валидации данных",
  "errors": [
    {
      "field": "email",
      "message": "Некорректный email адрес",
      "code": "invalid_string"
    }
  ],
  "details": [...]
}
```

## Лучшие практики

### 1. Серверная валидация

- Всегда используйте middleware валидации для API эндпоинтов
- Используйте типизированные схемы из `@shared/schema`
- Предоставляйте понятные сообщения об ошибках на русском языке
- Валидируйте параметры, тело запроса и query параметры отдельно

### 2. Клиентская валидация

- Используйте `clientValidationSchemas` для консистентности
- Обрабатывайте ошибки валидации с сервера через `handleApiError`
- Отображайте ошибки как на уровне поля, так и на уровне формы
- Очищайте ошибки при изменении данных

### 3. UX рекомендации

- Показывайте ошибки валидации в реальном времени
- Предоставляйте возможность закрыть общие ошибки
- Используйте иконки для лучшей визуализации ошибок
- Группируйте связанные ошибки

## Расширение системы

### Добавление новой схемы валидации

1. **Серверная схема** (в `server/validation.ts`):
```typescript
export const newEntitySchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  // ...
});
```

2. **Клиентская схема** (в `client/src/lib/validation.ts`):
```typescript
export const clientValidationSchemas = {
  // ...
  newEntity: z.object({
    name: z.string().min(1, 'Название обязательно'),
    // ...
  })
};
```

3. **Middleware** (в `server/routes.ts`):
```typescript
app.post('/api/new-entity', validateBody(newEntitySchema), async (req: ValidatedRequest, res) => {
  // ...
});
```

### Добавление нового типа ошибки

1. Обновите интерфейс `ValidationError`
2. Добавьте обработку в `handleApiError`
3. Обновите компоненты отображения ошибок

## Отладка

### Проверка валидации на сервере

```typescript
// Логирование ошибок валидации
console.log('Validation errors:', error.errors);
```

### Проверка валидации на клиенте

```typescript
// В компоненте формы
console.log('Form errors:', form.formState.errors);
console.log('Validation errors:', validationErrors);
```

## Миграция существующих форм

1. Импортируйте новые утилиты валидации
2. Замените локальные схемы на `clientValidationSchemas`
3. Добавьте `useFormValidation` хук
4. Обновите обработку ошибок с `handleApiError`
5. Добавьте компоненты отображения ошибок

## Примеры

См. обновленные файлы:
- `client/src/components/auth/login-form.tsx`
- `client/src/components/auth/forgot-password-form.tsx`
- `server/routes.ts` (обновленные эндпоинты)
