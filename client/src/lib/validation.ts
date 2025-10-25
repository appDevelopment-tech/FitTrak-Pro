import { z } from 'zod';
import React from 'react';

// Интерфейс для ошибок валидации с сервера
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationErrorResponse {
  message: string;
  errors: ValidationError[];
  details: z.ZodIssue[];
}

// Утилита для обработки ошибок валидации
export function handleValidationError(error: any): ValidationErrorResponse | null {
  if (error?.response?.data?.errors) {
    return error.response.data as ValidationErrorResponse;
  }
  return null;
}

// Утилита для отображения ошибок валидации в формах
export function getFieldError(errors: ValidationError[], fieldName: string): string | undefined {
  return errors.find(err => err.field === fieldName)?.message;
}

// Утилита для получения всех ошибок поля
export function getFieldErrors(errors: ValidationError[], fieldName: string): string[] {
  return errors
    .filter(err => err.field === fieldName)
    .map(err => err.message);
}

// Утилита для проверки, есть ли ошибки для поля
export function hasFieldError(errors: ValidationError[], fieldName: string): boolean {
  return errors.some(err => err.field === fieldName);
}

// Утилита для получения общих ошибок (не привязанных к полям)
export function getGeneralErrors(errors: ValidationError[]): string[] {
  return errors
    .filter(err => !err.field || err.field === '')
    .map(err => err.message);
}

// Утилита для форматирования ошибок для отображения
export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return '';
  
  if (errors.length === 1) {
    return errors[0].message;
  }
  
  return errors.map(err => `${err.field ? `${err.field}: ` : ''}${err.message}`).join(', ');
}

// Хук для обработки ошибок валидации в формах
export function useValidationErrors() {
  const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
    return errors.find(err => err.field === fieldName)?.message;
  };

  const getFieldErrors = (errors: ValidationError[], fieldName: string): string[] => {
    return errors
      .filter(err => err.field === fieldName)
      .map(err => err.message);
  };

  const hasFieldError = (errors: ValidationError[], fieldName: string): boolean => {
    return errors.some(err => err.field === fieldName);
  };

  const getGeneralErrors = (errors: ValidationError[]): string[] => {
    return errors
      .filter(err => !err.field || err.field === '')
      .map(err => err.message);
  };

  const formatErrors = (errors: ValidationError[]): string => {
    if (errors.length === 0) return '';
    
    if (errors.length === 1) {
      return errors[0].message;
    }
    
    return errors.map(err => `${err.field ? `${err.field}: ` : ''}${err.message}`).join(', ');
  };

  return {
    getFieldError,
    getFieldErrors,
    hasFieldError,
    getGeneralErrors,
    formatErrors
  };
}

// Компонент для отображения ошибок валидации
export function ValidationErrorDisplay({ 
  errors, 
  fieldName, 
  className = "text-sm text-red-500" 
}: { 
  errors: ValidationError[]; 
  fieldName?: string; 
  className?: string;
}) {
  const { getFieldError, getGeneralErrors } = useValidationErrors();
  
  if (fieldName) {
    const fieldError = getFieldError(errors, fieldName);
    if (!fieldError) return null;
    
    return fieldError;
  }
  
  const generalErrors = getGeneralErrors(errors);
  if (generalErrors.length === 0) return null;
  
  return generalErrors.join(', ');
}

// Утилита для создания схем валидации с кастомными сообщениями
export function createValidationSchema<T extends z.ZodRawShape>(schema: T) {
  return z.object(schema);
}

// Расширенные схемы валидации для клиента
export const clientValidationSchemas = {
  // Схема для входа
  login: z.object({
    email: z.string().email('Введите корректный email адрес'),
    password: z.string().min(1, 'Пароль обязателен'),
    userType: z.enum(['trainer', 'pupil']).optional()
  }),

  // Схема для регистрации ученика
  pupilRegistration: z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    middleName: z.string().optional(),
    phone: z.string().min(1, 'Телефон обязателен'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    birthDate: z.string().min(1, 'Дата рождения обязательна'),
    weight: z.number().positive('Вес должен быть положительным').optional(),
    height: z.number().positive('Рост должен быть положительным').optional(),
    goal: z.string().optional(),
    medicalNotes: z.string().optional(),
    parentFirstName: z.string().optional(),
    parentLastName: z.string().optional(),
    parentMiddleName: z.string().optional(),
    parentPhone: z.string().optional(),
    parentEmail: z.string().email('Некорректный email родителя').optional(),
    parentSpecialInstructions: z.string().optional(),
    isParentRepresentative: z.boolean().default(false),
    privacyPolicyAccepted: z.boolean().refine(val => val === true, 'Необходимо принять политику конфиденциальности'),
    contractAccepted: z.boolean().refine(val => val === true, 'Необходимо принять договор'),
    educationConsentAccepted: z.boolean().refine(val => val === true, 'Необходимо дать согласие на образование')
  }),

  // Схема для создания упражнения
  exercise: z.object({
    name: z.string().min(1, 'Название упражнения обязательно'),
    primaryMuscles: z.array(z.string()).min(1, 'Выберите хотя бы одну основную группу мышц'),
    secondaryMuscles: z.array(z.string()).optional(),
    difficulty: z.enum(['начинающий', 'средний', 'продвинутый'], {
      errorMap: () => ({ message: 'Выберите уровень сложности' })
    }),
    overview: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
    technique: z.array(z.string()).min(1, 'Добавьте хотя бы один шаг техники'),
    commonMistakes: z.array(z.string()).optional(),
    contraindications: z.array(z.string()).optional(),
    muscleImageUrl: z.string().url('Некорректный URL изображения').optional(),
    videoUrl: z.string().url('Некорректный URL видео').optional(),
    techniqueImageUrl: z.string().url('Некорректный URL изображения техники').optional()
  }),

  // Схема для создания программы тренировки
  workoutProgram: z.object({
    name: z.string().min(1, 'Название программы обязательно'),
    type: z.string().min(1, 'Тип программы обязателен'),
    duration: z.number().min(1, 'Длительность должна быть больше 0'),
    level: z.string().min(1, 'Уровень программы обязателен'),
    exercises: z.any() // JSON данные
  }),

  // Схема для записи на тренировку
  appointment: z.object({
    date: z.string().min(1, 'Дата записи обязательна'),
    time: z.string().min(1, 'Время записи обязательно'),
    pupilId: z.string().uuid('Некорректный формат UUID ученика')
  }),

  // Схема для обновления профиля пользователя
  userProfile: z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    middleName: z.string().optional(),
    birthDate: z.string().optional(),
    email: z.string().email('Некорректный email'),
    phone: z.string().optional(),
    photo: z.string().optional()
  }),

  // Схема для сброса пароля
  forgotPassword: z.object({
    emailOrPhone: z.string().min(1, 'Email или телефон обязателен')
  })
};

// Типы для схем валидации
export type LoginFormData = z.infer<typeof clientValidationSchemas.login>;
export type PupilRegistrationFormData = z.infer<typeof clientValidationSchemas.pupilRegistration>;
export type ExerciseFormData = z.infer<typeof clientValidationSchemas.exercise>;
export type WorkoutProgramFormData = z.infer<typeof clientValidationSchemas.workoutProgram>;
export type AppointmentFormData = z.infer<typeof clientValidationSchemas.appointment>;
export type UserProfileFormData = z.infer<typeof clientValidationSchemas.userProfile>;
export type ForgotPasswordFormData = z.infer<typeof clientValidationSchemas.forgotPassword>;

// Утилита для обработки ошибок API в формах
export function handleApiError(error: any, setErrors: (errors: ValidationError[]) => void) {
  if (error?.response?.data?.errors) {
    const validationErrors = error.response.data.errors as ValidationError[];
    setErrors(validationErrors);
    return true;
  }
  
  // Если это не ошибка валидации, показываем общую ошибку
  setErrors([{
    field: '',
    message: error?.response?.data?.message || error?.message || 'Произошла ошибка',
    code: 'GENERAL_ERROR'
  }]);
  
  return false;
}

// Хук для работы с ошибками валидации в формах
export function useFormValidation() {
  const [validationErrors, setValidationErrors] = React.useState<ValidationError[]>([]);
  
  const clearErrors = () => setValidationErrors([]);
  
  const setErrors = (errors: ValidationError[]) => setValidationErrors(errors);
  
  const addError = (error: ValidationError) => {
    setValidationErrors(prev => [...prev, error]);
  };
  
  const removeError = (fieldName: string) => {
    setValidationErrors(prev => prev.filter(err => err.field !== fieldName));
  };
  
  const hasError = (fieldName: string) => {
    return validationErrors.some(err => err.field === fieldName);
  };
  
  const getFieldError = (fieldName: string) => {
    return validationErrors.find(err => err.field === fieldName)?.message;
  };
  
  const getGeneralErrors = () => {
    return validationErrors
      .filter(err => !err.field || err.field === '')
      .map(err => err.message);
  };
  
  return {
    validationErrors,
    clearErrors,
    setErrors,
    addError,
    removeError,
    hasError,
    getFieldError,
    getGeneralErrors
  };
}
