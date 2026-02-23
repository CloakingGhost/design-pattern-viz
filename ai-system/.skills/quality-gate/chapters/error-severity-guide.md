# Error Severity Guide

## Overview

After running quality checks, classify errors by severity to decide the appropriate response.

## Severity Levels

### 🟢 Minor (AI Auto-Fix)

Errors that AI can fix immediately without human review:

- Formatting issues (whitespace, indentation, trailing commas)
- Missing semicolons or import statements
- Unused variable warnings
- Simple type annotation fixes
- Missing `"use client"` directive

**Action**: AI fixes automatically → re-run checks → confirm clean

### 🟡 Moderate (AI Fix + Human Review)

Errors that AI can attempt to fix but should flag for review:

- Logic errors in simple functions
- Missing error handling (try-catch)
- Incorrect API response types
- Missing validation annotations
- Wrong FSD/DDD import direction

**Action**: AI proposes fix → highlight for user review

### 🔴 Major (Specialist Agent)

Errors that require specialized attention:

- Multiple interconnected type errors (5+)
- Security vulnerabilities (SQL injection, XSS, auth bypass)
- Architecture violations across multiple files
- Test failures in core business logic
- Performance issues (N+1 queries, memory leaks)

**Action**: Recommend specialist agent:

| Error Type             | Recommended Agent |
| :--------------------- | :---------------- |
| Static analysis, lint  | QA Agent          |
| Test failures, runtime | Test Agent        |
| Architecture, planning | Planning Agent    |

## Escalation Flow

```
Errors found
  ├── 1-3 minor errors → AI auto-fix → re-check → ✅ Done
  ├── 1-3 moderate errors → AI fix + flag for review → ✅ Done
  └── 4+ errors or any major → Recommend specialist agent
       └── Agent runs → /report → save to ai-system/.memory/reports/
```
