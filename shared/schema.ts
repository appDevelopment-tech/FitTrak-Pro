import { z } from "zod";
import type { Prisma } from "../generated/prisma";

// UUID validation helper
const uuidSchema = z.string().uuid("Некорректный формат UUID");

// Re-export Prisma types with app-friendly names
export type User = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  birthDate: string | null;
  email: string;
  phone: string | null;
  isTrainer: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Pupil = {
  id: string;
  trainerId: string | null;
  firstName: string;
  lastName: string;
  middleName: string | null;
  phone: string;
  email: string;
  password: string | null;
  birthDate: string;
  weight: number | null;
  height: number | null;
  goal: string | null;
  medicalNotes: string | null;
  photo: string | null;
  status: string;
  joinDate: string;
  parentFirstName: string | null;
  parentLastName: string | null;
  parentMiddleName: string | null;
  parentPhone: string | null;
  parentEmail: string | null;
  parentSpecialInstructions: string | null;
  isParentRepresentative: boolean;
  privacyPolicyAccepted: boolean;
  privacyPolicyAcceptedDate: string | null;
  contractAccepted: boolean;
  contractAcceptedDate: string | null;
  educationConsentAccepted: boolean;
  educationConsentAcceptedDate: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercise = {
  id: string;
  name: string;
  primaryMuscles: Prisma.JsonValue;
  secondaryMuscles: Prisma.JsonValue;
  difficulty: string;
  overview: string;
  technique: Prisma.JsonValue;
  commonMistakes: Prisma.JsonValue;
  contraindications: Prisma.JsonValue;
  muscleImageUrl: string | null;
  videoUrl: string | null;
  techniqueImageUrl: string | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutProgram = {
  id: string;
  name: string;
  type: string;
  duration: number;
  level: string;
  createdBy: string;
  exercises: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkoutSession = {
  id: string;
  userId: string;
  programId: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: string;
  completedAt: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ExerciseProgress = {
  id: string;
  userId: string;
  exerciseId: string;
  weight: number | null;
  reps: number | null;
  sets: number | null;
  date: string;
  sessionId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PupilTrainingPlan = {
  id: string;
  pupilId: string;
  trainerId: string;
  name: string;
  exercises: Prisma.JsonValue;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PupilWorkoutHistory = {
  id: string;
  pupilId: string;
  trainerId: string;
  workoutDate: string;
  workoutTime: string;
  duration: number | null;
  exercises: Prisma.JsonValue;
  notes: string | null;
  pupilFeedback: string | null;
  status: string;
  confirmationStatus: string;
  confirmedAt: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ActiveWorkout = {
  id: string;
  trainerId: string;
  pupilId: string;
  workoutProgramId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Appointment = {
  id: string;
  trainerId: string;
  pupilId: string;
  date: string;
  time: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MuscleGroup = {
  id: string;
  name: string;
  description: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

// Insert types (omit id and auto-generated fields)
export type InsertUser = Omit<User, "id">;
export type InsertPupil = Omit<Pupil, "id" | "createdAt" | "updatedAt">;
export type InsertExercise = Omit<Exercise, "id" | "createdAt" | "updatedAt">;
export type InsertWorkoutProgram = Omit<WorkoutProgram, "id">;
export type InsertWorkoutSession = Omit<WorkoutSession, "id">;
export type InsertExerciseProgress = Omit<ExerciseProgress, "id">;
export type InsertPupilTrainingPlan = Omit<PupilTrainingPlan, "id" | "createdAt" | "updatedAt">;
export type InsertPupilWorkoutHistory = Omit<PupilWorkoutHistory, "id" | "createdAt">;
export type InsertActiveWorkout = Omit<ActiveWorkout, "id" | "createdAt">;
export type InsertAppointment = Omit<Appointment, "id" | "createdAt" | "updatedAt">;

// Zod validation schemas
export const insertUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  isTrainer: z.boolean().nullable().optional(),
});

export const insertPupilSchema = z.object({
  trainerId: uuidSchema.nullable().optional(),
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  middleName: z.string().nullable().optional(),
  phone: z.string().min(1, "Телефон обязателен"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  birthDate: z.string().min(1, "Дата рождения обязательна"),
  weight: z.number().positive("Вес должен быть положительным числом").nullable().optional(),
  height: z.number().positive("Рост должен быть положительным числом").nullable().optional(),
  goal: z.string().nullable().optional(),
  medicalNotes: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  status: z.string().default("pending"),
  joinDate: z.string().min(1).optional(),
  parentFirstName: z.string().nullable().optional(),
  parentLastName: z.string().nullable().optional(),
  parentMiddleName: z.string().nullable().optional(),
  parentPhone: z.string().nullable().optional(),
  parentEmail: z.string().email("Некорректный email родителя").nullable().optional(),
  parentSpecialInstructions: z.string().nullable().optional(),
  isParentRepresentative: z.boolean().default(false),
  privacyPolicyAccepted: z.boolean().default(false),
  privacyPolicyAcceptedDate: z.string().nullable().optional(),
  contractAccepted: z.boolean().default(false),
  contractAcceptedDate: z.string().nullable().optional(),
  educationConsentAccepted: z.boolean().default(false),
  educationConsentAcceptedDate: z.string().nullable().optional(),
});

export const updatePupilSchema = insertPupilSchema.partial().extend({
  password: z.string().min(6).optional(), // Optional for updates
});

export const insertExerciseSchema = z.object({
  name: z.string().min(1, "Название упражнения обязательно"),
  primaryMuscles: z.array(z.string()).min(1, "Выберите хотя бы одну основную группу мышц"),
  secondaryMuscles: z.array(z.string()).optional(),
  difficulty: z.enum(['начинающий', 'средний', 'продвинутый'], {
    errorMap: () => ({ message: "Выберите уровень сложности" })
  }),
  overview: z.string().min(10, "Описание должно содержать минимум 10 символов"),
  technique: z.array(z.string()).min(1, "Добавьте хотя бы один шаг техники"),
  commonMistakes: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  muscleImageUrl: z.string().url("Некорректный URL изображения").nullable().optional(),
  videoUrl: z.string().url("Некорректный URL видео").nullable().optional(),
  techniqueImageUrl: z.string().url("Некорректный URL изображения техники").nullable().optional(),
  createdBy: uuidSchema.nullable().optional(),
});

export const insertWorkoutProgramSchema = z.object({
  name: z.string().min(1, "Название программы обязательно"),
  type: z.string().min(1, "Тип программы обязателен"),
  duration: z.number().min(1, "Длительность должна быть больше 0"),
  level: z.string().min(1, "Уровень программы обязателен"),
  createdBy: uuidSchema,
  exercises: z.any(), // JSON
});

export const insertWorkoutSessionSchema = z.object({
  userId: uuidSchema,
  programId: uuidSchema,
  scheduledDate: z.string().min(1, "Дата тренировки обязательна"),
  startTime: z.string().min(1, "Время начала обязательно"),
  endTime: z.string().min(1, "Время окончания обязательно"),
  status: z.string().default("scheduled"),
  completedAt: z.string().nullable().optional(),
});

export const insertExerciseProgressSchema = z.object({
  userId: uuidSchema,
  exerciseId: uuidSchema,
  weight: z.number().positive("Вес должен быть положительным").nullable().optional(),
  reps: z.number().positive("Количество повторений должно быть положительным").nullable().optional(),
  sets: z.number().positive("Количество подходов должно быть положительным").nullable().optional(),
  date: z.string().min(1, "Дата обязательна"),
  sessionId: uuidSchema.nullable().optional(),
});

export const insertPupilTrainingPlanSchema = z.object({
  pupilId: uuidSchema,
  trainerId: uuidSchema,
  name: z.string().min(1, "Название плана обязательно"),
  exercises: z.any(), // JSON
  isActive: z.boolean().default(true),
});

export const insertPupilWorkoutHistorySchema = z.object({
  pupilId: uuidSchema,
  trainerId: uuidSchema,
  workoutDate: z.string().min(1, "Дата тренировки обязательна"),
  workoutTime: z.string().min(1, "Время тренировки обязательно"),
  duration: z.number().positive("Длительность должна быть положительной").nullable().optional(),
  exercises: z.any(), // JSON
  notes: z.string().nullable().optional(),
  pupilFeedback: z.string().nullable().optional(),
  status: z.string().default("completed"),
  confirmationStatus: z.string().default("pending"),
  confirmedAt: z.string().nullable().optional(),
});

export const insertActiveWorkoutSchema = z.object({
  trainerId: uuidSchema,
  pupilId: uuidSchema,
  workoutProgramId: uuidSchema,
});

export const insertAppointmentSchema = z.object({
  trainerId: uuidSchema,
  pupilId: uuidSchema,
  date: z.string().min(1, "Дата записи обязательна"),
  time: z.string().min(1, "Время записи обязательно"),
  status: z.string().default("pending"),
});
