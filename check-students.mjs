import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkStudents() {
  try {
    console.log('🔍 Проверяем базу данных...\n');
    
    // Проверяем всех тренеров
    const trainers = await prisma.user.findMany({
      where: { isTrainer: true }
    });
    
    console.log('👨‍🏫 Тренеры в базе:');
    if (trainers.length === 0) {
      console.log('  ❌ Тренеров нет!');
    } else {
      trainers.forEach(trainer => {
        console.log(`  - ${trainer.firstName} ${trainer.lastName}`);
        console.log(`    ID: ${trainer.id}`);
        console.log(`    Email: ${trainer.email}\n`);
      });
    }
    
    // Проверяем всех учеников
    const students = await prisma.pupil.findMany({
      select: {
        id: true,
        trainerId: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });
    
    console.log(`\n📚 Ученики в базе (всего ${students.length}):`);
    
    if (students.length === 0) {
      console.log('  ❌ Учеников нет в базе!');
    } else {
      // Группируем по тренеру
      const byTrainer = {};
      students.forEach(student => {
        const trainerId = student.trainerId || 'БЕЗ ТРЕНЕРА';
        if (!byTrainer[trainerId]) {
          byTrainer[trainerId] = [];
        }
        byTrainer[trainerId].push(student);
      });
      
      Object.entries(byTrainer).forEach(([trainerId, pupils]) => {
        console.log(`\n  Тренер ID: ${trainerId}`);
        pupils.forEach(pupil => {
          console.log(`    - ${pupil.firstName} ${pupil.lastName} (${pupil.email})`);
        });
      });
    }
    
    // Проверяем записи на тренировки
    const appointments = await prisma.appointment.findMany({
      select: {
        id: true,
        trainerId: true,
        pupilId: true,
        date: true,
        time: true
      }
    });
    
    console.log(`\n\n📅 Записей на тренировки: ${appointments.length}`);
    
    console.log('\n\n💡 Рекомендация:');
    if (students.length > 0) {
      const mainTrainerId = Object.keys(byTrainer)[0];
      console.log(`Используйте этот UUID везде: ${mainTrainerId}`);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkStudents();


