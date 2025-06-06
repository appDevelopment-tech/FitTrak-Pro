import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutProgramSchema, insertWorkoutSessionSchema, insertExerciseProgressSchema, insertExerciseSchema } from "@shared/schema";

function translateExerciseToEnglish(russianName: string): string {
  const translations: Record<string, string> = {
    // Упражнения для груди
    "Жим штанги лежа на скамье": "man bench press barbell gym workout",
    "Сведение рук в тренажере": "man chest fly machine gym exercise",
    "Жим гантелей лежа": "man dumbbell bench press workout gym",
    "Разведение гантелей лежа": "man dumbbell flyes chest exercise gym",
    "Отжимания в упоре": "man push ups exercise fitness",
    "Отжимания с колен": "woman modified push ups exercise",
    "Жим штанги на скамье под углом 30 градусов": "man incline barbell press gym workout",
    "Жим гантелей на скамье под углом 30 градусов": "man incline dumbbell press gym exercise",
    "Отжимания на брусьях для грудного отдела": "man chest dips parallel bars gym",
    "Перекрестная тяга стоя": "man cable crossover standing gym workout",
    "Перекрестная тяга лежа на скамье": "man cable crossover lying bench exercise",
    "Жим штанги на скамье головой вниз": "man decline barbell press gym workout",
    "Пуловер с гантелью": "man dumbbell pullover chest exercise gym",
    "Жим в тренажере Хаммер": "man hammer strength chest press machine gym",
    "Отжимания от пола широким хватом": "man wide grip push ups exercise",
    "Отжимания на возвышении": "man elevated push ups exercise fitness",
    
    // Упражнения для спины
    "Становая тяга": "man deadlift barbell gym workout powerlifting",
    "Подтягивания широким хватом": "man pull ups wide grip gym exercise",
    "Тяга штанги в наклоне": "man barbell bent over row gym workout",
    "Тяга гантели одной рукой": "man single arm dumbbell row gym exercise",
    "Тяга верхнего блока": "man lat pulldown machine gym workout",
    "Горизонтальная тяга": "man seated cable row gym exercise",
    "Подтягивания узким хватом": "man pull ups close grip gym workout",
    "Гиперэкстензия": "man hyperextension back exercise gym",
    "Тяга Т-грифа": "man t bar row gym workout",
    "Шраги со штангой": "man barbell shrugs gym exercise",
    "Шраги с гантелями": "man dumbbell shrugs gym workout",
    "Обратные разведения с гантелями": "man reverse fly dumbbells gym exercise",
    "Тяга штанги к подбородку": "man upright row barbell gym workout",
    "Пуловер со штангой лежа": "man barbell pullover lying gym exercise"
  };
  
  return translations[russianName] || `man gym exercise workout ${russianName}`;
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

  // Exercise image search
  app.get("/api/exercises/:id/search-image", async (req, res) => {
    try {
      const exerciseId = parseInt(req.params.id);
      const exercise = await storage.getExercise(exerciseId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }

      const accessKey = process.env.UNSPLASH_ACCESS_KEY;
      if (!accessKey) {
        return res.status(500).json({ message: "Unsplash API key not configured" });
      }

      // Create search query based on exercise name
      const searchQuery = translateExerciseToEnglish(exercise.name);
      
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&page=1&per_page=8&orientation=landscape&content_filter=high`,
        {
          headers: {
            'Authorization': `Client-ID ${accessKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unsplash API request failed');
      }

      const data = await response.json();
      const images = data.results.map((photo: any) => ({
        id: photo.id,
        url: photo.urls.regular,
        thumb: photo.urls.thumb,
        description: photo.description || photo.alt_description,
        photographer: photo.user.name,
        downloadUrl: photo.links.download_location
      }));

      res.json(images);
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



  const httpServer = createServer(app);
  return httpServer;
}
