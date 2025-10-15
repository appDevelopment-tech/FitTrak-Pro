# Инструкции по созданию файла .env

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://pszwyewebfscuosquorc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzend5ZXdlYmZzY3Vvc3F1b3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMzc3NDgsImV4cCI6MjA3NDkxMzc0OH0.yFqbFPm8Ujiq6tcsXJy3-CphRnyzJJRVL4BnDwspsD4
VITE_UNSPLASH_ACCESS_KEY=IzHTKW14WZla9YdGeTPatOQpQkNvregKh3gfs6rhaHY

# Database Configuration
DATABASE_URL=postgresql://postgres:MassUnfollow2025%21@db.pszwyewebfscuosquorc.supabase.co:5432/postgres

# Для тестирования без Supabase (не рекомендуется для продакшена)
# VITE_BYPASS_AUTH=true
```

## Следующие шаги:

1. **Создайте файл `.env`** вручную в корне проекта с содержимым выше
2. **Создайте пользователей в Supabase Auth:**
   - Перейдите в Supabase Dashboard → Authentication → Users
   - Нажмите "Add user" и создайте:

### 👨‍🏫 Тренер:
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

### 👨‍🎓 Ученики:
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

3. **Добавьте записи в таблицу students** в Supabase SQL Editor:
   ```sql
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

4. **Перезапустите приложение** после создания файла `.env`
