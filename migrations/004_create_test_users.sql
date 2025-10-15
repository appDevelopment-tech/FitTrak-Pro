-- Создание тестовых пользователей для системы авторизации

-- Тестовый тренер
INSERT INTO users (username, password, first_name, last_name, email, phone, is_trainer) 
VALUES ('trainer1', 'trainer123', 'Иван', 'Тренеров', 'trainer@fittrak.pro', '+7 (999) 000-00-02', true);

-- Тестовые ученики
INSERT INTO students (
  first_name, last_name, middle_name, phone, email, password, birth_date, 
  join_date, status, privacy_policy_accepted, contract_accepted, education_consent_accepted,
  privacy_policy_accepted_date, contract_accepted_date, education_consent_accepted_date
) VALUES 
(
  'Анна', 'Студентова', 'Петровна', '+7 (999) 111-11-11', 'student1@fittrak.pro', 'student123',
  '15.05.1995', '2024-01-01', 'active', true, true, true,
  '2024-01-01', '2024-01-01', '2024-01-01'
),
(
  'Петр', 'Учеников', 'Иванович', '+7 (999) 222-22-22', 'student2@fittrak.pro', 'student123',
  '22.08.1998', '2024-01-01', 'active', true, true, true,
  '2024-01-01', '2024-01-01', '2024-01-01'
),
(
  'Мария', 'Несовершеннолетняя', 'Сергеевна', '+7 (999) 333-33-33', 'student3@fittrak.pro', 'student123',
  '10.12.2010', '2024-01-01', 'active', true, true, true,
  '2024-01-01', '2024-01-01', '2024-01-01'
);

-- Обновляем данные для несовершеннолетней (добавляем данные родителей)
UPDATE students SET 
  parent_first_name = 'Сергей',
  parent_last_name = 'Родителев',
  parent_phone = '+7 (999) 444-44-44',
  parent_email = 'parent@fittrak.pro',
  is_parent_representative = true
WHERE email = 'student3@fittrak.pro';
