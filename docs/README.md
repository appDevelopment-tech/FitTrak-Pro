# FitTrak-Pro

A comprehensive fitness training management application for personal trainers to manage students, create workout programs, and track progress.

## Overview

FitTrak-Pro is a full-stack web application built with React, TypeScript, and Supabase that enables personal trainers to:

- Manage student profiles with detailed health and consent tracking
- Build and maintain an exercise database with muscle group categorization
- Create custom training plans for each student
- Schedule and track training sessions
- Monitor student progress over time

**Key Features:**
- Dynamic muscle groups management
- Comprehensive exercise library with technique instructions
- Student management with parental consent for minors
- Workout program builder
- Session scheduling and history tracking
- Russian language support throughout

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **State Management:** TanStack Query (React Query)
- **Routing:** Wouter
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

### Backend
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma Client
- **API:** Supabase client-side SDK
- **Authentication:** Supabase Auth (session-based)

### Development
- **Language:** TypeScript (strict mode)
- **Package Manager:** npm
- **Code Quality:** ESLint
- **Testing:** Playwright (E2E)

## Project Structure

```
FitTrak-Pro/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── exercise/    # Exercise management
│   │   │   ├── students/    # Student management
│   │   │   ├── schedule/    # Scheduling
│   │   │   └── ui/          # Shared UI components (shadcn/ui)
│   │   ├── lib/             # Utilities and helpers
│   │   │   ├── supabase.ts  # Supabase client
│   │   │   └── database.ts  # Database operations
│   │   ├── hooks/           # Custom React hooks
│   │   └── pages/           # Page components
│   └── public/              # Static assets
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Database migrations
├── docs/                     # Documentation
│   ├── API_MUSCLE_GROUPS.md              # API documentation
│   ├── COMPONENTS_EXERCISE_MANAGEMENT.md # Component documentation
│   ├── USER_GUIDE.md                     # User guide
│   └── DATABASE.md                       # Database schema docs
├── migrations/               # Database migrations
└── scripts/                  # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd FitTrak-Pro
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

Get these values from your Supabase project settings.

4. **Initialize the database:**
```bash
npm run db:migrate
npm run db:generate
```

This will create all necessary tables and seed initial data.

5. **Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run TypeScript type checking
npm run check

# Database operations
npm run db:migrate    # Run migrations
npm run db:generate   # Generate Prisma client
npm run db:studio     # Open Prisma Studio

# Run E2E tests
npm run test:e2e

# Clean up temporary files
npm run cleanup
```

## Features in Detail

### Muscle Groups Management

Create and manage muscle group categories used throughout the application.

**Features:**
- Create, edit, and delete muscle groups
- Custom ordering (display_order)
- Russian names with optional descriptions
- Used for exercise categorization

**Documentation:** See [API_MUSCLE_GROUPS.md](./docs/API_MUSCLE_GROUPS.md)

### Exercise Management

Build a comprehensive exercise database with detailed information.

**Features:**
- Create exercises with Russian names
- Assign primary and secondary muscle groups
- Set difficulty levels (начинающий, средний, продвинутый)
- Add step-by-step technique instructions
- Document common mistakes and contraindications
- Attach images and videos
- Search and filter by muscle group

