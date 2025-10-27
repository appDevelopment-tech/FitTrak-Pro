# Исправление кнопок подтверждения и удаления

## Проблема

1. Тренер не может подтвердить заявку - кнопка "Подтвердить" не работала
2. Тренер не может отклонить заявку - кнопка "Отклонить" не работала
3. Ученик не может удалить свою запись

## Решение

### 1. Для тренера - кнопки в блоке "Заявки на подтверждение"

**Файл:** `client/src/components/schedule/trainer-schedule.tsx`

Добавлено:
- Логирование действий
- Обработка ошибок для кнопки "Отклонить"
- Инвалидация кэша после отклонения
- Уведомления об успехе/ошибке

```typescript
// Кнопка "Подтвердить"
onClick={() => {
  console.log("✅ Подтверждаем заявку:", apt.id);
  updateAppointmentMutation.mutate({ id: apt.id, status: 'confirmed' });
}}
disabled={updateAppointmentMutation.isPending}

// Кнопка "Отклонить"
onClick={async () => {
  console.log("❌ Отклоняем заявку:", apt.id);
  try {
    await appointmentsDb.delete(apt.id);
    queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
    toast({ title: "Заявка отклонена", variant: "default" });
  } catch (error: any) {
    console.error("Ошибка при отклонении:", error);
    toast({ title: "Ошибка", description: error.message || "Не удалось отклонить заявку", variant: "destructive" });
  }
}}
```

### 2. Для ученика - возможность удалить свою запись

**Файл:** `client/src/components/schedule/schedule-slot.tsx`

Изменения:
- Добавлена функция `handleCancelBooking()`
- Разблокирована кнопка "Отменить" для пользователей с записью
- Добавлено логирование и обработка ошибок

```typescript
// Разблокируем кнопку для удаления собственной записи
const isDisabled = slotInfo.status === 'full' && !slotInfo.userAppointment;

// Новая функция для отмены записи
const handleCancelBooking = () => {
  if (slotInfo.userAppointment) {
    console.log("🗑️ Отменяем запись:", slotInfo.userAppointment.id);
    deleteAppointmentMutation.mutate(slotInfo.userAppointment.id);
  }
};

// Обновленная кнопка для ученика
<Button
  onClick={(e) => {
    e.stopPropagation();
    if (slotInfo.status === 'user-booked') {
      handleCancelBooking();
    } else {
      handleSlotClick();
    }
  }}
>
  {getButtonText()}
</Button>
```

### 3. Использование правильного API

**Изменения:**
- Заменено `api.appointments.delete()` на `appointmentsDb.delete()`
- Заменено `api.appointments.create()` на `appointmentsDb.create()`
- Добавлена инвалидация кэша для всех ключей запросов

## Как проверить

### Для тренера:

1. Войдите как тренер
2. Перейдите в "Расписание"
3. Найдите блок "Заявки на подтверждение"
4. Нажмите "Подтвердить" - должна измениться статистика
5. Создайте еще одну заявку и нажмите "Отклонить" - запись исчезнет

### Для ученика:

1. Войдите как ученик
2. Запишитесь на любой свободный слот
3. Нажмите "Отменить" на своей записи
4. Запись должна исчезнуть
5. Появится уведомление "Запись отменена"

## Логирование

Добавлено логирование для отладки:
- `✅ Подтверждаем заявку:` - когда тренер подтверждает
- `❌ Отклоняем заявку:` - когда тренер отклоняет
- `🗑️ Отменяем запись:` - когда ученик отменяет
- `📝 Создаем запись` - при создании новой записи
- `❌ Ошибка при удалении записи:` - при ошибках

## Статусы записей

- `pending` - ожидает подтверждения (желтая точка)
- `confirmed` - подтверждена (зеленая точка)

## Инвалидация кэша

После каждого действия:
- `queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] })`
- `queryClient.invalidateQueries({ queryKey: ['appointments'] })`

Это гарантирует обновление UI сразу после действия.

