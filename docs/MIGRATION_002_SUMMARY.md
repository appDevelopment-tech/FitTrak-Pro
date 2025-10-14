# Migration 002: Muscle Groups Table - Implementation Summary

## Overview
Created a proper migration infrastructure for the `muscle_groups` table that was previously created ad-hoc in Supabase. This migration includes all recommended constraints, proper documentation, and rollback capabilities.

## Files Created

### 1. Migration Files

#### `/migrations/002_add_muscle_groups.sql`
- Main migration file with UP migration
- Creates `muscle_groups` table with proper constraints
- Includes unique constraints on `name` and `display_order`
- Includes check constraint: `display_order >= 0`
- Seeds 7 default muscle groups with Russian names
- Adds PostgreSQL table and column comments
- Creates index on `display_order` for efficient queries
- Size: 2.4 KB

#### `/migrations/002_add_muscle_groups_down.sql`
- Rollback migration file
- Drops index and table with CASCADE
- Size: 556 B

#### `/migrations/README.md`
- Comprehensive migration documentation
- Migration naming conventions
- Best practices and checklist
- Troubleshooting guide
- Size: 3.1 KB

### 2. Schema Updates

#### `/shared/schema.ts`
Updated to include:
- `muscleGroups` table definition using Drizzle ORM
- `insertMuscleGroupSchema` Zod validation schema
- `MuscleGroup` and `InsertMuscleGroup` TypeScript types
- Proper field mapping (camelCase to snake_case)

**Changes:**
```typescript
// Added table definition
export const muscleGroups = pgTable("muscle_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  displayOrder: integer("display_order").notNull().default(0).unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Added insert schema
export const insertMuscleGroupSchema = createInsertSchema(muscleGroups).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Added type exports
export type MuscleGroup = typeof muscleGroups.$inferSelect;
export type InsertMuscleGroup = z.infer<typeof insertMuscleGroupSchema>;
```

### 3. Database Scripts

#### `/scripts/migrate.sh`
Migration helper script with commands:
- `npm run db:migrate:up <number>` - Apply migration
- `npm run db:migrate:down <number>` - Rollback migration
- `npm run db:migrate:status` - Check migration status
- `npm run db:migrate list` - List available migrations

**Features:**
- Color-coded output
- Environment variable validation
- Confirmation prompts for destructive operations
- Error handling
- Size: 3.5 KB

### 4. Documentation

#### `/docs/DATABASE.md`
Comprehensive database documentation including:
- All table schemas and column descriptions
- Data type reference guide
- Migration history
- Drizzle ORM usage patterns
- Best practices
- Future improvement considerations
- Troubleshooting section
- Size: 11 KB

### 5. Package.json Updates

Added new npm scripts:
```json
{
  "db:migrate": "bash scripts/migrate.sh",
  "db:migrate:up": "bash scripts/migrate.sh up",
  "db:migrate:down": "bash scripts/migrate.sh down",
  "db:migrate:status": "bash scripts/migrate.sh status"
}
```

## Table Structure

### muscle_groups

```sql
CREATE TABLE muscle_groups (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0 UNIQUE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT check_display_order_positive CHECK (display_order >= 0)
);

CREATE INDEX idx_muscle_groups_display_order ON muscle_groups(display_order);
```

### Default Data (Seeded)

| ID | Name | Description | Display Order |
|----|------|-------------|---------------|
| 1 | грудь | Грудные мышцы | 1 |
| 2 | спина | Мышцы спины | 2 |
| 3 | ноги | Мышцы ног | 3 |
| 4 | руки | Мышцы рук (бицепс, трицепс, предплечья) | 4 |
| 5 | плечи | Дельтовидные мышцы | 5 |
| 6 | ягодичные | Ягодичные мышцы | 6 |
| 7 | живот | Мышцы брюшного пресса | 7 |

## Constraints Applied

1. **UNIQUE Constraint on `name`**
   - Prevents duplicate muscle group names
   - Ensures data integrity

