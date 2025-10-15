export interface DashboardStats {
  todayWorkouts: number;
  completedWorkouts: number;
  totalTime: string;
  streak: string;
  totalWeight: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: number | null;
}

export interface DetailedExercise {
  id: string;
  name: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  difficulty: string;
  description: string;
  technique: string[];
  commonMistakes: string[];
  tips: string[];
}

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasWorkout: boolean;
  workoutType?: 'strength' | 'cardio' | 'functional' | 'stretching';
}
