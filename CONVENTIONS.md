# Project Conventions

> **Project**: design-pattern-viz — Monorepo
> **Structure**: `frontend/` (Next.js 16) · `backend/` (Spring Boot 3) · `ai-system/` (AI agent system)

---

## Git Commit Convention

### Types

| Type       | Description                                                 |
| :--------- | :---------------------------------------------------------- |
| `feat`     | New feature or UI addition                                  |
| `fix`      | Bug fix or UI correction                                    |
| `docs`     | Documentation changes, file renames                         |
| `style`    | Code formatting only (indentation, semicolons) — no logic   |
| `refactor` | Code restructuring without behavior change                  |
| `test`     | Adding or modifying tests                                   |
| `chore`    | Config/build changes (Docker, .env, dependencies) — no code |

### Subject Rules

- Max **50 characters**
- No periods or special characters at the end
- Capitalize the first letter (when writing in English)
- Use imperative mood
- Be concise and to the point

### Body Rules

- Max **72 characters** per line
- Write in detail
- Focus on **what** and **why**, not how

### Template

```
<type>: <subject>

<body — what changed and why>
```

Example: `feat: Add Observer pattern animation`

---

## Code Style

### Frontend (ESLint)

- Linter: **ESLint** (configured in `frontend/eslint.config.mjs`)
- Do **not** use Prettier alongside ESLint to avoid conflicts
- Run: `cd frontend && npx eslint .`
- Type check: `cd frontend && npx tsc --noEmit`

### Backend (Spotless)

- Formatter: **Spotless** (configured in Gradle)
- Do **not** use Prettier alongside Spotless to avoid conflicts
- Run: `cd backend && ./gradlew spotlessCheck`
- Compile check: `cd backend && ./gradlew compileJava`

---

## Planning & Documentation Principle

- **Plans** are written in **Korean** for user review
- **Memory documents** (Plan, Context, Checklist) are written in **English** and saved to `ai-system/.memory/`
- Always get user approval before proceeding with implementation

---

## Monorepo Path Rules

| Area      | Path                 | Notes                                  |
| :-------- | :------------------- | :------------------------------------- |
| Frontend  | `frontend/`          | Next.js 16, FSD architecture, pnpm     |
| Backend   | `backend/`           | Spring Boot 3, DDD, Gradle             |
| AI        | `ai-system/`         | Skills, memory, reference docs         |
| Workflows | `.agent/workflows/`  | Root only — Antigravity requirement    |
| CI/CD     | `.github/workflows/` | Root only — GitHub Actions requirement |
