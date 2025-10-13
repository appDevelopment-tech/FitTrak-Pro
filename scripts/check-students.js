import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkStudents() {
  console.log('🔍 Проверка таблицы students...');
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) {
    console.error('❌ Ошибка:', error);
    return;
  }
  
  console.log('📊 Найдено записей:', data.length);
  data.forEach((student, index) => {
    console.log(`${index + 1}. ${student.first_name} ${student.last_name} (${student.email}) - ${student.status}`);
  });
  
  // Проверим также таблицу auth.users
  console.log('\n🔍 Проверка таблицы auth.users...');
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError) {
    console.error('❌ Ошибка auth:', authError);
    return;
  }
  
  console.log('📊 Найдено пользователей в auth:', authUsers.users.length);
  authUsers.users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.email} - ${user.created_at}`);
  });
}

checkStudents();
