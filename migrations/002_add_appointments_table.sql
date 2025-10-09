-- Create appointments table for schedule management
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  trainer_id INTEGER NOT NULL,
  pupil_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_trainer_id ON appointments(trainer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_pupil_id ON appointments(pupil_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date_time ON appointments(date, time);