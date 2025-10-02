# Migration to Supabase - Complete Documentation

## Overview
Successfully migrated FitTrak-Pro from Express.js backend + Neon PostgreSQL to Supabase serverless architecture.

**Migration Date:** October 2, 2025
**Difficulty Rating:** 6/10
**Final Rating:** 8/10 (after testing and fixes)

---

## What Changed

### Architecture
- ❌ **Removed:** Express.js backend with REST API endpoints
- ✅ **Added:** Direct Supabase client queries from frontend
- ✅ **Added:** Supabase PostgreSQL database
- ✅ **Added:** Database helper functions for type-safe queries

### Database
- **From:** Neon PostgreSQL (via Drizzle ORM)
- **To:** Supabase PostgreSQL (via Supabase client)
- **Schema:** Migrated all 9 tables successfully
- **Data:** Fresh database (previous Neon data not migrated)

### Authentication
- **Status:** Using bypass auth (`BYPASS_AUTH = true`)
- **Reason:** Real Supabase auth not configured yet
- **Current:** Any email/password combination works
- **TODO:** Set up proper Supabase Auth + RLS policies

---

## Files Modified

### Core Database Files
1. **`client/src/lib/supabase.ts`** (NEW)
   - Supabase client initialization
   - Reads from environment variables with fallback
   - Project: pszwyewebfscuosquorc.supabase.co

2. **`client/src/lib/database.ts`** (NEW)
   - Type-safe database helpers for all tables
   - Exports: `studentsDb`, `exercisesDb`, `workoutProgramsDb`, `trainingPlansDb`, `workoutHistoryDb`, `activeWorkoutsDb`
   - All CRUD operations included

3. **`client/src/lib/auth.tsx`** (NEW)
   - Authentication context provider
   - Bypass mode for testing
   - TODO: Enable real Supabase auth

### Updated Components (7 total)
All components migrated from `apiRequest()` to Supabase helpers:

1. **`client/src/components/schedule/new-schedule.tsx`**
   - Students queries → `studentsDb.getAll()`
   - Student creation → `studentsDb.create()`
   - Query keys: `['students']`

2. **`client/src/components/students/comprehensive-students-management.tsx`**
   - All student CRUD → `studentsDb.*`
   - Training plans → `trainingPlansDb.*`
   - Exercises → `exercisesDb.*`
   - Stats calculated client-side

3. **`client/src/components/exercise/exercise-management.tsx`**
   - Exercise CRUD → `exercisesDb.*`
   - Query keys: `['exercises']`

4. **`client/src/components/exercise/exercise-detail.tsx`**
   - Exercise updates → `exercisesDb.update()`

5. **`client/src/components/profile/profile-view.tsx`**
   - User profile → Mock data (no users table yet)
   - Students → `studentsDb.getAll()`
   - Exercises → `exercisesDb.*`

6. **`client/src/components/exercise/exercise-image-manager.tsx`**
   - Image URL updates → `exercisesDb.update(id, { techniqueImageUrl })`

7. **`client/src/components/trainer/trainer-cabinet.tsx`**
   - Workout programs → `workoutProgramsDb.create()`

### Configuration Files
- **`.env`**: Added Supabase credentials
  ```
  VITE_SUPABASE_URL=https://pszwyewebfscuosquorc.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJ...
  ```
- **`client/src/lib/queryClient.ts`**: Removed deprecated `apiRequest()` stub

---

## Database Schema

### Tables Created (9 total)
All tables successfully created in Supabase project `pszwyewebfscuosquorc`:

1. **users** - Trainer accounts
2. **students** - Student profiles (snake_case columns)
3. **exercises** - Exercise library (camelCase columns)
4. **workout_programs** - Workout templates
5. **workout_sessions** - Scheduled sessions
6. **exercise_progress** - Progress tracking
7. **pupil_training_plans** - Custom training plans
8. **pupil_workout_history** - Workout history
9. **active_workouts** - Currently active workouts

### Column Name Convention
- **Students table:** Uses `snake_case` (e.g., `first_name`, `trainer_id`)
- **Exercises table:** Uses `camelCase` (e.g., `primaryMuscles`, `createdAt`)
- **Supabase behavior:** Returns columns exactly as defined in SQL

---

## Testing Results

### ✅ Verified Working
1. **Supabase Connection:** Successfully connects to database
2. **Student Queries:** Can fetch all students
3. **Student Creation:** Successfully created test student (ID: 1)
4. **Exercise Queries:** Can fetch all exercises
5. **Exercise Creation:** Successfully created test exercise (ID: 1)
6. **Column Names:** Correctly handles both snake_case and camelCase
7. **No 404 Errors:** All API calls replaced successfully

