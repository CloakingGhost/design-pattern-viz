---
name: quality-gate
description: Quality gate skill with self-check reminder checklists and error severity guide. Helps AI evaluate code quality and decide between auto-fix vs specialist agent escalation.
---

# Quality Gate Skill

## Purpose

Provides quality assurance guidelines for evaluating code changes after task completion.

## When to Use

This skill supports the `/check` workflow. It activates when:

- Reviewing code changes for quality
- Deciding whether errors need auto-fix or specialist attention
- Running post-task quality validation

## Key Rules

1. **Always run checks after code changes** — Never skip quality gates
2. **Self-check before commit** — Review the reminder checklist
3. **Escalate wisely** — Minor issues: auto-fix. Major issues: specialist agent.

## Chapter References

See `INDEX.md` for detailed checklists and guides.
