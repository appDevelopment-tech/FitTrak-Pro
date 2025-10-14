# CLAUDE.md - AI Development Guidelines

**Last Updated:** January 14, 2025

---

## Core Principles

<system_reminder>Check current date. We're in 2025 not 2024</system_reminder>
<system_reminder>Remove "Ah, I see the issue now" → just state the issue</system_reminder>
<system_reminder>Remove "Let me [do something]" → just do it</system_reminder>
<system_reminder>[If your first sentence ends with !] → remove entire sentence</system_reminder>
<system_reminder>NEVER say "You're absolutely right" → think and discuss instead</system_reminder>

### Planning & Execution
- **Always plan first**: Create an 11/10 plan before implementation
- **Review existing code**: Check all related files to understand flow and prevent breaking changes
- **Test everything**: Manual testing required before considering any feature complete
- **Rate your work**: Provide 1-10 rating for all solutions
- **Think elegantly**: Avoid overengineering, pursue concise solutions

### Code Quality Standards
- **Security-first**: Review all code changes for security vulnerabilities
- **Clean code**: Remove bloat and document clearly after implementation
- **Refactor concisely**: Make code as concise as possible without sacrificing readability
- **Type safety**: Leverage TypeScript strict mode throughout

---

## Commands

### Development
- `npm run dev` - Start development server with Vite frontend
- `npm run build` - Build frontend (Vite) for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run cleanup` - Clean up temporary test files and screenshots

### Testing
- `npm run test:e2e` - Run end-to-end tests (Playwright)
- `npm run test:clean` - Clean up and run tests

### Database Management
- Database migrations handled via Prisma
- Schema defined in `prisma/schema.prisma` using Prisma Schema Language
- Database connection configured in `server/db.ts` using Prisma Client
- Storage layer interface defined in `server/storage.ts` with all CRUD operations
- Commands:
  - `npm run db:generate` - Generate Prisma Client
  - `npm run db:push` - Push schema changes to database
  - `npm run db:migrate` - Create and apply migrations
  - `npm run db:studio` - Open Prisma Studio GUI

---

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
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **Sessions**: Express sessions stored in PostgreSQL
- **Entry Point**: `server/index.ts` - sets up Express app, middleware, and routes
- **Routes**: `server/routes.ts` - all API endpoints (RESTful design)
- **Storage**: `server/storage.ts` - database operations layer with interface pattern
- **Database**: `server/db.ts` - Prisma Client setup and connection management
- **Vite Integration**: `server/vite.ts` - development server setup

### Schema (`prisma/`)
- **Schema**: `prisma/schema.prisma` - Prisma schema with all models, relations, and indexes
- Generated Prisma Client in `generated/prisma/` (auto-generated, not committed)
- UUIDs for all primary keys
- Contains all database table definitions and TypeScript types

---

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

---

## Key Architectural Patterns

### Database Layer
- Uses Prisma ORM with PostgreSQL schema defined in `prisma/schema.prisma`
- All database operations go through `storage.ts` layer with IStorage interface
- Prisma Client provides type-safe database access with auto-generated types
- Connection via Prisma Client to Supabase PostgreSQL
- **UUIDs for all primary keys** (@id @default(uuid()) @db.Uuid)
- Schema changes managed via `prisma db push` or `prisma migrate`
- **Prisma Model Naming**: Models use PascalCase (User, Pupil, Exercise) with camelCase accessors (prisma.user, prisma.pupil, prisma.exercise)
- Database tables use snake_case (users, students, exercises) - mapped via @@map() directive

### API Design
- RESTful API endpoints in `server/routes.ts` with HTTP server creation
- All requests validated using custom Zod schemas
- Error handling with consistent JSON responses and status codes
- Express middleware for request logging, JSON parsing, and URL encoding
- Request/response logging middleware with truncation for readability
- All IDs are UUIDs (string type, not integers)

### Frontend Data Flow
- React Query handles all API calls and caching with optimistic updates
- Forms use React Hook Form with Zod validation
- UI components from shadcn/ui with Tailwind styling and Radix UI primitives
- Path aliases: `@/` for `client/src/`, `@assets/` for `attached_assets/`
- Context providers for shared state (ActiveWorkoutContext)

---

## Development Workflow

### Making Database Changes
1. Update schema in `prisma/schema.prisma`
2. Run `npm run db:push` to sync database
3. Run `npm run db:generate` to update Prisma Client
4. Update storage layer methods in `server/storage.ts` if needed
5. Add/update API routes in `server/routes.ts`

### Adding New Features
1. **Plan thoroughly**: Use TodoWrite tool for complex features
2. Define models in `prisma/schema.prisma` if database changes needed
3. Run `npm run db:push` and `npm run db:generate`
4. Add storage methods in `server/storage.ts`
5. Create API endpoints in `server/routes.ts`
6. Build React components in `client/src/components/`
7. Use React Query for data fetching in components
8. **Test with qa-tester agent** before considering complete
9. Rate solution (1-10) and refactor if needed

### Component Organization
- UI primitives in `client/src/components/ui/`
- Feature components organized by domain (exercise/, schedule/, students/, etc.)
- Page components in `client/src/pages/`
- Shared utilities in `client/src/lib/`

### Task Request Workflow

**CRITICAL:** When user requests new work, follow this workflow:

1. **Write to TASKS.md FIRST** (do NOT start coding immediately)
   - Define task with acceptance criteria
   - Break down into subtasks if complex
   - Assign lifecycle stage: `planned | coded | tested | reviewed | done`
   - Estimate effort: `<5min | 5-30min | 30min-2h | 2h+`

2. **Assess parallelization opportunity:**
   - Can tasks run independently?
   - Different domains (API + tests + docs)?
   - No shared state?
   - → **If yes**: Assign to different agents, launch in parallel

3. **Assign to appropriate agent:**
   - **main**: Quick fixes (<5min), coordination
   - **code-developer**: Features, refactoring (>5min)
   - **qa-tester**: Testing, verification
   - **code-reviewer**: Security, architecture review

4. **Execute with lifecycle tracking:**
   - Update TASKS.md as task progresses through stages
   - `planned` → `coded` → `tested` → `reviewed` → `done`
   - **If not done**: Repeat from failing stage

5. **Move to CHANGELOG.md when done:**
   - Archive completed tasks from TASKS.md
   - Append to CHANGELOG.md with date and details

**Example workflow:**
```
User: "Add user profile editing feature"

