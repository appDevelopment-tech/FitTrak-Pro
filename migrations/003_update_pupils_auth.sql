-- Миграция для обновления таблицы pupils для системы авторизации
-- Добавляем поля для самостоятельной регистрации учеников

-- Делаем trainer_id необязательным
ALTER TABLE students ALTER COLUMN trainer_id DROP NOT NULL;

-- Добавляем уникальность для email
ALTER TABLE students ADD CONSTRAINT students_email_unique UNIQUE (email);

-- Добавляем поле для пароля
ALTER TABLE students ADD COLUMN password TEXT NOT NULL DEFAULT '';

-- Обновляем статус по умолчанию
ALTER TABLE students ALTER COLUMN status SET DEFAULT 'pending';

-- Добавляем поля для родителей/представителей
ALTER TABLE students ADD COLUMN is_parent_representative BOOLEAN DEFAULT FALSE;

-- Обновляем поля согласий
ALTER TABLE students DROP COLUMN IF EXISTS application_submitted;
ALTER TABLE students DROP COLUMN IF EXISTS application_date;
ALTER TABLE students DROP COLUMN IF EXISTS rules_accepted;
ALTER TABLE students DROP COLUMN IF EXISTS rules_accepted_date;
ALTER TABLE students DROP COLUMN IF EXISTS parental_consent;
ALTER TABLE students DROP COLUMN IF EXISTS parental_consent_date;

-- Добавляем новые поля согласий
ALTER TABLE students ADD COLUMN privacy_policy_accepted BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN privacy_policy_accepted_date TEXT;
ALTER TABLE students ADD COLUMN contract_accepted BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN contract_accepted_date TEXT;
ALTER TABLE students ADD COLUMN education_consent_accepted BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN education_consent_accepted_date TEXT;

-- Обновляем существующие записи
UPDATE students SET password = 'temp_password_' || id WHERE password = '';
UPDATE students SET status = 'active' WHERE status = 'pending' AND trainer_id IS NOT NULL;

