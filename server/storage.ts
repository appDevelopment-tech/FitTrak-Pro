import { db } from "./db";
import bcrypt from "bcrypt";
import type {
  User,
  Pupil,
  WorkoutProgram,
  WorkoutSession,
  Exercise,
  ExerciseProgress,
  PupilTrainingPlan,
  PupilWorkoutHistory,
  ActiveWorkout,
  Appointment,
  InsertUser,
  InsertPupil,
  InsertWorkoutProgram,
  InsertWorkoutSession,
  InsertExercise,
  InsertExerciseProgress,
  InsertPupilTrainingPlan,
  InsertPupilWorkoutHistory,
  InsertActiveWorkout,
  InsertAppointment,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Pupil operations
  getPupils(trainerId: string): Promise<Pupil[]>;
  getPupil(id: string): Promise<Pupil | undefined>;
  createPupil(pupil: InsertPupil): Promise<Pupil>;
  updatePupil(id: string, updates: Partial<InsertPupil>): Promise<Pupil | undefined>;
  deletePupil(id: string): Promise<boolean>;

  // Authentication operations
  authenticatePupil(emailOrPhone: string, password: string): Promise<Pupil | undefined>;
  registerPupil(pupil: InsertPupil): Promise<Pupil>;
  getPupilByEmail(email: string): Promise<Pupil | undefined>;
  getPupilByPhone(phone: string): Promise<Pupil | undefined>;

  // Trainer authentication
  authenticateTrainer(emailOrUsername: string, password: string): Promise<User | undefined>;
  getTrainerByEmail(email: string): Promise<User | undefined>;
  getTrainerByUsername(username: string): Promise<User | undefined>;

  // Workout program operations
  getWorkoutPrograms(): Promise<WorkoutProgram[]>;
  getWorkoutProgram(id: string): Promise<WorkoutProgram | undefined>;
  createWorkoutProgram(program: InsertWorkoutProgram): Promise<WorkoutProgram>;
  updateWorkoutProgram(id: string, updates: Partial<InsertWorkoutProgram>): Promise<WorkoutProgram | undefined>;

  // Workout session operations
  getWorkoutSessions(userId: string): Promise<WorkoutSession[]>;
  getWorkoutSessionsByDate(userId: string, date: string): Promise<WorkoutSession[]>;
  createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  updateWorkoutSession(id: string, updates: Partial<InsertWorkoutSession>): Promise<WorkoutSession | undefined>;

  // Exercise operations
  getExercises(): Promise<Exercise[]>;
  getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]>;
  getExercise(id: string): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: string, updates: Partial<InsertExercise>): Promise<Exercise | undefined>;
  deleteExercise(id: string): Promise<boolean>;
  sortExercisesAlphabetically(): Promise<Exercise[]>;

  // Exercise progress operations
  getExerciseProgress(userId: string): Promise<ExerciseProgress[]>;
  createExerciseProgress(progress: InsertExerciseProgress): Promise<ExerciseProgress>;
  getExerciseProgressByExerciseId(userId: string, exerciseId: string): Promise<ExerciseProgress[]>;

  // Pupil training plan operations
  getPupilTrainingPlans(pupilId: string): Promise<PupilTrainingPlan[]>;
  getActiveTrainingPlan(pupilId: string): Promise<PupilTrainingPlan | undefined>;
  createPupilTrainingPlan(plan: InsertPupilTrainingPlan): Promise<PupilTrainingPlan>;
  updatePupilTrainingPlan(id: string, updates: Partial<InsertPupilTrainingPlan>): Promise<PupilTrainingPlan | undefined>;
  deletePupilTrainingPlan(id: string): Promise<boolean>;

  // Pupil workout history operations
  getPupilWorkoutHistory(pupilId: string): Promise<PupilWorkoutHistory[]>;
  createPupilWorkoutHistory(history: InsertPupilWorkoutHistory): Promise<PupilWorkoutHistory>;
  updatePupilWorkoutHistory(id: string, updates: Partial<InsertPupilWorkoutHistory>): Promise<PupilWorkoutHistory | undefined>;

  // Active workout operations
  getActiveWorkouts(trainerId: string): Promise<ActiveWorkout[]>;
  getActiveWorkout(trainerId: string, pupilId: string): Promise<ActiveWorkout | undefined>;
  createActiveWorkout(workout: InsertActiveWorkout): Promise<ActiveWorkout>;
  deleteActiveWorkout(trainerId: string, pupilId: string): Promise<boolean>;

  // Appointment operations
  getAppointments(trainerId: string): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: string, updates: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: string): Promise<boolean>;

  // Statistics operations
  getPupilsStats(trainerId: string): Promise<{
    totalPupils: number;
    todayBookings: number;
    confirmedToday: number;
    pendingToday: number;
  }>;
  getPupilAge(pupil: Pupil): number;
  isPupilMinor(pupil: Pupil): boolean;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const user = await db.user.findUnique({ where: { id } });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await db.user.findUnique({ where: { username } });
    return user || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    return await db.user.create({ data: user as any });
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    try {
      return await db.user.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  // Pupil operations
  async getPupils(trainerId: string): Promise<Pupil[]> {
    return await db.pupil.findMany({
      where: { trainerId },
      orderBy: { firstName: 'asc' }
    });
  }

  async getPupil(id: string): Promise<Pupil | undefined> {
    const pupil = await db.pupil.findUnique({ where: { id } });
    return pupil || undefined;
  }

  async createPupil(pupil: InsertPupil): Promise<Pupil> {
    return await db.pupil.create({ data: pupil as any });
  }

  async updatePupil(id: string, updates: Partial<InsertPupil>): Promise<Pupil | undefined> {
    try {
      return await db.pupil.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  async deletePupil(id: string): Promise<boolean> {
    try {
      await db.pupil.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Authentication operations
  async authenticatePupil(emailOrPhone: string, password: string): Promise<Pupil | undefined> {
    const pupil = await db.pupil.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone }
        ]
      }
    });
    
    if (!pupil || !pupil.password) {
      return undefined;
    }
    
    const isPasswordValid = await bcrypt.compare(password, pupil.password);
    return isPasswordValid ? pupil : undefined;
  }

  async registerPupil(pupil: InsertPupil): Promise<Pupil> {
    return await db.pupil.create({ data: pupil as any });
  }

  async getPupilByEmail(email: string): Promise<Pupil | undefined> {
    const pupil = await db.pupil.findUnique({ where: { email } });
    return pupil || undefined;
  }

  async getPupilByPhone(phone: string): Promise<Pupil | undefined> {
    const pupil = await db.pupil.findFirst({ where: { phone } });
    return pupil || undefined;
  }

  // Trainer authentication
  async authenticateTrainer(emailOrUsername: string, password: string): Promise<User | undefined> {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      }
    });
    
    if (!user || !user.password) {
      return undefined;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : undefined;
  }

  async getTrainerByEmail(email: string): Promise<User | undefined> {
    const user = await db.user.findUnique({ where: { email } });
    return user || undefined;
  }

  async getTrainerByUsername(username: string): Promise<User | undefined> {
    const user = await db.user.findUnique({ where: { username } });
    return user || undefined;
  }

  // Workout program operations
  async getWorkoutPrograms(): Promise<WorkoutProgram[]> {
    return await db.workoutProgram.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getWorkoutProgram(id: string): Promise<WorkoutProgram | undefined> {
    const program = await db.workoutProgram.findUnique({ where: { id } });
    return program || undefined;
  }

  async createWorkoutProgram(program: InsertWorkoutProgram): Promise<WorkoutProgram> {
    return await db.workoutProgram.create({ data: program as any });
  }

  async updateWorkoutProgram(id: string, updates: Partial<InsertWorkoutProgram>): Promise<WorkoutProgram | undefined> {
    try {
      return await db.workoutProgram.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  // Workout session operations
  async getWorkoutSessions(userId: string): Promise<WorkoutSession[]> {
    return await db.workoutSession.findMany({
      where: { userId },
      orderBy: { scheduledDate: 'desc' }
    });
  }

  async getWorkoutSessionsByDate(userId: string, date: string): Promise<WorkoutSession[]> {
    return await db.workoutSession.findMany({
      where: { userId, scheduledDate: date },
      orderBy: { startTime: 'asc' }
    });
  }

  async createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession> {
    return await db.workoutSession.create({ data: session as any });
  }

  async updateWorkoutSession(id: string, updates: Partial<InsertWorkoutSession>): Promise<WorkoutSession | undefined> {
    try {
      return await db.workoutSession.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  // Exercise operations
  async getExercises(): Promise<Exercise[]> {
    return await db.exercise.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    // Since primaryMuscles and secondaryMuscles are JSON, fetch all and filter in memory
    const allExercises = await db.exercise.findMany({
      orderBy: { name: 'asc' }
    });

    return allExercises.filter(exercise => {
      const primaryMuscles = Array.isArray(exercise.primaryMuscles) ? exercise.primaryMuscles : [];
      const secondaryMuscles = Array.isArray(exercise.secondaryMuscles) ? exercise.secondaryMuscles : [];
      return primaryMuscles.includes(muscleGroup) || secondaryMuscles.includes(muscleGroup);
    });
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    const exercise = await db.exercise.findUnique({ where: { id } });
    return exercise || undefined;
  }

  async createExercise(exercise: InsertExercise): Promise<Exercise> {
    return await db.exercise.create({ data: exercise as any });
  }

  async updateExercise(id: string, updates: Partial<InsertExercise>): Promise<Exercise | undefined> {
    try {
      return await db.exercise.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  async deleteExercise(id: string): Promise<boolean> {
    try {
      await db.exercise.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async sortExercisesAlphabetically(): Promise<Exercise[]> {
    return await db.exercise.findMany({
      orderBy: { name: 'asc' }
    });
  }

  // Exercise progress operations
  async getExerciseProgress(userId: string): Promise<ExerciseProgress[]> {
    return await db.exerciseProgress.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });
  }

  async createExerciseProgress(progress: InsertExerciseProgress): Promise<ExerciseProgress> {
    return await db.exerciseProgress.create({ data: progress as any });
  }

  async getExerciseProgressByExerciseId(userId: string, exerciseId: string): Promise<ExerciseProgress[]> {
    return await db.exerciseProgress.findMany({
      where: { userId, exerciseId },
      orderBy: { date: 'desc' }
    });
  }

  // Pupil training plan operations
  async getPupilTrainingPlans(pupilId: string): Promise<PupilTrainingPlan[]> {
    return await db.pupilTrainingPlan.findMany({
      where: { pupilId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveTrainingPlan(pupilId: string): Promise<PupilTrainingPlan | undefined> {
    const plan = await db.pupilTrainingPlan.findFirst({
      where: { pupilId, isActive: true }
    });
    return plan || undefined;
  }

  async createPupilTrainingPlan(plan: InsertPupilTrainingPlan): Promise<PupilTrainingPlan> {
    return await db.pupilTrainingPlan.create({ data: plan as any });
  }

  async updatePupilTrainingPlan(id: string, updates: Partial<InsertPupilTrainingPlan>): Promise<PupilTrainingPlan | undefined> {
    try {
      return await db.pupilTrainingPlan.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  async deletePupilTrainingPlan(id: string): Promise<boolean> {
    try {
      await db.pupilTrainingPlan.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Pupil workout history operations
  async getPupilWorkoutHistory(pupilId: string): Promise<PupilWorkoutHistory[]> {
    return await db.pupilWorkoutHistory.findMany({
      where: { pupilId },
      orderBy: { workoutDate: 'desc' }
    });
  }

  async createPupilWorkoutHistory(history: InsertPupilWorkoutHistory): Promise<PupilWorkoutHistory> {
    return await db.pupilWorkoutHistory.create({ data: history as any });
  }

  async updatePupilWorkoutHistory(id: string, updates: Partial<InsertPupilWorkoutHistory>): Promise<PupilWorkoutHistory | undefined> {
    try {
      return await db.pupilWorkoutHistory.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  // Active workout operations
  async getActiveWorkouts(trainerId: string): Promise<ActiveWorkout[]> {
    return await db.activeWorkout.findMany({
      where: { trainerId }
    });
  }

  async getActiveWorkout(trainerId: string, pupilId: string): Promise<ActiveWorkout | undefined> {
    const workout = await db.activeWorkout.findFirst({
      where: { trainerId, pupilId }
    });
    return workout || undefined;
  }

  async createActiveWorkout(workout: InsertActiveWorkout): Promise<ActiveWorkout> {
    return await db.activeWorkout.create({ data: workout as any });
  }

  async deleteActiveWorkout(trainerId: string, pupilId: string): Promise<boolean> {
    try {
      const workout = await db.activeWorkout.findFirst({
        where: { trainerId, pupilId }
      });
      if (!workout) return false;
      await db.activeWorkout.delete({ where: { id: workout.id } });
      return true;
    } catch {
      return false;
    }
  }

  // Appointment operations
  async getAppointments(trainerId: string): Promise<Appointment[]> {
    return await db.appointment.findMany({
      where: { trainerId },
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ]
    });
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    const appointment = await db.appointment.findUnique({ where: { id } });
    return appointment || undefined;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    return await db.appointment.create({ data: appointment as any });
  }

  async updateAppointment(id: string, updates: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    try {
      return await db.appointment.update({ where: { id }, data: updates as any });
    } catch {
      return undefined;
    }
  }

  async deleteAppointment(id: string): Promise<boolean> {
    try {
      await db.appointment.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // Statistics operations
  async getPupilsStats(trainerId: string): Promise<{
    totalPupils: number;
    todayBookings: number;
    confirmedToday: number;
    pendingToday: number;
  }> {
    const today = new Date().toISOString().split('T')[0];

    const totalPupils = await db.pupil.count({
      where: { trainerId }
    });

    const todayBookings = await db.workoutSession.count({
      where: {
        scheduledDate: today,
        pupil: { trainerId }
      }
    });

    const confirmedToday = await db.workoutSession.count({
      where: {
        scheduledDate: today,
        status: 'confirmed',
        pupil: { trainerId }
      }
    });

    const pendingToday = await db.workoutSession.count({
      where: {
        scheduledDate: today,
        status: 'pending',
        pupil: { trainerId }
      }
    });

    return {
      totalPupils,
      todayBookings,
      confirmedToday,
      pendingToday
    };
  }

  getPupilAge(pupil: Pupil): number {
    if (!pupil.birthDate) return 0;
    const today = new Date();
    const birth = new Date(pupil.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  isPupilMinor(pupil: Pupil): boolean {
    return this.getPupilAge(pupil) < 18;
  }
}

export const storage = new DatabaseStorage();
