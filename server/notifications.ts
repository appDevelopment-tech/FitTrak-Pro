import nodemailer from 'nodemailer';
import 'dotenv/config';
import type { Appointment, Pupil } from '@shared/schema';

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: parseInt(process.env.SMTP_PORT || '587') === 465, // true для Yandex (465), false для Gmail (587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Проверяем, настроен ли email
export const isEmailConfigured = () => {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
};

// Универсальная функция отправки email
export const sendEmail = async (to: string, subject: string, html: string) => {
  console.log('📧 ===== sendEmail ВЫЗВАН =====');
  console.log('📧 To:', to);
  console.log('📧 Subject:', subject);
  console.log('📧 Email настроен?:', isEmailConfigured());
  
  if (!isEmailConfigured()) {
    console.log('⚠️ Email не настроен. Пропускаем отправку:', { to, subject });
    return;
  }

  console.log('📧 Используем SMTP настройки:');
  console.log('📧 - Host:', process.env.SMTP_HOST);
  console.log('📧 - Port:', process.env.SMTP_PORT);
  console.log('📧 - User:', process.env.SMTP_USER);
  console.log('📧 - From:', process.env.SMTP_FROM);

  try {
    console.log('📧 Отправляем email через transporter...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `FitTrak Pro <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email отправлен успешно!`);
    console.log(`✅ Message ID: ${info.messageId}`);
    console.log(`✅ To: ${to}`);
    console.log(`✅ Subject: ${subject}`);
    console.log('📧 ===== sendEmail ЗАВЕРШЕН УСПЕШНО =====');
  } catch (error) {
    console.error('❌ ===== ОШИБКА sendEmail =====');
    console.error('❌ Error:', error);
    console.error('❌ Error message:', (error as Error).message);
    console.error('❌ Error stack:', (error as Error).stack);
    throw error;
  }
};

// Email ученику при подтверждении заявки
export const notifyStudentBookingConfirmed = async (
  appointment: Appointment,
  student: Pupil
) => {
  console.log('📧 notifyStudentBookingConfirmed вызван');
  console.log('📧 Student email:', student.email);
  console.log('📧 Appointment:', appointment);
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">🎉 Ваша заявка подтверждена!</h2>
      <p>Здравствуйте, ${student.firstName || student.first_name || 'Ученик'} ${student.lastName || student.last_name || ''}!</p>
      <p>Ваша заявка на тренировку подтверждена тренером.</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>📅 Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
        <p><strong>⏰ Время:</strong> ${appointment.time}</p>
        <p><strong>✅ Статус:</strong> Подтверждено</p>
      </div>
      <p>Мы ждем вас на тренировке!</p>
      <p style="color: #6b7280; font-size: 14px;">С уважением,<br>Команда FitTrak Pro</p>
    </div>
  `;

  await sendEmail(student.email, 'Ваша заявка подтверждена', html);
};

// Email тренеру о новой заявке
export const notifyTrainerNewBooking = async (
  appointment: Appointment,
  student: Pupil,
  trainerEmail: string
) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">🔔 Новая заявка на тренировку</h2>
      <p>Поступила новая заявка от ученика.</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>👤 Ученик:</strong> ${student.firstName} ${student.lastName}</p>
        <p><strong>📧 Email:</strong> ${student.email}</p>
        <p><strong>📞 Телефон:</strong> ${student.phone || 'Не указан'}</p>
        <p><strong>📅 Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
        <p><strong>⏰ Время:</strong> ${appointment.time}</p>
      </div>
      <p style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
        ⚠️ Заявка ожидает вашего подтверждения.
      </p>
    </div>
  `;

  await sendEmail(trainerEmail, 'Новая заявка на тренировку', html);
};

// Напоминание за 24 часа
export const notifyReminder24h = async (appointment: Appointment, student: Pupil) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">📅 Напоминание о тренировке</h2>
      <p>Здравствуйте, ${student.firstName}!</p>
      <p>Напоминаем, что у вас запланирована тренировка <strong>завтра</strong>.</p>
      <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <p><strong>📅 Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
        <p><strong>⏰ Время:</strong> ${appointment.time}</p>
      </div>
      <p>Ждем вас на тренировке!</p>
      <p style="color: #6b7280; font-size: 14px;">С уважением,<br>Команда FitTrak Pro</p>
    </div>
  `;

  await sendEmail(student.email, 'Напоминание: тренировка завтра', html);
};

// Напоминание за 2 часа
export const notifyReminder2h = async (appointment: Appointment, student: Pupil) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">⏰ Тренировка через 2 часа</h2>
      <p>Здравствуйте, ${student.firstName}!</p>
      <p>Напоминаем: у вас тренировка <strong>через 2 часа</strong>.</p>
      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
        <p><strong>📅 Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
        <p><strong>⏰ Время:</strong> ${appointment.time}</p>
      </div>
      <p>Не забудьте собраться и подготовиться к тренировке!</p>
      <p style="color: #6b7280; font-size: 14px;">С уважением,<br>Команда FitTrak Pro</p>
    </div>
  `;

  await sendEmail(student.email, 'Тренировка через 2 часа', html);
};

// Email при отмене записи
export const notifyCancellation = async (appointment: Appointment, student: Pupil, cancelledBy: 'trainer' | 'student') => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ef4444;">⚠️ Тренировка отменена</h2>
      <p>Здравствуйте, ${student.firstName} ${student.lastName}!</p>
      <p>Ваша тренировка была отменена.</p>
      <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
        <p><strong>📅 Дата:</strong> ${new Date(appointment.date).toLocaleDateString('ru-RU')}</p>
        <p><strong>⏰ Время:</strong> ${appointment.time}</p>
      </div>
      <p style="color: #6b7280; font-size: 14px;">С уважением,<br>Команда FitTrak Pro</p>
    </div>
  `;

  await sendEmail(student.email, 'Тренировка отменена', html);
};

