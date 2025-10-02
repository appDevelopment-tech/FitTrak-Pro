# Cleanup & Testing Organization Plan

## Current Problems
1. ❌ Screenshots scattered everywhere (/tmp, project root)
2. ❌ Test files in project root (browser-test.js, etc.)
3. ❌ No organized test structure
4. ❌ No cleanup guidelines in CLAUDE.md
5. ❌ Temporary files accumulate during development

## Proposed Solution

### 1. Directory Structure
```
FitTrak-Pro/
├── tests/                          # NEW: All tests go here
│   ├── e2e/                       # End-to-end tests (Playwright)
│   │   ├── auth.spec.ts
│   │   ├── students.spec.ts
│   │   ├── exercises.spec.ts
│   │   └── workouts.spec.ts
│   ├── integration/               # Integration tests
│   ├── unit/                      # Unit tests
│   ├── fixtures/                  # Test data
│   └── screenshots/               # Test screenshots (gitignored)
├── .test-artifacts/               # Temporary test outputs (gitignored)
│   ├── reports/
│   └── logs/
└── attached_assets/               # Keep for permanent assets only
```

### 2. Cleanup Rules

#### Auto-Delete (Temporary)
- ✅ `/tmp/*.png` - Test screenshots
- ✅ `browser-test*.js` - Ad-hoc test scripts
- ✅ `test-*.json` - Test reports
- ✅ `*-test.js` in root - Temporary tests
- ✅ `.test-artifacts/*` - Old test outputs

#### Keep & Organize (Permanent)
- ✅ `tests/e2e/*.spec.ts` - Production test suites
- ✅ `tests/screenshots/*.png` - Referenced screenshots only
- ✅ Documentation (*.md files)
- ✅ Migration artifacts (for history)

#### Delete Immediately After Use
- ✅ One-off debug scripts
- ✅ Playwright temp files
- ✅ QA agent generated tests (unless moved to tests/)

### 3. Test File Lifecycle

#### Phase 1: Ad-hoc Testing (During Development)
```javascript
// Location: Project root (temporary)
// Example: browser-test-debug.js
// Action: DELETE after debugging
```

#### Phase 2: Useful Test Found
```javascript
// Action: Move to tests/e2e/
// Rename: browser-test.js → tests/e2e/students.spec.ts
// Keep: Long-term test suite
```

#### Phase 3: Test Becomes Obsolete
```javascript
// Action: Delete from tests/e2e/
// Reason: Feature changed, test no longer valid
```

### 4. Screenshot Management

#### Current Chaos
```
/tmp/screenshot-1.png
/tmp/screenshot-2.png
/tmp/01_after_login.png
supabase-test-result.png (in root)
```

#### Organized Approach
```
tests/screenshots/
├── auth/
│   ├── login-success.png
│   └── login-failure.png
├── students/
│   ├── student-list.png
│   ├── student-create.png
│   └── student-edit.png
└── reference/  # Golden screenshots for visual regression
    └── dashboard.png
```

**Rules:**
1. Save only referenced screenshots
2. Name descriptively (feature-action-state.png)
3. Delete after test run unless needed for documentation
4. Use `.gitignore` for tests/screenshots/

### 5. .gitignore Updates

Add to `.gitignore`:
```gitignore
# Test artifacts
.test-artifacts/
tests/screenshots/
/tmp/
*-test.js
test-*.js
test-*.json
browser-test*.js

# Keep test specs
!tests/**/*.spec.ts
!tests/**/*.spec.js
```

### 6. CLAUDE.md Guidelines

Add section:
```markdown
## Cleanup Protocol

### After Testing Sessions
1. Delete temporary test files from root: `rm -f *-test.js test-*.js`
2. Clean screenshots: `rm -f /tmp/*.png`
3. Remove test artifacts: `rm -rf .test-artifacts/*`
4. Keep only organized tests in `tests/` directory

### Test File Management
- Ad-hoc tests: Create in root, DELETE after use
- Reusable tests: Move to `tests/e2e/*.spec.ts`
- Screenshots: Save only to `tests/screenshots/` with descriptive names
- Reports: Save to `.test-artifacts/reports/` (auto-cleaned)

### Before Commits
Run cleanup script: `npm run cleanup` (or manual cleanup checklist)
```

### 7. Automation Script

Create `scripts/cleanup.sh`:
```bash
#!/bin/bash
echo "🧹 Cleaning up test artifacts..."

# Remove temporary test files from root
rm -f browser-test*.js *-test.js test-*.js test-*.json

# Clean tmp screenshots
rm -f /tmp/*.png /tmp/screenshot*.png

# Clean test artifacts (keep directory)
rm -rf .test-artifacts/*
mkdir -p .test-artifacts/reports
mkdir -p .test-artifacts/logs

# Clean old test screenshots (keep directory)
find tests/screenshots -type f -name "*.png" -mtime +7 -delete

echo "✅ Cleanup complete!"
```

Add to `package.json`:
```json
{
  "scripts": {
    "cleanup": "bash scripts/cleanup.sh",
    "test:e2e": "playwright test",
    "test:clean": "npm run cleanup && npm run test:e2e"
  }
}
```

### 8. Implementation Steps

1. ✅ Create `tests/` directory structure
2. ✅ Move any useful tests to `tests/e2e/`
3. ✅ Delete all temporary test files from root
4. ✅ Clean up /tmp screenshots
5. ✅ Update .gitignore
6. ✅ Create cleanup script
7. ✅ Update CLAUDE.md
8. ✅ Update package.json
9. ✅ Test the app still works
10. ✅ Document in README

### 9. QA Test Organization

#### Keep These (Large/Valuable Tests)
- Comprehensive button-clicking test → `tests/e2e/comprehensive.spec.ts`
- Student CRUD test → `tests/e2e/students.spec.ts`
- Auth flow test → `tests/e2e/auth.spec.ts`

#### Delete These (Ad-hoc/Debug Tests)
- browser-test.js (already deleted)
- test-supabase.js (one-time verification)
- test-conversion.js (debug script)
- All numbered test files (test-1.js, test-2.js, etc.)

#### Improve These
- Extract reusable helpers → `tests/helpers/`
- Create shared fixtures → `tests/fixtures/`
- Add proper assertions → Use expect() instead of console.log()

### 10. Success Criteria

After implementation:
- ✅ No test files in project root
- ✅ No screenshots in /tmp or root
- ✅ All tests in `tests/` directory
- ✅ Cleanup script works
- ✅ CLAUDE.md has clear guidelines
- ✅ .gitignore prevents future mess
- ✅ App still works perfectly
- ✅ Easy to run: `npm run test:clean`

## Benefits

1. **Clean Codebase** - No clutter in root directory
2. **Easy Cleanup** - One command: `npm run cleanup`
3. **Organized Tests** - Easy to find and maintain
4. **Better Git** - No accidental commits of temp files
5. **Team Friendly** - Clear structure for other developers
6. **Auto-Cleanup** - Can add to pre-commit hooks

## Timeline

- Planning: ✅ Done (this file)
- Implementation: 15-20 minutes
- Testing: 5 minutes
- Documentation: 5 minutes
- **Total: ~30 minutes**
