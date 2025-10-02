import { createClient } from '@supabase/supabase-js';

// Temporarily hardcoded for testing - move to env vars in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pszwyewebfscuosquorc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzend5ZXdlYmZzY3Vvc3F1b3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMzc3NDgsImV4cCI6MjA3NDkxMzc0OH0.yFqbFPm8Ujiq6tcsXJy3-CphRnyzJJRVL4BnDwspsD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