**Documentation:**
- [API_MUSCLE_GROUPS.md](./docs/API_MUSCLE_GROUPS.md) - API reference
- [COMPONENTS_EXERCISE_MANAGEMENT.md](./docs/COMPONENTS_EXERCISE_MANAGEMENT.md) - Component docs
- [USER_GUIDE.md](./docs/USER_GUIDE.md#managing-exercises) - User guide

### Student Management

Maintain detailed student profiles with health tracking.

**Features:**
- Personal information and contact details
- Physical stats (height, weight)
- Goals and medical notes
- Parent/guardian information for minors
- Consent and documentation tracking
- Student status management (active/inactive)

### Training Plans

Design custom workout programs for each student.

**Features:**
- Create named training plans
- Add exercises from your database
- Set sets, reps, and weights
- Activate/deactivate plans
- Assign to specific students

### Workout Sessions

Schedule and track training sessions.

**Features:**
- Calendar-based scheduling
- Session notes and feedback
- Workout history
- Progress tracking
- Confirmation workflow

## Architecture

### Database Layer

FitTrak-Pro uses Supabase (PostgreSQL) with Prisma Client:

- **Schema Definition:** `prisma/schema.prisma`
- **Type Safety:** TypeScript types auto-generated from Prisma schema
- **Validation:** Zod schemas for runtime validation
- **Client:** Prisma Client for database operations + Supabase JavaScript client for auth

**Key Tables:**
- `users` - Trainer accounts
- `students` - Student profiles
- `muscle_groups` - Muscle group lookup
- `exercises` - Exercise database
- `pupil_training_plans` - Custom training plans
- `pupil_workout_history` - Workout history
- `appointments` - Session scheduling

See [DATABASE_SUPABASE_ONLY.md](./docs/DATABASE_SUPABASE_ONLY.md) for complete schema documentation.

### Frontend Architecture

**State Management:**
- React Query for server state
- Local React state for UI state
- Context API for shared state (e.g., active workouts)

**Data Flow:**
1. Components use React Query hooks
2. Queries fetch data from Supabase
3. Mutations update data with optimistic updates
4. Cache invalidation keeps UI in sync

**Component Organization:**
- UI primitives in `components/ui/`
- Feature components by domain
- Shared hooks in `hooks/`
- Utilities in `lib/`

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[USER_GUIDE.md](./docs/USER_GUIDE.md)** - Complete user guide with screenshots and workflows
- **[API_MUSCLE_GROUPS.md](./docs/API_MUSCLE_GROUPS.md)** - API documentation for muscle groups and exercises
- **[COMPONENTS_EXERCISE_MANAGEMENT.md](./docs/COMPONENTS_EXERCISE_MANAGEMENT.md)** - Component architecture and usage
- **[DATABASE_SUPABASE_ONLY.md](./docs/DATABASE_SUPABASE_ONLY.md)** - Database schema and migration guide (Supabase + Prisma)
- **[CLAUDE.md](./CLAUDE.md)** - Development guide for Claude Code

## Development Workflow

### Adding a New Feature

1. **Update Schema** (if needed)
   - Modify `prisma/schema.prisma`
   - Run `npm run db:migrate`

2. **Create Database Operations** (if needed)
   - Add functions to `client/src/lib/database.ts`
   - Use Prisma Client for database operations
   - Import from `@/lib/database` (Prisma client)
   - Use generated types from Prisma
   - Follow Prisma best practices for queries
   - Handle errors appropriately

3. **Build UI Components**
   - Create components in appropriate directory
   - Use shadcn/ui components for consistency
   - Implement React Query hooks

4. **Add to Navigation**
   - Update routing in `client/src/App.tsx`

5. **Test**
   - Manual testing in development
   - Write E2E tests with Playwright

6. **Document**
   - Update relevant documentation
   - Add code comments

### Code Style

- **TypeScript:** Strict mode enabled
- **Naming:** camelCase for variables, PascalCase for components
- **Components:** Functional components with hooks
- **Imports:** Use path aliases (`@/`, `@shared/`)
- **Formatting:** Consistent indentation and spacing

## Testing

### E2E Testing with Playwright

Tests are located in `.claude/agents/qa-tester/`:

```bash
# Run all tests
npm run test:e2e

# Run specific test
npx playwright test student-management.spec.ts
```

### Manual Testing

1. Start development server: `npm run dev`
2. Test all CRUD operations
3. Verify error handling
4. Check responsive design
5. Test with different data sets

## Deployment

### Production Build

```bash
# Build frontend
npm run build

# Output in client/dist/
```

### Environment Variables

Production environment requires:
```env
VITE_SUPABASE_URL=production_url
VITE_SUPABASE_ANON_KEY=production_key
DATABASE_URL=production_database_url
```

### Hosting

The application can be deployed to:
- **Vercel** (recommended for frontend)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

Supabase handles the backend infrastructure.

## Database Migrations

Migrations are managed by Prisma and documented in `docs/DATABASE_SUPABASE_ONLY.md`.

**Creating a Migration:**
1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name migration_name`
3. Test migration on development database
4. Document in `DATABASE_SUPABASE_ONLY.md`

**Applying Migrations:**
```bash
# Development
npm run db:migrate

# Production
npm run db:migrate
```

## Security

### Authentication

- Session-based authentication via Supabase Auth
- Row-level security (RLS) policies on all tables
- Trainer-specific data isolation

### Data Protection

- All passwords hashed with bcrypt
- Environment variables for sensitive keys
- HTTPS required in production

### Best Practices

- Never commit `.env` file
- Use RLS policies for data access control
- Validate all user inputs
- Sanitize data before display

## Troubleshooting

### Common Issues

**Database connection errors:**
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check `DATABASE_URL` in `.env` file
- Check Supabase project status
- Ensure database is not paused
- Run `npm run db:generate` to regenerate Prisma client

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify TypeScript compilation: `npm run check`

**Performance issues:**
- Check React Query cache configuration
- Optimize database queries
- Enable pagination for large datasets

See [USER_GUIDE.md](./docs/USER_GUIDE.md#troubleshooting) for user-facing issues.

## Contributing

*(To be defined)*

## Roadmap

### Planned Features

- [ ] Drag-and-drop muscle group reordering
- [ ] Exercise templates and import/export
- [ ] Advanced analytics and progress charts
- [ ] Mobile responsive design improvements
- [ ] Exercise video support
- [ ] Nutrition tracking integration
- [ ] Multi-language support (English)
- [ ] Mobile app (React Native)

### Recently Completed

- [x] Muscle groups management with full CRUD
- [x] Exercise management integrated with muscle groups
- [x] Dynamic muscle group selection in forms
- [x] Comprehensive documentation
- [x] User guide with workflows

## License

*(To be defined)*

## Support

For questions, issues, or feature requests:
- Check documentation in `/docs`
- Review [USER_GUIDE.md](./docs/USER_GUIDE.md)
- See troubleshooting sections
- Contact: *(to be defined)*

## Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Version:** 1.0
**Last Updated:** October 3, 2025
**Status:** Active Development
