---
description: Generate 3 English memory documents (Plan, Context, Checklist) in ai-system/.memory/ for the current feature. Run after /plan approval.
---

# /memory — Memory Document Generator

Generate working memory documents that persist across conversation boundaries.

## Prerequisites

- A plan must have been approved via `/plan` workflow (or user explicitly requests memory generation)
- The approved plan content should be available in the current context

## Steps

### 1. Generate Plan Document

// turbo
Create `ai-system/.memory/PLAN_{feature}.md` in **English**:

```markdown
# {Feature Name} Implementation Plan

> **Project**: design-pattern-viz
> **Created**: {date}

## Objective

{What will be built — translated from the approved Korean plan}

## Architecture / Design Decisions

{Key technical decisions and rationale}

## Implementation Phases

{Phased breakdown of deliverables with paths}

## Out of Scope

{What is explicitly not covered}
```

### 2. Generate Context Document

// turbo
Create `ai-system/.memory/CONTEXT_{feature}.md` in **English**:

```markdown
# {Feature Name} — Context Note

> **Last Updated**: {date}

## Background

{Why this feature exists, business/technical motivation}

## Key Decisions

{Decision log — what was decided and why}

## Reference Documents

{Links to relevant files in ai-system/file/ or other sources}

## Constraints & Assumptions

{Technical limitations, assumptions made}
```

### 3. Generate Checklist Document

// turbo
Create `ai-system/.memory/CHECKLIST_{feature}.md` in **English**:

```markdown
# {Feature Name} — Implementation Checklist

> **Status**: 🟡 In Progress
> **Last Updated**: {date}

## Phase 1: {Phase Name}

- [ ] {Task 1}
  - [ ] {Subtask}
- [ ] {Task 2}

## Phase 2: {Phase Name}

- [ ] {Task 3}

## Verification

- [ ] {Verification step}
```

### 4. Stop

- After saving all 3 documents, **stop immediately**
- Inform the user: "Memory documents saved. Start a new conversation and say 'Read memory docs and continue work.'"
- Do **NOT** continue with implementation in the same conversation
