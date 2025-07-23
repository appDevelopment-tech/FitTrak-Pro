import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  birthDate: text("birth_date"),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  isTrainer: boolean("is_trainer").default(false),
});

export const pupils = pgTable("students", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  birthDate: text("birth_date").notNull(), // полная дата рождения
  weight: integer("weight"), // kg
  height: integer("height"), // cm
  goal: text("goal"), // основные цели тренировок
  medicalNotes: text("medical_notes"), // ограничения по здоровью и травмы
  photo: text("photo"), // URL или путь к фото
  status: text("status").notNull().default("active"), // 'active', 'inactive'
  joinDate: text("join_date").notNull(),
  
  // Поля для несовершеннолетних (до 16 лет)
  parentFirstName: text("parent_first_name"), // ФИО родителей/опекунов
  parentLastName: text("parent_last_name"),
  parentMiddleName: text("parent_middle_name"),
  parentPhone: text("parent_phone"), // телефон родителей
  parentEmail: text("parent_email"), // email родителей
  parentSpecialInstructions: text("parent_special_instructions"), // особые указания от родителей
  
  // Документы и согласия
  applicationSubmitted: boolean("application_submitted").default(false), // заявление подано
  applicationDate: text("application_date"), // дата подачи заявления
  rulesAccepted: boolean("rules_accepted").default(false), // согласие с правилами
  rulesAcceptedDate: text("rules_accepted_date"), // дата согласия с правилами
  parentalConsent: boolean("parental_consent").default(false), // согласие родителей для детей до 16
  parentalConsentDate: text("parental_consent_date"), // дата согласия родителей
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workoutPrograms = pgTable("workout_programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'strength', 'cardio', 'functional', 'stretching'
  duration: integer("duration").notNull(), // minutes
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  createdBy: integer("created_by").notNull(),
  exercises: jsonb("exercises").notNull(), // array of exercise objects
});

export const workoutSessions = pgTable("workout_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  programId: integer("program_id").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  status: text("status").default("scheduled"), // 'scheduled', 'completed', 'missed'
  completedAt: timestamp("completed_at"),
});

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  primaryMuscles: text("primaryMuscles").array().notNull(), // основные группы мышц
  secondaryMuscles: text("secondaryMuscles").array().notNull().default([]), // вспомогательные группы мышц
  difficulty: text("difficulty").notNull(), // 'начинающий', 'средний', 'продвинутый'
  overview: text("overview").notNull(), // обзор упражнения
  technique: text("technique").array().notNull(), // техника выполнения (пошагово)
  commonMistakes: text("commonMistakes").array().notNull(), // частые ошибки и их исправление
  contraindications: text("contraindications").array().notNull(), // противопоказания
  muscleImageUrl: text("muscleImageUrl"), // ссылка на картинку с выделенными мышцами
  videoUrl: text("videoUrl"), // ссылка на видео с техникой выполнения
  techniqueImageUrl: text("techniqueImageUrl"), // ссылка на изображение с техникой выполнения
  createdBy: integer("createdBy"), // кто создал упражнение (тренер)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const exerciseProgress = pgTable("exercise_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  exerciseId: integer("exercise_id").notNull(),
  weight: integer("weight"), // kg
  reps: integer("reps"),
  sets: integer("sets"),
  date: timestamp("date").notNull(),
  sessionId: integer("session_id"),
});

export const pupilTrainingPlans = pgTable("pupil_training_plans", {
  id: serial("id").primaryKey(),
  pupilId: integer("pupil_id").notNull(),
  trainerId: integer("trainer_id").notNull(),
  name: text("name").notNull(),
  exercises: jsonb("exercises").notNull(), // массив упражнений с подходами/повторениями
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Таблица для истории тренировок учеников
export const pupilWorkoutHistory = pgTable("pupil_workout_history", {
  id: serial("id").primaryKey(),
  pupilId: integer("pupil_id").notNull(),
  trainerId: integer("trainer_id").notNull(),
  workoutDate: text("workout_date").notNull(),
  workoutTime: text("workout_time").notNull(),
  duration: integer("duration"), // продолжительность в минутах
  exercises: jsonb("exercises").notNull(), // выполненные упражнения с подходами и весами
  notes: text("notes"), // заметки тренера
  pupilFeedback: text("pupil_feedback"), // отзыв ученика
  status: text("status").notNull().default("completed"), // 'completed', 'missed', 'cancelled'
  confirmationStatus: text("confirmation_status").notNull().default("pending"), // 'pending', 'confirmed', 'declined'
  confirmedAt: timestamp("confirmed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Активные тренировки
export const activeWorkouts = pgTable("active_workouts", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").notNull(),
  pupilId: integer("pupil_id").notNull(),
  workoutProgramId: integer("workout_program_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertWorkoutProgramSchema = createInsertSchema(workoutPrograms).omit({
  id: true,
});

export const insertWorkoutSessionSchema = createInsertSchema(workoutSessions).omit({
  id: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExerciseProgressSchema = createInsertSchema(exerciseProgress).omit({
  id: true,
});

export const insertPupilSchema = createInsertSchema(pupils).omit({
  id: true,
});

export const insertPupilTrainingPlanSchema = createInsertSchema(pupilTrainingPlans).omit({
  id: true,
});

export const insertPupilWorkoutHistorySchema = createInsertSchema(pupilWorkoutHistory).omit({
  id: true,
});

export const insertActiveWorkoutSchema = createInsertSchema(activeWorkouts).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Pupil = typeof pupils.$inferSelect;
export type InsertPupil = z.infer<typeof insertPupilSchema>;
export type WorkoutProgram = typeof workoutPrograms.$inferSelect;
export type InsertWorkoutProgram = z.infer<typeof insertWorkoutProgramSchema>;
export type WorkoutSession = typeof workoutSessions.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type ExerciseProgress = typeof exerciseProgress.$inferSelect;
export type InsertExerciseProgress = z.infer<typeof insertExerciseProgressSchema>;
export type PupilTrainingPlan = typeof pupilTrainingPlans.$inferSelect;
export type InsertPupilTrainingPlan = z.infer<typeof insertPupilTrainingPlanSchema>;
export type PupilWorkoutHistory = typeof pupilWorkoutHistory.$inferSelect;
export type InsertPupilWorkoutHistory = z.infer<typeof insertPupilWorkoutHistorySchema>;
export type ActiveWorkout = typeof activeWorkouts.$inferSelect;
export type InsertActiveWorkout = z.infer<typeof insertActiveWorkoutSchema>;
