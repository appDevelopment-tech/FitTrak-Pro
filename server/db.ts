import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create postgres connection
const queryClient = postgres(process.env.DATABASE_URL);

// Create drizzle instance
export const db = drizzle(queryClient, { schema });

// Test database connection on startup
queryClient`SELECT 1 as test`.then(() => {
  console.log('✅ Database connection successful');
}).catch((error) => {
  console.error('❌ Database connection failed:', error);
});