# Supabase Migration Guide

## ✅ Completed Steps

1. ✅ Installed `@supabase/supabase-js`
2. ✅ Created `client/src/lib/supabase.ts` - Supabase client setup
3. ✅ Created `client/src/lib/auth.tsx` - Auth context and hooks
4. ✅ Created `client/src/lib/database.ts` - Database query helpers
5. ✅ Added AuthProvider to `main.tsx`
6. ✅ RLS policies enabled on all tables

## 🚧 Remaining Work

### Step 1: Update Environment Variables

Create `.env.local` in project root:
```bash
VITE_SUPABASE_URL=https://erzywoouqjpbnmubfvli.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyenlvb291cWpwYm5tdWJmdmxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODQ5OTEsImV4cCI6MjA2ODg2MDk5MX0.-IA6cBtQkgQD0unf1NeHK62ZDOucNdiR5J1BLjoGm5I
VITE_UNSPLASH_ACCESS_KEY=IzHTKW14WZla9YdGeTPatOQpQkNvregKh3gfs6rhaHY
```

### Step 2: Update Login Page

Replace `/client/src/pages/auth-page.tsx` auth logic:

```tsx
import { useAuth } from '@/lib/auth';

// In your component:
const { signIn, signUp } = useAuth();

// Login handler:
await signIn(email, password);

// Signup handler:
await signUp(email, password, {
  first_name: firstName,
  last_name: lastName,
  // ... other user data
});
```

### Step 3: Update React Query Hooks

Find all files using `/api/*` endpoints and replace with Supabase queries.

Example - Replace this:
```tsx
const { data } = useQuery({
  queryKey: ['/api/students'],
  queryFn: () => fetch('/api/students').then(r => r.json())
});
```

With this:
```tsx
import { studentsDb } from '@/lib/database';

const { data } = useQuery({
  queryKey: ['students'],
  queryFn: () => studentsDb.getAll()
});
```

### Step 4: Update All API Calls

Search for files using `fetch('/api/` and replace with database helpers:

- `studentsDb` - for students operations
- `exercisesDb` - for exercises operations
- `workoutProgramsDb` - for workout programs
- `trainingPlansDb` - for training plans
- `workoutHistoryDb` - for workout history
- `activeWorkoutsDb` - for active workouts

### Step 5: Handle Supabase Auth vs Custom User Table

**Problem**: Supabase uses `auth.users` table, but your app uses custom `users` table.

**Solution A (Recommended)**: Create trigger to sync auth.users → users table

Run this SQL in Supabase:
```sql
-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, username, first_name, last_name, is_trainer)
  VALUES (
    NEW.id::integer,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'is_trainer')::boolean, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**Solution B**: Use only auth.users and migrate your custom fields to user_metadata

### Step 6: Update Build Scripts

Edit `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Remove `server/` from build process.

### Step 7: Remove Server Directory

Once all API calls are migrated:
```bash
rm -rf server/
```

Remove these dependencies from `package.json`:
- express
- express-session
- connect-pg-simple
- bcrypt
- passport
- passport-local
- @types/express
- @types/express-session
- @types/passport
- @types/passport-local

### Step 8: Update Netlify Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Step 9: Set Netlify Environment Variables

In Netlify dashboard → Site settings → Environment variables:
```
VITE_SUPABASE_URL=https://erzywoouqjpbnmubfvli.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_UNSPLASH_ACCESS_KEY=IzHTKW14WZla9YdGeTPatOQpQkNvregKh3gfs6rhaHY
```

### Step 10: Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to existing site (if you have one)
netlify link

# Or create new site
netlify init

# Deploy
netlify deploy --prod
```

## Files That Need Updates

### High Priority
- [ ] `client/src/pages/auth-page.tsx` - Update login/signup
- [ ] `client/src/hooks/use-user.ts` - Replace with useAuth()
- [ ] All files in `client/src/hooks/` using fetch('/api/*')
- [ ] `client/src/components/` - Update any components using API calls

### Medium Priority
- [ ] `package.json` - Remove server dependencies
- [ ] `vite.config.ts` - Remove server proxy config if exists
- [ ] Update all React Query mutations

### Low Priority
- [ ] Clean up unused imports
- [ ] Remove server types from shared/
- [ ] Update README.md

## Testing Checklist

After migration:
- [ ] User can sign up
- [ ] User can log in
- [ ] User can log out
- [ ] Students CRUD works
- [ ] Exercises CRUD works
- [ ] Workout programs CRUD works
- [ ] Training plans work
- [ ] Workout history works
- [ ] Active workouts work
- [ ] RLS policies prevent unauthorized access

## Rollback Plan

If migration fails, revert to Express:
```bash
git checkout main
npm install
npm run dev
```

Your Supabase database will still work with the old backend.
