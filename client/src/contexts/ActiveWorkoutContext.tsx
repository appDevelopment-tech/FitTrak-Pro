import { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveWorkout, Pupil, WorkoutProgram } from '@shared/schema';

interface ActiveWorkoutContextType {
  activeWorkouts: (ActiveWorkout & { programName?: string })[];
  setActiveWorkouts: (workouts: (ActiveWorkout & { programName?: string })[]) => void;
  addActiveWorkout: (trainerId: number, pupil: Pupil, program: WorkoutProgram) => void;
  removeActiveWorkout: (trainerId: number, pupilId: number) => void;
  isWorkoutActive: (trainerId: number, pupilId: number) => boolean;
  getActiveWorkout: (trainerId: number, pupilId: number) => ActiveWorkout | undefined;
  getWorkoutProgramName: (trainerId: number, pupilId: number) => string | undefined;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);

export function ActiveWorkoutProvider({ children }: { children: ReactNode }) {
  const [activeWorkouts, setActiveWorkouts] = useState<(ActiveWorkout & { programName?: string })[]>([]);

  const addActiveWorkout = (trainerId: number, pupil: Pupil, program: WorkoutProgram) => {
    const newWorkout: ActiveWorkout & { programName?: string } = {
      id: program.id, // Используем ID из базы данных
      trainerId,
      pupilId: pupil.id,
      workoutProgramId: program.id,
      createdAt: new Date().toISOString(),
      programName: program.name // Добавляем название программы
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

  const getWorkoutProgramName = (trainerId: number, pupilId: number) => {
    const workout = activeWorkouts.find(w => w.trainerId === trainerId && w.pupilId === pupilId) as ActiveWorkout & { programName?: string };
    return workout?.programName;
  };

  return (
    <ActiveWorkoutContext.Provider value={{
      activeWorkouts,
      setActiveWorkouts,
      addActiveWorkout,
      removeActiveWorkout,
      isWorkoutActive,
      getActiveWorkout,
      getWorkoutProgramName
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