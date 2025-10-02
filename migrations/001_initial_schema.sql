-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  birth_date TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  is_trainer BOOLEAN DEFAULT false
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  trainer_id INTEGER NOT NULL,
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

  -- Fields for minors (under 16)
  parent_first_name TEXT,
  parent_last_name TEXT,
  parent_middle_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  parent_special_instructions TEXT,

  -- Documents and consents
  application_submitted BOOLEAN DEFAULT false,
  application_date TEXT,
  rules_accepted BOOLEAN DEFAULT false,
  rules_accepted_date TEXT,
  parental_consent BOOLEAN DEFAULT false,
  parental_consent_date TEXT,

  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  "primaryMuscles" TEXT[] NOT NULL,
  "secondaryMuscles" TEXT[] NOT NULL DEFAULT '{}',
  difficulty TEXT NOT NULL,
  overview TEXT NOT NULL,
  technique TEXT[] NOT NULL,
  "commonMistakes" TEXT[] NOT NULL,
  contraindications TEXT[] NOT NULL,
  "muscleImageUrl" TEXT,
  "videoUrl" TEXT,
  "techniqueImageUrl" TEXT,
  "createdBy" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create workout_programs table
CREATE TABLE IF NOT EXISTS workout_programs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  level TEXT NOT NULL,
  created_by INTEGER NOT NULL,
  exercises JSONB NOT NULL
);

-- Create workout_sessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  scheduled_date TIMESTAMP NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  completed_at TIMESTAMP
);

-- Create exercise_progress table
CREATE TABLE IF NOT EXISTS exercise_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  weight INTEGER,
  reps INTEGER,
  sets INTEGER,
  date TIMESTAMP NOT NULL,
  session_id INTEGER
);

-- Create pupil_training_plans table
CREATE TABLE IF NOT EXISTS pupil_training_plans (
  id SERIAL PRIMARY KEY,
  pupil_id INTEGER NOT NULL,
  trainer_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  exercises JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create pupil_workout_history table
CREATE TABLE IF NOT EXISTS pupil_workout_history (
  id SERIAL PRIMARY KEY,
  pupil_id INTEGER NOT NULL,
  trainer_id INTEGER NOT NULL,
  workout_date TEXT NOT NULL,
  workout_time TEXT NOT NULL,
  duration INTEGER,
  exercises JSONB NOT NULL,
  notes TEXT,
  pupil_feedback TEXT,
  status TEXT NOT NULL DEFAULT 'completed',
  confirmation_status TEXT NOT NULL DEFAULT 'pending',
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create active_workouts table
CREATE TABLE IF NOT EXISTS active_workouts (
  id SERIAL PRIMARY KEY,
  trainer_id INTEGER NOT NULL,
  pupil_id INTEGER NOT NULL,
  workout_program_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_trainer_id ON students(trainer_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_progress_user_id ON exercise_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_pupil_training_plans_pupil_id ON pupil_training_plans(pupil_id);
CREATE INDEX IF NOT EXISTS idx_pupil_workout_history_pupil_id ON pupil_workout_history(pupil_id);
CREATE INDEX IF NOT EXISTS idx_active_workouts_trainer_id ON active_workouts(trainer_id);
CREATE INDEX IF NOT EXISTS idx_active_workouts_pupil_id ON active_workouts(pupil_id);
