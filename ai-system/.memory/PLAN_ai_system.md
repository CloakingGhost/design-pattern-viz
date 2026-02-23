# AI System Implementation Plan

> **Project**: design-pattern-viz (Design Pattern Learning Site) — **Monorepo**
> **Stack**: Next.js 16 (`frontend/`) + Spring Boot 3 (`backend/`)
> **AI Platform**: Google AI Pro — Antigravity (Gemini 3.1 / Claude Sonnet / Claude Opus)
> **Created**: 2026-02-23

---

## 1. Objective

Build a comprehensive AI agent system within the `ai-system/` directory of the monorepo so that:

- AI agents automatically load relevant manuals based on keywords, file patterns, and work context
- Working memory documents (Plan, Context, Checklist) persist across conversation boundaries
- Automated quality checks (lint, type-check, self-check reminders) run after every task
- Specialized agent roles (QA, Test, Planning) produce structured reports

---

## 2. Monorepo Layout

```
design-pattern-viz/                     # Monorepo root
│
├── .agent/workflows/                   # Antigravity Workflows (MUST be at root)
│   ├── plan.md
│   ├── memory.md
│   ├── check.md
│   └── report.md
│
├── frontend/                           # Next.js frontend
├── backend/                            # Spring Boot backend
│
├── ai-system/                          # AI agent system
│   ├── .skills/                        # All skill definitions
│   │   ├── skill-creator/
│   │   ├── frontend/
│   │   ├── backend/
│   │   ├── database/
│   │   ├── devops/
│   │   ├── quality-gate/
│   │   └── agents/ (qa / test / planning)
│   ├── .memory/                        # Working memory documents
│   └── file/                           # Reference documents
│
├── .github/workflows/                  # CI/CD (root — GitHub Actions required)
├── CONVENTIONS.md                      # Project-wide rules (root)
└── README.md
```

**Key routing rules:**

- Workflows → `.agent/workflows/` (root, mandatory for Antigravity)
- Skills → `ai-system/.skills/` (under ai-system)
- Memory → `ai-system/.memory/` (under ai-system)
- CONVENTIONS.md → root (project-wide)

---

## 3. Key Architecture Decisions

### 3.1 Skills (3-tier loading)

| Level | File                      | Loaded When        | Tokens    |
| :---- | :------------------------ | :----------------- | :-------- |
| L1    | SKILL.md YAML frontmatter | Always             | ~100      |
| L2    | SKILL.md body (markdown)  | Skill triggers     | <5k       |
| L3+   | Bundled files (chapters/) | On-demand by model | unlimited |

### 3.2 Four Workflows

| Command   | Purpose                                                     |
| :-------- | :---------------------------------------------------------- |
| `/plan`   | Force planning before big tasks                             |
| `/memory` | Generate 3 English memory documents in `ai-system/.memory/` |
| `/check`  | Run quality gates (lint + type-check + self-check)          |
| `/report` | Generate structured agent reports                           |

### 3.3 Quality Check Commands (Monorepo-aware)

- **FE**: `cd frontend && npx eslint` + `cd frontend && npx tsc --noEmit`
- **BE**: `cd backend && ./gradlew spotlessCheck` + `cd backend && ./gradlew compileJava`

---

## 4. Implementation Phases

### Phase 1: Foundation (🔴 High Priority)

|  #  | Deliverable                   | Path                                       |
| :-: | :---------------------------- | :----------------------------------------- |
| 1.1 | Project-wide conventions      | `CONVENTIONS.md` (root)                    |
| 1.2 | Working memory directory      | `ai-system/.memory/.gitkeep`               |
| 1.3 | Meta-skill: create new skills | `ai-system/.skills/skill-creator/SKILL.md` |

### Phase 2: Workflows — Plan & Memory (🔴 High Priority)

#### 2.1 `/plan` workflow → `.agent/workflows/plan.md` (root)

Force planning before big tasks:

1. Analyze current status
2. Write plan in Korean
3. Wait for user approval
4. Call `/memory` to save documents

#### 2.2 `/memory` workflow → `.agent/workflows/memory.md` (root)

Generate 3 English memory documents in `ai-system/.memory/`:

| Document  | Role                        | Filename Pattern         |
| :-------- | :-------------------------- | :----------------------- |
| Plan      | Blueprint — what to build   | `PLAN_{feature}.md`      |
| Context   | Spec — why decisions made   | `CONTEXT_{feature}.md`   |
| Checklist | Schedule — done & remaining | `CHECKLIST_{feature}.md` |

