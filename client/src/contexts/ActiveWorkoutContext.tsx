import { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveWorkout, Pupil, WorkoutProgram } from '@shared/schema';

interface ActiveWorkoutContextType {
  activeWorkouts: ActiveWorkout[];
  setActiveWorkouts: (workouts: ActiveWorkout[]) => void;
  addActiveWorkout: (trainerId: number, pupil: Pupil, program: WorkoutProgram) => void;
  removeActiveWorkout: (trainerId: number, pupilId: number) => void;
  isWorkoutActive: (trainerId: number, pupilId: number) => boolean;
  getActiveWorkout: (trainerId: number, pupilId: number) => ActiveWorkout | undefined;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);

export function ActiveWorkoutProvider({ children }: { children: ReactNode }) {
  const [activeWorkouts, setActiveWorkouts] = useState<ActiveWorkout[]>([]);

  const addActiveWorkout = (trainerId: number, pupil: Pupil, program: WorkoutProgram) => {
    const newWorkout: ActiveWorkout = {
      id: Date.now(), // Temporary ID для локального состояния
      trainerId,
      pupilId: pupil.id,
      workoutProgramId: program.id,
      createdAt: new Date()
    };
    
    // Удаляем существующую активную тренировку для этого ученика, если есть
    const filtered = activeWorkouts.filter(w => !(w.trainerId === trainerId && w.pupilId === pupil.id));
    setActiveWorkouts([...filtered, newWorkout]);
  };

  const removeActiveWorkout = (trainerId: number, pupilId: number) => {
    setActiveWorkouts(workouts => 
      workouts.filter(w => !(w.trainerId === trainerId && w.pupilId === pupilId))
    );
  };

  const isWorkoutActive = (trainerId: number, pupilId: number) => {
    return activeWorkouts.some(w => w.trainerId === trainerId && w.pupilId === pupilId);
  };

  const getActiveWorkout = (trainerId: number, pupilId: number) => {
    return activeWorkouts.find(w => w.trainerId === trainerId && w.pupilId === pupilId);
  };

  return (
    <ActiveWorkoutContext.Provider value={{
      activeWorkouts,
      setActiveWorkouts,
      addActiveWorkout,
      removeActiveWorkout,
      isWorkoutActive,
      getActiveWorkout
    }}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}

export function useActiveWorkout() {
  const context = useContext(ActiveWorkoutContext);
  if (context === undefined) {
    throw new Error('useActiveWorkout must be used within an ActiveWorkoutProvider');
  }
  return context;
}