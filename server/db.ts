import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from "@shared/schema";

// Create SQLite database connection
const sqlite = new Database('./dev.db');

// Create drizzle instance
export const db = drizzle(sqlite, { schema });

// Test database connection on startup
try {
  sqlite.prepare('SELECT 1 as test').get();
  console.log('✅ Database connection successful');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}