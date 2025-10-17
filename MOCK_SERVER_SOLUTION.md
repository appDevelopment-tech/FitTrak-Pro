# Временное решение для тестирования регистрации

## 🔍 Проблема
Сервер не может подключиться к базе данных Supabase:
```
❌ Database connection failed: Can't reach database server at `db.pszwyewebfscuosquorc.supabase.co:5432`
```

## ✅ Решение

### Вариант 1: Исправить подключение к базе данных

1. **Проверьте интернет-соединение**
2. **Проверьте настройки Supabase проекта:**
   - Перейдите в Supabase Dashboard
   - Settings → Database
   - Убедитесь, что проект активен
   - Проверьте правильность DATABASE_URL

3. **Попробуйте обновить DATABASE_URL:**
   ```env
   DATABASE_URL=postgresql://postgres:MassUnfollow2025%21@db.pszwyewebfscuosquorc.supabase.co:5432/postgres
   ```

### Вариант 2: Временное решение без базы данных

Давайте создадим мок-сервер для тестирования регистрации:
