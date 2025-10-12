import { supabase } from './supabase';
import type {
  Pupil, InsertPupil,
  Exercise, InsertExercise,
  WorkoutProgram, InsertWorkoutProgram,
  PupilTrainingPlan, InsertPupilTrainingPlan,
  PupilWorkoutHistory, InsertPupilWorkoutHistory,
  ActiveWorkout, InsertActiveWorkout,
  Appointment, InsertAppointment
} from '@shared/schema';

// Helper to convert camelCase to snake_case for database inserts
function toSnakeCase(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj;
  if (typeof obj !== 'object') return obj;

  const snakeObj: any = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    snakeObj[snakeKey] = obj[key];
  }
  return snakeObj;
}

// Helper to convert snake_case to camelCase for database reads
function toCamelCase(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(toCamelCase);
  if (typeof obj !== 'object') return obj;

  const camelObj: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    camelObj[camelKey] = obj[key];
  }
  return camelObj;
}

// Students
export const studentsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(toCamelCase) as Pupil[];
  },

  async getCurrentUser() {
    // В реальном приложении здесь будет получение ID текущего пользователя из контекста авторизации
    // Пока возвращаем первого ученика для тестирования
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .limit(1)
      .single();
    if (error) throw error;
    return toCamelCase(data) as Pupil;
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return toCamelCase(data) as Pupil;
  },

  async getByTrainerId(trainerId: number) {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('trainer_id', trainerId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(toCamelCase) as Pupil[];
  },

  async create(student: InsertPupil) {
    const { data, error } = await supabase
      .from('students')
      .insert(toSnakeCase(student))
      .select()
      .single();
    if (error) throw error;
    return toCamelCase(data) as Pupil;
  },

  async update(id: number, student: Partial<InsertPupil>) {
    const { data, error } = await supabase
      .from('students')
      .update(toSnakeCase(student))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return toCamelCase(data) as Pupil;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Alias for pupils (students)
export const pupilsDb = studentsDb;

// Exercises
export const exercisesDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('"createdAt"', { ascending: false });
    if (error) throw error;
    return data as Exercise[];
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Exercise;
  },

  async create(exercise: InsertExercise) {
    const { data, error } = await supabase
      .from('exercises')
      .insert(exercise)
      .select()
      .single();
    if (error) throw error;
    return data as Exercise;
  },

  async update(id: number, exercise: Partial<InsertExercise>) {
    const { data, error } = await supabase
      .from('exercises')
      .update(exercise)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Exercise;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Workout Programs
export const workoutProgramsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('workout_programs')
      .select('*');
    if (error) throw error;
    return data as WorkoutProgram[];
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('workout_programs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as WorkoutProgram;
  },

  async getByCreatorId(creatorId: number) {
    const { data, error } = await supabase
      .from('workout_programs')
      .select('*')
      .eq('created_by', creatorId);
    if (error) throw error;
    return data as WorkoutProgram[];
  },

  async create(program: InsertWorkoutProgram) {
    const { data, error } = await supabase
      .from('workout_programs')
      .insert(program)
      .select()
      .single();
    if (error) throw error;
    return data as WorkoutProgram;
  },

  async update(id: number, program: Partial<InsertWorkoutProgram>) {
    const { data, error } = await supabase
      .from('workout_programs')
      .update(program)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as WorkoutProgram;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('workout_programs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Pupil Training Plans
export const trainingPlansDb = {
  async getByPupilId(pupilId: number) {
    const { data, error } = await supabase
      .from('pupil_training_plans')
      .select('*')
      .eq('pupil_id', pupilId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as PupilTrainingPlan[];
  },

  async getActiveByPupilId(pupilId: number) {
    const { data, error } = await supabase
      .from('pupil_training_plans')
      .select('*')
      .eq('pupil_id', pupilId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as PupilTrainingPlan[];
  },

  async create(plan: InsertPupilTrainingPlan) {
    const { data, error} = await supabase
      .from('pupil_training_plans')
      .insert(toSnakeCase(plan))
      .select()
      .single();
    if (error) throw error;
    return data as PupilTrainingPlan;
  },

  async update(id: number, plan: Partial<InsertPupilTrainingPlan>) {
    const { data, error } = await supabase
      .from('pupil_training_plans')
      .update(toSnakeCase(plan))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as PupilTrainingPlan;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('pupil_training_plans')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Workout History
export const workoutHistoryDb = {
  async getByPupilId(pupilId: number) {
    const { data, error } = await supabase
      .from('pupil_workout_history')
      .select('*')
      .eq('pupil_id', pupilId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as PupilWorkoutHistory[];
  },

  async create(history: InsertPupilWorkoutHistory) {
    const { data, error } = await supabase
      .from('pupil_workout_history')
      .insert(toSnakeCase(history))
      .select()
      .single();
    if (error) throw error;
    return data as PupilWorkoutHistory;
  },

  async update(id: number, history: Partial<InsertPupilWorkoutHistory>) {
    const { data, error } = await supabase
      .from('pupil_workout_history')
      .update(toSnakeCase(history))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as PupilWorkoutHistory;
  },
};

// Active Workouts
export const activeWorkoutsDb = {
  async getByTrainerId(trainerId: number) {
    const { data, error } = await supabase
      .from('active_workouts')
      .select(`
        *,
        students(*),
        workout_programs(*)
      `)
      .eq('trainer_id', trainerId);
    if (error) throw error;
    return data;
  },

  async create(workout: InsertActiveWorkout) {
    const { data, error } = await supabase
      .from('active_workouts')
      .insert(toSnakeCase(workout))
      .select()
      .single();
    if (error) throw error;
    return data as ActiveWorkout;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('active_workouts')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Appointments
export const appointmentsDb = {
  async getAll() {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        students:pupil_id (
          id,
          first_name,
          last_name,
          email,
          phone
        )
      `)
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    if (error) throw error;
    return (data || []).map(toCamelCase) as Appointment[];
  },

  async getByTrainerId(trainerId: number) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        students:pupil_id (
          id,
          first_name,
          last_name,
          email,
          phone
        )
      `)
      .eq('trainer_id', trainerId)
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    if (error) throw error;
    return (data || []).map(toCamelCase) as Appointment[];
  },

  async create(appointment: InsertAppointment) {
    const { data, error } = await supabase
      .from('appointments')
      .insert(toSnakeCase(appointment))
      .select(`
        *,
        students:pupil_id (
          id,
          first_name,
          last_name,
          email,
          phone
        )
      `)
      .single();
    if (error) throw error;
    return toCamelCase(data) as Appointment;
  },

  async update(id: number, appointment: Partial<InsertAppointment>) {
    const { data, error } = await supabase
      .from('appointments')
      .update(toSnakeCase(appointment))
      .eq('id', id)
      .select(`
        *,
        students:pupil_id (
          id,
          first_name,
          last_name,
          email,
          phone
        )
      `)
      .single();
    if (error) throw error;
    return toCamelCase(data) as Appointment;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
