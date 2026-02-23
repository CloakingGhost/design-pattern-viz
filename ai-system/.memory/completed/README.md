# completed/ — Archived Memory Documents

## Purpose

This folder stores the three working memory documents for **completed "big tasks"**.

During active work, the 3 documents live directly under `ai-system/.memory/`.
Once a task is fully done, they are moved into `completed/{feature}/` for archiving.

---

## Structure

```
ai-system/.memory/completed/
└── {feature}/                      # Completed feature or task name
    ├── PLAN_{feature}.md           # Blueprint — what was built
    ├── CONTEXT_{feature}.md        # Spec — why decisions were made
    └── CHECKLIST_{feature}.md      # Schedule — what was done and verified
```

### Currently Archived

| Folder       | Description                                |
| :----------- | :----------------------------------------- |
| `ai_system/` | AI agent system build (Phase 0–5 complete) |

---

## How to Use

### 1. Review Past History

Mention the `{feature}` name in your prompt to load the context of a past task.

> Example: `"Check the ai_system work history"`
> → AI reads `completed/ai_system/` and understands past decisions, structure, and checklist.

### 2. Reuse as Reference

Use past completed work as a reference when starting a similar new task.

> Example: `"Update the backend skill the same way we did for ai_system"`
> → AI follows the same patterns documented in `completed/ai_system/`.

### 3. Archive a New Task

When a big task is complete, move the documents here:

```bash
mkdir ai-system/.memory/completed/{feature}
mv ai-system/.memory/*_{feature}.md ai-system/.memory/completed/{feature}/
```

---

> [!NOTE]
> Documents in this folder are **read-only** reference materials.
> Copy them if you need to build on them — do not modify the originals.
