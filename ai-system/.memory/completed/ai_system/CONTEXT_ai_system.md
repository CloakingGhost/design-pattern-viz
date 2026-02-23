# AI System — Context Note

> **Purpose**: Record _why_ each decision was made and where the source material lives.
> **Created**: 2026-02-23

---

## 1. Source Documents

| Document            | Path                                    | Role                                                                                                |
| :------------------ | :-------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| AI System Design    | `ai-system/file/AI_System.md`           | Original system concept — 4 pillars (Manual, Memory, Quality, Reporting)                            |
| Project Tech Stack  | `ai-system/file/project.md`             | Full tech stack, Git conventions, DB schema (PostgreSQL DBML + Redis), Code style rules             |
| Implementation Plan | `ai-system/file/implementation_plan.md` | Detailed plan adapted for Antigravity monorepo (Skills + Workflows), approved by user on 2026-02-23 |

---

## 2. Decision Log

### D1: Monorepo structure — `frontend/`, `backend/`, `ai-system/`

- **Why**: User restructured the project from a flat layout into a monorepo on 2026-02-23.
- **Impact**: All AI system files live under `ai-system/`, keeping them isolated from application code.
- **Frontend**: `frontend/` (Next.js 16)
- **Backend**: `backend/` (Spring Boot 3)

### D2: Skills at `ai-system/.skills/`, not project root

- **Why**: The monorepo restructure moves all AI agent artifacts under `ai-system/`.
- **Previous plan**: `.skills/` at project root.
- **Updated plan**: `ai-system/.skills/` (confirmed decision #1 in updated plan).

### D3: Workflows at `.agent/workflows/` (root), not under `ai-system/`

- **Why**: Antigravity **requires** workflows at the workspace root `.agent/workflows/` directory to be recognized.
- **Result**: Workflows stay at root; skills and memory go under `ai-system/`.

### D4: All skills and memory documents in English

- **Why**: `AI_System.md` specifies skills and memory documents must be in English for AI consistency.
- **Exception**: Planning phase uses Korean for user review. Only the final persisted docs are English.

### D5: Claude Code Hooks → Skills + Workflows

- **Why**: Antigravity does not support Claude Code's Hook system (PreToolUse, PostToolUse, etc.).
- **Mapping**:
  - Hook keyword/intent detection → SKILL.md YAML metadata (auto-loaded by Antigravity)
  - Hook file modification tracking → `/check` workflow using `git diff`
  - Hook post-completion checks → `/check` workflow (lint + type-check)
  - Hook self-check reminders → Quality-gate SKILL.md checklist

### D6: Monorepo-aware quality commands

- **Why**: FE and BE now live in separate directories, so lint/build commands must `cd` into the correct directory.
- **FE**: `cd frontend && npx eslint` + `cd frontend && npx tsc --noEmit`
- **BE**: `cd backend && ./gradlew spotlessCheck` + `cd backend && ./gradlew compileJava`

### D7: Working memory stored in `ai-system/.memory/`

- **Why**: `AI_System.md` requires 3 document types (Plan, Context, Checklist) to persist across conversation boundaries.
- **Storage**: `ai-system/.memory/` with `.gitkeep` to ensure directory is tracked.
- **Reports**: Agent reports are saved to `ai-system/.memory/reports/`.

### D8: CONVENTIONS.md at monorepo root

- **Why**: Project-wide rules (Git conventions, code style) apply to both `frontend/` and `backend/`, so the file must be at the root level.

---

## 3. Tech Stack Quick Reference

### Frontend (`frontend/`)

- Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Zustand, Framer Motion
- Architecture: Feature-Sliced Design (FSD) with App Router
- Code style: ESLint (no Prettier conflict)

### Backend (`backend/`)

- Spring Boot 3, Java 21, JPA, Gradle
- Auth: JWT (Access 30min, Refresh 7d via Redis), Spring Security
- Architecture: Domain-Driven Design (DDD)
- Code style: Spotless

### Database

- PostgreSQL: Users, Pattern, Pattern_Statistics, Classifications, Advantages, Disadvantages
- Redis: Refresh Token management (TTL 7 days, key pattern `RT:{userId}`)

### CI/CD & Deploy

- Git + GitHub + GitHub Actions (`.github/workflows/` at root)
- Docker + Docker Compose
- AWS EC2 (free tier) + RDS, Nginx reverse proxy, HTTPS

---

## 4. Monorepo Directory Map

```
design-pattern-viz/                     # Monorepo root
├── .agent/workflows/                   # Workflows (root — Antigravity required)
│   ├── plan.md
│   ├── memory.md
│   ├── check.md
│   └── report.md
├── frontend/                           # Next.js FE
├── backend/                            # Spring Boot BE
├── ai-system/                          # AI agent system
│   ├── .skills/                        # Skill definitions
│   ├── .memory/                        # Working memory docs
│   └── file/                           # Reference docs (AI_System.md, project.md)
├── .github/workflows/                  # CI/CD
├── CONVENTIONS.md                      # Project-wide conventions
└── README.md
```
