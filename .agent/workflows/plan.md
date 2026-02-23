---
description: Force planning before big tasks. Analyze status → write Korean plan → wait for approval → save memory documents.
---

# /plan — Planning Workflow

Use this workflow before starting any large feature or significant change.

## Steps

### 1. Analyze Current Status

// turbo

- Read the existing memory documents in `ai-system/.memory/` (if any)
- Check `ai-system/.memory/CHECKLIST_*.md` for in-progress items
- Review recent git log for context

### 2. Write Plan in Korean

- Draft a comprehensive plan in **Korean** for user review
- Include:
  - Current situation analysis
  - What will be built/changed
  - Expected file changes
  - Potential risks or concerns
- Present the plan to the user and **wait for approval**

### 3. User Approval Gate

- **Do NOT proceed** until the user explicitly approves the plan
- If the user requests changes, revise the plan and re-present
- This step is critical — AI misunderstanding the requirement is common

### 4. Save Memory Documents

- Once approved, execute the `/memory` workflow
- This will generate 3 English documents in `ai-system/.memory/`
- **Stop after saving** — the user will start a new conversation to continue work
