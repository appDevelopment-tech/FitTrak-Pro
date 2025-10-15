# Database Policies & Access Control

**Last Updated:** October 14, 2025
**Status:** ✅ All operations working correctly

## Current Configuration

### Row Level Security (RLS) Status
- **Status:** Disabled on all tables
- **Reason:** Application uses Express session-based authentication, not Supabase Auth
- **Impact:** All database operations go through the backend API

### Tables Verified
All 11 tables have proper access:
- ✅ users
- ✅ students
- ✅ exercises
- ✅ muscle_groups
- ✅ workout_programs
- ✅ workout_sessions
- ✅ pupil_training_plans
- ✅ active_workouts
- ✅ pupil_workout_history
- ✅ exercise_progress
- ✅ appointments

### Access Permissions
**Postgres Role:** Full access (SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER)
- Used by Prisma Client from backend
- All authorization logic in `server/routes.ts`
- Session-based authentication in Express

## Verified Operations

✅ **INSERT** - Create new records
✅ **SELECT** - Read existing records
✅ **UPDATE** - Modify records
✅ **DELETE** - Remove records

All CRUD operations tested and working successfully.

## Architecture Decision

### Why RLS is Disabled

The current architecture is optimal for this application:

1. **Centralized Authorization**
   - All data access through Express API
   - Authorization logic in one place (`server/routes.ts`)
   - Easy to audit and maintain

2. **Session-Based Auth**
   - Express sessions stored in PostgreSQL
   - No need for Supabase Auth integration
   - Trainer/pupil roles managed in application layer

3. **Better Performance**
   - No policy evaluation overhead
   - Direct database queries through Prisma
   - Faster response times

4. **Simpler Development**
   - No policy management complexity
   - Clear separation of concerns
   - Backend fully controls data access

### When to Enable RLS

Only enable RLS if you plan to:
- Switch to Supabase Auth (from Express sessions)
- Allow direct frontend → database queries
- Implement multi-tenant isolation at database level
- Use Supabase Realtime subscriptions with auth

## Alternative Configurations

See `migrations/004_setup_rls_policies.sql` for three approaches:

1. **Current (Recommended):** RLS disabled, all ops through API
2. **Alternative:** RLS enabled with policies for Supabase client
3. **Hybrid:** RLS enabled with service_role bypass

## Security Measures

### Current Protection Layers

1. **Network Level**
   - Database accessible only via Supabase connection
   - Connection string secured in `.env`
   - No direct public access

2. **Application Level**
   - Session authentication required for all API calls
   - Authorization checks in route handlers
   - Input validation with Zod schemas

3. **Database Level**
   - PostgreSQL user permissions properly configured
   - Foreign key constraints enforce referential integrity
   - Type safety via Prisma Client

### No Anonymous Access
- No `anon` role permissions configured
- All access requires authenticated backend connection
- Frontend cannot bypass API layer

## Testing Results

```sql
-- Test performed: 2025-10-14 15:15:14
-- Result: ✅ SUCCESS

1. INSERT: Created test exercise - OK
2. SELECT: Retrieved test exercise - OK
3. UPDATE: Modified test exercise - OK
4. DELETE: Removed test exercise - OK
```

## Recommendations

### Do NOT Change If:
- ✅ Application uses Express sessions (current state)
- ✅ All data access goes through backend API
- ✅ You want simple, centralized authorization
- ✅ Performance is a priority

### Consider Enabling RLS If:
- You migrate from Express sessions to Supabase Auth
- You want direct frontend → database queries
- You need database-level multi-tenancy
- You plan to use Supabase Realtime with row-level auth

## Maintenance

### Regular Checks
```bash
# Check RLS status
psql "$DATABASE_URL" -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"

# Check permissions
psql "$DATABASE_URL" -c "SELECT grantee, table_name, privilege_type FROM information_schema.table_privileges WHERE table_schema = 'public' ORDER BY table_name, grantee;"
```

### If Issues Arise
1. Verify `DATABASE_URL` in `.env`
2. Test connection: `psql "$DATABASE_URL" -c "SELECT 1;"`
3. Check table permissions (see queries above)
4. Review `server/db.ts` for Prisma Client configuration

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Development guidelines
- [Prisma Schema](../prisma/schema.prisma) - Database models
- [API Routes](../server/routes.ts) - Authorization logic
- [Migration Files](../migrations/) - Database changes

## Contact & Support

For database policy questions or issues:
1. Check this document first
2. Review `migrations/004_setup_rls_policies.sql`
3. Test operations using the queries in this doc
4. Consult Supabase documentation for advanced RLS scenarios
