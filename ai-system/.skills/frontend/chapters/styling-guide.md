# Styling Guide — Tailwind CSS + shadcn/ui

## Overview

- **Utility-first CSS**: Tailwind CSS
- **Component library**: shadcn/ui (installed via CLI, lives in `frontend/src/shared/ui/`)
- **Class merging**: `clsx` for conditional classes
- **Animations**: Framer Motion for complex animations, Tailwind for simple transitions

## Tailwind Usage

### Class Ordering Convention

Follow this order for readability:

1. Layout (`flex`, `grid`, `block`)
2. Sizing (`w-`, `h-`, `max-w-`)
3. Spacing (`p-`, `m-`, `gap-`)
4. Typography (`text-`, `font-`, `leading-`)
5. Colors (`bg-`, `text-`, `border-`)
6. Effects (`shadow-`, `opacity-`, `rounded-`)
7. States (`hover:`, `focus:`, `active:`)

### Conditional Classes with clsx

```tsx
import { clsx } from "clsx";

<div
  className={clsx(
    "flex items-center p-4 rounded-lg",
    isActive && "bg-blue-500 text-white",
    isDisabled && "opacity-50 cursor-not-allowed",
  )}
/>;
```

## shadcn/ui

### Configuration

- Config file: `frontend/components.json`
- Components location: `frontend/src/shared/ui/`
- Install new components: `cd frontend && npx shadcn@latest add <component>`

### Usage

```tsx
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
```

## Framer Motion

Use for design pattern animations (the core feature of this project):

```tsx
"use client";
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>;
```

## Icons

Use **Lucide React** for all icons:

```tsx
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

<Play className="w-5 h-5" />;
```
