import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutProgramSchema, insertWorkoutSessionSchema, insertExerciseProgressSchema, insertExerciseSchema, insertPupilTrainingPlanSchema, insertPupilSchema, insertActiveWorkoutSchema, insertTrainerWorkoutSchema } from "@shared/schema";

function translateExerciseToEnglish(russianName: string): string {
  const translations: Record<string, string> = {
    // Упражнения для груди
    "Жим штанги лежа на скамье": "bench press exercise training",
    "Сведение рук в тренажере": "chest fly exercise pec deck",
    "Жим гантелей лежа": "dumbbell bench press training",
    "Разведение гантелей лежа": "dumbbell flyes chest workout",
    "Отжимания в упоре": "push ups exercise training",
    "Отжимания с колен": "knee push ups modified",
    "Жим штанги на скамье под углом 30 градусов": "incline barbell press exercise",
    "Жим гантелей на скамье под углом 30 градусов": "incline dumbbell press training",
    "Отжимания на брусьях для грудного отдела": "chest dips exercise parallel bars",
    "Перекрестная тяга стоя": "cable crossover exercise standing",
    "Перекрестная тяга лежа на скамье": "cable crossover lying bench",
    "Жим штанги на скамье головой вниз": "decline barbell press exercise",
    "Пуловер с гантелью": "dumbbell pullover chest exercise",
    "Жим в тренажере Хаммер": "hammer strength chest press",
    "Отжимания от пола широким хватом": "wide grip push ups",
    "Отжимания на возвышении": "elevated push ups training",
    
    // Упражнения для спины
    "Становая тяга": "deadlift exercise powerlifting",
    "Подтягивания широким хватом": "wide grip pull ups",
    "Тяга штанги в наклоне": "bent over barbell row",
    "Тяга гантели одной рукой": "single arm dumbbell row",
    "Тяга верхнего блока": "lat pulldown exercise",
    "Горизонтальная тяга": "seated cable row exercise",
    "Подтягивания узким хватом": "close grip pull ups",
    "Гиперэкстензия": "hyperextension back exercise",
    "Тяга Т-грифа": "t bar row exercise",
    "Шраги со штангой": "barbell shrugs exercise",
    "Шраги с гантелями": "dumbbell shrugs training",
    "Обратные разведения с гантелями": "reverse fly dumbbells",
    "Тяга штанги к подбородку": "upright row barbell",
    "Пуловер со штангой лежа": "barbell pullover exercise"
  };
  
  return translations[russianName] || `${russianName} exercise training`;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Don't send password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Workout program routes
  app.get("/api/workout-programs", async (req, res) => {
    try {
      const programs = await storage.getWorkoutPrograms();
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/workout-programs", async (req, res) => {
    try {
      const validatedData = insertWorkoutProgramSchema.parse(req.body);
      const program = await storage.createWorkoutProgram(validatedData);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Workout session routes
  app.get("/api/workout-sessions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await storage.getWorkoutSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/workout-sessions/:userId/:date", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const date = req.params.date;
      const sessions = await storage.getWorkoutSessionsByDate(userId, date);
      
      // Enrich sessions with program data
      const enrichedSessions = await Promise.all(
        sessions.map(async (session) => {
          const program = await storage.getWorkoutProgram(session.programId);
          return { ...session, program };
        })
      );
      
      res.json(enrichedSessions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/workout-sessions", async (req, res) => {
    try {
      const validatedData = insertWorkoutSessionSchema.parse(req.body);
      const session = await storage.createWorkoutSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  app.patch("/api/workout-sessions/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.updateWorkoutSession(sessionId, req.body);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Exercise progress routes
  app.get("/api/exercise-progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getExerciseProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/exercise-progress", async (req, res) => {
    try {
      const validatedData = insertExerciseProgressSchema.parse(req.body);
      const progress = await storage.createExerciseProgress(validatedData);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Exercise routes
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/exercises/muscle-group/:muscleGroup", async (req, res) => {
    try {
      const muscleGroup = req.params.muscleGroup;
      const exercises = await storage.getExercisesByMuscleGroup(muscleGroup);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });



  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/exercises", async (req, res) => {
    try {
      const validatedData = insertExerciseSchema.parse(req.body);
      const exercise = await storage.createExercise(validatedData);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ message: "Invalid exercise data" });
    }
  });

  app.put("/api/exercises/:id", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const updates = req.body;
      const exercise = await storage.updateExercise(exerciseId, updates);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      res.status(400).json({ message: "Failed to update exercise" });
    }
  });

  app.delete("/api/exercises/:id", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const success = await storage.deleteExercise(exerciseId);
      if (!success) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete exercise" });
    }
  });

  app.post("/api/exercises/sort", async (req, res) => {
    try {
      const sortedExercises = await storage.sortExercisesAlphabetically();
      res.json(sortedExercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to sort exercises" });
    }
  });

  // Manual image upload for exercises
  app.get("/api/exercises/:id/search-image", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      // Return empty array - user will add images manually
      res.json([]);
    } catch (error) {
      console.error('Image search error:', error);
      res.status(500).json({ message: "Failed to search images" });
    }
  });

  // Update exercise image
  app.patch("/api/exercises/:id/image", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const { imageUrl } = req.body;
      
      const exercise = await storage.updateExercise(exerciseId, { 
        muscleImageUrl: imageUrl 
      });
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      
      res.json(exercise);
    } catch (error) {
      res.status(400).json({ message: "Failed to update exercise image" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard-stats/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const today = new Date().toISOString().split('T')[0];
      
      const [allSessions, todaySessions, allProgress] = await Promise.all([
        storage.getWorkoutSessions(userId),
        storage.getWorkoutSessionsByDate(userId, today),
        storage.getExerciseProgress(userId)
      ]);

      const completedSessions = allSessions.filter(s => s.status === 'completed');
      const totalTime = completedSessions.length * 60; // Approximate
      const totalWeight = allProgress.reduce((sum, p) => sum + (p.weight || 0) * (p.reps || 0) * (p.sets || 0), 0);
      
      // Calculate streak (simplified)
      const streak = 7; // Placeholder calculation

      const stats = {
        todayWorkouts: todaySessions.length,
        completedWorkouts: completedSessions.length,
        totalTime: `${Math.floor(totalTime / 60)} ч`,
        streak: `${streak} дней`,
        totalWeight: `${Math.floor(totalWeight / 1000)},${(totalWeight % 1000).toString().padStart(3, '0')} кг`
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Pupil routes
  app.get("/api/trainers/:trainerId/pupils", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const pupils = await storage.getPupils(trainerId);
      res.json(pupils);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pupils" });
    }
  });

  app.get("/api/pupils/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pupil = await storage.getPupil(id);
      if (!pupil) {
        return res.status(404).json({ message: "Pupil not found" });
      }
      res.json(pupil);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pupil" });
    }
  });

  app.post("/api/trainers/:trainerId/pupils", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const pupilData = insertPupilSchema.parse({
        ...req.body,
        trainerId,
        joinDate: new Date().toISOString().split('T')[0]
      });
      const pupil = await storage.createPupil(pupilData);
      res.json(pupil);
    } catch (error) {
      res.status(400).json({ message: "Failed to create pupil" });
    }
  });

  app.put("/api/pupils/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const pupil = await storage.updatePupil(id, updates);
      if (!pupil) {
        return res.status(404).json({ message: "Pupil not found" });
      }
      res.json(pupil);
    } catch (error) {
      res.status(400).json({ message: "Failed to update pupil" });
    }
  });

  app.delete("/api/pupils/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePupil(id);
      if (!success) {
        return res.status(404).json({ message: "Pupil not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete pupil" });
    }
  });

  // Pupils statistics
  app.get("/api/pupils/stats/:trainerId", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const stats = await storage.getPupilsStats(trainerId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pupils statistics" });
    }
  });

  // Pupil training plan routes
  app.get("/api/pupils/:pupilId/training-plans", async (req, res) => {
    try {
      const pupilId = parseInt(req.params.pupilId);
      const plans = await storage.getPupilTrainingPlans(pupilId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to get training plans" });
    }
  });

  app.get("/api/pupils/:pupilId/active-training-plan", async (req, res) => {
    try {
      const pupilId = parseInt(req.params.pupilId);
      const plan = await storage.getActiveTrainingPlan(pupilId);
      res.json(plan || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active training plan" });
    }
  });

  app.post("/api/pupils/:pupilId/training-plans", async (req, res) => {
    try {
      const pupilId = parseInt(req.params.pupilId);
      const planData = insertPupilTrainingPlanSchema.parse({
        ...req.body,
        pupilId
      });
      const plan = await storage.createPupilTrainingPlan(planData);
      res.json(plan);
    } catch (error) {
      res.status(400).json({ message: "Failed to create training plan" });
    }
  });

  app.put("/api/training-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const plan = await storage.updatePupilTrainingPlan(id, updates);
      if (!plan) {
        return res.status(404).json({ message: "Training plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(400).json({ message: "Failed to update training plan" });
    }
  });

  app.delete("/api/training-plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePupilTrainingPlan(id);
      if (!success) {
        return res.status(404).json({ message: "Training plan not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete training plan" });
    }
  });

  // Active workout routes
  app.get("/api/trainers/:trainerId/active-workouts", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const activeWorkouts = await storage.getActiveWorkouts(trainerId);
      res.json(activeWorkouts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active workouts" });
    }
  });

  app.get("/api/trainers/:trainerId/pupils/:pupilId/active-workout", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const pupilId = parseInt(req.params.pupilId);
      const activeWorkout = await storage.getActiveWorkout(trainerId, pupilId);
      res.json(activeWorkout || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active workout" });
    }
  });

  app.post("/api/active-workouts", async (req, res) => {
    try {
      const workoutData = insertActiveWorkoutSchema.parse(req.body);
      const activeWorkout = await storage.createActiveWorkout(workoutData);
      res.json(activeWorkout);
    } catch (error) {
      res.status(400).json({ message: "Failed to create active workout" });
    }
  });

  app.delete("/api/trainers/:trainerId/pupils/:pupilId/active-workout", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const pupilId = parseInt(req.params.pupilId);
      const success = await storage.deleteActiveWorkout(trainerId, pupilId);
      if (!success) {
        return res.status(404).json({ message: "Active workout not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete active workout" });
    }
  });

  // Trainer workout routes
  app.get("/api/trainers/:trainerId/workouts", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const workouts = await storage.getTrainerWorkouts(trainerId);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainer workouts" });
    }
  });

  app.get("/api/trainer-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workout = await storage.getTrainerWorkout(id);
      if (!workout) {
        return res.status(404).json({ message: "Trainer workout not found" });
      }
      res.json(workout);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainer workout" });
    }
  });

  app.post("/api/trainers/:trainerId/workouts", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const workoutData = { ...req.body, trainerId };
      const validatedData = insertTrainerWorkoutSchema.parse(workoutData);
      const workout = await storage.createTrainerWorkout(validatedData);
      res.status(201).json(workout);
    } catch (error) {
      res.status(400).json({ message: "Failed to create trainer workout" });
    }
  });

  app.put("/api/trainer-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTrainerWorkoutSchema.partial().parse(req.body);
      const workout = await storage.updateTrainerWorkout(id, validatedData);
      if (!workout) {
        return res.status(404).json({ message: "Trainer workout not found" });
      }
      res.json(workout);
    } catch (error) {
      res.status(400).json({ message: "Failed to update trainer workout" });
    }
  });

  app.delete("/api/trainer-workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTrainerWorkout(id);
      if (!success) {
        return res.status(404).json({ message: "Trainer workout not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete trainer workout" });
    }
  });

  app.get("/api/trainers/:trainerId/workouts/date-range", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.trainerId);
      const { startDate, endDate } = req.query as { startDate: string; endDate: string };
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }
      
      const workouts = await storage.getTrainerWorkoutsByDateRange(trainerId, startDate, endDate);
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainer workouts by date range" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
