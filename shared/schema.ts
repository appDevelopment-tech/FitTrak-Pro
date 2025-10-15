import { z } from "zod";
import type { Prisma } from "../generated/prisma";

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
  trainerId: z.string().uuid().nullable().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().nullable().optional(),
  phone: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).nullable().optional(),
  birthDate: z.string().min(1),
  weight: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  goal: z.string().nullable().optional(),
  medicalNotes: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  status: z.string().default("pending"),
  joinDate: z.string().min(1),
  parentFirstName: z.string().nullable().optional(),
  parentLastName: z.string().nullable().optional(),
  parentMiddleName: z.string().nullable().optional(),
  parentPhone: z.string().nullable().optional(),
  parentEmail: z.string().nullable().optional(),
  parentSpecialInstructions: z.string().nullable().optional(),
  isParentRepresentative: z.boolean().default(false),
  privacyPolicyAccepted: z.boolean().default(false),
  privacyPolicyAcceptedDate: z.string().nullable().optional(),
  contractAccepted: z.boolean().default(false),
  contractAcceptedDate: z.string().nullable().optional(),
  educationConsentAccepted: z.boolean().default(false),
  educationConsentAcceptedDate: z.string().nullable().optional(),
});

export const insertExerciseSchema = z.object({
  name: z.string().min(1),
  primaryMuscles: z.any(), // JSON
  secondaryMuscles: z.any().optional(), // JSON
  difficulty: z.string().min(1),
  overview: z.string().min(1),
  technique: z.any(), // JSON
  commonMistakes: z.any(), // JSON
  contraindications: z.any(), // JSON
  muscleImageUrl: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),
  techniqueImageUrl: z.string().nullable().optional(),
  createdBy: z.string().uuid().nullable().optional(),
});

export const insertWorkoutProgramSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  duration: z.number().min(1),
  level: z.string().min(1),
  createdBy: z.string().uuid(),
  exercises: z.any(), // JSON
});

export const insertWorkoutSessionSchema = z.object({
  userId: z.string().uuid(),
  programId: z.string().uuid(),
  scheduledDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.string().default("scheduled"),
  completedAt: z.string().nullable().optional(),
});

export const insertExerciseProgressSchema = z.object({
  userId: z.string().uuid(),
  exerciseId: z.string().uuid(),
  weight: z.number().nullable().optional(),
  reps: z.number().nullable().optional(),
  sets: z.number().nullable().optional(),
  date: z.string(),
  sessionId: z.string().uuid().nullable().optional(),
});

export const insertPupilTrainingPlanSchema = z.object({
  pupilId: z.string().uuid(),
  trainerId: z.string().uuid(),
  name: z.string().min(1),
  exercises: z.any(), // JSON
  isActive: z.boolean().default(true),
});

export const insertPupilWorkoutHistorySchema = z.object({
  pupilId: z.string().uuid(),
  trainerId: z.string().uuid(),
  workoutDate: z.string(),
  workoutTime: z.string(),
  duration: z.number().nullable().optional(),
  exercises: z.any(), // JSON
  notes: z.string().nullable().optional(),
  pupilFeedback: z.string().nullable().optional(),
  status: z.string().default("completed"),
  confirmationStatus: z.string().default("pending"),
  confirmedAt: z.string().nullable().optional(),
});

export const insertActiveWorkoutSchema = z.object({
  trainerId: z.string().uuid(),
  pupilId: z.string().uuid(),
  workoutProgramId: z.string().uuid(),
});

export const insertAppointmentSchema = z.object({
  trainerId: z.string().uuid(),
  pupilId: z.string().uuid(),
  date: z.string(),
  time: z.string(),
  status: z.string().default("pending"),
});
