# Database Migrations

This directory contains SQL migration files for the FitTrak-Pro database schema.

## Migration Naming Convention

Migrations follow the pattern: `XXX_description.sql`

- `XXX` - Sequential number (e.g., 001, 002, 003)
- `description` - Brief description of the migration (snake_case)
- `_down.sql` suffix for rollback migrations

## Current Migrations

### 001_initial_schema.sql
Initial database schema with all core tables:
- users
- students (pupils)
- exercises
- workout_programs
- workout_sessions
- exercise_progress
- pupil_training_plans
- pupil_workout_history
- active_workouts
- appointments

### 002_add_muscle_groups.sql
Adds muscle_groups lookup table for exercise classification:
- Creates muscle_groups table with Russian names
- Includes unique constraints on name and display_order
- Includes check constraint for positive display_order
- Seeds default muscle groups (грудь, спина, ноги, руки, плечи, ягодичные, живот)
- Adds proper indexes and table comments

**Rollback**: `002_add_muscle_groups_down.sql`

## Running Migrations

### Apply Migrations (Development)
```bash
# Using Drizzle Kit (recommended for Drizzle ORM projects)
npm run db:push

# Or manually via psql
psql $DATABASE_URL -f migrations/002_add_muscle_groups.sql
```

### Rollback Migrations
```bash
# Manual rollback
psql $DATABASE_URL -f migrations/002_add_muscle_groups_down.sql
```

## Best Practices

1. **Always create a rollback migration** - Every `XXX_name.sql` should have a corresponding `XXX_name_down.sql`
2. **Use IF NOT EXISTS** - Make migrations idempotent when possible
3. **Add comments** - Document tables and columns in SQL for clarity
4. **Test both up and down** - Verify migrations work in both directions
5. **Update schema.ts** - Keep Drizzle schema in sync with SQL migrations
6. **Sequential numbering** - Don't skip numbers, maintain order
7. **Include constraints** - Add proper constraints (UNIQUE, CHECK, FK) in migrations

## Migration Checklist

When creating a new migration:

- [ ] Create numbered migration file (`XXX_description.sql`)
- [ ] Create rollback file (`XXX_description_down.sql`)
- [ ] Update `shared/schema.ts` with Drizzle table definition
- [ ] Add insert schema and type exports to `shared/schema.ts`
- [ ] Test migration on development database
- [ ] Test rollback migration
- [ ] Document migration in this README
- [ ] Commit both migration files and schema updates together

## Troubleshooting

### Migration Already Applied
If a table already exists in Supabase but not in migrations:
1. Create a proper migration file (like 002_add_muscle_groups.sql)
2. Use `IF NOT EXISTS` clauses
3. Use `ON CONFLICT DO NOTHING` for data inserts
4. This ensures migration is idempotent

### Schema Drift
If Drizzle schema doesn't match database:
1. Update `shared/schema.ts` first
2. Run `npm run db:push` to sync
3. Create a migration file documenting the change

## Notes

- Migrations are applied manually or via Drizzle Kit's push command
- Supabase migrations should be tracked here for consistency
- Always test migrations in development before production
- Keep migrations small and focused on single changes
