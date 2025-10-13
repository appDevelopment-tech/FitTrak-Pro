# Настройка Supabase для FitTrak-Pro

## 🚀 Быстрый старт

### 1. Создание проекта Supabase

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Дождитесь завершения инициализации (2-3 минуты)

### 2. Получение ключей

1. В панели Supabase перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://your-project.supabase.co`)
   - **anon public key** (начинается с `eyJ...`)

### 3. Настройка переменных окружения

1. Создайте файл `.env` в корне проекта:
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Замените значения на ваши реальные ключи

### 4. Настройка базы данных

#### Создание таблиц

Выполните следующие SQL команды в **SQL Editor** Supabase:

```sql
-- Создание таблицы пользователей (тренеров)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  birth_date TEXT,
  phone TEXT,
  is_trainer BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы учеников
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  weight INTEGER,
  height INTEGER,
  goal TEXT,
  medical_notes TEXT,
  photo TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  join_date TEXT NOT NULL,
  
  -- Поля для несовершеннолетних (до 16 лет)
  parent_first_name TEXT,
  parent_last_name TEXT,
  parent_middle_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  parent_special_instructions TEXT,
  
  -- Документы и согласия
  application_submitted BOOLEAN DEFAULT false,
  application_date TEXT,
  rules_accepted BOOLEAN DEFAULT false,
  rules_accepted_date TEXT,
  parental_consent BOOLEAN DEFAULT false,
  parental_consent_date TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы упражнений
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  primary_muscles TEXT[] NOT NULL,
  secondary_muscles TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT NOT NULL,
  overview TEXT NOT NULL,
  technique TEXT[] NOT NULL,
  common_mistakes TEXT[] NOT NULL,
  contraindications TEXT[] NOT NULL,
  muscle_image_url TEXT,
  video_url TEXT,
  technique_image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы программ тренировок
CREATE TABLE IF NOT EXISTS workout_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  description TEXT,
  exercises JSONB NOT NULL DEFAULT '[]',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание таблицы записей на тренировки
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID REFERENCES users(id) NOT NULL,
  pupil_id UUID REFERENCES students(id) NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  duration INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Настройка Row Level Security (RLS)

```sql
-- Включение RLS для всех таблиц
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Политики для таблицы users (только тренеры могут видеть других тренеров)
CREATE POLICY "Users can view trainers" ON users
  FOR SELECT USING (is_trainer = true);

-- Политики для таблицы students
CREATE POLICY "Trainers can view all students" ON students
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = students.trainer_id 
      AND users.is_trainer = true
    )
  );

CREATE POLICY "Students can view own profile" ON students
  FOR SELECT USING (
    auth.jwt() ->> 'email' = email
  );

-- Политики для таблицы exercises
CREATE POLICY "Anyone can view exercises" ON exercises
  FOR SELECT USING (true);

CREATE POLICY "Trainers can manage exercises" ON exercises
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = exercises.created_by 
      AND users.is_trainer = true
    )
  );

-- Политики для таблицы workout_programs
CREATE POLICY "Trainers can view all programs" ON workout_programs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = workout_programs.created_by 
      AND users.is_trainer = true
    )
  );

CREATE POLICY "Trainers can manage programs" ON workout_programs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = workout_programs.created_by 
      AND users.is_trainer = true
    )
  );

-- Политики для таблицы appointments
CREATE POLICY "Trainers can view all appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = appointments.trainer_id 
      AND users.is_trainer = true
    )
  );

CREATE POLICY "Students can view own appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM students 
      WHERE students.id = appointments.pupil_id 
      AND students.email = auth.jwt() ->> 'email'
    )
  );
```

### 5. Настройка аутентификации

1. В панели Supabase перейдите в **Authentication** → **Settings**
2. Настройте:
   - **Site URL**: `http://localhost:5173` (для разработки)
   - **Redirect URLs**: `http://localhost:5173/**`
3. Включите **Email confirmations** (опционально)

### 6. Создание тестовых пользователей

#### Создание тренера через SQL:

```sql
-- Создание тестового тренера
INSERT INTO users (email, password, first_name, last_name, is_trainer)
VALUES (
  'trainer@fittrak.pro',
  crypt('password123', gen_salt('bf')),
  'Иван',
  'Тренеров',
  true
);
```

#### Создание ученика через приложение:

1. Запустите приложение: `npm run dev`
2. Перейдите на страницу регистрации
3. Заполните форму регистрации
4. Проверьте email для подтверждения (если включено)

### 7. Тестирование

1. Перезапустите приложение: `npm run dev`
2. Попробуйте войти с тестовыми данными:
   - **Тренер**: `trainer@fittrak.pro` / `password123`
   - **Ученик**: используйте данные из регистрации

## 🔧 Дополнительные настройки

### Настройка email (опционально)

1. В **Authentication** → **Settings** → **SMTP Settings**
2. Настройте SMTP для отправки email уведомлений

### Настройка хранилища файлов

1. В **Storage** создайте bucket `avatars` для фотографий пользователей
2. Настройте политики доступа

### Мониторинг

1. Используйте **Logs** для отслеживания ошибок
2. **Database** → **Logs** для SQL запросов
3. **API** → **Logs** для API вызовов

## 🚨 Важные замечания

1. **Никогда не коммитьте `.env` файл** - добавьте его в `.gitignore`
2. **Используйте разные проекты** для разработки и продакшена
3. **Регулярно делайте бэкапы** базы данных
4. **Настройте мониторинг** для отслеживания использования

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в панели Supabase
2. Убедитесь, что все переменные окружения настроены
3. Проверьте политики RLS
4. Обратитесь к [документации Supabase](https://supabase.com/docs)

