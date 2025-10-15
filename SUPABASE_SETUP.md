# Настройка Supabase для FitTrak Pro

## 🔧 Настройка переменных окружения

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Для тестирования без Supabase (не рекомендуется для продакшена)
# VITE_BYPASS_AUTH=true
```

## 📋 Создание пользователей в Supabase

### 👨‍🏫 Тренер
1. Перейдите в Supabase Dashboard → Authentication → Users
2. Нажмите "Add user"
3. Заполните данные:
   - **Email:** `petrusenko@fittrak.pro`
   - **Password:** `trainer123`
   - **User Metadata:**
     ```json
     {
       "first_name": "Константин Владимирович",
       "last_name": "Петрусенко",
       "is_trainer": true
     }
     ```

### 👨‍🎓 Ученики
1. **Иванов Иван:**
   - **Email:** `ivanov@fittrak.pro`
   - **Password:** `student123`
   - **User Metadata:**
     ```json
     {
       "first_name": "Иван",
       "last_name": "Иванов",
       "is_trainer": false
     }
     ```

2. **Студентович_1 Студент_1:**
   - **Email:** `student1@fittrak.pro`
   - **Password:** `student123`
   - **User Metadata:**
     ```json
     {
       "first_name": "Студентович_1",
       "last_name": "Студент_1",
       "is_trainer": false
     }
     ```

## 🗄️ Настройка базы данных

Убедитесь, что в таблице `students` есть записи для учеников:

```sql
-- Добавьте записи для учеников
INSERT INTO students (
  id, trainer_id, first_name, last_name, email, phone, 
  birth_date, status, join_date
) VALUES 
(
  '2', '1', 'Иван', 'Иванов', 'ivanov@fittrak.pro', 
  '+7 (999) 123-45-67', '1990-01-01', 'active', '2024-01-01'
),
(
  '3', '1', 'Студентович_1', 'Студент_1', 'student1@fittrak.pro', 
  '+7 (999) 987-65-43', '1995-05-15', 'active', '2024-01-15'
);
```

## 🔄 Режимы работы

### Режим Supabase (рекомендуется)
- Установите `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`
- НЕ устанавливайте `VITE_BYPASS_AUTH=true`
- Система будет использовать реальную аутентификацию Supabase

### Тестовый режим (для разработки)
- Установите `VITE_BYPASS_AUTH=true`
- Система будет использовать тестовые данные без Supabase

## ✅ Проверка настройки

После настройки проверьте в консоли браузера:
```
Supabase configuration check: {
  VITE_SUPABASE_URL: "https://your-project.supabase.co",
  VITE_SUPABASE_ANON_KEY: "your-key",
  isSupabaseConfigured: true,
  BYPASS_AUTH: false
}
```
