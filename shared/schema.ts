import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  isTrainer: boolean("is_trainer").default(false),
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
  primaryMuscles: text("primary_muscles").array().notNull(), // основные группы мышц
  secondaryMuscles: text("secondary_muscles").array().notNull(), // вспомогательные группы мышц
  equipment: text("equipment").notNull(), // 'тренажер', 'гантели', 'резина', 'штанга', 'собственный_вес'
  difficulty: text("difficulty").notNull(), // 'начинающий', 'средний', 'продвинутый'
  overview: text("overview").notNull(), // обзор упражнения
  technique: text("technique").array().notNull(), // техника выполнения (пошагово)
  commonMistakes: text("common_mistakes").array().notNull(), // частые ошибки и их исправление
  contraindications: text("contraindications").array().notNull(), // противопоказания
  muscleImageUrl: text("muscle_image_url"), // ссылка на картинку с выделенными мышцами
  createdBy: integer("created_by"), // кто создал упражнение (тренер)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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
});

export const insertExerciseProgressSchema = createInsertSchema(exerciseProgress).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type WorkoutProgram = typeof workoutPrograms.$inferSelect;
export type InsertWorkoutProgram = z.infer<typeof insertWorkoutProgramSchema>;
export type WorkoutSession = typeof workoutSessions.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type ExerciseProgress = typeof exerciseProgress.$inferSelect;
export type InsertExerciseProgress = z.infer<typeof insertExerciseProgressSchema>;
