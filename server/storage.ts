import { 
  users, 
  pupils,
  workoutPrograms, 
  workoutSessions, 
  exercises,
  exerciseProgress,
  pupilTrainingPlans,
  type User, 
  type InsertUser,
  type Pupil,
  type InsertPupil,
  type WorkoutProgram,
  type InsertWorkoutProgram,
  type WorkoutSession,
  type InsertWorkoutSession,
  type Exercise,
  type InsertExercise,
  type ExerciseProgress,
  type InsertExerciseProgress,
  type PupilTrainingPlan,
  type InsertPupilTrainingPlan
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Pupil operations
  getPupils(trainerId: number): Promise<Pupil[]>;
  getPupil(id: number): Promise<Pupil | undefined>;
  createPupil(pupil: InsertPupil): Promise<Pupil>;
  updatePupil(id: number, updates: Partial<InsertPupil>): Promise<Pupil | undefined>;
  deletePupil(id: number): Promise<boolean>;
  
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
  
  // Pupil training plan operations
  getPupilTrainingPlans(pupilId: number): Promise<PupilTrainingPlan[]>;
  getActiveTrainingPlan(pupilId: number): Promise<PupilTrainingPlan | undefined>;
  createPupilTrainingPlan(plan: InsertPupilTrainingPlan): Promise<PupilTrainingPlan>;
  updatePupilTrainingPlan(id: number, updates: Partial<InsertPupilTrainingPlan>): Promise<PupilTrainingPlan | undefined>;
  deletePupilTrainingPlan(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pupils: Map<number, Pupil>;
  private workoutPrograms: Map<number, WorkoutProgram>;
  private workoutSessions: Map<number, WorkoutSession>;
  private exercises: Map<number, Exercise>;
  private exerciseProgress: Map<number, ExerciseProgress>;
  private pupilTrainingPlans: Map<number, PupilTrainingPlan>;
  private currentUserId: number;
  private currentPupilId: number;
  private currentProgramId: number;
  private currentSessionId: number;
  private currentExerciseId: number;
  private currentProgressId: number;
  private currentTrainingPlanId: number;

  constructor() {
    this.users = new Map();
    this.pupils = new Map();
    this.workoutPrograms = new Map();
    this.workoutSessions = new Map();
    this.exercises = new Map();
    this.exerciseProgress = new Map();
    this.pupilTrainingPlans = new Map();
    this.currentUserId = 1;
    this.currentPupilId = 1;
    this.currentProgramId = 1;
    this.currentSessionId = 1;
    this.currentExerciseId = 1;
    this.currentProgressId = 1;
    this.currentTrainingPlanId = 1;

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

    // Create sample pupils
    const samplePupils: Pupil[] = [
      {
        id: 1,
        trainerId: 1,
        firstName: "Анна",
        lastName: "Петрова",
        middleName: "Сергеевна",
        phone: "+7 (999) 123-45-67",
        email: "anna.petrova@email.com",
        birthDate: "1990-05-15",
        weight: 65,
        height: 170,
        goal: "Похудение и поддержание формы",
        medicalNotes: null,
        photo: null,
        status: "active",
        joinDate: "2024-01-15",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        trainerId: 1,
        firstName: "Иван",
        lastName: "Сидоров",
        middleName: "Петрович",
        phone: "+7 (888) 987-65-43",
        email: "ivan.sidorov@email.com",
        birthDate: "1985-03-20",
        weight: 80,
        height: 175,
        goal: "Набор мышечной массы",
        medicalNotes: "Проблемы со спиной",
        photo: null,
        status: "active",
        joinDate: "2024-02-01",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    samplePupils.forEach(pupil => {
      this.pupils.set(pupil.id, pupil);
    });
    this.currentPupilId = 3;

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

    // Добавляем упражнения для груди
    chestExercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });

    // Create sample exercises database - упражнения для спины
    const backExercises: Exercise[] = [
      {
        id: 17,
        name: "Становая тяга",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["ноги", "ягодичные", "руки"],
        difficulty: "продвинутый",
        overview: "Базовое упражнение для развития всей задней цепи мышц",
        technique: [
          "Встаньте перед штангой, ноги на ширине плеч",
          "Наклонитесь и возьмите штангу прямым хватом",
          "Спина прямая, лопатки сведены",
          "Поднимите штангу, выпрямляя ноги и корпус",
          "В верхней точке полностью выпрямитесь",
          "Медленно опустите штангу в исходное положение"
        ],
        commonMistakes: [
          "Округление спины",
          "Отведение штанги от тела",
          "Неполное выпрямление в верхней точке",
          "Слишком быстрое опускание"
        ],
        contraindications: ["травмы позвоночника", "грыжи", "проблемы с поясницей"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: "Подтягивания широким хватом",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "средний",
        overview: "Классическое упражнение для развития широчайших мышц спины",
        technique: [
          "Повисните на перекладине широким хватом",
          "Руки шире плеч, ладони от себя",
          "Подтянитесь, сводя лопатки",
          "Доведите подбородок до уровня перекладины",
          "Медленно опуститесь в исходное положение",
          "Сохраняйте контроль на протяжении всего движения"
        ],
        commonMistakes: [
          "Раскачивание тела",
          "Неполная амплитуда движения",
          "Работа только руками",
          "Слишком быстрое опускание"
        ],
        contraindications: ["травмы плечевых суставов", "травмы запястий"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: "Тяга штанги в наклоне",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "средний",
        overview: "Базовое упражнение для развития толщины спины",
        technique: [
          "Возьмите штангу прямым хватом",
          "Наклонитесь вперед под углом 45 градусов",
          "Спина прямая, колени слегка согнуты",
          "Тяните штангу к низу живота",
          "Сводите лопатки в верхней точке",
          "Медленно опустите штангу"
        ],
        commonMistakes: [
          "Округление спины",
          "Слишком вертикальное положение",
          "Тяга к груди вместо живота",
          "Использование инерции"
        ],
        contraindications: ["проблемы с поясницей", "травмы позвоночника"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: "Тяга гантели одной рукой",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "начинающий",
        overview: "Изолирующее упражнение для проработки каждой стороны спины отдельно",
        technique: [
          "Поставьте одно колено и руку на скамью",
          "Возьмите гантель свободной рукой",
          "Спина прямая, параллельна полу",
          "Тяните гантель к поясу",
          "Сводите лопатку в верхней точке",
          "Медленно опустите гантель"
        ],
        commonMistakes: [
          "Поворот корпуса",
          "Тяга локтем в сторону",
          "Неполная амплитуда",
          "Слишком быстрое выполнение"
        ],
        contraindications: ["травмы плечевого сустава"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: "Тяга верхнего блока",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "начинающий",
        overview: "Упражнение в тренажере для развития широчайших мышц",
        technique: [
          "Сядьте в тренажер, зафиксируйте ноги",
          "Возьмите рукоять широким хватом",
          "Слегка отклонитесь назад",
          "Тяните рукоять к верху груди",
          "Сводите лопатки в нижней точке",
          "Медленно вернитесь в исходное положение"
        ],
        commonMistakes: [
          "Тяга за голову",
          "Слишком большой наклон назад",
          "Работа только руками",
          "Неполное сведение лопаток"
        ],
        contraindications: ["травмы плечевых суставов"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: "Горизонтальная тяга",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "начинающий",
        overview: "Упражнение для развития средней части спины",
        technique: [
          "Сядьте в тренажер, упритесь ногами",
          "Возьмите рукоять нейтральным хватом",
          "Спина прямая, грудь выпячена",
          "Тяните рукоять к животу",
          "Сводите лопатки в конечной точке",
          "Медленно вернитесь в исходное положение"
        ],
        commonMistakes: [
          "Округление спины",
          "Отклонение корпуса назад",
          "Тяга к груди",
          "Разведение локтей в стороны"
        ],
        contraindications: ["проблемы с поясницей"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: "Подтягивания узким хватом",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки"],
        difficulty: "средний",
        overview: "Вариация подтягиваний с акцентом на нижнюю часть широчайших",
        technique: [
          "Повисните на перекладине узким хватом",
          "Руки на ширине плеч или уже",
          "Подтянитесь, сводя лопатки",
          "Стремитесь коснуться грудью перекладины",
          "Медленно опуститесь вниз",
          "Сохраняйте контроль движения"
        ],
        commonMistakes: [
          "Слишком широкий хват",
          "Неполная амплитуда",
          "Раскачивание",
          "Работа только руками"
        ],
        contraindications: ["травмы плечевых суставов", "травмы запястий"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        name: "Гиперэкстензия",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["ягодичные"],
        difficulty: "начинающий",
        overview: "Упражнение для укрепления поясничных мышц и разгибателей спины",
        technique: [
          "Лягте на тренажер лицом вниз",
          "Зафиксируйте ноги, руки на груди",
          "Опуститесь вниз, округляя спину",
          "Поднимитесь, выпрямляя позвоночник",
          "В верхней точке спина прямая",
          "Не поднимайтесь слишком высоко"
        ],
        commonMistakes: [
          "Переразгибание в верхней точке",
          "Слишком быстрое выполнение",
          "Использование дополнительного веса новичками",
          "Неправильная фиксация ног"
        ],
        contraindications: ["острые боли в пояснице", "грыжи позвоночника"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: "Тяга Т-грифа",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["руки", "плечи"],
        difficulty: "средний",
        overview: "Упражнение для развития толщины средней части спины",
        technique: [
          "Встаньте над Т-грифом, ноги по сторонам",
          "Наклонитесь и возьмите рукояти",
          "Спина прямая, колени слегка согнуты",
          "Тяните гриф к низу груди",
          "Сводите лопатки в верхней точке",
          "Медленно опустите гриф"
        ],
        commonMistakes: [
          "Округление спины",
          "Слишком вертикальное положение",
          "Разведение локтей",
          "Использование инерции"
        ],
        contraindications: ["проблемы с поясницей"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: "Шраги со штангой",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["плечи"],
        difficulty: "начинающий",
        overview: "Изолирующее упражнение для развития трапециевидных мышц",
        technique: [
          "Возьмите штангу прямым хватом",
          "Встаньте прямо, руки вдоль тела",
          "Поднимите плечи вверх",
          "Задержитесь на секунду в верхней точке",
          "Медленно опустите плечи",
          "Не вращайте плечами"
        ],
        commonMistakes: [
          "Вращение плечами",
          "Сгибание рук в локтях",
          "Слишком большой вес",
          "Наклон головы вперед"
        ],
        contraindications: ["травмы шейного отдела"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        name: "Шраги с гантелями",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["плечи"],
        difficulty: "начинающий",
        overview: "Вариация шрагов с гантелями для трапециевидных мышц",
        technique: [
          "Возьмите гантели в обе руки",
          "Встаньте прямо, руки вдоль тела",
          "Поднимите плечи строго вверх",
          "Максимально сократите трапеции",
          "Медленно опустите плечи",
          "Держите руки прямыми"
        ],
        commonMistakes: [
          "Вращение плечами",
          "Наклон корпуса",
          "Сгибание рук",
          "Слишком быстрое выполнение"
        ],
        contraindications: ["травмы плечевых суставов"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        name: "Обратные разведения с гантелями",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["плечи"],
        difficulty: "начинающий",
        overview: "Упражнение для задних дельт и ромбовидных мышц",
        technique: [
          "Наклонитесь вперед с гантелями в руках",
          "Руки слегка согнуты в локтях",
          "Разведите гантели в стороны",
          "Сводите лопатки в верхней точке",
          "Медленно вернитесь в исходное положение",
          "Держите спину прямой"
        ],
        commonMistakes: [
          "Округление спины",
          "Слишком большой вес",
          "Полное выпрямление рук",
          "Использование инерции"
        ],
        contraindications: ["проблемы с поясницей"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        name: "Тяга штанги к подбородку",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["плечи", "руки"],
        difficulty: "средний",
        overview: "Упражнение для верхней части спины и трапеций",
        technique: [
          "Возьмите штангу узким хватом",
          "Встаньте прямо, штанга у бедер",
          "Тяните штангу вдоль тела вверх",
          "Локти выше кистей",
          "Доведите до уровня подбородка",
          "Медленно опустите штангу"
        ],
        commonMistakes: [
          "Слишком широкий хват",
          "Отведение штанги от тела",
          "Неполная амплитуда",
          "Рывковые движения"
        ],
        contraindications: ["травмы плечевых суставов"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        name: "Пуловер со штангой лежа",
        primaryMuscles: ["спина"],
        secondaryMuscles: ["грудь", "плечи"],
        difficulty: "средний",
        overview: "Упражнение для растяжки грудной клетки и широчайших мышц",
        technique: [
          "Лягте на скамью, возьмите штангу",
          "Поднимите штангу над грудью",
          "Опустите штангу за голову по дуге",
          "Почувствуйте растяжение в широчайших",
          "Верните штангу в исходное положение",
          "Держите локти слегка согнутыми"
        ],
        commonMistakes: [
          "Слишком большой вес",
          "Полное выпрямление рук",
          "Слишком глубокое опускание",
          "Быстрое выполнение"
        ],
        contraindications: ["травмы плечевых суставов"],
        muscleImageUrl: null,
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Добавляем упражнения для спины
    backExercises.forEach(exercise => {
      this.exercises.set(exercise.id, exercise);
    });

    this.currentExerciseId = chestExercises.length + backExercises.length + 1;

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

  // Pupil methods
  async getPupils(trainerId: number): Promise<Pupil[]> {
    return Array.from(this.pupils.values()).filter(pupil => pupil.trainerId === trainerId);
  }

  async getPupil(id: number): Promise<Pupil | undefined> {
    return this.pupils.get(id);
  }

  async createPupil(insertPupil: InsertPupil): Promise<Pupil> {
    const id = this.currentPupilId++;
    const pupil: Pupil = { 
      ...insertPupil, 
      id,
      medicalNotes: insertPupil.medicalNotes ?? null,
      photo: insertPupil.photo ?? null,
      middleName: insertPupil.middleName ?? null,
      birthDate: insertPupil.birthDate ?? null,
      weight: insertPupil.weight ?? null,
      height: insertPupil.height ?? null,
      goal: insertPupil.goal ?? null,
      status: insertPupil.status ?? "active",
      createdAt: insertPupil.createdAt ?? new Date(),
      updatedAt: insertPupil.updatedAt ?? new Date()
    };
    this.pupils.set(id, pupil);
    return pupil;
  }

  async updatePupil(id: number, updates: Partial<InsertPupil>): Promise<Pupil | undefined> {
    const pupil = this.pupils.get(id);
    if (!pupil) return undefined;
    
    const updatedPupil = { 
      ...pupil, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.pupils.set(id, updatedPupil);
    return updatedPupil;
  }

  async deletePupil(id: number): Promise<boolean> {
    return this.pupils.delete(id);
  }

  // Student training plan methods
  async getStudentTrainingPlans(studentId: number): Promise<StudentTrainingPlan[]> {
    return Array.from(this.studentTrainingPlans.values()).filter(plan => plan.studentId === studentId);
  }

  async getActiveTrainingPlan(studentId: number): Promise<StudentTrainingPlan | undefined> {
    return Array.from(this.studentTrainingPlans.values()).find(
      plan => plan.studentId === studentId && plan.isActive
    );
  }

  async createStudentTrainingPlan(insertPlan: InsertStudentTrainingPlan): Promise<StudentTrainingPlan> {
    const id = this.currentTrainingPlanId++;
    const plan: StudentTrainingPlan = { 
      ...insertPlan, 
      id,
      isActive: insertPlan.isActive ?? true,
      createdAt: insertPlan.createdAt ?? new Date(),
      updatedAt: insertPlan.updatedAt ?? new Date()
    };
    this.studentTrainingPlans.set(id, plan);
    return plan;
  }

  async updateStudentTrainingPlan(id: number, updates: Partial<InsertStudentTrainingPlan>): Promise<StudentTrainingPlan | undefined> {
    const plan = this.studentTrainingPlans.get(id);
    if (!plan) return undefined;
    
    const updatedPlan = { 
      ...plan, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.studentTrainingPlans.set(id, updatedPlan);
    return updatedPlan;
  }

  async deleteStudentTrainingPlan(id: number): Promise<boolean> {
    return this.studentTrainingPlans.delete(id);
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

  // Student training plan methods
  async getStudentTrainingPlans(studentId: number): Promise<StudentTrainingPlan[]> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(studentTrainingPlans).where(eq(studentTrainingPlans.studentId, studentId));
  }

  async getActiveTrainingPlan(studentId: number): Promise<StudentTrainingPlan | undefined> {
    const { db } = await import("./db");
    const { eq, and } = await import("drizzle-orm");
    const [plan] = await db.select().from(studentTrainingPlans).where(
      and(
        eq(studentTrainingPlans.studentId, studentId),
        eq(studentTrainingPlans.isActive, true)
      )
    );
    return plan;
  }

  async createStudentTrainingPlan(insertPlan: InsertStudentTrainingPlan): Promise<StudentTrainingPlan> {
    const { db } = await import("./db");
    const [plan] = await db.insert(studentTrainingPlans).values(insertPlan).returning();
    return plan;
  }

  async updateStudentTrainingPlan(id: number, updates: Partial<InsertStudentTrainingPlan>): Promise<StudentTrainingPlan | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [plan] = await db.update(studentTrainingPlans).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(studentTrainingPlans.id, id)).returning();
    return plan || undefined;
  }

  async deleteStudentTrainingPlan(id: number): Promise<boolean> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const result = await db.delete(studentTrainingPlans).where(eq(studentTrainingPlans.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Student methods
  async getStudents(trainerId: number): Promise<Student[]> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    return await db.select().from(students).where(eq(students.trainerId, trainerId));
  }

  async getStudent(id: number): Promise<Student | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const { db } = await import("./db");
    const [student] = await db.insert(students).values(insertStudent).returning();
    return student;
  }

  async updateStudent(id: number, updates: Partial<InsertStudent>): Promise<Student | undefined> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const [student] = await db.update(students).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(students.id, id)).returning();
    return student || undefined;
  }

  async deleteStudent(id: number): Promise<boolean> {
    const { db } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const result = await db.delete(students).where(eq(students.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new MemStorage();
