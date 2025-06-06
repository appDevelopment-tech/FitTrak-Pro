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

    // Create sample exercises database - упражнения для грудных мышц
    const chestExercises: Exercise[] = [
      {
        id: 1,
        name: "Жим штанги лежа на скамье",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Базовое упражнение для развития мышц груди, выполняется лежа на горизонтальной скамье",
        technique: [
          "Лягте на скамью, стопы упираются в пол",
          "Возьмите штангу широким хватом",
          "Снимите штангу со стоек и держите над грудью",
          "Медленно опустите штангу к груди",
          "Мощно выжмите штангу вверх"
        ],
        commonMistakes: [
          "Отрыв таза от скамьи",
          "Слишком широкий или узкий хват",
          "Неполная амплитуда движения",
          "Резкое опускание штанги"
        ],
        contraindications: ["травмы плечевого сустава", "боли в спине"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Сведение рук в тренажере",
        primaryMuscles: ["грудь"],
        secondaryMuscles: [],
        difficulty: "начинающий",
        overview: "Изолирующее упражнение для грудных мышц в специальном тренажере",
        technique: [
          "Сядьте в тренажер, спина прижата к спинке",
          "Возьмитесь за рукояти тренажера",
          "Медленно сведите руки перед собой",
          "Задержитесь на секунду в сокращенном положении",
          "Медленно вернитесь в исходное положение"
        ],
        commonMistakes: [
          "Слишком быстрое выполнение",
          "Использование слишком большого веса",
          "Неполное сведение рук",
          "Отрыв спины от спинки"
        ],
        contraindications: ["травмы плечевого сустава"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Жим гантелей лежа",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Упражнение с гантелями для развития грудных мышц с большей амплитудой движения",
        technique: [
          "Лягте на скамью с гантелями в руках",
          "Поднимите гантели над грудью",
          "Медленно опустите гантели по сторонам от груди",
          "Мощно выжмите гантели вверх",
          "Сведите гантели в верхней точке"
        ],
        commonMistakes: [
          "Слишком глубокое опускание гантелей",
          "Неконтролируемое движение",
          "Использование слишком тяжелых гантелей",
          "Неправильное положение локтей"
        ],
        contraindications: ["травмы плечевого сустава", "боли в спине"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Разведение гантелей лежа",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи"],
        difficulty: "средний",
        overview: "Изолирующее упражнение для растяжения и проработки грудных мышц",
        technique: [
          "Лягте на скамью с гантелями в руках",
          "Поднимите гантели над грудью, слегка согнув локти",
          "Медленно разведите гантели в стороны",
          "Почувствуйте растяжение в грудных мышцах",
          "Сведите гантели по дуге в исходное положение"
        ],
        commonMistakes: [
          "Слишком большой вес гантелей",
          "Полное выпрямление рук",
          "Слишком глубокое разведение",
          "Резкие движения"
        ],
        contraindications: ["травмы плечевого сустава"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Отжимания в упоре",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки", "живот"],
        difficulty: "начинающий",
        overview: "Базовое упражнение с собственным весом для развития грудных мышц",
        technique: [
          "Примите упор лежа, руки на ширине плеч",
          "Тело должно составлять прямую линию",
          "Медленно опуститесь вниз до касания грудью пола",
          "Мощно оттолкнитесь и вернитесь в исходное положение",
          "Сохраняйте напряжение в корпусе"
        ],
        commonMistakes: [
          "Прогиб в пояснице",
          "Неполная амплитуда движения",
          "Слишком широкая постановка рук",
          "Опускание головы вниз"
        ],
        contraindications: ["травмы запястий", "боли в пояснице"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Отжимания с колен",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "начинающий",
        overview: "Облегченная версия отжиманий для начинающих",
        technique: [
          "Встаньте на колени, руки поставьте на ширине плеч",
          "Наклонитесь вперед в упор на руки",
          "Медленно опуститесь грудью к полу",
          "Оттолкнитесь и вернитесь в исходное положение",
          "Держите спину прямо"
        ],
        commonMistakes: [
          "Слишком высокое положение таза",
          "Неполная амплитуда движения",
          "Сгибание в тазобедренных суставах",
          "Слишком быстрое выполнение"
        ],
        contraindications: ["травмы коленей", "травмы запястий"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Жим штанги на скамье под углом 30 градусов",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Упражнение для верхней части грудных мышц, выполняется на наклонной скамье",
        technique: [
          "Установите скамью под углом 30 градусов",
          "Лягте на скамью, стопы упираются в пол",
          "Возьмите штангу широким хватом",
          "Снимите штангу со стоек и держите над верхней частью груди",
          "Медленно опустите штангу к ключицам",
          "Мощно выжмите штангу вверх"
        ],
        commonMistakes: [
          "Слишком большой угол наклона",
          "Опускание штанги к нижней части груди",
          "Отрыв таза от скамьи",
          "Неконтролируемое опускание"
        ],
        contraindications: ["травмы плечевого сустава", "проблемы с шейным отделом"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: "Жим гантелей на скамье под углом 30 градусов",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Упражнение с гантелями для верхней части грудных мышц на наклонной скамье",
        technique: [
          "Установите скамью под углом 30 градусов",
          "Лягте на скамью с гантелями в руках",
          "Поднимите гантели над верхней частью груди",
          "Медленно опустите гантели по сторонам от груди",
          "Мощно выжмите гантели вверх",
          "Сведите гантели в верхней точке"
        ],
        commonMistakes: [
          "Слишком глубокое опускание гантелей",
          "Неправильная траектория движения",
          "Использование слишком тяжелых гантелей",
          "Отсутствие контроля в негативной фазе"
        ],
        contraindications: ["травмы плечевого сустава", "проблемы с шейным отделом"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: "Отжимания на брусьях для грудного отдела",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "продвинутый",
        overview: "Упражнение на брусьях с акцентом на нижнюю часть грудных мышц",
        technique: [
          "Возьмитесь за брусья широким хватом",
          "Повисните на прямых руках",
          "Наклоните корпус вперед под углом 45 градусов",
          "Медленно опуститесь вниз, разводя локти в стороны",
          "Почувствуйте растяжение в грудных мышцах",
          "Мощно выжмите себя вверх"
        ],
        commonMistakes: [
          "Слишком вертикальное положение корпуса",
          "Неглубокое опускание",
          "Слишком быстрое выполнение",
          "Сведение локтей к корпусу"
        ],
        contraindications: ["травмы плечевого сустава", "травмы запястий", "проблемы с локтевыми суставами"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: "Перекрестная тяга стоя",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи"],
        difficulty: "начинающий",
        overview: "Изолирующее упражнение в кроссовере для проработки грудных мышц стоя",
        technique: [
          "Встаньте в центр кроссовера",
          "Возьмите верхние рукояти",
          "Слегка наклонитесь вперед",
          "Разведите руки в стороны на уровне плеч",
          "Сведите руки по дуге перед собой",
          "Медленно вернитесь в исходное положение"
        ],
        commonMistakes: [
          "Слишком большой вес",
          "Сгибание рук в локтях",
          "Использование инерции",
          "Неконтролируемое возвращение в исходное положение"
        ],
        contraindications: ["травмы плечевого сустава"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: "Перекрестная тяга лежа на скамье",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи"],
        difficulty: "средний",
        overview: "Изолирующее упражнение в кроссовере для грудных мышц лежа на скамье",
        technique: [
          "Поставьте скамью в центр кроссовера",
          "Лягте на скамью, возьмите нижние рукояти",
          "Поднимите руки над грудью",
          "Разведите руки в стороны по дуге",
          "Почувствуйте растяжение в грудных мышцах",
          "Сведите руки над грудью по той же траектории"
        ],
        commonMistakes: [
          "Слишком большой вес",
          "Резкие движения",
          "Неправильная траектория движения",
          "Полное выпрямление рук"
        ],
        contraindications: ["травмы плечевого сустава", "боли в спине"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: "Жим штанги на скамье головой вниз",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "продвинутый",
        overview: "Упражнение для нижней части грудных мышц на обратнонаклонной скамье",
        technique: [
          "Установите скамью под отрицательным углом 15-30 градусов",
          "Лягте на скамью, зафиксируйте ноги",
          "Возьмите штангу широким хватом",
          "Снимите штангу со стоек",
          "Медленно опустите штангу к нижней части груди",
          "Мощно выжмите штангу вверх"
        ],
        commonMistakes: [
          "Слишком большой отрицательный угол",
          "Неправильная фиксация ног",
          "Отрыв головы от скамьи",
          "Слишком быстрое выполнение"
        ],
        contraindications: ["проблемы с давлением", "травмы шейного отдела", "головокружения"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: "Пуловер с гантелью",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["спина", "плечи"],
        difficulty: "средний",
        overview: "Упражнение для растяжки грудной клетки и развития грудных мышц",
        technique: [
          "Лягте поперек скамьи, опираясь лопатками",
          "Возьмите гантель двумя руками за верхний диск",
          "Поднимите гантель над грудью",
          "Медленно опустите гантель за голову по дуге",
          "Почувствуйте растяжение в груди",
          "Верните гантель в исходное положение"
        ],
        commonMistakes: [
          "Слишком большой вес гантели",
          "Сгибание рук в локтях",
          "Слишком глубокое опускание",
          "Быстрое выполнение движения"
        ],
        contraindications: ["травмы плечевого сустава", "проблемы с позвоночником"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: "Жим в тренажере Хаммер",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "начинающий",
        overview: "Безопасное упражнение в тренажере для развития грудных мышц",
        technique: [
          "Сядьте в тренажер, прижмите спину к спинке",
          "Возьмитесь за рукояти нейтральным хватом",
          "Поставьте стопы устойчиво на пол",
          "Выжмите рукояти вперед",
          "Медленно вернитесь в исходное положение",
          "Не разгибайте руки полностью"
        ],
        commonMistakes: [
          "Отрыв спины от спинки",
          "Слишком быстрое выполнение",
          "Неполная амплитуда движения",
          "Использование инерции"
        ],
        contraindications: ["острые травмы плечевого сустава"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: "Отжимания от пола широким хватом",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки", "живот"],
        difficulty: "начинающий",
        overview: "Вариация отжиманий с акцентом на грудные мышцы",
        technique: [
          "Примите упор лежа",
          "Поставьте руки шире плеч на 15-20 см",
          "Тело должно составлять прямую линию",
          "Медленно опуститесь вниз",
          "Мощно оттолкнитесь и вернитесь вверх",
          "Сохраняйте напряжение в корпусе"
        ],
        commonMistakes: [
          "Слишком широкая постановка рук",
          "Прогиб в пояснице",
          "Неполная амплитуда движения",
          "Опускание головы"
        ],
        contraindications: ["травмы запястий", "боли в пояснице"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: "Отжимания на возвышении",
        primaryMuscles: ["грудь"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Отжимания с ногами на возвышении для усиления нагрузки",
        technique: [
          "Поставьте ноги на скамью или возвышение",
          "Примите упор лежа, руки на полу",
          "Руки на ширине плеч",
          "Медленно опуститесь вниз",
          "Мощно выжмите себя вверх",
          "Держите тело прямо"
        ],
        commonMistakes: [
          "Слишком высокое возвышение для новичков",
          "Прогиб в пояснице",
          "Неконтролируемое опускание",
          "Неполная амплитуда"
        ],
        contraindications: ["проблемы с давлением", "травмы запястий"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    chestExercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });
    this.currentExerciseId = chestExercises.length + 1;

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
    return Array.from(this.exercises.values()).filter(exercise => 
      exercise.primaryMuscles.includes(muscleGroup) || exercise.secondaryMuscles.includes(muscleGroup)
    );
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = this.currentExerciseId++;
    const exercise: Exercise = { 
      ...insertExercise, 
      id,
      createdBy: insertExercise.createdBy ?? null,
      muscleImageUrl: insertExercise.muscleImageUrl ?? null,
      createdAt: insertExercise.createdAt ?? new Date(),
      updatedAt: insertExercise.updatedAt ?? new Date()
    };
    this.exercises.set(id, exercise);
    return exercise;
  }

  async updateExercise(id: number, updates: Partial<InsertExercise>): Promise<Exercise | undefined> {
    const exercise = this.exercises.get(id);
    if (!exercise) return undefined;
    
    const updatedExercise = { 
      ...exercise, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.exercises.set(id, updatedExercise);
    return updatedExercise;
  }

  async deleteExercise(id: number): Promise<boolean> {
    return this.exercises.delete(id);
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
    // Equipment filtering not available in current schema
    return await db.select().from(exercises);
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
    return (result.rowCount ?? 0) > 0;
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

export const storage = new MemStorage();