2. **UNIQUE Constraint on `display_order`**
   - Prevents duplicate ordering values
   - Ensures consistent UI display order

3. **CHECK Constraint on `display_order`**
   - Ensures `display_order >= 0`
   - Prevents negative ordering values

4. **NOT NULL on required fields**
   - `name`, `display_order`, `created_at`, `updated_at`

## Usage Examples

### Apply Migration
```bash
# Using npm script
npm run db:migrate:up 002

# Direct script usage
bash scripts/migrate.sh up 002
```

### Rollback Migration
```bash
# Using npm script
npm run db:migrate:down 002

# Direct script usage
bash scripts/migrate.sh down 002
```

### Check Migration Status
```bash
npm run db:migrate:status
```

### List Available Migrations
```bash
bash scripts/migrate.sh list
```

### Using in Code (Drizzle ORM)

```typescript
import { db } from './db';
import { muscleGroups, type MuscleGroup, type InsertMuscleGroup } from '@shared/schema';

// Query all muscle groups ordered by display_order
const groups = await db
  .select()
  .from(muscleGroups)
  .orderBy(muscleGroups.displayOrder);

// Insert new muscle group
const newGroup: InsertMuscleGroup = {
  name: 'core',
  description: 'Core muscles',
  displayOrder: 8
};
await db.insert(muscleGroups).values(newGroup);

// Type-safe access
const group: MuscleGroup = groups[0];
console.log(group.name, group.displayOrder);
```

## Migration Characteristics

- **Idempotent**: Can be run multiple times safely
- **Backward Compatible**: Uses `IF NOT EXISTS` and `ON CONFLICT DO NOTHING`
- **Documented**: Includes SQL comments and README
- **Reversible**: Has proper rollback migration
- **Type-Safe**: Fully integrated with Drizzle ORM TypeScript types

## Recommendations

### Immediate Actions
1. ✅ Migration file created
2. ✅ Schema updated in shared/schema.ts
3. ✅ Documentation added
4. ✅ Scripts created for easy migration management

### Future Enhancements

1. **Foreign Key Relationships**
   - Consider adding FK from `exercises.primaryMuscles` to `muscle_groups.name`
   - Would require data migration to ensure referential integrity
   - Benefits: cascade updates, referential integrity

2. **Auto-Update Timestamp Trigger**
   ```sql
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER update_muscle_groups_updated_at
     BEFORE UPDATE ON muscle_groups
     FOR EACH ROW
     EXECUTE FUNCTION update_updated_at_column();
   ```

3. **Translation Support**
   - Add `name_en` column for English translations
   - Support multi-language muscle group names

4. **Muscle Group Categories**
   - Add `category` field (e.g., 'upper_body', 'lower_body', 'core')
   - Enable filtering by body region

## Testing Checklist

- [ ] Migration applies successfully in development
- [ ] Rollback migration works correctly
- [ ] Data is seeded properly
- [ ] Constraints are enforced (try inserting duplicate name/display_order)
- [ ] Check constraint works (try negative display_order)
- [ ] Drizzle schema matches database schema
- [ ] TypeScript types are generated correctly
- [ ] Migration is idempotent (can run multiple times)

## Notes

- Migration follows project conventions from `001_initial_schema.sql`
- All constraints recommended by code review have been implemented
- Migration is fully documented in `/docs/DATABASE.md`
- Migration is tracked in `/migrations/README.md`
- Script is executable and includes proper error handling
- Uses Russian language for muscle group names (matches project requirement)

## Support

For issues or questions about this migration:
1. Check `/docs/DATABASE.md` for detailed documentation
2. Check `/migrations/README.md` for migration best practices
3. Run `npm run db:migrate:status` to check current state
4. Review migration file: `/migrations/002_add_muscle_groups.sql`

---

**Created by**: DB Agent
**Date**: 2025-10-03
**Migration Number**: 002
**Status**: Ready for review and deployment