Step 1: Write to TASKS.md
  Task: Implement user profile editing
  Status: planned
  Assigned: code-developer

Step 2: Launch agent
  code-developer implements → Status: coded

Step 3: Test
  qa-tester verifies → Status: tested

Step 4: Complete
  Move to CHANGELOG.md → Status: done
```

**For detailed task structure and Definition of Done, see [TASKS.md](./TASKS.md).**

---

## Agent Usage Guidelines

### Available Agents

#### code-developer
**When to use:**
- Complex features requiring >5 minutes work
- Multi-file implementations
- Bug fixes requiring investigation
- Refactoring large code sections
- New domain feature implementations

**When NOT to use:**
- Simple typo fixes (main agent faster)
- One-line changes
- Quick variable renames
- Reading single files
- Iterative fix→test→fix loops (too much overhead)

**Best practices:**
- Provide clear task description and expected outcome
- Reference relevant files and patterns
- Request rating (1-10) for delivered solution

#### qa-tester
**When to use:**
- After writing new code (always test before considering complete)
- Before commits/pull requests
- Testing API endpoints, database operations
- Browser/UI testing with Playwright
- Verifying form validations and user flows
- End-to-end workout creation and management flows

**Test structure:**
- Production tests: `.claude/agents/qa-tester/*.spec.ts`
- Screenshots: `.claude/agents/qa-tester/screenshots/`
- Uses Playwright for browser automation

**Best practices:**
- Always test after implementing features
- Test both happy path and error cases
- Verify Russian text rendering correctly
- Test mobile responsive layouts

#### code-reviewer (optional)
**When to use:**
- Before every commit (for security-critical changes)
- After implementing authentication/authorization features
- Security audits (monthly recommended)
- Refactoring legacy code

### Agent Workflow Best Practices

1. **Full Development Cycle (Complex Tasks):**
   - Plan task breakdown with TodoWrite
   - Use **code-developer** to implement (if >5 min work)
   - Use **qa-tester** to test
   - Fix issues found
   - Re-test with **qa-tester**
   - Commit only after tests pass

2. **Simple Development Cycle (Quick Tasks <5 min):**
   - Main agent writes code directly
   - Use **qa-tester** to test
   - Commit after tests pass

3. **Parallel Agent Execution (When Possible):**
   - Independent tasks can run simultaneously
   - Example: "Implement feature + add tests" → launch code-developer + qa-tester in parallel
   - Collect results from both agents concurrently

4. **When to Skip Agents (Overhead Not Worth It):**
   - Typo fixes, one-line changes → main agent faster
   - Reading single files → use Read tool directly
   - Iterative debugging (fix→test→fix) → stay in main conversation
   - Quick refactors (<2 min) → main agent handles it

---

## Frontend Design Standards

### Design Philosophy
- **Premium minimalist aesthetic** - think Swiss spa, Steve Jobs would approve
- **Professional grade**: Design worth thousands/month subscription
- **Icons over emojis**: Use Lucide React icons exclusively
- **Cohesive color palette**: Limited, intentional color use
- **Responsive**: Elegant on desktop and mobile

### Spacing & Layout
- Perfect component spacing - not too close, not too dispersed
- Consistent padding throughout (use Tailwind spacing scale)
- Clean, uncluttered layouts
- White space is a design element

### Component Standards
- Use shadcn/ui components as base
- Maintain consistent styling across all pages
- Ensure Russian text renders properly with good typography
- Test all layouts on mobile viewports

---

## Testing Protocol

### Test Structure

**Permanent Tests:**
Located in `.claude/agents/qa-tester/`:
```
.claude/agents/qa-tester/
├── *.spec.ts                # All Playwright test files
├── *.cjs                    # Node.js test scripts
└── screenshots/             # Test screenshots (auto-generated)
```

**Test Coverage Should Include:**
- User authentication flows
- Pupil registration and management
- Exercise creation and assignment
- Workout program creation
- Active workout tracking
- Progress analytics
- Schedule management
- Form validations (Russian text support)

### Running Tests

```bash
# All E2E tests
npm run test:e2e

# Cleanup test artifacts
npm run test:clean
```

### Test Requirements
- All tests must pass before considering feature complete
- Test both trainer and pupil workflows
- Verify Russian localization works correctly
- Test responsive layouts on mobile viewports
- Validate form error messages display properly

---

## Documentation Standards

### File Creation Rules
- **Create markdown files when explicitly requested by the user**
- Use three main documentation files:
  - **CLAUDE.md** - AI development guidelines (this file)
  - **TASKS.md** - Active work tracking (temporary, per phase/sprint)
  - **CHANGELOG.md** - Historical changes (permanent record)
- Additional documentation belongs in `/docs/` folder
- Never create documentation files proactively without user request

### Documentation Structure
- **CLAUDE.md**: Guidelines, workflows, architecture (stable, updated infrequently)
- **TASKS.md**: Current implementation status, active todos, blockers (updated frequently)
- **CHANGELOG.md**: Completed features, migrations, releases (append-only history)
- **Notion**: High-level project management, milestones, features (user-maintained)

### Update Protocol
- When completing work: Update TASKS.md → then append to CHANGELOG.md
- When work fully done: Move completed items from TASKS.md to CHANGELOG.md
- Major changes: Update CLAUDE.md guidelines if workflow changes

---

## Context Management

### Token Limit Handling

**When approaching token limits** (~150k-180k tokens out of 200k):

1. **Create session summary:**
   - Run: "Create context summary for new session"
   - AI will generate comprehensive summary
   - Includes: completed work, active tasks, system state, decisions, next steps

2. **Update documentation:**
   - Summary saved to `CONTEXT_SUMMARY.md`
   - TASKS.md updated with session summary section
   - CHANGELOG.md already has historical record

3. **Stop current session:**
   - Save all open files
   - Commit any uncommitted work
   - Note any in-progress work in TASKS.md

4. **Start new session:**
   - Share `CONTEXT_SUMMARY.md` in first message
   - AI will read and understand full context
   - Continue from where you left off

### Session Summary Structure

When creating summary, include:

**1. Session Overview**
- Date range
- Main accomplishments
- Overall progress percentage

**2. System State**
- Current architecture
- Recent major changes
- Active branches (if any)

**3. Completed Work**
- High-level summary from CHANGELOG.md
- Key features implemented
- Migrations completed

**4. Active Tasks**
- Tasks in progress (from TASKS.md)
- Current status of each task
- Blockers or dependencies

**5. Technical Context**
- Important decisions made
- Technology stack current state
- Known issues or workarounds

**6. Immediate Next Steps**
- What needs to happen next
- Priority order
- Estimated effort

**7. Reference Files**
- Key files to review first
- Important documentation links
- Configuration files

### Commands for Context Management

```bash
# Check token usage (if available)
# When approaching limit, request summary

# After summary created:
git add CONTEXT_SUMMARY.md TASKS.md CHANGELOG.md
git commit -m "docs: Save session context before token limit"
```

### Best Practices

- **Proactive summarization**: Don't wait until token limit reached
- **Clear handoff**: Make summary detailed enough for cold start
- **Update regularly**: Keep TASKS.md current so summary is accurate
- **Reference existing docs**: Summary should point to CLAUDE.md, not duplicate it

---

## Communication Style

### What to Avoid
- ❌ "Ah, I see the issue now" → just state the issue
- ❌ "Let me [do something]" → just do it
- ❌ Sentences ending with "!" → remove entire sentence
- ❌ "You're absolutely right" → think and discuss instead
- ❌ Unnecessary enthusiasm or filler phrases
- ❌ Using emojis in code or responses

### What to Do
- ✓ Direct, concise communication
- ✓ Test before claiming completion
- ✓ Verify feature actually works line-by-line
- ✓ Clean up after yourself
- ✓ Provide ratings for complex solutions
- ✓ Think critically and offer constructive discussion

---

## Research & Context

When researching approaches:
- Check relevant documentation links
- Review multiple related files to understand full flow
- Search codebase for similar patterns
- Understand existing architecture before implementing

---

## Cleanup Protocol

### After Testing Sessions
**ALWAYS run cleanup after QA testing or debugging:**
1. Delete temporary test files: `npm run cleanup` or `bash scripts/cleanup.sh`
2. Remove ad-hoc test scripts from root: `rm -f *-test.js test-*.js browser-test*.js`
3. Clean screenshots: All test screenshots are auto-removed by cleanup script
4. Clean test artifacts: `.test-artifacts/` directory is auto-cleaned

### Test File Management

#### Ad-hoc Tests (Temporary)
- **Location**: Project root (for quick debugging)
- **Naming**: `*-test.js`, `test-*.js`, `browser-test*.js`
- **Lifecycle**: DELETE immediately after use
- **Examples**: `browser-test-debug.js`, `test-student-creation.js`

#### Production Tests (Permanent)
- **Location**: `.claude/agents/qa-tester/*.spec.ts`
- **Naming**: `{feature}.spec.ts` or `test-{feature}.spec.ts`
- **Lifecycle**: KEEP and maintain in qa-tester folder
- **When to create**: When test is reusable and should run in CI/CD
- **Who creates**: QA tester agent manages all tests

#### Screenshot Management
- **Ad-hoc screenshots**: Auto-deleted by cleanup script
- **Test screenshots**: Saved to `.claude/agents/qa-tester/screenshots/`
- **Naming**: `{feature}-{action}-{state}.png` (e.g., `student-create-success.png`)
- **Retention**: Managed by QA tester agent, cleaned up after test runs

### Before Git Commits
1. Run `npm run cleanup` to remove temporary files
2. Verify no test files in root: `ls *-test.js test-*.js 2>/dev/null`
3. Check .gitignore covers test artifacts
4. QA tester agent tests are in `.claude/agents/qa-tester/` (not committed to git)

### Quick Cleanup Commands
```bash
# Full cleanup (recommended)
npm run cleanup

# Manual cleanup
rm -f *-test.js test-*.js browser-test*.js screenshot-*.png test-*.png
rm -f /tmp/*.png

# Check for leftover test files
ls *-test.js test-*.js *.png 2>/dev/null | grep -v "generated-icon.png"
```

---

## Important Notes

### Russian Localization
- Exercise names and instructions are in Russian
- UI text supports Russian fitness terminology
- Exercise translation function in `server/routes.ts` for external APIs
- Comprehensive Russian exercise translations mapping in routes file
- Ensure proper UTF-8 encoding throughout application

### Database Environment
- Requires `DATABASE_URL` environment variable for Supabase connection
- Uses Supabase PostgreSQL with Prisma Client
- Connection pooling handled by Prisma
- Additional Supabase credentials: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Environment-specific configuration (development vs production)
- Example `.env`:
  ```
  # Direct connection (required for migrations)
  DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

  # Supabase credentials
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
  ```
- **Note**: Use direct connection (port 5432) for migrations, pooler (port 6543) works for queries

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

---

## Project History

For detailed changelog of all completed features, migrations, and releases, see **[CHANGELOG.md](./CHANGELOG.md)**.

For current active work and implementation status, see **[TASKS.md](./TASKS.md)**.

---

## Test Accounts

### Admin/Trainer Accounts
**URL:** `http://localhost:5173/admin/login`

1. **Admin Account**
   - Email: `fittrak.admin@gmail.com`
   - Password: `admin123`
   - Role: Admin/Trainer

2. **Trainer Account**
   - Email: `fittrak.trainer@gmail.com`
   - Password: `trainer123`
   - Role: Trainer

### Student Accounts
**URL:** `http://localhost:5173/login`

1. **Student 1**
   - Email: `fittrak.student1@gmail.com`
   - Password: `student123`

### Authentication Notes
- Real Supabase authentication is enabled (`BYPASS_AUTH = false`)
- Test users are created in Supabase Auth system
- Admin accounts can access `/admin/dashboard` and see Cabinet button
- Student accounts can access `/dashboard` for schedule view
- All test accounts have full permissions for testing
- Email confirmation is not required for testing
