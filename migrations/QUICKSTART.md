# Migration Quick Start Guide

## Prerequisites

- PostgreSQL database (Supabase)
- `DATABASE_URL` environment variable set in `.env`
- `psql` CLI installed (for manual migrations)

## Quick Commands

### List All Migrations
```bash
bash scripts/migrate.sh list
# or
npm run db:migrate list
```

### Check Migration Status
```bash
npm run db:migrate:status
```

### Apply Migration 002 (muscle_groups)
```bash
npm run db:migrate:up 002
```

### Rollback Migration 002
```bash
npm run db:migrate:down 002
```

## Step-by-Step: First Time Setup

1. **Check environment**
   ```bash
   # Verify DATABASE_URL is set
   echo $DATABASE_URL
   ```

2. **Check migration status**
   ```bash
   npm run db:migrate:status
   ```

3. **Apply migration**
   ```bash
   npm run db:migrate:up 002
   ```

4. **Verify in database**
   ```sql
   -- Connect to your database and run:
   SELECT * FROM muscle_groups ORDER BY display_order;
   ```

Expected output:
```
 id |   name    |            description            | display_order |         created_at         |         updated_at
----+-----------+-----------------------------------+---------------+----------------------------+----------------------------
  1 | грудь     | Грудные мышцы                     |             1 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  2 | спина     | Мышцы спины                       |             2 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  3 | ноги      | Мышцы ног                         |             3 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  4 | руки      | Мышцы рук (бицепс, трицепс, ...)  |             4 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  5 | плечи     | Дельтовидные мышцы                |             5 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  6 | ягодичные | Ягодичные мышцы                   |             6 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
  7 | живот     | Мышцы брюшного пресса             |             7 | 2025-10-03 09:00:00.000000 | 2025-10-03 09:00:00.000000
```

## Troubleshooting

### "DATABASE_URL not set"
Add to your `.env` file:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### "Table already exists"
The migration is idempotent. It uses `IF NOT EXISTS` so it's safe to run even if the table exists.

### "Command not found: psql"
Install PostgreSQL client:
- **macOS**: `brew install postgresql`
- **Ubuntu**: `sudo apt-get install postgresql-client`
- **Windows**: Download from postgresql.org

### Testing Constraints

Try these queries to verify constraints work:

```sql
-- Should fail: duplicate name
INSERT INTO muscle_groups (name, display_order) VALUES ('грудь', 10);
-- Error: duplicate key value violates unique constraint "muscle_groups_name_key"

-- Should fail: duplicate display_order
INSERT INTO muscle_groups (name, display_order) VALUES ('test', 1);
-- Error: duplicate key value violates unique constraint "muscle_groups_display_order_key"

-- Should fail: negative display_order
INSERT INTO muscle_groups (name, display_order) VALUES ('test', -1);
-- Error: new row violates check constraint "check_display_order_positive"

-- Should succeed: valid data
INSERT INTO muscle_groups (name, display_order) VALUES ('икры', 8);
-- INSERT 0 1
```

## Integration with Code

After migration, use in your TypeScript code:

```typescript
import { db } from './server/db';
import { muscleGroups } from '@shared/schema';

// Get all muscle groups
const groups = await db
  .select()
  .from(muscleGroups)
  .orderBy(muscleGroups.displayOrder);

console.log(groups);
// [
//   { id: 1, name: 'грудь', description: 'Грудные мышцы', displayOrder: 1, ... },
//   { id: 2, name: 'спина', description: 'Мышцы спины', displayOrder: 2, ... },
//   ...
// ]
```

## Next Steps

1. **Add API endpoint** for muscle groups in `server/routes.ts`
2. **Create UI component** to display muscle groups
3. **Update exercise forms** to use muscle_groups dropdown
4. **Consider foreign keys** from exercises to muscle_groups

## References

- Full documentation: `/docs/DATABASE.md`
- Migration file: `/migrations/002_add_muscle_groups.sql`
- Schema definition: `/shared/schema.ts`
- Migration guide: `/migrations/README.md`
