# AI System — Implementation Checklist

> **Status**: ✅ Complete
> **Last Updated**: 2026-02-24
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

## Phase 2: Workflows — Plan & Memory (🔴 High Priority) ✅

- [x] 2.1 Create `.agent/workflows/plan.md` (root)
  - [x] Step 1: Analyze current project state
  - [x] Step 2: Write plan in Korean
  - [x] Step 3: Wait for user approval
  - [x] Step 4: Call `/memory` to persist documents
- [x] 2.2 Create `.agent/workflows/memory.md` (root)
  - [x] Step 1: Generate `PLAN_{feature}.md` in English
  - [x] Step 2: Generate `CONTEXT_{feature}.md` in English
  - [x] Step 3: Generate `CHECKLIST_{feature}.md` in English
  - [x] Step 4: Save to `ai-system/.memory/`, then stop

---

## Phase 3: Domain Skills (🟡 Medium Priority) ✅

- [x] 3.1 `ai-system/.skills/frontend/`
  - [x] `SKILL.md` — YAML with globs: `**/app/**`, `**/*.tsx`, `**/*.ts`, `**/components/**`
  - [x] `INDEX.md` — Table of contents
  - [x] `chapters/nextjs-app-router.md`
  - [x] `chapters/fsd-architecture.md`
  - [x] `chapters/styling-guide.md` (Tailwind + shadcn)
- [x] 3.2 `ai-system/.skills/backend/`
  - [x] `SKILL.md` — YAML with globs: `**/src/main/java/**`, `**/*.java`, `**/build.gradle*`
  - [x] `INDEX.md` — Table of contents
  - [x] `chapters/spring-boot-setup.md`
  - [x] `chapters/ddd-architecture.md`
  - [x] `chapters/security-jwt.md`
- [x] 3.3 `ai-system/.skills/database/`
  - [x] `SKILL.md` — YAML with globs: `**/*.sql`, `**/entity/**`, `**/repository/**`
  - [x] `INDEX.md` — Table of contents
  - [x] `chapters/postgresql-schema.md` (DBML-based)
  - [x] `chapters/redis-config.md`
- [x] 3.4 `ai-system/.skills/devops/`
  - [x] `SKILL.md` — YAML with globs: `**/docker-compose*`, `**/Dockerfile*`, `**/.github/**`, `**/.env*`
  - [x] `INDEX.md` — Table of contents
  - [x] `chapters/docker-compose.md`
  - [x] `chapters/aws-deploy.md`

---

## Phase 4: Quality System (🟡 Medium Priority) ✅

- [x] 4.1 Create `.agent/workflows/check.md` (root)
  - [x] Git diff to collect changed files
  - [x] FE checks: `cd frontend && npx eslint` + `cd frontend && npx tsc --noEmit`
  - [x] BE checks: `cd backend && ./gradlew spotlessCheck` + `cd backend && ./gradlew compileJava`
  - [x] Self-check reminder output
  - [x] Auto-fix logic (few errors) vs escalation (many errors)
- [x] 4.2 Create `ai-system/.skills/quality-gate/`
  - [x] `SKILL.md` — quality gate skill definition
  - [x] `chapters/self-check-reminder.md` — checklist items
  - [x] `chapters/error-severity-guide.md` — minor (AI fix) vs major (specialist)

---

## Phase 5: Agent System (🟢 Low Priority) ✅

- [x] 5.1 Create `ai-system/.skills/agents/qa-agent/SKILL.md`
  - [x] Role: code review, error fix, structure improvement (static analysis)
  - [x] Report format: findings → fixes → rationale
- [x] 5.2 Create `ai-system/.skills/agents/test-agent/SKILL.md`
  - [x] Role: functional testing, runtime error diagnosis, screen verification
  - [x] FE: Playwright/Vitest, BE: JUnit + MockMvc
  - [x] Report format: test results → failure cause → fix suggestion
- [x] 5.3 Create `ai-system/.skills/agents/planning-agent/SKILL.md`
  - [x] Role: planning, review docs (no code changes)
  - [x] Report format: requirements analysis → plan → risk assessment
- [x] 5.4 Create `.agent/workflows/report.md` (root)
  - [x] Step 1: Document findings
  - [x] Step 2: Document fixes
  - [x] Step 3: Document rationale
  - [x] Reports saved to `ai-system/.memory/reports/`

---

## Verification (after all phases) ✅

- [x] Skill recognition test: 9 SKILL.md files found with valid YAML `name` + `description`
- [x] Workflow test: 4 workflows present — `/plan`, `/memory`, `/check`, `/report`
- [x] User manual review: All 9 SKILL.md YAML frontmatter validated (name + description)
- [x] `/check` workflow test: FE/BE lint/type-check commands correctly defined
- [x] `ai-system/.memory/` document review: 3 docs (PLAN, CONTEXT, CHECKLIST) + `reports/.gitkeep`
