# Feature-Sliced Design (FSD) Architecture

## Overview

This project follows **Feature-Sliced Design** adapted for Next.js App Router.

## Layer Structure

```
frontend/src/
├── app/            # App layer — routes, layouts, pages (Next.js App Router)
├── views/          # Views (widgets) — page-level compositions
├── widgets/        # Widgets — complex UI blocks combining features/entities
├── features/       # Features — user interactions (actions, forms)
├── entities/       # Entities — business objects (pattern, user, etc.)
├── shared/         # Shared — reusable utilities, UI kit, types, constants
└── data/           # Data — static data, pattern definitions
```

## Layer Rules

### Import Direction (Top → Bottom only)

```
app → views → widgets → features → entities → shared
```

- ✅ `app/` can import from `views/`, `widgets/`, `features/`, `entities/`, `shared/`
- ✅ `widgets/` can import from `features/`, `entities/`, `shared/`
- ✅ `features/` can import from `entities/`, `shared/`
- ❌ `shared/` must NEVER import from upper layers
- ❌ `entities/` must NEVER import from `features/` or above

### Each Layer Explained

| Layer       | Purpose                                 | Example                             |
| :---------- | :-------------------------------------- | :---------------------------------- |
| `app/`      | Routing, layouts, page entry points     | `app/page.tsx`, `app/layout.tsx`    |
| `views/`    | Full page compositions                  | `PatternDetailView`                 |
| `widgets/`  | Complex UI blocks                       | `PatternAnimationPlayer`            |
| `features/` | User actions, interactive behavior      | `PlayAnimation`, `StepControls`     |
| `entities/` | Business domain objects                 | `PatternCard`, `PatternModel`       |
| `shared/`   | UI kit, utilities, types, hooks, config | `Button`, `cn()`, `useStore`        |
| `data/`     | Static data, JSON, pattern definitions  | `patterns.ts`, `classifications.ts` |

## Segment Structure (within each layer)

```
frontend/src/entities/pattern/
├── ui/              # React components
├── model/           # Business logic, types, stores
├── api/             # API calls (if any)
├── lib/             # Utility functions
└── index.ts         # Public API — only export from here
```

### Public API Rule

- Each layer/feature exposes only through `index.ts`
- Other layers must import from `index.ts`, not from internal files

```tsx
// ✅ Correct
import { PatternCard } from "@/entities/pattern";

// ❌ Wrong — accessing internal structure
import { PatternCard } from "@/entities/pattern/ui/PatternCard";
```
