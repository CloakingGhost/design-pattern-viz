---
description: Generate structured agent reports after specialist work. Documents findings, fixes, and rationale. Saves to ai-system/.memory/reports/.
---

# /report — Agent Report Workflow

Generate a structured report after a specialist agent completes work.

## Prerequisites

- A specialist agent (QA, Test, or Planning) has finished its task
- Findings and actions are available in the current context

## Steps

### 1. Determine Report Type

// turbo

- Identify which agent produced the work (QA, Test, or Planning)
- Set the report filename: `{AGENT}_{date}_{topic}.md`

### 2. Write Report

// turbo
Create the report in `ai-system/.memory/reports/` with this structure:

```markdown
# {Agent Type} Report — {date}

> **Agent**: {QA | Test | Planning}
> **Scope**: {What was analyzed/tested/planned}

## 1. Findings

{What was discovered — errors, issues, requirements}

## 2. Actions Taken

{What was fixed, tested, or planned — with specific file references}

## 3. Rationale

{Why these decisions were made — convention references, best practices}

## 4. Remaining Items

{Issues that need follow-up or human decision}
```

### 3. Save and Notify

// turbo

- Save report to `ai-system/.memory/reports/`
- Inform the user of the report location
- Summarize key findings in the chat
