import { 
  users, 
  workoutPrograms, 
  workoutSessions, 
  exerciseProgress,
  type User, 
  type InsertUser,
  type WorkoutProgram,
  type InsertWorkoutProgram,
  type WorkoutSession,
  type InsertWorkoutSession,
  type ExerciseProgress,
  type InsertExerciseProgress
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workout program operations
  getWorkoutPrograms(): Promise<WorkoutProgram[]>;
  getWorkoutProgram(id: number): Promise<WorkoutProgram | undefined>;
  createWorkoutProgram(program: InsertWorkoutProgram): Promise<WorkoutProgram>;
  
  // Workout session operations
  getWorkoutSessions(userId: number): Promise<WorkoutSession[]>;
  getWorkoutSessionsByDate(userId: number, date: string): Promise<WorkoutSession[]>;
  createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  updateWorkoutSession(id: number, updates: Partial<WorkoutSession>): Promise<WorkoutSession | undefined>;
  
  // Exercise progress operations
  getExerciseProgress(userId: number): Promise<ExerciseProgress[]>;
  createExerciseProgress(progress: InsertExerciseProgress): Promise<ExerciseProgress>;
  getExerciseProgressByName(userId: number, exerciseName: string): Promise<ExerciseProgress[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workoutPrograms: Map<number, WorkoutProgram>;
  private workoutSessions: Map<number, WorkoutSession>;
  private exerciseProgress: Map<number, ExerciseProgress>;
  private currentUserId: number;
  private currentProgramId: number;
  private currentSessionId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.workoutPrograms = new Map();
    this.workoutSessions = new Map();
    this.exerciseProgress = new Map();
    this.currentUserId = 1;
    this.currentProgramId = 1;
    this.currentSessionId = 1;
    this.currentProgressId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "aleksandr",
      password: "password123",
      firstName: "Александр",
      lastName: "Петров",
      email: "aleksandr@example.com",
      isTrainer: true,
    };
    this.users.set(1, sampleUser);
    this.currentUserId = 2;

    // Create sample workout programs
    const strengthProgram: WorkoutProgram = {
      id: 1,
      name: "Силовая тренировка верха",
      type: "strength",
      duration: 90,
      level: "intermediate",
      createdBy: 1,
      exercises: [
        { name: "Жим штанги лежа", sets: 3, reps: "8-12", weight: 80 },
        { name: "Приседания со штангой", sets: 4, reps: "6-10", weight: 100 },
        { name: "Тяга штанги в наклоне", sets: 3, reps: "8-10", weight: 70 }
      ]
    };

    const cardioProgram: WorkoutProgram = {
      id: 2,
      name: "Кардио тренировка",
      type: "cardio",
      duration: 60,
      level: "beginner",
      createdBy: 1,
      exercises: [
        { name: "Беговая дорожка", sets: 1, reps: "30 мин", weight: null },
        { name: "Велотренажер", sets: 1, reps: "20 мин", weight: null }
      ]
    };

    this.workoutPrograms.set(1, strengthProgram);
    this.workoutPrograms.set(2, cardioProgram);
    this.currentProgramId = 3;

    // Create sample workout sessions
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    const session1: WorkoutSession = {
      id: 1,
      userId: 1,
      programId: 1,
      scheduledDate: new Date(todayString + 'T14:00:00'),
      startTime: "14:00",
      endTime: "16:00",
      status: "scheduled",
      completedAt: null,
    };

    const session2: WorkoutSession = {
      id: 2,
      userId: 1,
      programId: 2,
      scheduledDate: new Date(todayString + 'T18:00:00'),
      startTime: "18:00",
      endTime: "19:00",
      status: "scheduled",
      completedAt: null,
    };

    this.workoutSessions.set(1, session1);
    this.workoutSessions.set(2, session2);
    this.currentSessionId = 3;

    // Create sample exercise progress
    const progressEntries = [
      { exerciseName: "Жим штанги лежа", weight: 85, reps: 8, sets: 3, daysAgo: 7 },
      { exerciseName: "Жим штанги лежа", weight: 80, reps: 10, sets: 3, daysAgo: 14 },
      { exerciseName: "Приседания", weight: 105, reps: 6, sets: 4, daysAgo: 7 },
      { exerciseName: "Приседания", weight: 95, reps: 8, sets: 4, daysAgo: 14 },
    ];

    progressEntries.forEach((entry, index) => {
      const date = new Date();
      date.setDate(date.getDate() - entry.daysAgo);
      
      const progress: ExerciseProgress = {
        id: index + 1,
        userId: 1,
        exerciseName: entry.exerciseName,
        weight: entry.weight,
        reps: entry.reps,
        sets: entry.sets,
        date,
        sessionId: null,
      };
      this.exerciseProgress.set(index + 1, progress);
    });
    this.currentProgressId = progressEntries.length + 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      isTrainer: insertUser.isTrainer ?? false
    };
    this.users.set(id, user);
    return user;
  }

  async getWorkoutPrograms(): Promise<WorkoutProgram[]> {
    return Array.from(this.workoutPrograms.values());
  }

  async getWorkoutProgram(id: number): Promise<WorkoutProgram | undefined> {
    return this.workoutPrograms.get(id);
  }

  async createWorkoutProgram(insertProgram: InsertWorkoutProgram): Promise<WorkoutProgram> {
    const id = this.currentProgramId++;
    const program: WorkoutProgram = { ...insertProgram, id };
    this.workoutPrograms.set(id, program);
    return program;
  }

  async getWorkoutSessions(userId: number): Promise<WorkoutSession[]> {
    return Array.from(this.workoutSessions.values()).filter(session => session.userId === userId);
  }

  async getWorkoutSessionsByDate(userId: number, date: string): Promise<WorkoutSession[]> {
    return Array.from(this.workoutSessions.values()).filter(session => {
      const sessionDate = session.scheduledDate.toISOString().split('T')[0];
      return session.userId === userId && sessionDate === date;
    });
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = this.currentSessionId++;
    const session: WorkoutSession = { 
      ...insertSession, 
      id,
      status: insertSession.status ?? "scheduled",
      completedAt: insertSession.completedAt ?? null
    };
    this.workoutSessions.set(id, session);
    return session;
  }

  async updateWorkoutSession(id: number, updates: Partial<WorkoutSession>): Promise<WorkoutSession | undefined> {
    const session = this.workoutSessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.workoutSessions.set(id, updatedSession);
    return updatedSession;
  }

  async getExerciseProgress(userId: number): Promise<ExerciseProgress[]> {
    return Array.from(this.exerciseProgress.values()).filter(progress => progress.userId === userId);
  }

  async createExerciseProgress(insertProgress: InsertExerciseProgress): Promise<ExerciseProgress> {
    const id = this.currentProgressId++;
    const progress: ExerciseProgress = { 
      ...insertProgress, 
      id,
      weight: insertProgress.weight ?? null,
      reps: insertProgress.reps ?? null,
      sets: insertProgress.sets ?? null,
      sessionId: insertProgress.sessionId ?? null
    };
    this.exerciseProgress.set(id, progress);
    return progress;
  }

  async getExerciseProgressByName(userId: number, exerciseName: string): Promise<ExerciseProgress[]> {
    return Array.from(this.exerciseProgress.values()).filter(
      progress => progress.userId === userId && progress.exerciseName === exerciseName
    );
  }
}

export const storage = new MemStorage();
