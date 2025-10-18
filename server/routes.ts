import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutProgramSchema, insertWorkoutSessionSchema, insertExerciseProgressSchema, insertExerciseSchema, insertPupilTrainingPlanSchema, insertPupilSchema, insertActiveWorkoutSchema, insertAppointmentSchema } from "@shared/schema";

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
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, emailOrPhone, password, userType } = req.body;
      
      // Поддерживаем оба варианта для совместимости
      const emailOrPhoneValue = email || emailOrPhone;
      
      if (!emailOrPhoneValue || !password) {
        return res.status(400).json({ message: "Email/phone and password are required" });
      }
      
      // Определяем тип пользователя и пытаемся авторизовать
      if (userType === 'trainer' || !userType) {
        // Сначала пробуем как тренера
        const trainer = await storage.authenticateTrainer(emailOrPhoneValue, password);
        if (trainer) {
          // Don't send password in response
          const { password: _, ...trainerWithoutPassword } = trainer;
          return res.json({ 
            user: trainerWithoutPassword, 
            userType: 'trainer' 
          });
        }
      }
      
      if (userType === 'pupil' || !userType) {
        // Затем пробуем как ученика
        const pupil = await storage.authenticatePupil(emailOrPhoneValue, password);
        if (pupil) {
          // Don't send password in response
          const { password: _, ...pupilWithoutPassword } = pupil;
          return res.json({ 
            pupil: pupilWithoutPassword, 
            userType: 'pupil' 
          });
        }
      }
      
      return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const pupilData = insertPupilSchema.parse(req.body);
      
      // Check if email already exists
      const existingPupilByEmail = await storage.getPupilByEmail(pupilData.email);
      if (existingPupilByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Check if phone already exists
      const existingPupilByPhone = await storage.getPupilByPhone(pupilData.phone);
      if (existingPupilByPhone) {
        return res.status(400).json({ message: "Phone number already registered" });
      }
      
      // Set default trainer_id if not provided
      const pupilDataWithDefaults = {
        ...pupilData,
        trainerId: pupilData.trainerId || '2e6d1673-205a-4200-bc04-249dc2af269b', // Петрусенко К.В. UUID
        joinDate: pupilData.joinDate || new Date().toISOString().split('T')[0],
        privacyPolicyAcceptedDate: pupilData.privacyPolicyAccepted ? new Date().toISOString().split('T')[0] : null,
        contractAcceptedDate: pupilData.contractAccepted ? new Date().toISOString().split('T')[0] : null,
        educationConsentAcceptedDate: pupilData.educationConsentAccepted ? new Date().toISOString().split('T')[0] : null,
      };
      
      const newPupil = await storage.registerPupil(pupilDataWithDefaults as any);
      
      // Don't send password in response
      const { password: _, ...pupilWithoutPassword } = newPupil;
      res.status(201).json({ pupil: pupilWithoutPassword });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ message: "Invalid data" });
    }
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { emailOrPhone } = req.body;
      
      if (!emailOrPhone) {
        return res.status(400).json({ message: "Email or phone is required" });
      }
      
      // Check if pupil exists
      const pupil = await storage.getPupilByEmail(emailOrPhone) || 
                    await storage.getPupilByPhone(emailOrPhone);
      
      if (!pupil) {
        // Don't reveal if email/phone exists or not for security
        return res.json({ message: "If the email/phone exists, instructions have been sent" });
      }
      
      // Here you would send password reset instructions
      // For now, just return success
      res.json({ message: "Password reset instructions sent" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
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

  // Update user route
  app.put("/api/user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
      
      const updatedUser = await storage.updateUser(userId, updates);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password
      const { password, ...userWithoutPassword } = updatedUser;
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
      const program = await storage.createWorkoutProgram(validatedData as any);
      res.status(201).json(program);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  app.put("/api/workout-programs/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const validatedData = insertWorkoutProgramSchema.partial().parse(req.body);
      const program = await storage.updateWorkoutProgram(id, validatedData);
      if (!program) {
        return res.status(404).json({ message: "Workout program not found" });
      }
      res.json(program);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  // Workout session routes
  app.get("/api/workout-sessions/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const sessions = await storage.getWorkoutSessions(userId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/workout-sessions/:userId/:date", async (req, res) => {
    try {
      const userId = req.params.userId;
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
      const session = await storage.createWorkoutSession(validatedData as any);
      res.status(201).json(session);
    } catch (error) {
      res.status(400).json({ message: "Invalid data" });
    }
  });

  app.patch("/api/workout-sessions/:id", async (req, res) => {
    try {
      const sessionId = req.params.id;
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
      const userId = req.params.userId;
      const progress = await storage.getExerciseProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/exercise-progress", async (req, res) => {
    try {
      const validatedData = insertExerciseProgressSchema.parse(req.body);
      const progress = await storage.createExerciseProgress(validatedData as any);
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
      const exerciseId = req.params.id;
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
      const exercise = await storage.createExercise(validatedData as any);
      res.status(201).json(exercise);
    } catch (error) {
      res.status(400).json({ message: "Invalid exercise data" });
    }
  });

  app.put("/api/exercises/:id", async (req, res) => {
    try {
      const exerciseId = req.params.id;
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
      const exerciseId = req.params.id;
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
      const exerciseId = req.params.id;
      const exercise = await storage.getExercise(exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      // Return empty array - user will add images manually
      res.json([]);
    } catch (error) {
      res.status(500).json({ message: "Failed to search images" });
    }
  });

  // Update exercise image
  app.patch("/api/exercises/:id/image", async (req, res) => {
    try {
      const exerciseId = req.params.id;
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
      const userId = req.params.userId;
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
      const trainerId = req.params.trainerId;
      const pupils = await storage.getPupils(trainerId);
      res.json(pupils);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pupils" });
    }
  });

  app.get("/api/pupils/:id", async (req, res) => {
    try {
      const id = req.params.id;
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
      const trainerId = req.params.trainerId;
      
      const pupilData = insertPupilSchema.parse({
        ...req.body,
        trainerId,
        joinDate: new Date().toISOString().split('T')[0]
      });

      const pupil = await storage.createPupil(pupilData as any);

      res.json(pupil);
    } catch (error) {
      res.status(400).json({ message: "Failed to create pupil" });
    }
  });

  app.put("/api/pupils/:id", async (req, res) => {
    try {
      const id = req.params.id;
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
      const id = req.params.id;
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
      const trainerId = req.params.trainerId;
      const stats = await storage.getPupilsStats(trainerId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pupils statistics" });
    }
  });

  // Pupil training plan routes
  app.get("/api/pupils/:pupilId/training-plans", async (req, res) => {
    try {
      const pupilId = req.params.pupilId;
      const plans = await storage.getPupilTrainingPlans(pupilId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to get training plans" });
    }
  });

  app.get("/api/pupils/:pupilId/active-training-plan", async (req, res) => {
    try {
      const pupilId = req.params.pupilId;
      const plan = await storage.getActiveTrainingPlan(pupilId);
      res.json(plan || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active training plan" });
    }
  });

  app.post("/api/pupils/:pupilId/training-plans", async (req, res) => {
    try {
      const pupilId = req.params.pupilId;
      
      const planData = insertPupilTrainingPlanSchema.parse({
        ...req.body,
        pupilId
      });

      const plan = await storage.createPupilTrainingPlan(planData as any);
      res.json(plan);
    } catch (error) {
      res.status(400).json({ 
        message: "Failed to create training plan", 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.put("/api/training-plans/:id", async (req, res) => {
    try {
      const id = req.params.id;
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
      const id = req.params.id;
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
      const trainerId = req.params.trainerId;
      const activeWorkouts = await storage.getActiveWorkouts(trainerId);
      res.json(activeWorkouts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active workouts" });
    }
  });

  app.get("/api/trainers/:trainerId/pupils/:pupilId/active-workout", async (req, res) => {
    try {
      const trainerId = req.params.trainerId;
      const pupilId = req.params.pupilId;
      const activeWorkout = await storage.getActiveWorkout(trainerId, pupilId);
      res.json(activeWorkout || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active workout" });
    }
  });

  app.post("/api/active-workouts", async (req, res) => {
    try {
      const workoutData = insertActiveWorkoutSchema.parse(req.body);
      const activeWorkout = await storage.createActiveWorkout(workoutData as any);
      res.json(activeWorkout);
    } catch (error) {
      res.status(400).json({ message: "Failed to create active workout" });
    }
  });

  app.delete("/api/trainers/:trainerId/pupils/:pupilId/active-workout", async (req, res) => {
    try {
      const trainerId = req.params.trainerId;
      const pupilId = req.params.pupilId;
      const success = await storage.deleteActiveWorkout(trainerId, pupilId);
      if (!success) {
        return res.status(404).json({ message: "Active workout not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete active workout" });
    }
  });

  // Appointment routes
  app.get("/api/trainers/:trainerId/appointments", async (req, res) => {
    try {
      const trainerId = req.params.trainerId;
      const appointments = await storage.getAppointments(trainerId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to get appointments" });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const appointment = await storage.getAppointment(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to get appointment" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData as any);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Failed to create appointment" });
    }
  });

  app.put("/api/appointments/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const appointment = await storage.updateAppointment(id, updates);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Failed to update appointment" });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const success = await storage.deleteAppointment(id);
      if (!success) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "Failed to delete appointment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
