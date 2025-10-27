# Исправление ошибки "foreign key constraint"

## Проблема

Ошибка: `insert or update on table "appointments" violates foreign key constraint "appointments_trainer_id_fkey"`

Это значит, что ID тренера который используется для создания записи не существует в таблице `users`.

## Причина

В коде `booking-widget.tsx` `trainerId` определялся как:
```typescript
const trainerId = user?.id || "b55005cc-2362-4faa-80e4-406bafbbe76b";
```

Проблема:
- Для ученика `user.id` - это ID самого ученика из Supabase Auth
- Это НЕ ID тренера
- Поэтому запись создавалась с несуществующим `trainer_id`

## Решение

Теперь `trainerId` берется из профиля ученика (`userProfile.trainer_id`):

```typescript
const trainerId = useMemo(() => {
  if (userProfile?.trainer_id) {
    return userProfile.trainer_id;
  }
  // Fallback на дефолтный ID тренера
  return "48938b26-eafd-494b-98d7-1eaffe36f758";
}, [userProfile]);
```

## Как проверить

1. Обновите страницу (Ctrl+R)
2. Войдите как ученик (ivanov@fittrak.pro)
3. Откройте консоль браузера
4. Проверьте логи:
   - Должен появиться `✅ Using trainer_id from userProfile: ...`
5. Попробуйте записаться на тренировку

## Проверка ID тренера в базе

Если ошибка все еще появляется, проверьте что ID тренера существует:

1. Зайдите в Supabase Dashboard
2. Откройте Table Editor
3. Выберите таблицу `users`
4. Найдите тренера по ID: `48938b26-eafd-494b-98d7-1eaffe36f758`

Если тренера с таким ID нет, найдите правильный ID тренера в таблице `users` и замените его в коде.

## Статус: ✅ Исправлено

Теперь `trainerId` берется правильно из профиля ученика.

