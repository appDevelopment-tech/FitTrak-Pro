import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Мок-данные для тестирования
let mockUsers = [
  {
    id: '1',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivanov@fittrak.pro',
    phone: '+7 (999) 123-45-67',
    birthDate: '15.05.1990',
    status: 'active'
  }
];

// API для регистрации
app.post('/api/auth/register', (req, res) => {
  try {
    const userData = req.body;
    
    // Проверяем, существует ли пользователь
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Создаем нового пользователя
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      birthDate: userData.birthDate,
      status: 'pending',
      ...userData
    };
    
    mockUsers.push(newUser);
    
    console.log('✅ Новый пользователь зарегистрирован:', newUser);
    
    res.status(201).json({ 
      pupil: newUser,
      message: 'Регистрация успешна!' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для входа
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }
    
    console.log('✅ Пользователь вошел в систему:', user);
    
    res.json({ 
      pupil: user,
      message: 'Вход успешен!' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка входа:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// API для получения списка пользователей (для отладки)
app.get('/api/users', (req, res) => {
  res.json({ users: mockUsers });
});

app.listen(port, () => {
  console.log(`🚀 Мок-сервер запущен на порту ${port}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/auth/register - Регистрация`);
  console.log(`   POST /api/auth/login - Вход`);
  console.log(`   GET  /api/users - Список пользователей`);
});