### Test Data Created
- **1 Student:** Test Student (ID: 1, trainer_id: 1)
- **1 Exercise:** Жим лежа (ID: 1, bench press)

---

## Query Key Migration

### Before (API Endpoints)
```typescript
queryKey: ['/api/trainers/1/pupils']
queryKey: ['/api/exercises']
queryKey: ['/api/pupils/stats/1']
```

### After (Semantic Keys)
```typescript
queryKey: ['students']
queryKey: ['exercises']
queryKey: ['pupils-stats']
```

---

## Known Issues & TODOs

### 🔴 Critical
1. **Real Auth Not Configured**
   - Currently using bypass auth
   - Need to set up Supabase Auth
   - Need to add Row Level Security (RLS) policies

2. **No Users Table Queries**
   - User profile currently mocked
   - Need to create user management

### 🟡 Medium Priority
1. **Stats Endpoints**
   - Moved to client-side calculation
   - Could be optimized with Supabase functions

2. **Training Plans Schema**
   - Verify complex joins work correctly
   - Test with workout program assignments

### 🟢 Low Priority
1. **Error Handling**
   - Add better error messages
   - Implement retry logic

2. **Caching Strategy**
   - Review React Query cache settings
   - Consider implementing optimistic updates

---

## How to Use Database Helpers

### Querying Data
```typescript
import { studentsDb, exercisesDb } from '@/lib/database';

// Get all students
const students = await studentsDb.getAll();

// Get by trainer
const myStudents = await studentsDb.getByTrainerId(trainerId);

// Get all exercises
const exercises = await exercisesDb.getAll();
```

### Creating Data
```typescript
// Create student
const newStudent = await studentsDb.create({
  trainer_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  phone: '+7 999 123-45-67',
  email: 'john@example.com',
  birth_date: '2000-01-01',
  join_date: '2025-10-02',
  status: 'active'
});

// Create exercise
const newExercise = await exercisesDb.create({
  name: 'Приседания',
  primaryMuscles: ['ноги'],
  secondaryMuscles: ['ягодичные'],
  difficulty: 'средний',
  overview: 'Базовое упражнение для ног',
  technique: ['Поставить ноги на ширине плеч'],
  commonMistakes: ['Колени выходят за носки'],
  contraindications: ['Травмы коленей']
});
```

### Updating Data
```typescript
// Update student
await studentsDb.update(studentId, {
  weight: 75,
  height: 180
});

// Update exercise
await exercisesDb.update(exerciseId, {
  techniqueImageUrl: 'https://example.com/image.jpg'
});
```

### Deleting Data
```typescript
await studentsDb.delete(studentId);
await exercisesDb.delete(exerciseId);
```

### In React Components (with React Query)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentsDb } from '@/lib/database';

// Query
const { data: students } = useQuery({
  queryKey: ['students'],
  queryFn: () => studentsDb.getAll(),
});

// Mutation
const queryClient = useQueryClient();
const createMutation = useMutation({
  mutationFn: (data) => studentsDb.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['students'] });
  },
});
```

---

## Environment Setup

### Required Environment Variables
```bash
# .env file
VITE_SUPABASE_URL=https://pszwyewebfscuosquorc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_UNSPLASH_ACCESS_KEY=IzHTKW14WZla9YdGeTPatOQpQkNvregKh3gfs6rhaHY
```

### Supabase Project Details
- **Project ID:** pszwyewebfscuosquorc
- **Organization:** ValeriaMur's Org
- **Region:** US East
- **Plan:** Free tier

---

## Performance Considerations

### What's Faster
- ✅ Direct Supabase queries (no Express middleware)
- ✅ Connection pooling handled by Supabase
- ✅ CDN-optimized for static assets

### What's Slower
- ⚠️ Client-side stats calculation
- ⚠️ Multiple sequential queries (could batch)

### Optimization Opportunities
1. Use Supabase Edge Functions for complex operations
2. Implement proper caching strategy
3. Add database indexes for common queries
4. Use Supabase Realtime for live updates

---

## Migration Checklist

- [x] Install @supabase/supabase-js
- [x] Create Supabase client
- [x] Create database helpers
- [x] Migrate all components
- [x] Test database queries
- [x] Remove old API code
- [x] Update environment variables
- [ ] Set up Supabase Auth
- [ ] Add RLS policies
- [ ] Deploy to Netlify
- [ ] Test in production

---

## Rollback Plan

If issues arise, to rollback:
1. Restore Express backend from git
2. Point to Neon database
3. Revert component changes
4. Remove Supabase dependencies

---

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **Project Dashboard:** https://supabase.com/dashboard/project/pszwyewebfscuosquorc
- **Database Helpers:** `/client/src/lib/database.ts`
- **Auth Config:** `/client/src/lib/auth.tsx`
