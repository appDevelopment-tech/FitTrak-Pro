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

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasWorkout: boolean;
  workoutType?: 'strength' | 'cardio' | 'functional' | 'stretching';
}
