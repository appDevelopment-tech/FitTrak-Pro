# Database Configuration - Supabase Only

## Overview

FitTrak-Pro использует **только Supabase с Prisma** как основную систему базы данных.

## Архитектура

- **База данных**: PostgreSQL (через Supabase)
- **ORM**: Prisma Client
- **Аутентификация**: Supabase Auth
- **Хранение файлов**: Supabase Storage (при необходимости)

## Конфигурация

### Переменные окружения (.env)

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URL для Prisma
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}
```

## Структура таблиц

### Основные таблицы

1. **users** - Тренеры
   - `id` (UUID, Primary Key)
   - `username` (String, Unique)
   - `password` (String, bcrypt hashed)
   - `first_name` (String)
   - `last_name` (String)
   - `middle_name` (String, Optional)
   - `birth_date` (String, Optional)
   - `email` (String, Unique)
   - `phone` (String, Optional)
   - `photo` (String, Optional) - Base64 или URL
   - `is_trainer` (Boolean, Default: true)
   - `created_at` (DateTime)
   - `updated_at` (DateTime)

2. **students** - Ученики
   - `id` (UUID, Primary Key)
   - `trainer_id` (UUID, Foreign Key to users)
   - `first_name` (String)
   - `last_name` (String)
   - `middle_name` (String, Optional)
   - `phone` (String)
   - `email` (String, Unique)
   - `password` (String, Optional)
   - `birth_date` (String)
   - `weight` (Int, Optional)
   - `height` (Int, Optional)
   - `goal` (String, Optional)
   - `medical_notes` (String, Optional)
   - `photo` (String, Optional) - Base64 или URL
   - `status` (String, Default: "pending")
   - `join_date` (String)
   - `created_at` (DateTime)
   - `updated_at` (DateTime)

3. **exercises** - Упражнения
4. **workout_programs** - Программы тренировок
5. **workout_sessions** - Сессии тренировок
6. **exercise_progress** - Прогресс упражнений
7. **pupil_training_plans** - Планы тренировок учеников
8. **pupil_workout_history** - История тренировок
9. **active_workouts** - Активные тренировки
10. **appointments** - Записи на тренировки
11. **muscle_groups** - Группы мышц

## Аутентификация

### Supabase Auth

- Используется для аутентификации пользователей
- Поддерживает email/password
- Интегрируется с Prisma для получения профилей

### Процесс аутентификации

1. Пользователь входит через Supabase Auth
2. Получаем `user.id` из Supabase
3. Ищем профиль в таблице `users` или `students` по email
4. Загружаем полный профиль через Prisma

## Миграции

### Создание миграции

```bash
npx prisma migrate dev --name migration_name
```

### Применение миграций

```bash
npx prisma migrate deploy
```

### Генерация Prisma Client

```bash
npx prisma generate
```

## Разработка

### Локальная разработка

1. Убедитесь, что Supabase проект настроен
2. Скопируйте переменные окружения в `.env`
3. Запустите миграции: `npx prisma migrate deploy`
4. Сгенерируйте клиент: `npx prisma generate`
5. Запустите приложение: `npm run dev`

### Проверка подключения

```bash
npm run check:supabase
```

## Важные замечания

1. **Только Supabase**: Не используем SQLite или другие локальные базы данных
2. **Prisma как ORM**: Все запросы к базе данных через Prisma Client
3. **Supabase Auth**: Аутентификация только через Supabase
4. **Миграции**: Все изменения схемы через Prisma миграции
5. **Типизация**: Используем сгенерированные типы Prisma

## Troubleshooting

### Проблемы с подключением

1. Проверьте переменные окружения
2. Убедитесь, что Supabase проект активен
3. Проверьте интернет-соединение
4. Проверьте правильность DATABASE_URL

### Проблемы с миграциями

1. Убедитесь, что база данных доступна
2. Проверьте права доступа
3. Запустите `npx prisma migrate reset` для сброса (осторожно!)

## Будущие планы

- Интеграция с Supabase Storage для файлов
- Использование Supabase Edge Functions
- Real-time подписки через Supabase
- Расширенная аутентификация (OAuth, SSO)
