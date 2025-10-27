import * as cron from 'node-cron';
import { supabase } from './supabase';
import { notifyReminder24h, notifyReminder2h } from './notifications';

// Получаем все подтвержденные записи на завтра
async function getTomorrowAppointments() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      students!inner(*)
    `)
    .eq('date', dateStr)
    .eq('status', 'confirmed');

  if (error) {
    console.error('Ошибка получения заявок на завтра:', error);
    return [];
  }

  return data || [];
}

// Получаем все подтвержденные записи через 2 часа
async function getAppointmentsIn2Hours() {
  const now = new Date();
  const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  
  const dateStr = in2Hours.toISOString().split('T')[0];
  const timeStr = `${in2Hours.getHours().toString().padStart(2, '0')}:00`;

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      students!inner(*)
    `)
    .eq('date', dateStr)
    .eq('time', timeStr)
    .eq('status', 'confirmed');

  if (error) {
    console.error('Ошибка получения заявок через 2 часа:', error);
    return [];
  }

  return data || [];
}

// Проверка и отправка напоминаний за 24 часа
async function checkAndSend24hReminders() {
  console.log('🔍 Проверка напоминаний за 24 часа...');
  
  try {
    const appointments = await getTomorrowAppointments();
    console.log(`📊 Найдено записей на завтра: ${appointments.length}`);

    for (const apt of appointments) {
      try {
        const student = apt.students;
        if (!student) continue;

        await notifyReminder24h(apt, student);
        console.log(`✅ Напоминание отправлено: ${student.firstName} ${student.lastName}`);
      } catch (error) {
        console.error(`❌ Ошибка отправки напоминания для ${apt.id}:`, error);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке 24ч напоминаний:', error);
  }
}

// Проверка и отправка напоминаний за 2 часа
async function checkAndSend2hReminders() {
  console.log('🔍 Проверка напоминаний за 2 часа...');
  
  try {
    const appointments = await getAppointmentsIn2Hours();
    console.log(`📊 Найдено записей через 2 часа: ${appointments.length}`);

    for (const apt of appointments) {
      try {
        const student = apt.students;
        if (!student) continue;

        await notifyReminder2h(apt, student);
        console.log(`✅ Напоминание отправлено: ${student.firstName} ${student.lastName}`);
      } catch (error) {
        console.error(`❌ Ошибка отправки напоминания для ${apt.id}:`, error);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке 2ч напоминаний:', error);
  }
}

// Запуск планировщика
export function startScheduledTasks() {
  console.log('⏰ Планировщик уведомлений запущен');

  // Проверка каждые 4 часа
  cron.schedule('0 */4 * * *', async () => {
    console.log('\n🕐 Запуск проверки напоминаний...');
    await checkAndSend24hReminders();
    await checkAndSend2hReminders();
  });

  console.log('✅ Планировщик настроен на проверку каждые 4 часа');
}

