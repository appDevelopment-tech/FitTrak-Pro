import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutProgramSchema, insertWorkoutSessionSchema, insertExerciseProgressSchema, insertExerciseSchema } from "@shared/schema";

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

  // Exercise image library - curated fitness images
  app.get("/api/exercises/:id/search-image", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      // Specific exercise demonstration images from verified fitness sources
      const exerciseImageLibrary: Record<string, string[]> = {
        "Жим штанги лежа на скамье": [
          "https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press.jpg",
          "https://www.bodybuilding.com/images/2016/june/barbell-bench-press-exercise-guide-1.jpg",
          "https://fitnessvolt.com/wp-content/uploads/2021/03/Barbell-Bench-Press.jpg",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
        ],
        "Жим гантелей лежа": [
          "https://cdn.muscleandstrength.com/sites/default/files/dumbbell-bench-press.jpg",
          "https://www.bodybuilding.com/images/2016/june/dumbbell-bench-press-exercise-guide.jpg",
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
        ],
        "Становая тяга": [
          "https://cdn.muscleandstrength.com/sites/default/files/conventional-deadlift.jpg",
          "https://www.bodybuilding.com/images/2016/june/deadlift-exercise-guide.jpg",
          "https://fitnessvolt.com/wp-content/uploads/2021/03/Conventional-Deadlift.jpg",
          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
        ],
        "Отжимания в упоре": [
          "https://cdn.muscleandstrength.com/sites/default/files/push-up.jpg",
          "https://www.bodybuilding.com/images/2016/june/push-up-exercise-guide.jpg",
          "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
        ],
        "Подтягивания широким хватом": [
          "https://cdn.muscleandstrength.com/sites/default/files/wide-grip-pull-up.jpg",
          "https://www.bodybuilding.com/images/2016/june/pull-up-exercise-guide.jpg",
          "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1517963628607-235ccdd5476c?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
        ]
      };
      
      const defaultFitnessImages = [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
      ];
      
      const exerciseImages = exerciseImageLibrary[exercise.name] || defaultFitnessImages;

      // Format images for the frontend
      const images = exerciseImages.map((url: string, index: number) => ({
        id: `${exercise.id}-${index}`,
        url: url,
        thumb: url.replace('w=500&h=300', 'w=200&h=120'),
        description: `${exercise.name} - фитнес упражнение`,
        photographer: "Fitness Stock Photos",
        downloadUrl: url
      }));

      res.json(images);
    } catch (error) {
      console.error('Image library error:', error);
      
      // Fallback to default fitness images
      const defaultImages = [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1583500178690-f7c1730b3313?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&w=500&h=300&fit=crop&crop=center"
      ];
      
      const images = defaultImages.map((url, index) => ({
        id: `default-${index}`,
        url: url,
        thumb: url.replace('w=500&h=300', 'w=200&h=120'),
        description: "Фитнес упражнение",
        photographer: "Fitness Stock Photos",
        downloadUrl: url
      }));

      res.json(images);
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



  const httpServer = createServer(app);
  return httpServer;
}
