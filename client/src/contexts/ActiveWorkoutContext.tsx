import { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveWorkout, Pupil, WorkoutProgram } from '@shared/schema';

interface ActiveWorkoutContextType {
  activeWorkouts: (ActiveWorkout & { programName?: string })[];
  setActiveWorkouts: (workouts: (ActiveWorkout & { programName?: string })[]) => void;
  addActiveWorkout: (trainerId: string, pupil: Pupil, program: WorkoutProgram) => void;
  removeActiveWorkout: (trainerId: string, pupilId: string) => void;
  isWorkoutActive: (trainerId: string, pupilId: string) => boolean;
  getActiveWorkout: (trainerId: string, pupilId: string) => ActiveWorkout | undefined;
  getWorkoutProgramName: (trainerId: string, pupilId: string) => string | undefined;
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);

export function ActiveWorkoutProvider({ children }: { children: ReactNode }) {
  const [activeWorkouts, setActiveWorkouts] = useState<(ActiveWorkout & { programName?: string })[]>([]);

  const addActiveWorkout = (trainerId: string, pupil: Pupil, program: WorkoutProgram) => {
    const newWorkout: ActiveWorkout & { programName?: string } = {
      id: program.id, // Используем ID из базы данных
      trainerId,
      pupilId: pupil.id,
      workoutProgramId: program.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      programName: program.name // Добавляем название программы
    };

    // Удаляем существующую активную тренировку для этого ученика, если есть
    const filtered = activeWorkouts.filter(w => !(w.trainerId === trainerId && w.pupilId === pupil.id));
    setActiveWorkouts([...filtered, newWorkout]);
  };

  const removeActiveWorkout = (trainerId: string, pupilId: string) => {
    setActiveWorkouts(workouts =>
      workouts.filter(w => !(w.trainerId === trainerId && w.pupilId === pupilId))
    );
  };

  const isWorkoutActive = (trainerId: string, pupilId: string) => {
    return activeWorkouts.some(w => w.trainerId === trainerId && w.pupilId === pupilId);
  };

  const getActiveWorkout = (trainerId: string, pupilId: string) => {
    return activeWorkouts.find(w => w.trainerId === trainerId && w.pupilId === pupilId);
  };

  const getWorkoutProgramName = (trainerId: string, pupilId: string) => {
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