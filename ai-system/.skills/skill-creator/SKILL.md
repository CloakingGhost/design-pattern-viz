---
name: skill-creator
description: Meta-skill that teaches AI how to create new skills. Covers directory structure, YAML frontmatter format, INDEX.md authoring, and chapter file conventions.
---

# Skill Creator — Meta-Skill

This skill defines the standard for creating new AI skills in the `ai-system/.skills/` directory.

---

## Skill Directory Structure

Every skill must follow this layout:

```
ai-system/.skills/<skill-name>/
├── SKILL.md              # Skill definition (YAML frontmatter + body)
├── INDEX.md              # Table of contents — lists all chapters
└── chapters/             # Detailed guide files
    ├── chapter-1.md
    ├── chapter-2.md
    └── ...
```

---

## SKILL.md Format

### YAML Frontmatter (Required)

```yaml
---
name: <skill-name>
description: <one-line description of what this skill does>
---
```

- **name**: Lowercase with hyphens (e.g., `frontend`, `backend`, `quality-gate`)
- **description**: Concise, English, max ~100 tokens. This is **always loaded** by Antigravity (L1).

### Body (Markdown)

The body is loaded when the skill triggers (L2, < 5k tokens). Include:

1. **Purpose**: What this skill covers
2. **When to use**: Which scenarios activate this skill
3. **Key rules**: Critical conventions to follow
4. **Chapter references**: Point to `chapters/` files for detailed content

---

## INDEX.md Format

```markdown
# <Skill Name> — Table of Contents

## Chapters

| #   | File                 | Topic               |
| --- | -------------------- | ------------------- |
| 1   | `chapters/<file>.md` | <brief description> |
| 2   | `chapters/<file>.md` | <brief description> |
```

- Purpose: Let the AI scan the TOC and load only the chapter it needs (L3)
- Keep descriptions concise — one line per chapter

---

## Chapter File Conventions

- **Language**: English
- **Filename**: Lowercase with hyphens (e.g., `nextjs-app-router.md`)
- **Structure**: Each chapter should be self-contained
  - Start with a heading (`# Topic Name`)
  - Include code examples where applicable
  - Reference `ai-system/file/project.md` for tech stack details
- **Length**: No strict limit, but aim for focused, scannable content

---

## How to Create a New Skill

1. Create directory: `ai-system/.skills/<skill-name>/`
2. Write `SKILL.md` with YAML frontmatter + body
3. Write `INDEX.md` with table of contents
4. Create `chapters/` directory and add chapter files
5. Verify: Start a new conversation and test if the skill auto-loads when relevant keywords or file patterns are detected
