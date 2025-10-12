import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  birthDate: text("birth_date"),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  isTrainer: integer("is_trainer").default(0), // 0 = false, 1 = true
});

export const pupils = sqliteTable("students", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  trainerId: integer("trainer_id"), // может быть null для самостоятельной регистрации
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  middleName: text("middle_name"),
  phone: text("phone").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // хешированный пароль
  birthDate: text("birth_date").notNull(), // полная дата рождения
  weight: integer("weight"), // kg
  height: integer("height"), // cm
  goal: text("goal"), // основные цели тренировок
  medicalNotes: text("medical_notes"), // ограничения по здоровью и травмы
  photo: text("photo"), // URL или путь к фото
  status: text("status").notNull().default("pending"), // 'pending', 'active', 'inactive'
  joinDate: text("join_date").notNull(),
  
  // Поля для несовершеннолетних (до 16 лет)
  parentFirstName: text("parent_first_name"), // ФИО родителей/опекунов
  parentLastName: text("parent_last_name"),
  parentMiddleName: text("parent_middle_name"),
  parentPhone: text("parent_phone"), // телефон родителей
  parentEmail: text("parent_email"), // email родителей
  parentSpecialInstructions: text("parent_special_instructions"), // особые указания от родителей
  isParentRepresentative: integer("is_parent_representative").default(0), // является ли родителем/представителем
  
  // Документы и согласия
  privacyPolicyAccepted: integer("privacy_policy_accepted").default(0), // согласие с политикой обработки персональных данных
  privacyPolicyAcceptedDate: text("privacy_policy_accepted_date"), // дата согласия
  contractAccepted: integer("contract_accepted").default(0), // принятие условий договора-оферты
  contractAcceptedDate: text("contract_accepted_date"), // дата принятия
  educationConsentAccepted: integer("education_consent_accepted").default(0), // согласие на образовательную деятельность
  educationConsentAcceptedDate: text("education_consent_accepted_date"), // дата согласия
  
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

export const workoutPrograms = sqliteTable("workout_programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'strength', 'cardio', 'functional', 'stretching'
  duration: integer("duration").notNull(), // minutes
  level: text("level").notNull(), // 'beginner', 'intermediate', 'advanced'
  createdBy: integer("created_by").notNull(),
  exercises: text("exercises").notNull(), // JSON string instead of jsonb
});

export const workoutSessions = sqliteTable("workout_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  programId: integer("program_id").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  status: text("status").default("scheduled"), // 'scheduled', 'completed', 'missed'
  completedAt: text("completed_at"),
});

export const exercises = sqliteTable("exercises", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  primaryMuscles: text("primaryMuscles").notNull(), // JSON string instead of array
  secondaryMuscles: text("secondaryMuscles").notNull().default("[]"), // JSON string instead of array
  difficulty: text("difficulty").notNull(), // 'начинающий', 'средний', 'продвинутый'
  overview: text("overview").notNull(), // обзор упражнения
  technique: text("technique").notNull(), // JSON string instead of array
  commonMistakes: text("commonMistakes").notNull(), // JSON string instead of array
  contraindications: text("contraindications").notNull(), // JSON string instead of array
  muscleImageUrl: text("muscleImageUrl"), // ссылка на картинку с выделенными мышцами
  videoUrl: text("videoUrl"), // ссылка на видео с техникой выполнения
  techniqueImageUrl: text("techniqueImageUrl"), // ссылка на изображение с техникой выполнения
  createdBy: integer("createdBy"), // кто создал упражнение (тренер)
  createdAt: text("createdAt").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updatedAt").default("CURRENT_TIMESTAMP").notNull(),
});

export const exerciseProgress = sqliteTable("exercise_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  exerciseId: integer("exercise_id").notNull(),
  weight: integer("weight"), // kg
  reps: integer("reps"),
  sets: integer("sets"),
  date: text("date").notNull(),
  sessionId: integer("session_id"),
});

export const pupilTrainingPlans = sqliteTable("pupil_training_plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pupilId: integer("pupil_id").notNull(),
  trainerId: integer("trainer_id").notNull(),
  name: text("name").notNull(),
  exercises: text("exercises").notNull(), // JSON string instead of jsonb
  isActive: integer("is_active").default(1),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
});

// Таблица для истории тренировок учеников
export const pupilWorkoutHistory = sqliteTable("pupil_workout_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pupilId: integer("pupil_id").notNull(),
  trainerId: integer("trainer_id").notNull(),
  workoutDate: text("workout_date").notNull(),
  workoutTime: text("workout_time").notNull(),
  duration: integer("duration"), // продолжительность в минутах
  exercises: text("exercises").notNull(), // JSON string instead of jsonb
  notes: text("notes"), // заметки тренера
  pupilFeedback: text("pupil_feedback"), // отзыв ученика
  status: text("status").notNull().default("completed"), // 'completed', 'missed', 'cancelled'
  confirmationStatus: text("confirmation_status").notNull().default("pending"), // 'pending', 'confirmed', 'declined'
  confirmedAt: text("confirmed_at"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// Активные тренировки
export const activeWorkouts = sqliteTable("active_workouts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  trainerId: integer("trainer_id").notNull(),
  pupilId: integer("pupil_id").notNull(),
  workoutProgramId: integer("workout_program_id").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});

// Записи на тренировки (appointments)
export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  trainerId: integer("trainer_id").notNull(),
  pupilId: integer("pupil_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
  updatedAt: text("updated_at").default("CURRENT_TIMESTAMP").notNull(),
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

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
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
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
