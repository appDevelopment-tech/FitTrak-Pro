import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase env check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl,
  actualUrl: supabaseUrl,
  actualKey: supabaseAnonKey ? '***' + supabaseAnonKey.slice(-4) : 'none'
});

// Создаем клиент только если переменные окружения настроены
let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase не настроен. Используется тестовый режим.');
}

export { supabase };
