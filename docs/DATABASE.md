# Database Documentation

## Overview

FitTrak-Pro uses PostgreSQL (via Supabase) as its database with Drizzle ORM for type-safe database access.

## Database Configuration

- **ORM**: Drizzle ORM
- **Provider**: Supabase (PostgreSQL)
- **Schema Definition**: `/shared/schema.ts`
- **Migrations**: `/migrations/`
- **Connection**: WebSocket-based connection pooling via Neon

## Schema Tables

### Core Tables

#### users
Trainer accounts with authentication credentials.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `username` (TEXT, UNIQUE, NOT NULL)
- `password` (TEXT, NOT NULL) - bcrypt hashed
- `first_name` (TEXT, NOT NULL)
- `last_name` (TEXT, NOT NULL)
- `middle_name` (TEXT)
- `birth_date` (TEXT)
- `email` (TEXT, UNIQUE, NOT NULL)
- `phone` (TEXT)
- `is_trainer` (BOOLEAN, DEFAULT false)

#### students
Student/pupil profiles managed by trainers.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `trainer_id` (INTEGER, NOT NULL)
- `first_name` (TEXT, NOT NULL)
- `last_name` (TEXT, NOT NULL)
- `middle_name` (TEXT)
- `phone` (TEXT, NOT NULL)
- `email` (TEXT, NOT NULL)
- `birth_date` (TEXT, NOT NULL)
- `weight` (INTEGER) - in kg
- `height` (INTEGER) - in cm
- `goal` (TEXT)
- `medical_notes` (TEXT)
- `photo` (TEXT) - URL or path
- `status` (TEXT, DEFAULT 'active')
- `join_date` (TEXT, NOT NULL)

**Parent/Guardian Fields (for minors):**
- `parent_first_name` (TEXT)
- `parent_last_name` (TEXT)
- `parent_middle_name` (TEXT)
- `parent_phone` (TEXT)
- `parent_email` (TEXT)
- `parent_special_instructions` (TEXT)

**Consent Fields:**
- `application_submitted` (BOOLEAN, DEFAULT false)
- `application_date` (TEXT)
- `rules_accepted` (BOOLEAN, DEFAULT false)
- `rules_accepted_date` (TEXT)
- `parental_consent` (BOOLEAN, DEFAULT false)
- `parental_consent_date` (TEXT)

**Timestamps:**
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

**Indexes:**
- `idx_students_trainer_id` on `trainer_id`

#### exercises
Exercise database with Russian names and detailed instructions.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (TEXT, NOT NULL) - Russian exercise name
- `primaryMuscles` (TEXT[], NOT NULL) - Array of primary muscle groups
- `secondaryMuscles` (TEXT[], DEFAULT '{}') - Array of secondary muscle groups
- `difficulty` (TEXT, NOT NULL) - 'начинающий', 'средний', 'продвинутый'
- `overview` (TEXT, NOT NULL)
- `technique` (TEXT[], NOT NULL) - Step-by-step instructions
- `commonMistakes` (TEXT[], NOT NULL)
- `contraindications` (TEXT[], NOT NULL)
- `muscleImageUrl` (TEXT)
- `videoUrl` (TEXT)
- `techniqueImageUrl` (TEXT)
- `createdBy` (INTEGER)
- `createdAt` (TIMESTAMP, DEFAULT NOW())
- `updatedAt` (TIMESTAMP, DEFAULT NOW())

#### muscle_groups
**NEW TABLE** - Lookup table for muscle group classification.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (TEXT, UNIQUE, NOT NULL) - Russian muscle group name
- `description` (TEXT)
- `display_order` (INTEGER, UNIQUE, NOT NULL, DEFAULT 0)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

**Constraints:**
- UNIQUE constraint on `name`
- UNIQUE constraint on `display_order`
- CHECK constraint: `display_order >= 0`

**Indexes:**
- `idx_muscle_groups_display_order` on `display_order`

