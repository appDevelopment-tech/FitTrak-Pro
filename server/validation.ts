import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

// Интерфейс для расширенного Request с валидированными данными
export interface ValidatedRequest<T = any> extends Request {
  validatedData?: T;
}

// Middleware для валидации тела запроса
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      req.validatedData = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        
        return res.status(400).json({
          message: 'Ошибка валидации данных',
          errors: errorMessages,
          details: error.errors
        });
      }
      
      return res.status(400).json({
        message: 'Некорректные данные запроса'
      });
    }
  };
}

// Middleware для валидации параметров запроса
export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      req.validatedData = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        
        return res.status(400).json({
          message: 'Ошибка валидации параметров',
          errors: errorMessages,
          details: error.errors
        });
      }
      
      return res.status(400).json({
        message: 'Некорректные параметры запроса'
      });
    }
  };
}

// Middleware для валидации query параметров
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      req.validatedData = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        
        return res.status(400).json({
          message: 'Ошибка валидации query параметров',
          errors: errorMessages,
          details: error.errors
        });
      }
      
      return res.status(400).json({
        message: 'Некорректные query параметры'
      });
    }
  };
}

// Универсальный middleware для валидации
export function validate<T>(schema: ZodSchema<T>, source: 'body' | 'params' | 'query' = 'body') {
  return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
    try {
      const data = source === 'body' ? req.body : 
                   source === 'params' ? req.params : 
                   req.query;
      
      req.validatedData = schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        
        return res.status(400).json({
          message: `Ошибка валидации ${source === 'body' ? 'данных' : source === 'params' ? 'параметров' : 'query параметров'}`,
          errors: errorMessages,
          details: error.errors
        });
      }
      
      return res.status(400).json({
        message: `Некорректные ${source === 'body' ? 'данные' : source === 'params' ? 'параметры' : 'query параметры'} запроса`
      });
    }
  };
}

// Схемы для валидации параметров
export const uuidParamSchema = z.object({
  id: z.string().uuid('Некорректный формат UUID')
});

export const trainerIdParamSchema = z.object({
  trainerId: z.string().uuid('Некорректный формат UUID тренера')
});

export const pupilIdParamSchema = z.object({
  pupilId: z.string().uuid('Некорректный формат UUID ученика')
});

export const userIdParamSchema = z.object({
  userId: z.string().uuid('Некорректный формат UUID пользователя')
});

export const exerciseIdParamSchema = z.object({
  id: z.string().uuid('Некорректный формат UUID упражнения')
});

export const sessionIdParamSchema = z.object({
  id: z.string().uuid('Некорректный формат UUID сессии')
});

export const appointmentIdParamSchema = z.object({
  id: z.string().uuid('Некорректный формат UUID записи')
});

// Схемы для валидации query параметров
export const dateQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата должна быть в формате YYYY-MM-DD')
});

export const muscleGroupQuerySchema = z.object({
  muscleGroup: z.string().min(1, 'Группа мышц обязательна')
});

// Схемы для валидации аутентификации
export const loginSchema = z.object({
  email: z.string().email('Некорректный email адрес'),
  password: z.string().min(1, 'Пароль обязателен'),
  userType: z.enum(['trainer', 'pupil']).optional()
});

export const forgotPasswordSchema = z.object({
  emailOrPhone: z.string().min(1, 'Email или телефон обязателен')
});

// Схемы для валидации обновлений (partial)
export const updateUserSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно').optional(),
  lastName: z.string().min(1, 'Фамилия обязательна').optional(),
  middleName: z.string().optional(),
  birthDate: z.string().optional(),
  email: z.string().email('Некорректный email').optional(),
  phone: z.string().optional(),
  photo: z.string().optional(),
  isTrainer: z.boolean().optional()
});

export const updatePupilSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно').optional(),
  lastName: z.string().min(1, 'Фамилия обязательна').optional(),
  middleName: z.string().optional(),
  phone: z.string().min(1, 'Телефон обязателен').optional(),
  email: z.string().email('Некорректный email').optional(),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов').optional(),
  birthDate: z.string().optional(),
  weight: z.number().positive('Вес должен быть положительным').optional(),
  height: z.number().positive('Рост должен быть положительным').optional(),
  goal: z.string().optional(),
  medicalNotes: z.string().optional(),
  photo: z.string().optional(),
  status: z.string().optional(),
  parentFirstName: z.string().optional(),
  parentLastName: z.string().optional(),
  parentMiddleName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email('Некорректный email родителя').optional(),
  parentSpecialInstructions: z.string().optional(),
  isParentRepresentative: z.boolean().optional(),
  privacyPolicyAccepted: z.boolean().optional(),
  contractAccepted: z.boolean().optional(),
  educationConsentAccepted: z.boolean().optional()
});

export const updateExerciseSchema = z.object({
  name: z.string().min(1, 'Название упражнения обязательно').optional(),
  primaryMuscles: z.array(z.string()).min(1, 'Выберите хотя бы одну основную группу мышц').optional(),
  secondaryMuscles: z.array(z.string()).optional(),
  difficulty: z.enum(['начинающий', 'средний', 'продвинутый']).optional(),
  overview: z.string().min(10, 'Описание должно содержать минимум 10 символов').optional(),
  technique: z.array(z.string()).min(1, 'Добавьте хотя бы один шаг техники').optional(),
  commonMistakes: z.array(z.string()).optional(),
  contraindications: z.array(z.string()).optional(),
  muscleImageUrl: z.string().url('Некорректный URL изображения').optional(),
  videoUrl: z.string().url('Некорректный URL видео').optional(),
  techniqueImageUrl: z.string().url('Некорректный URL изображения техники').optional(),
  createdBy: z.string().uuid('Некорректный формат UUID создателя').optional()
});

export const updateWorkoutProgramSchema = z.object({
  name: z.string().min(1, 'Название программы обязательно').optional(),
  type: z.string().min(1, 'Тип программы обязателен').optional(),
  duration: z.number().min(1, 'Длительность должна быть больше 0').optional(),
  level: z.string().min(1, 'Уровень программы обязателен').optional(),
  exercises: z.any().optional()
});

export const updateAppointmentSchema = z.object({
  date: z.string().min(1, 'Дата записи обязательна').optional(),
  time: z.string().min(1, 'Время записи обязательно').optional(),
  status: z.string().optional()
});

// Схема для обновления изображения упражнения
export const updateExerciseImageSchema = z.object({
  imageUrl: z.string().url('Некорректный URL изображения')
});

// Схема для обновления сессии тренировки
export const updateWorkoutSessionSchema = z.object({
  status: z.string().optional(),
  completedAt: z.string().optional()
});

// Схема для обновления плана тренировки
export const updateTrainingPlanSchema = z.object({
  name: z.string().min(1, 'Название плана обязательно').optional(),
  exercises: z.any().optional(),
  isActive: z.boolean().optional()
});
