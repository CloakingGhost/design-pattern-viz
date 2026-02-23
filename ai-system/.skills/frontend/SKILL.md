---
name: frontend
description: Frontend development guide for Next.js 16 with Feature-Sliced Design (FSD), TypeScript, Tailwind CSS, shadcn/ui, Zustand, and Framer Motion. Covers App Router patterns, FSD architecture layers, and styling conventions.
---

# Frontend Skill

## Purpose

Provides conventions and guides for building the Next.js 16 frontend located in `frontend/`.

## When to Use

This skill activates when working with:

- Files in `frontend/src/app/`, `frontend/src/**/*.tsx`, `frontend/src/**/*.ts`
- Component files, page files, layout files
- Styling and UI-related tasks

## Tech Stack

- **Framework**: Next.js 16 (App Router) — ⚠️ Do NOT use Pages Router
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **HTTP**: Axios
- **Package Manager**: pnpm

## Key Rules

1. **App Router only** — Never create files under `pages/`. Use `frontend/src/app/` directory.
2. **FSD architecture** — Follow Feature-Sliced Design layers (see `chapters/fsd-architecture.md`)
3. **ESLint compliance** — Run `cd frontend && npx eslint .` before committing
4. **Type safety** — Run `cd frontend && npx tsc --noEmit` to verify types
5. **shadcn components** — Use shadcn/ui components from `frontend/src/shared/ui/`

## Chapter References

See `INDEX.md` for detailed guides:

- Next.js App Router patterns
- FSD architecture and layer rules
- Tailwind + shadcn styling guide
