# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Vite frontend and Express backend
- `npm run build` - Build both frontend (Vite) and backend (esbuild) for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes using Drizzle Kit

### Database Management
- Database migrations are handled via Drizzle Kit
- Schema is defined in `shared/schema.ts`
- Database connection configured in `server/db.ts` using Neon serverless PostgreSQL
- Storage layer interface defined in `server/storage.ts` with all CRUD operations

## Architecture Overview

This is a full-stack fitness training management application with the following structure:

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript, built with Vite
- **UI**: Tailwind CSS + shadcn/ui components (Radix UI primitives)
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Backend (`server/`)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL via Neon serverless with Drizzle ORM
- **Sessions**: Express sessions stored in PostgreSQL
- **Entry Point**: `server/index.ts` - sets up Express app, middleware, and routes
- **Routes**: `server/routes.ts` - all API endpoints (RESTful design)
- **Storage**: `server/storage.ts` - database operations layer with interface pattern
- **Database**: `server/db.ts` - Drizzle connection setup with WebSocket support
- **Vite Integration**: `server/vite.ts` - development server setup

### Shared (`shared/`)
- **Schema**: `shared/schema.ts` - Drizzle schema definitions and Zod validation schemas
- Contains all database table definitions and TypeScript types

## Key Architectural Patterns

### Database Layer
- Uses Drizzle ORM with PostgreSQL schema defined in `shared/schema.ts`
- All database operations go through `storage.ts` layer with IStorage interface
- Zod schemas auto-generated from Drizzle tables for validation
- Connection pooling via Neon serverless with WebSocket constructor (ws package)

### API Design
- RESTful API endpoints in `server/routes.ts` with HTTP server creation
- All requests validated using Zod schemas from shared schema
- Error handling with consistent JSON responses and status codes
- Express middleware for request logging, JSON parsing, and URL encoding
- Request/response logging middleware with truncation for readability

### Frontend Data Flow
- React Query handles all API calls and caching with optimistic updates
- Forms use React Hook Form with Zod validation from shared schemas
- UI components from shadcn/ui with Tailwind styling and Radix UI primitives
- Path aliases: `@/` for `client/src/`, `@shared/` for `shared/`, `@assets/` for `attached_assets/`
- Context providers for shared state (ActiveWorkoutContext)

## Core Domain Models

### Users & Authentication
- **users** table: Trainers with session-based auth
- **pupils** table: Students managed by trainers, with detailed profiles including parental consent for minors

### Workout Management
- **exercises** table: Exercise database with Russian names, technique instructions, muscle groups
- **workoutPrograms** table: Collections of exercises created by trainers
- **workoutSessions** table: Scheduled training sessions
- **exerciseProgress** table: Individual progress tracking

### Training Plans
- **pupilTrainingPlans** table: Custom workout plans assigned to students
- **activeWorkouts** table: Currently active training sessions
- **pupilWorkoutHistory** table: Historical workout data and feedback

## Development Workflow

### Making Database Changes
1. Update schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update storage layer methods in `server/storage.ts`
4. Add/update API routes in `server/routes.ts`

### Adding New Features
1. Define types in `shared/schema.ts` if database changes needed
2. Add storage methods in `server/storage.ts`
3. Create API endpoints in `server/routes.ts`
4. Build React components in `client/src/components/`
5. Use React Query for data fetching in components

### Component Organization
- UI primitives in `client/src/components/ui/`
- Feature components organized by domain (exercise/, schedule/, students/, etc.)
- Page components in `client/src/pages/`
- Shared utilities in `client/src/lib/`

## Important Notes

### Russian Localization
- Exercise names and instructions are in Russian
- UI text supports Russian fitness terminology
- Exercise translation function in `server/routes.ts` for external APIs
- Comprehensive Russian exercise translations mapping in routes file

### Database Environment
- Requires `DATABASE_URL` environment variable for Neon connection
- Uses Neon serverless PostgreSQL with connection pooling
- WebSocket support configured for Neon via `ws` package
- Environment-specific configuration (development vs production)

### Development Environment
- Development uses Vite dev server with HMR and Express backend
- Production serves static files directly through Express
- Request logging only for `/api` routes in development
- Build process: Vite for frontend, esbuild for backend

### File Structure Conventions
- TypeScript throughout with strict type checking
- Path aliases configured in `vite.config.ts` and `tsconfig.json`
- Shared types between frontend and backend via `shared/` directory
- Component organization by feature domain in `client/src/components/`