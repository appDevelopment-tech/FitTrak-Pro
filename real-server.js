import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Устанавливаем правильную кодировку UTF-8
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Инициализация Prisma
const prisma = new PrismaClient();

// API для регистрации с реальной SQLite базой данных
app.post('/api/auth/register', async (req, res) => {
  try {
    const userData = req.body;
    
    console.log('📝 Получены данные регистрации:', userData);
    
    // Проверяем, существует ли пользователь
    const existingUser = await prisma.pupil.findUnique({
      where: { email: userData.email }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Создаем нового пользователя в SQLite базе данных
    const newUser = await prisma.pupil.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName || '',
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        birthDate: userData.birthDate,
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        
        // Поля для родителей
        parentFirstName: userData.parentFirstName || '',
        parentLastName: userData.parentLastName || '',
        parentMiddleName: userData.parentMiddleName || '',
        parentPhone: userData.parentPhone || '',
        parentEmail: userData.parentEmail || '',
        isParentRepresentative: userData.isParentRepresentative || false,
        
        // Согласия
        privacyPolicyAccepted: userData.privacyPolicyAccepted,
        privacyPolicyAcceptedDate: userData.privacyPolicyAccepted ? new Date().toISOString().split('T')[0] : null,
        contractAccepted: userData.contractAccepted,
        contractAcceptedDate: userData.contractAccepted ? new Date().toISOString().split('T')[0] : null,
        educationConsentAccepted: userData.educationConsentAccepted,
        educationConsentAcceptedDate: userData.educationConsentAccepted ? new Date().toISOString().split('T')[0] : null,
      }
    });
    
    console.log('✅ Пользователь зарегистрирован в SQLite БД:', newUser);
    
    // Не возвращаем пароль в ответе
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({ 
      pupil: userWithoutPassword,
      message: 'Регистрация успешна! Данные сохранены в базе данных.' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера: ' + error.message });
  }
});

// API для входа в систему
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Попытка входа:', { email });
    
    // Ищем пользователя по email
    const user = await prisma.pupil.findUnique({
      where: { email: email }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }
    
    // Проверяем пароль (простая проверка, в реальном приложении нужно хеширование)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }
    
    console.log('✅ Успешный вход:', user.firstName, user.lastName);
    
    // Не возвращаем пароль в ответе
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      pupil: userWithoutPassword,
      message: 'Вход выполнен успешно'
    });
    
  } catch (error) {
    console.error('❌ Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для получения всех пользователей (для проверки)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.pupil.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true
      }
    });
    
    res.json({ users });
  } catch (error) {
    console.error('❌ Ошибка получения пользователей:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для получения учеников по trainerId (для интерфейса тренера)
app.get('/api/trainers/:trainerId/pupils', async (req, res) => {
  try {
    const { trainerId } = req.params;
    
    console.log(`📋 Запрос учеников для тренера: ${trainerId}`);
    
    // Получаем всех учеников (пока без привязки к тренеру)
    // TODO: В будущем добавить поле trainerId в таблицу Pupil
    const pupils = await prisma.pupil.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        email: true,
        phone: true,
        birthDate: true,
        status: true,
        joinDate: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`✅ Найдено учеников: ${pupils.length}`);
    
    res.json(pupils);
  } catch (error) {
    console.error('❌ Ошибка получения учеников:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для добавления тестовых учеников
app.post('/api/test-students', async (req, res) => {
  try {
    const testStudents = [
      {
        firstName: 'Иван',
        lastName: 'Иванов',
        middleName: 'Иванович',
        email: 'ivanov@mail.ru',
        phone: '+7 (999) 111-11-11',
        birthDate: '15.03.1995',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        privacyPolicyAccepted: true,
        privacyPolicyAcceptedDate: new Date().toISOString().split('T')[0],
        contractAccepted: true,
        contractAcceptedDate: new Date().toISOString().split('T')[0],
        educationConsentAccepted: true,
        educationConsentAcceptedDate: new Date().toISOString().split('T')[0],
      },
      {
        firstName: 'Студент',
        lastName: 'Студентович',
        middleName: '1',
        email: 'student1@mail.ru',
        phone: '+7 (999) 222-22-22',
        birthDate: '20.05.1998',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        privacyPolicyAccepted: true,
        privacyPolicyAcceptedDate: new Date().toISOString().split('T')[0],
        contractAccepted: true,
        contractAcceptedDate: new Date().toISOString().split('T')[0],
        educationConsentAccepted: true,
        educationConsentAcceptedDate: new Date().toISOString().split('T')[0],
      },
      {
        firstName: 'Студент',
        lastName: 'Студентович',
        middleName: '2',
        email: 'student2@mail.ru',
        phone: '+7 (999) 333-33-33',
        birthDate: '10.08.2000',
        status: 'pending',
        joinDate: new Date().toISOString().split('T')[0],
        privacyPolicyAccepted: true,
        privacyPolicyAcceptedDate: new Date().toISOString().split('T')[0],
        contractAccepted: true,
        contractAcceptedDate: new Date().toISOString().split('T')[0],
        educationConsentAccepted: true,
        educationConsentAcceptedDate: new Date().toISOString().split('T')[0],
      }
    ];

    const createdStudents = [];
    
    for (const studentData of testStudents) {
      // Проверяем, существует ли уже такой email
      const existingStudent = await prisma.pupil.findUnique({
        where: { email: studentData.email }
      });
      
      if (!existingStudent) {
        const newStudent = await prisma.pupil.create({
          data: studentData
        });
        createdStudents.push(newStudent);
        console.log(`✅ Создан тестовый ученик: ${studentData.firstName} ${studentData.lastName}`);
      } else {
        console.log(`⚠️ Ученик с email ${studentData.email} уже существует`);
      }
    }
    
    res.json({ 
      message: `Создано ${createdStudents.length} тестовых учеников`,
      students: createdStudents
    });
    
  } catch (error) {
    console.error('❌ Ошибка создания тестовых учеников:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для удаления ученика
app.delete('/api/pupils/:pupilId', async (req, res) => {
  try {
    const { pupilId } = req.params;
    
    console.log(`🗑️ Запрос на удаление ученика: ${pupilId}`);
    
    // Проверяем, существует ли ученик
    const existingPupil = await prisma.pupil.findUnique({
      where: { id: pupilId }
    });
    
    if (!existingPupil) {
      return res.status(404).json({ message: 'Ученик не найден' });
    }
    
    // Удаляем ученика
    await prisma.pupil.delete({
      where: { id: pupilId }
    });
    
    console.log(`✅ Ученик удален: ${existingPupil.firstName} ${existingPupil.lastName}`);
    
    res.json({ 
      message: 'Ученик успешно удален',
      deletedPupil: {
        id: existingPupil.id,
        name: `${existingPupil.lastName} ${existingPupil.firstName} ${existingPupil.middleName || ''}`.trim()
      }
    });
    
  } catch (error) {
    console.error('❌ Ошибка удаления ученика:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Сервер работает с SQLite базой данных',
    database: 'SQLite (dev.db)',
    port: port
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔄 Закрытие соединения с базой данных...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на порту ${port}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/auth/register - Регистрация`);
  console.log(`   POST /api/auth/login - Вход в систему`);
  console.log(`   GET  /api/users - Список пользователей`);
  console.log(`   GET  /api/trainers/:trainerId/pupils - Ученики тренера`);
  console.log(`   POST /api/test-students - Добавить тестовых учеников`);
  console.log(`   DELETE /api/pupils/:pupilId - Удалить ученика`);
  console.log(`   GET  /api/health - Проверка работы`);
  console.log(`✅ База данных: SQLite (dev.db)`);
  console.log(`🌐 URL: http://localhost:${port}`);
});
