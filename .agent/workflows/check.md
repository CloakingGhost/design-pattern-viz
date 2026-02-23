---
description: Run quality gates after task completion. Git diff → lint/type-check → self-check reminders → auto-fix or escalate.
---

# /check — Quality Check Workflow

Run this workflow after completing any task to catch errors before committing.

## Steps

### 1. Collect Changed Files

// turbo

- Run `git diff --name-only` to list modified files
- Categorize changes: FE (`frontend/`), BE (`backend/`), Other

### 2. Frontend Checks (if FE files changed)

// turbo

- Run: `cd frontend && npx eslint .`
- Run: `cd frontend && npx tsc --noEmit`
- Report results

### 3. Backend Checks (if BE files changed)

// turbo

- Run: `cd backend && ./gradlew spotlessCheck`
- Run: `cd backend && ./gradlew compileJava`
- Report results

### 4. Self-Check Reminders

- Output the following reminders for the changed files:
  - "Did you add error handling (try-catch) where needed?"
  - "Any security risks in the changes?"
  - "Are type definitions correct and complete?"
  - "Did you follow the import direction rules? (FSD layers / DDD layers)"
  - "Are there any hardcoded values that should be in config?"

### 5. Evaluate Results

- **No errors** → Report clean status ✅
- **Few errors (1-3)** → Attempt AI auto-fix, then re-run checks
- **Many errors (4+)** → Recommend switching to a specialist agent:
  - Static analysis issues → QA agent (`/qa-agent`)
  - Runtime/test failures → Test agent (`/test-agent`)
  - Architecture concerns → Planning agent (`/planning-agent`)