Workflow flow:

1. AI writes plan in **Korean** → user review
2. After approval, save 3 docs in **English** to `ai-system/.memory/`
3. "Stop after saving" — continue work in a new conversation

---

### Phase 3: Domain Skills (🟡 Medium Priority)

Each skill includes `SKILL.md` (YAML frontmatter + globs), `INDEX.md` (table of contents), and `chapters/` (detailed guides structured from `project.md`).

#### 3.1 Frontend → `ai-system/.skills/frontend/`

- **Globs**: `**/app/**`, `**/*.tsx`, `**/*.ts`, `**/components/**`
- **INDEX.md**: Next.js 16 App Router, FSD Architecture, Tailwind + shadcn Styling
- **chapters/**:
  - `nextjs-app-router.md`
  - `fsd-architecture.md`
  - `styling-guide.md`

#### 3.2 Backend → `ai-system/.skills/backend/`

- **Globs**: `**/src/main/java/**`, `**/*.java`, `**/build.gradle*`
- **INDEX.md**: Spring Boot 3, DDD Architecture, JWT + Spring Security
- **chapters/**:
  - `spring-boot-setup.md`
  - `ddd-architecture.md`
  - `security-jwt.md`

#### 3.3 Database → `ai-system/.skills/database/`

- **Globs**: `**/*.sql`, `**/entity/**`, `**/repository/**`
- **chapters/**:
  - `postgresql-schema.md` (based on DBML in `project.md`)
  - `redis-config.md` (Refresh Token TTL settings)

#### 3.4 DevOps → `ai-system/.skills/devops/`

- **Globs**: `**/docker-compose*`, `**/Dockerfile*`, `**/.github/**`, `**/.env*`
- **chapters/**:
  - `docker-compose.md`
  - `aws-deploy.md` (EC2, RDS, Nginx, GitHub Actions)

---

### Phase 4: Quality System (🟡 Medium Priority)

#### 4.1 `/check` workflow → `.agent/workflows/check.md` (root)

Post-task quality gate:

```
1. Collect changed files via git diff
2. FE changes: cd frontend && npx eslint + npx tsc --noEmit
3. BE changes: cd backend && ./gradlew spotlessCheck + ./gradlew compileJava
4. Output self-check reminders:
   - "Did you add error handling (try-catch)?"
   - "Any security risks?"
   - "Are type definitions correct?"
5. Few errors → AI auto-fix
6. Many errors → Recommend specialist agent
```

#### 4.2 Quality gate skill → `ai-system/.skills/quality-gate/`

- Self-check reminder checklist
- Error severity guide (minor → AI auto-fix vs major → specialist agent)

---

### Phase 5: Agent System (🟢 Low Priority)

#### 5.1 QA agent → `ai-system/.skills/agents/qa-agent/SKILL.md`

- **Role**: Code review, error fixing, structure improvement (static analysis)
- **Report format**: Findings → Fixes → Rationale
- **Trigger**: When `/check` discovers many errors

#### 5.2 Test agent → `ai-system/.skills/agents/test-agent/SKILL.md`

- **Role**: Functional testing, runtime error diagnosis, screen verification
- **Tools**: FE — Playwright/Vitest, BE — JUnit + MockMvc
- **Report format**: Test results → Failure cause → Fix suggestions

#### 5.3 Planning agent → `ai-system/.skills/agents/planning-agent/SKILL.md`

- **Role**: Plan drafting, review document creation (no code changes)
- **Report format**: Requirement analysis → Implementation plan → Risk assessment

#### 5.4 `/report` workflow → `.agent/workflows/report.md` (root)

Enforce structured agent reports:

```
1. What was found
2. What was fixed
3. Why that decision was made
```

Reports saved to `ai-system/.memory/reports/`

---

## 5. System Flow (Summary)

```
User Prompt
  → Antigravity detects keywords / file patterns
  → Loads relevant SKILL.md from ai-system/.skills/ (L1 → L2 → L3)
  → Big task? → /plan → Korean plan → User approval → /memory → 3 English docs in ai-system/.memory/
  → AI performs work
  → /check → git diff → cd frontend/backend → lint/type-check → self-check reminders
  → Errors few? → AI auto-fix
  → Errors many? → Specialist agent → /report → save to ai-system/.memory/reports/
  → ✅ Done
```

---

## 6. Out of Scope (for now)

- Runtime test execution (covered by test-agent skill, not automated)
- CI/CD pipeline integration (workflow files are local-only)
- Multi-workspace sync
