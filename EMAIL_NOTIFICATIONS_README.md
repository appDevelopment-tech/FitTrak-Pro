# 📧 Система Email уведомлений

## ✅ Что работает

1. **Тестовая отправка** - работает! ✅
   - Запустите: `node test-email.js`
   - Проверьте почту `petrusenkokv@yandex.ru`

2. **API для уведомлений** - создан endpoint:
   - POST `/api/notifications/send`
   - Принимает: `{ type, appointment, student, trainerEmail }`

## 🔧 Что нужно сделать для автоматических уведомлений

### Вариант 1: Добавить вызовы API на клиенте (рекомендуется)

В `client/src/components/schedule/booking-widget.tsx` после создания записи:

```typescript
// После успешного создания заявки
if (createAppointmentMutation.isSuccess) {
  // Получите данные ученика
  const student = { firstName, lastName, email, phone };
  
  // Отправьте уведомление тренеру
  await fetch('http://localhost:8080/api/notifications/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'new-booking',
      appointment: newAppointment,
      student: student,
      trainerEmail: 'petrusenkokv@yandex.ru'
    })
  });
}
```

### Вариант 2: Использовать Supabase Edge Functions

Создайте функцию в Supabase, которая будет отправлять email при изменениях в таблице.

## 📧 Функции уведомлений (уже готовы)

1. **notifyTrainerNewBooking** - новая заявка для тренера
2. **notifyStudentBookingConfirmed** - подтверждение для ученика
3. **notifyReminder24h** - напоминание за 24ч
4. **notifyReminder2h** - напоминание за 2ч
5. **notifyCancellation** - отмена тренировки

## ✅ Проверка работы

### Тест 1: Отправка тестового email
```bash
node test-email.js
```

Должно показать:
```
✅ Email отправлен успешно!
Message ID: <...>
Проверьте почту: petrusenkokv@yandex.ru
```

### Тест 2: Проверка папки СПАМ
- Откройте Яндекс Почту
- Проверьте папку "Спам"
- Первые письма могут попасть туда

## 🔍 Логирование

Все уведомления логируются в консоль backend сервера:
```
📧 Sending notification: { type: 'new-booking', ... }
✅ Email отправлен: petrusenkokv@yandex.ru - Новая заявка на тренировку
```

## 📝 Текущий статус

- ✅ SMTP настроен (Yandex)
- ✅ Почта работает (тест прошел)
- ✅ API endpoint создан
- ⏳ Осталось: добавить вызовы на клиенте

## 🎯 Что делает система сейчас

1. **Автоматические напоминания** - работают!
   - Каждые 4 часа проверяет записи
   - Отправляет напоминания за 24ч и 2ч

2. **Ручная отправка** - работает!
   - Можно отправить через POST `/api/notifications/send`

3. **Автоматическая отправка при создании/подтверждении** - ТРЕБУЕТ ИНТЕГРАЦИИ

## ⚠️ Важно

Для автоматической отправки уведомлений при создании заявок нужно добавить вызовы API на клиенте или использовать Supabase Edge Functions/Webhooks.

