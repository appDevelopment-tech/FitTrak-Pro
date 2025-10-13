#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Цвета для консоли
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  log('\n🔍 Проверка файла .env...', 'blue');
  
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf8');
    
    const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
    const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];
    
    if (!supabaseUrl || !supabaseKey) {
      log('❌ Файл .env не содержит необходимые переменные', 'red');
      return { success: false, url: null, key: null };
    }
    
    log('✅ Файл .env найден и содержит переменные', 'green');
    log(`   URL: ${supabaseUrl}`, 'blue');
    log(`   Key: ${supabaseKey.substring(0, 20)}...`, 'blue');
    
    return { success: true, url: supabaseUrl, key: supabaseKey };
  } catch (error) {
    log('❌ Файл .env не найден', 'red');
    log('   Создайте файл .env в корне проекта с переменными:', 'yellow');
    log('   VITE_SUPABASE_URL=https://your-project.supabase.co', 'yellow');
    log('   VITE_SUPABASE_ANON_KEY=your_anon_key', 'yellow');
    return { success: false, url: null, key: null };
  }
}

async function checkSupabaseConnection(url, key) {
  log('\n🔗 Проверка подключения к Supabase...', 'blue');
  
  try {
    const supabase = createClient(url, key);
    
    // Проверяем подключение к базе данных
    log('   Проверка базы данных...', 'blue');
    const { data: dbData, error: dbError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (dbError) {
      log(`❌ Ошибка подключения к БД: ${dbError.message}`, 'red');
      return false;
    }
    
    log('✅ Подключение к базе данных успешно', 'green');
    
    // Проверяем сервис аутентификации
    log('   Проверка аутентификации...', 'blue');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      log(`❌ Ошибка сервиса аутентификации: ${authError.message}`, 'red');
      return false;
    }
    
    log('✅ Сервис аутентификации работает', 'green');
    
    return true;
  } catch (error) {
    log(`❌ Ошибка подключения: ${error.message}`, 'red');
    return false;
  }
}

async function checkDatabaseTables(url, key) {
  log('\n📊 Проверка таблиц базы данных...', 'blue');
  
  try {
    const supabase = createClient(url, key);
    const tables = ['users', 'students', 'exercises', 'workout_programs', 'appointments'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          log(`❌ Таблица '${table}': ${error.message}`, 'red');
        } else {
          log(`✅ Таблица '${table}': OK`, 'green');
        }
      } catch (err) {
        log(`❌ Таблица '${table}': ${err.message}`, 'red');
      }
    }
  } catch (error) {
    log(`❌ Ошибка проверки таблиц: ${error.message}`, 'red');
  }
}

async function main() {
  log(`${colors.bold}🔍 Диагностика Supabase для FitTrak-Pro${colors.reset}`, 'blue');
  
  // Проверяем файл .env
  const envCheck = checkEnvFile();
  if (!envCheck.success) {
    log('\n❌ Настройка не завершена. Создайте файл .env с переменными Supabase.', 'red');
    process.exit(1);
  }
  
  // Проверяем подключение
  const connectionOk = await checkSupabaseConnection(envCheck.url, envCheck.key);
  if (!connectionOk) {
    log('\n❌ Подключение к Supabase не удалось.', 'red');
    process.exit(1);
  }
  
  // Проверяем таблицы
  await checkDatabaseTables(envCheck.url, envCheck.key);
  
  log('\n🎉 Все проверки пройдены! Supabase готов к работе.', 'green');
  log('   Теперь вы можете использовать реальную аутентификацию.', 'blue');
}

main().catch(error => {
  log(`\n💥 Критическая ошибка: ${error.message}`, 'red');
  process.exit(1);
});