**Default Data:**
1. грудь (Грудные мышцы)
2. спина (Мышцы спины)
3. ноги (Мышцы ног)
4. руки (Мышцы рук)
5. плечи (Дельтовидные мышцы)
6. ягодичные (Ягодичные мышцы)
7. живот (Мышцы брюшного пресса)

**Purpose:**
- Standardize muscle group names across the application
- Support filtering and categorization of exercises
- Enable consistent UI display ordering
- Future foreign key relationships with exercises table

### Workout Tables

#### workout_programs
Pre-defined workout programs created by trainers.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (TEXT, NOT NULL)
- `type` (TEXT, NOT NULL) - 'strength', 'cardio', 'functional', 'stretching'
- `duration` (INTEGER, NOT NULL) - in minutes
- `level` (TEXT, NOT NULL) - 'beginner', 'intermediate', 'advanced'
- `created_by` (INTEGER, NOT NULL)
- `exercises` (JSONB, NOT NULL)

#### workout_sessions
Scheduled training sessions.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, NOT NULL)
- `program_id` (INTEGER, NOT NULL)
- `scheduled_date` (TIMESTAMP, NOT NULL)
- `start_time` (TEXT, NOT NULL)
- `end_time` (TEXT, NOT NULL)
- `status` (TEXT, DEFAULT 'scheduled') - 'scheduled', 'completed', 'missed'
- `completed_at` (TIMESTAMP)

**Indexes:**
- `idx_workout_sessions_user_id` on `user_id`

#### exercise_progress
Individual exercise progress tracking.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, NOT NULL)
- `exercise_id` (INTEGER, NOT NULL)
- `weight` (INTEGER) - in kg
- `reps` (INTEGER)
- `sets` (INTEGER)
- `date` (TIMESTAMP, NOT NULL)
- `session_id` (INTEGER)

**Indexes:**
- `idx_exercise_progress_user_id` on `user_id`

### Training Plan Tables

#### pupil_training_plans
Custom workout plans assigned to students.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `pupil_id` (INTEGER, NOT NULL)
- `trainer_id` (INTEGER, NOT NULL)
- `name` (TEXT, NOT NULL)
- `exercises` (JSONB, NOT NULL)
- `is_active` (BOOLEAN, DEFAULT true)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

**Indexes:**
- `idx_pupil_training_plans_pupil_id` on `pupil_id`

#### pupil_workout_history
Historical workout data and feedback.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `pupil_id` (INTEGER, NOT NULL)
- `trainer_id` (INTEGER, NOT NULL)
- `workout_date` (TEXT, NOT NULL)
- `workout_time` (TEXT, NOT NULL)
- `duration` (INTEGER) - in minutes
- `exercises` (JSONB, NOT NULL)
- `notes` (TEXT)
- `pupil_feedback` (TEXT)
- `status` (TEXT, DEFAULT 'completed') - 'completed', 'missed', 'cancelled'
- `confirmation_status` (TEXT, DEFAULT 'pending') - 'pending', 'confirmed', 'declined'
- `confirmed_at` (TIMESTAMP)
- `created_at` (TIMESTAMP, DEFAULT NOW())

**Indexes:**
- `idx_pupil_workout_history_pupil_id` on `pupil_id`

#### active_workouts
Currently active training sessions.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `trainer_id` (INTEGER, NOT NULL)
- `pupil_id` (INTEGER, NOT NULL)
- `workout_program_id` (INTEGER, NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT NOW())

**Indexes:**
- `idx_active_workouts_trainer_id` on `trainer_id`
- `idx_active_workouts_pupil_id` on `pupil_id`

### Scheduling Tables

#### appointments
Appointment scheduling between trainers and students.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `trainer_id` (INTEGER, NOT NULL)
- `pupil_id` (INTEGER, NOT NULL)
- `date` (TEXT, NOT NULL) - YYYY-MM-DD format
- `time` (TEXT, NOT NULL) - HH:MM format
- `status` (TEXT, DEFAULT 'pending') - 'pending', 'confirmed', 'completed', 'cancelled'
- `notes` (TEXT)
- `created_at` (TIMESTAMP, DEFAULT NOW())
- `updated_at` (TIMESTAMP, DEFAULT NOW())

