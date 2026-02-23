# AI System — Implementation Checklist

> **Status**: 🟡 In Progress
> **Last Updated**: 2026-02-23
> **Total Items**: 22

---

## Phase 0: Working Memory Documents

- [x] Create `ai-system/.memory/PLAN_ai_system.md`
- [x] Create `ai-system/.memory/CONTEXT_ai_system.md`
- [x] Create `ai-system/.memory/CHECKLIST_ai_system.md` (this file)
- [x] User review and approval of memory documents

---

## Phase 1: Foundation (🔴 High Priority) ✅

- [x] 1.1 Create `CONVENTIONS.md` at **monorepo root**
  - [x] Git commit message rules (feat, fix, docs, style, refactor, test, chore)
  - [x] FE code style: ESLint compliance
  - [x] BE code style: Spotless compliance
  - [x] Korean plan → English document conversion principle
- [x] 1.2 Create `ai-system/.memory/.gitkeep`
- [x] 1.3 Create `ai-system/.skills/skill-creator/SKILL.md`
  - [x] YAML frontmatter with name + description
  - [x] Skill directory structure guide
  - [x] INDEX.md authoring instructions
  - [x] Chapter file conventions

---

## Phase 2: Workflows — Plan & Memory (🔴 High Priority)

- [ ] 2.1 Create `.agent/workflows/plan.md` (root)
  - [ ] Step 1: Analyze current project state
  - [ ] Step 2: Write plan in Korean
  - [ ] Step 3: Wait for user approval
  - [ ] Step 4: Call `/memory` to persist documents
- [ ] 2.2 Create `.agent/workflows/memory.md` (root)
  - [ ] Step 1: Generate `PLAN_{feature}.md` in English
  - [ ] Step 2: Generate `CONTEXT_{feature}.md` in English
  - [ ] Step 3: Generate `CHECKLIST_{feature}.md` in English
  - [ ] Step 4: Save to `ai-system/.memory/`, then stop

---

## Phase 3: Domain Skills (🟡 Medium Priority)

- [ ] 3.1 `ai-system/.skills/frontend/`
  - [ ] `SKILL.md` — YAML with globs: `**/app/**`, `**/*.tsx`, `**/*.ts`, `**/components/**`
  - [ ] `INDEX.md` — Table of contents
  - [ ] `chapters/nextjs-app-router.md`
  - [ ] `chapters/fsd-architecture.md`
  - [ ] `chapters/styling-guide.md` (Tailwind + shadcn)
- [ ] 3.2 `ai-system/.skills/backend/`
  - [ ] `SKILL.md` — YAML with globs: `**/src/main/java/**`, `**/*.java`, `**/build.gradle*`
  - [ ] `INDEX.md` — Table of contents
  - [ ] `chapters/spring-boot-setup.md`
  - [ ] `chapters/ddd-architecture.md`
  - [ ] `chapters/security-jwt.md`
- [ ] 3.3 `ai-system/.skills/database/`
  - [ ] `SKILL.md` — YAML with globs: `**/*.sql`, `**/entity/**`, `**/repository/**`
  - [ ] `INDEX.md` — Table of contents
  - [ ] `chapters/postgresql-schema.md` (DBML-based)
  - [ ] `chapters/redis-config.md`
- [ ] 3.4 `ai-system/.skills/devops/`
  - [ ] `SKILL.md` — YAML with globs: `**/docker-compose*`, `**/Dockerfile*`, `**/.github/**`, `**/.env*`
  - [ ] `INDEX.md` — Table of contents
  - [ ] `chapters/docker-compose.md`
  - [ ] `chapters/aws-deploy.md`

---

## Phase 4: Quality System (🟡 Medium Priority)

- [ ] 4.1 Create `.agent/workflows/check.md` (root)
  - [ ] Git diff to collect changed files
  - [ ] FE checks: `cd frontend && npx eslint` + `cd frontend && npx tsc --noEmit`
  - [ ] BE checks: `cd backend && ./gradlew spotlessCheck` + `cd backend && ./gradlew compileJava`
  - [ ] Self-check reminder output
  - [ ] Auto-fix logic (few errors) vs escalation (many errors)
- [ ] 4.2 Create `ai-system/.skills/quality-gate/`
  - [ ] `SKILL.md` — quality gate skill definition
  - [ ] `chapters/self-check-reminder.md` — checklist items
  - [ ] `chapters/error-severity-guide.md` — minor (AI fix) vs major (specialist)

---

## Phase 5: Agent System (🟢 Low Priority)

- [ ] 5.1 Create `ai-system/.skills/agents/qa-agent/SKILL.md`
  - [ ] Role: code review, error fix, structure improvement (static analysis)
  - [ ] Report format: findings → fixes → rationale
- [ ] 5.2 Create `ai-system/.skills/agents/test-agent/SKILL.md`
  - [ ] Role: functional testing, runtime error diagnosis, screen verification
  - [ ] FE: Playwright/Vitest, BE: JUnit + MockMvc
  - [ ] Report format: test results → failure cause → fix suggestion
- [ ] 5.3 Create `ai-system/.skills/agents/planning-agent/SKILL.md`
  - [ ] Role: planning, review docs (no code changes)
  - [ ] Report format: requirements analysis → plan → risk assessment
- [ ] 5.4 Create `.agent/workflows/report.md` (root)
  - [ ] Step 1: Document findings
  - [ ] Step 2: Document fixes
  - [ ] Step 3: Document rationale
  - [ ] Reports saved to `ai-system/.memory/reports/`

---

## Verification (after all phases)

- [ ] Skill recognition test: FE question → frontend skill auto-loaded from `ai-system/.skills/`
- [ ] Workflow test: `/plan` command triggers planning process
- [ ] User manual review: YAML metadata correctness in all SKILL.md files
- [ ] `/check` workflow test: lint/type-check results (with `cd frontend`/`cd backend`)
- [ ] `ai-system/.memory/` document review: documents generated as intended
