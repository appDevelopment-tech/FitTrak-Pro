import { 
  users, 
  workoutPrograms, 
  workoutSessions, 
  exercises,
  exerciseProgress,
  type User, 
  type InsertUser,
  type WorkoutProgram,
  type InsertWorkoutProgram,
  type WorkoutSession,
  type InsertWorkoutSession,
  type Exercise,
  type InsertExercise,
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
  
  // Exercise operations
  getExercises(): Promise<Exercise[]>;
  getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: number, updates: Partial<InsertExercise>): Promise<Exercise | undefined>;
  deleteExercise(id: number): Promise<boolean>;
  
  // Exercise progress operations
  getExerciseProgress(userId: number): Promise<ExerciseProgress[]>;
  createExerciseProgress(progress: InsertExerciseProgress): Promise<ExerciseProgress>;
  getExerciseProgressByExerciseId(userId: number, exerciseId: number): Promise<ExerciseProgress[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workoutPrograms: Map<number, WorkoutProgram>;
  private workoutSessions: Map<number, WorkoutSession>;
  private exercises: Map<number, Exercise>;
  private exerciseProgress: Map<number, ExerciseProgress>;
  private currentUserId: number;
  private currentProgramId: number;
  private currentSessionId: number;
  private currentExerciseId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.workoutPrograms = new Map();
    this.workoutSessions = new Map();
    this.exercises = new Map();
    this.exerciseProgress = new Map();
    this.currentUserId = 1;
    this.currentProgramId = 1;
    this.currentSessionId = 1;
    this.currentExerciseId = 1;
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

    // Create sample exercises database
    const sampleExercises: Exercise[] = [
      // Грудь - тренажеры
      { id: 1, name: "Жим в тренажере", muscleGroup: "грудь", equipment: "тренажер", difficulty: "начинающий", description: "Жим грудью в специальном тренажере", instructions: ["Сядьте в тренажер", "Возьмитесь за рукоятки", "Выжмите вес вперед"], tips: ["Контролируйте движение", "Не разводите локти широко"], createdBy: 1 },
      { id: 2, name: "Сведение в тренажере", muscleGroup: "грудь", equipment: "тренажер", difficulty: "средний", description: "Сведение рук в тренажере для груди", instructions: ["Сядьте в тренажер", "Обхватите рукоятки", "Сведите руки перед собой"], tips: ["Чувствуйте растяжение груди", "Медленное возвращение"], createdBy: 1 },
      
      // Грудь - гантели
      { id: 3, name: "Жим гантелей лежа", muscleGroup: "грудь", equipment: "гантели", difficulty: "средний", description: "Жим гантелей на горизонтальной скамье", instructions: ["Лягте на скамью", "Возьмите гантели", "Выжмите вверх"], tips: ["Локти под углом 45°", "Полная амплитуда"], createdBy: 1 },
      { id: 4, name: "Разводка гантелей", muscleGroup: "грудь", equipment: "гантели", difficulty: "продвинутый", description: "Разведение гантелей лежа", instructions: ["Лягте на скамью", "Разведите гантели в стороны", "Сведите над грудью"], tips: ["Слегка согнутые локти", "Чувствуйте растяжение"], createdBy: 1 },

      // Спина - тренажеры
      { id: 5, name: "Тяга верхнего блока", muscleGroup: "спина", equipment: "тренажер", difficulty: "начинающий", description: "Тяга рукоятки к груди", instructions: ["Сядьте в тренажер", "Возьмитесь за рукоятку", "Тяните к груди"], tips: ["Сведите лопатки", "Не раскачивайтесь"], createdBy: 1 },
      { id: 6, name: "Горизонтальная тяга", muscleGroup: "спина", equipment: "тренажер", difficulty: "средний", description: "Тяга к поясу сидя", instructions: ["Сядьте в тренажер", "Тяните рукоятку к поясу", "Сведите лопатки"], tips: ["Прямая спина", "Контролируемое движение"], createdBy: 1 },

      // Спина - гантели
      { id: 7, name: "Тяга гантели в наклоне", muscleGroup: "спина", equipment: "гантели", difficulty: "средний", description: "Тяга гантели одной рукой", instructions: ["Упритесь в скамью", "Тяните гантель к поясу", "Сведите лопатку"], tips: ["Держите спину прямо", "Не вращайте корпус"], createdBy: 1 },

      // Ноги - тренажеры
      { id: 8, name: "Жим ногами", muscleGroup: "ноги", equipment: "тренажер", difficulty: "начинающий", description: "Жим ногами в тренажере", instructions: ["Сядьте в тренажер", "Поставьте ноги на платформу", "Выжмите вес"], tips: ["Полная амплитуда", "Не блокируйте колени"], createdBy: 1 },
      { id: 9, name: "Разгибание ног", muscleGroup: "ноги", equipment: "тренажер", difficulty: "начинающий", description: "Разгибание ног сидя", instructions: ["Сядьте в тренажер", "Разгибайте ноги", "Медленно опускайте"], tips: ["Полное сокращение квадрицепса", "Контролируемое движение"], createdBy: 1 },

      // Ноги - гантели
      { id: 10, name: "Приседания с гантелями", muscleGroup: "ноги", equipment: "гантели", difficulty: "средний", description: "Приседания с гантелями в руках", instructions: ["Держите гантели", "Приседайте до параллели", "Поднимайтесь"], tips: ["Колени по направлению носков", "Прямая спина"], createdBy: 1 },
      { id: 11, name: "Выпады с гантелями", muscleGroup: "ноги", equipment: "гантели", difficulty: "продвинутый", description: "Выпады вперед с гантелями", instructions: ["Держите гантели", "Сделайте шаг вперед", "Опуститесь вниз"], tips: ["90° в коленях", "Равновесие"], createdBy: 1 },

      // Руки - тренажеры
      { id: 12, name: "Сгибание рук в тренажере", muscleGroup: "руки", equipment: "тренажер", difficulty: "начинающий", description: "Сгибание на бицепс в тренажере", instructions: ["Сядьте в тренажер", "Согните руки", "Медленно разогните"], tips: ["Изолированная работа бицепса", "Полная амплитуда"], createdBy: 1 },

      // Руки - гантели
      { id: 13, name: "Подъем гантелей на бицепс", muscleGroup: "руки", equipment: "гантели", difficulty: "начинающий", description: "Сгибание рук с гантелями", instructions: ["Встаньте прямо", "Согните руки", "Опустите медленно"], tips: ["Не раскачивайтесь", "Полное сокращение"], createdBy: 1 },
      { id: 14, name: "Французский жим гантелей", muscleGroup: "руки", equipment: "гантели", difficulty: "средний", description: "Разгибание рук с гантелями", instructions: ["Лягте на скамью", "Разгибайте руки", "Контролируйте движение"], tips: ["Работают только предплечья", "Локти неподвижны"], createdBy: 1 },

      // Упражнения с резиной
      { id: 15, name: "Жим резины от груди", muscleGroup: "грудь", equipment: "резина", difficulty: "начинающий", description: "Жим эспандера от груди", instructions: ["Закрепите резину сзади", "Жмите вперед", "Медленно возвращайте"], tips: ["Постоянное натяжение", "Контролируйте возврат"], createdBy: 1 },
      { id: 16, name: "Тяга резины к поясу", muscleGroup: "спина", equipment: "резина", difficulty: "начинающий", description: "Горизонтальная тяга эспандера", instructions: ["Закрепите резину впереди", "Тяните к поясу", "Сведите лопатки"], tips: ["Прямая спина", "Максимальное сведение лопаток"], createdBy: 1 },

      // Ягодичные
      { id: 17, name: "Подъемы таза с гантелей", muscleGroup: "ягодичные", equipment: "гантели", difficulty: "средний", description: "Мостик с отягощением", instructions: ["Лягте на спину", "Поставьте гантель на таз", "Поднимайте таз"], tips: ["Сжимайте ягодицы вверху", "Полная амплитуда"], createdBy: 1 },
      { id: 18, name: "Отведение ног в тренажере", muscleGroup: "ягодичные", equipment: "тренажер", difficulty: "начинающий", description: "Отведение ног в специальном тренажере", instructions: ["Встаньте в тренажер", "Отводите ногу в сторону", "Контролируйте движение"], tips: ["Изолированная работа", "Чувствуйте работу ягодиц"], createdBy: 1 },

      // Живот
      { id: 19, name: "Скручивания в тренажере", muscleGroup: "живот", equipment: "тренажер", difficulty: "начинающий", description: "Скручивания на пресс в тренажере", instructions: ["Сядьте в тренажер", "Скручивайтесь вперед", "Медленно возвращайтесь"], tips: ["Не тяните шею", "Дышите правильно"], createdBy: 1 },
      { id: 20, name: "Планка с резиной", muscleGroup: "живот", equipment: "резина", difficulty: "средний", description: "Планка с сопротивлением резины", instructions: ["Встаньте в планку", "Натяните резину", "Держите позицию"], tips: ["Прямая линия тела", "Напряженный живот"], createdBy: 1 },

      // Плечи
      { id: 21, name: "Жим гантелей сидя", muscleGroup: "плечи", equipment: "гантели", difficulty: "средний", description: "Жим гантелей вверх сидя", instructions: ["Сядьте на скамью", "Жмите гантели вверх", "Опускайте медленно"], tips: ["Прямая спина", "Полная амплитуда"], createdBy: 1 },
      { id: 22, name: "Разводка резины", muscleGroup: "плечи", equipment: "резина", difficulty: "начинающий", description: "Разведение рук с эспандером", instructions: ["Держите резину перед собой", "Разводите руки в стороны", "Медленно возвращайте"], tips: ["Слегка согнутые локти", "Контролируйте натяжение"], createdBy: 1 }
    ];

    sampleExercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });
    this.currentExerciseId = sampleExercises.length + 1;

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
        exerciseId: 1, // Связываем с первым упражнением
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

  async getExerciseProgressByExerciseId(userId: number, exerciseId: number): Promise<ExerciseProgress[]> {
    return Array.from(this.exerciseProgress.values()).filter(
      progress => progress.userId === userId && progress.exerciseId === exerciseId
    );
  }

  // Exercise methods
  async getExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.muscleGroup === muscleGroup);
  }

  async getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(exercise => exercise.equipment === equipment);
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.currentExerciseId++;
    const exercise: Exercise = { 
      ...insertExercise, 
      id,
      instructions: insertExercise.instructions ?? null,
      tips: insertExercise.tips ?? null,
      createdBy: insertExercise.createdBy ?? null
    };
    this.exercises.set(id, exercise);
    return exercise;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import("./db");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getWorkoutPrograms(): Promise<WorkoutProgram[]> {
    const { db } = await import("./db");
    return await db.select().from(workoutPrograms);
  }

  async getWorkoutProgram(id: number): Promise<WorkoutProgram | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [program] = await db.select().from(workoutPrograms).where(eq(workoutPrograms.id, id));
    return program || undefined;
  }

  async createWorkoutProgram(insertProgram: InsertWorkoutProgram): Promise<WorkoutProgram> {
    const { db } = await import("./db");
    const [program] = await db.insert(workoutPrograms).values(insertProgram).returning();
    return program;
  }

  async getWorkoutSessions(userId: number): Promise<WorkoutSession[]> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(workoutSessions).where(eq(workoutSessions.userId, userId));
  }

  async getWorkoutSessionsByDate(userId: number, date: string): Promise<WorkoutSession[]> {
    const { db } = await import("./db");
    const { eq, and } = await import("drizzle-orm");
    return await db.select().from(workoutSessions).where(
      and(
        eq(workoutSessions.userId, userId),
        eq(workoutSessions.scheduledDate, new Date(date))
      )
    );
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const { db } = await import("./db");
    const [session] = await db.insert(workoutSessions).values(insertSession).returning();
    return session;
  }

  async updateWorkoutSession(id: number, updates: Partial<WorkoutSession>): Promise<WorkoutSession | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [session] = await db.update(workoutSessions).set(updates).where(eq(workoutSessions.id, id)).returning();
    return session || undefined;
  }

  async getExercises(): Promise<Exercise[]> {
    const { db } = await import("./db");
    return await db.select().from(exercises);
  }

  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    const { db } = await import("./db");
    const { arrayContains } = await import("drizzle-orm");
    return await db.select().from(exercises).where(arrayContains(exercises.primaryMuscles, [muscleGroup]));
  }

  async getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(exercises).where(eq(exercises.equipment, equipment));
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [exercise] = await db.select().from(exercises).where(eq(exercises.id, id));
    return exercise || undefined;
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const { db } = await import("./db");
    const [exercise] = await db.insert(exercises).values(insertExercise).returning();
    return exercise;
  }

  async updateExercise(id: number, updates: Partial<InsertExercise>): Promise<Exercise | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [exercise] = await db.update(exercises).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(exercises.id, id)).returning();
    return exercise || undefined;
  }

  async deleteExercise(id: number): Promise<boolean> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const result = await db.delete(exercises).where(eq(exercises.id, id));
    return result.rowCount > 0;
  }

  async getExerciseProgress(userId: number): Promise<ExerciseProgress[]> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(exerciseProgress).where(eq(exerciseProgress.userId, userId));
  }

  async createExerciseProgress(insertProgress: InsertExerciseProgress): Promise<ExerciseProgress> {
    const { db } = await import("./db");
    const [progress] = await db.insert(exerciseProgress).values(insertProgress).returning();
    return progress;
  }

  async getExerciseProgressByExerciseId(userId: number, exerciseId: number): Promise<ExerciseProgress[]> {
    const { db } = await import("./db");
    const { eq, and } = await import("drizzle-orm");
    return await db.select().from(exerciseProgress).where(
      and(
        eq(exerciseProgress.userId, userId),
        eq(exerciseProgress.exerciseId, exerciseId)
      )
    );
  }
}

export const storage = new DatabaseStorage();
