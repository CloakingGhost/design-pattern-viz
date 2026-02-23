# Next.js 16 App Router

## Overview

This project uses **Next.js 16 with App Router**. Do NOT use Pages Router — it conflicts with FSD architecture.

## Directory Structure

All routes live under `frontend/src/app/`:

```
frontend/src/app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles
├── [pattern]/          # Dynamic route for design patterns
│   └── page.tsx
└── ...
```

## Key Conventions

### Layouts & Pages

- `layout.tsx` — Shared UI wrapper (persists across navigations)
- `page.tsx` — Unique content for each route
- `loading.tsx` — Loading UI (optional)
- `error.tsx` — Error boundary (optional)
- `not-found.tsx` — 404 page (optional)

### Server vs Client Components

- **Default is Server Component** — no `"use client"` directive needed
- Add `"use client"` only when you need:
  - React hooks (`useState`, `useEffect`, etc.)
  - Browser APIs (`window`, `document`)
  - Event handlers (`onClick`, `onChange`)
  - Zustand state access

### Dynamic Routes

```tsx
// frontend/src/app/[pattern]/page.tsx
export default function PatternPage({
  params,
}: {
  params: { pattern: string };
}) {
  // ...
}
```

### Metadata

```tsx
export const metadata = {
  title: "Design Pattern Viz",
  description: "Visual learning for GoF design patterns",
};
```

## Important Warnings

- ⚠️ Never import from `next/router` — use `next/navigation` instead
- ⚠️ `getServerSideProps` / `getStaticProps` do NOT exist in App Router — use Server Components or Route Handlers