## Data Types Reference

### Text Field Formats
- **Dates**: 'YYYY-MM-DD' format stored as TEXT
- **Times**: 'HH:MM' format stored as TEXT
- **Timestamps**: PostgreSQL TIMESTAMP with DEFAULT NOW()

### JSONB Structures

#### exercises (in workout_programs and pupil_training_plans)
```json
[
  {
    "id": 1,
    "name": "Отжимания",
    "sets": 3,
    "reps": 10,
    "weight": null,
    "rest": 60
  }
]
```

## Migration History

### Migration 001: Initial Schema
- Created all core tables
- Added indexes for performance
- Established base schema

### Migration 002: Add Muscle Groups
- Added `muscle_groups` lookup table
- Included Russian muscle group names
- Added unique constraints on `name` and `display_order`
- Added check constraint for positive `display_order`
- Seeded default muscle groups
- Created index on `display_order`

**File**: `/migrations/002_add_muscle_groups.sql`
**Rollback**: `/migrations/002_add_muscle_groups_down.sql`

## Drizzle ORM Usage

### Schema Location
All table definitions are in `/shared/schema.ts` using Drizzle's PostgreSQL schema builder.

### Type Exports
Each table exports:
- Table type: `typeof tableName.$inferSelect`
- Insert schema: Zod schema for validation
- Insert type: TypeScript type inferred from Zod schema

Example:
```typescript
export type MuscleGroup = typeof muscleGroups.$inferSelect;
export type InsertMuscleGroup = z.infer<typeof insertMuscleGroupSchema>;
```

### Running Migrations
```bash
# Push schema changes to database
npm run db:push

# Apply specific migration
bash scripts/migrate.sh up 002

# Rollback migration
bash scripts/migrate.sh down 002

# Check migration status
bash scripts/migrate.sh status
```

## Best Practices

1. **Always update schema.ts** when modifying database structure
2. **Create migration files** for schema changes
3. **Use JSONB** for flexible, structured data like exercise lists
4. **Index foreign keys** for query performance
5. **Use TEXT arrays** for lists of related strings (e.g., muscle groups)
6. **Timestamp all records** with created_at/updated_at
7. **Use CHECK constraints** to enforce data integrity
8. **Use UNIQUE constraints** to prevent duplicates
9. **Document migrations** in README and this file

## Future Considerations

### Potential Improvements

1. **Foreign Key Relationships**
   - Add FK from `exercises.primaryMuscles` to `muscle_groups.name`
   - Would require migration to convert TEXT[] to proper relations
   - Benefits: referential integrity, cascade updates

2. **Normalization**
   - Move exercise sets/reps from JSONB to separate tables
   - Would enable better querying and aggregation
   - Trade-off: more complex queries, more joins

3. **Triggers**
   - Auto-update `updated_at` timestamps
   - Audit logging for sensitive changes
   - Data validation triggers

4. **Partitioning**
   - Partition `pupil_workout_history` by date
   - Would improve query performance for large datasets
   - Relevant when history grows beyond 1M rows

5. **Full-Text Search**
   - Add GIN indexes for exercise search
   - Support Russian language stemming
   - Enable fuzzy search on exercise names

## Troubleshooting

### Common Issues

**Table already exists in Supabase**
- Use `IF NOT EXISTS` in migrations
- Use `ON CONFLICT DO NOTHING` for seed data
- Migrations are idempotent

**Schema drift between Drizzle and database**
1. Update `shared/schema.ts`
2. Run `npm run db:push`
3. Create migration file to document change

**Foreign key constraint violations**
- Check that referenced records exist
- Use transactions for related inserts
- Consider cascade options

## References

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
