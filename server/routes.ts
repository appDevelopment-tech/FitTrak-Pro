import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutProgramSchema, insertWorkoutSessionSchema, insertExerciseProgressSchema } from "@shared/schema";

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
