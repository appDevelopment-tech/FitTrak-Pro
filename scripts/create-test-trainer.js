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

async function createTestTrainer() {
  log('\n🏋️ Создание тестового тренера...', 'blue');
  
  try {
    // Читаем переменные окружения
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf8');
    
    const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
    const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];
    
    if (!supabaseUrl || !supabaseKey) {
      log('❌ Переменные окружения не найдены', 'red');
      return;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Проверяем, есть ли уже тренер с ID 1
    const { data: existingTrainer, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (existingTrainer && !checkError) {
      log('✅ Тренер с ID 1 уже существует', 'green');
      log(`   Email: ${existingTrainer.email}`, 'blue');
      log(`   Имя: ${existingTrainer.first_name} ${existingTrainer.last_name}`, 'blue');
      return;
    }
    
    // Создаем тестового тренера
    const { data: trainer, error: trainerError } = await supabase
      .from('users')
      .insert({
        id: 1,
        email: 'trainer@fittrak.pro',
        password: 'hashed_password_here', // В реальном приложении пароль будет хеширован
        first_name: 'Иван',
        last_name: 'Тренеров',
        middle_name: 'Петрович',
        phone: '+7 (999) 123-45-67',
        is_trainer: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (trainerError) {
      log(`❌ Ошибка создания тренера: ${trainerError.message}`, 'red');
      return;
    }
    
    log('✅ Тестовый тренер создан успешно!', 'green');
    log(`   ID: ${trainer.id}`, 'blue');
    log(`   Email: ${trainer.email}`, 'blue');
    log(`   Имя: ${trainer.first_name} ${trainer.last_name}`, 'blue');
    
    // Создаем тестового ученика
    const { data: student, error: studentError } = await supabase
      .from('students')
      .insert({
        trainer_id: 1,
        first_name: 'Анна',
        last_name: 'Ученикова',
        middle_name: 'Сергеевна',
        phone: '+7 (999) 987-65-43',
        email: 'student@fittrak.pro',
        birth_date: '15.05.1995',
        join_date: new Date().toISOString().split('T')[0],
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (studentError) {
      log(`⚠️ Ошибка создания ученика: ${studentError.message}`, 'yellow');
    } else {
      log('✅ Тестовый ученик создан успешно!', 'green');
      log(`   ID: ${student.id}`, 'blue');
      log(`   Email: ${student.email}`, 'blue');
      log(`   Имя: ${student.first_name} ${student.last_name}`, 'blue');
    }
    
    // Создаем тестовую запись на тренировку
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        trainer_id: 1,
        pupil_id: student?.id || 1,
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (appointmentError) {
      log(`⚠️ Ошибка создания записи: ${appointmentError.message}`, 'yellow');
    } else {
      log('✅ Тестовая запись на тренировку создана!', 'green');
      log(`   Дата: ${appointment.date}`, 'blue');
      log(`   Время: ${appointment.time}`, 'blue');
    }
    
    log('\n🎉 Тестовые данные созданы успешно!', 'green');
    log('   Теперь приложение должно работать без ошибок 400.', 'blue');
    
  } catch (error) {
    log(`\n💥 Критическая ошибка: ${error.message}`, 'red');
  }
}

createTestTrainer();

