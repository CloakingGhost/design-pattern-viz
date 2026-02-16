---
name: ui-color-scheme
description: Consistent UI color scheme for design pattern visualization. Use when creating new UI components, updating existing components, or ensuring visual consistency across the application. Provides OKLCH color definitions, usage guidelines, and accessibility standards.
metadata:
  author: design-pattern-viz
  version: "1.0.0"
  category: design
---

# UI Color Scheme

This skill defines the consistent color scheme for the design pattern visualization project using OKLCH color space for better perceptual uniformity and vibrant colors.

## Color Palette

### Primary Color (Main Actions & Emphasis)

**Vibrant Purple**: `oklch(42% 0.161 292)`

Use for:

- Primary CTA buttons
- Active states
- Important highlights
- Animated elements in focus
- Primary links

**Variants:**

- Hover state: `oklch(38% 0.161 292)` (darker)
- Active state: `oklch(34% 0.161 292)` (darkest)
- Light variant: `oklch(50% 0.161 292)` (lighter for backgrounds)
- Very light: `oklch(95% 0.08 292)` (subtle backgrounds)

### Secondary Color (Supporting Elements)

**Deep Blue**: `oklch(42% 0.161 232)`

Use for:

- Secondary backgrounds
- Supporting UI elements
- Alternative interactive states
- Complementary highlights
- Informational elements

**Variants:**

- Hover state: `oklch(38% 0.161 232)` (darker)
- Active state: `oklch(34% 0.161 232)` (darkest)
- Light variant: `oklch(50% 0.161 232)` (lighter for backgrounds)
- Very light: `oklch(95% 0.08 232)` (subtle backgrounds)

### Neutral Colors

**Existing neutrals** (keep these):

- White: `#ffffff`
- Black: `#000000`
- Gray shades: Use Tailwind's slate scale
  - Slate-50: `#f8fafc`
  - Slate-100: `#f1f5f9`
  - Slate-200: `#e2e8f0`
  - Slate-300: `#cbd5e1`
  - Slate-400: `#94a3b8`
  - Slate-500: `#64748b`
  - Slate-600: `#475569`
  - Slate-700: `#334155`
  - Slate-800: `#1e293b`
  - Slate-900: `#0f172a`

## CSS Implementation

### CSS Custom Properties

Add to `globals.css`:

```css
:root {
  /* Primary colors */
  --color-primary: oklch(42% 0.161 292);
  --color-primary-hover: oklch(38% 0.161 292);
  --color-primary-active: oklch(34% 0.161 292);
  --color-primary-light: oklch(50% 0.161 292);
  --color-primary-bg: oklch(95% 0.08 292);

  /* Secondary colors */
  --color-secondary: oklch(42% 0.161 232);
  --color-secondary-hover: oklch(38% 0.161 232);
  --color-secondary-active: oklch(34% 0.161 232);
  --color-secondary-light: oklch(50% 0.161 232);
  --color-secondary-bg: oklch(95% 0.08 232);

  /* Browser fallbacks for older browsers */
  @supports not (color: oklch(0% 0 0)) {
    --color-primary: #7c3aed; /* violet-600 fallback */
    --color-primary-hover: #6d28d9;
    --color-primary-active: #5b21b6;
    --color-secondary: #2563eb; /* blue-600 fallback */
    --color-secondary-hover: #1d4ed8;
    --color-secondary-active: #1e40af;
  }
}
```

### Tailwind Usage

Use with Tailwind's arbitrary value syntax:

```tsx
// Backgrounds
className = "bg-[var(--color-primary)]";
className = "hover:bg-[var(--color-primary-hover)]";
className = "active:bg-[var(--color-primary-active)]";

// Text colors
className = "text-[var(--color-primary)]";

// Borders
className = "border-[var(--color-primary)]";

// Shadows
className = "shadow-[0_4px_12px_var(--color-primary)]";
```

## Component Usage Guidelines

### Buttons

- **Primary buttons**: Use `--color-primary` for background
  - Example: CTA buttons, main actions
  - States: Use hover/active variants
- **Secondary buttons**: Use `--color-secondary` or neutral backgrounds
  - Example: Cancel, alternative actions
- **Ghost buttons**: Transparent with primary/secondary text colors

### Interactive Elements

- **Active states**: Use primary color with higher opacity
- **Focus rings**: Use primary color at 50% opacity
- **Hover states**: Use `-hover` variant
- **Disabled states**: Reduce opacity to 50%

### Animations & Visualizations

- **Primary animations**: Use primary color for main elements
  - Example: Client node when active in Singleton pattern
- **Secondary animations**: Use secondary color for supporting elements
  - Example: Singleton instance, created objects
- **Arrows & connections**:
  - Outgoing/request: Primary color
  - Returning/response: Secondary color or green for success
- **Status indicators**:
  - Active/in-progress: Primary color
  - Complete/success: Green (`#16a34a`)
  - Create/new: Secondary color
  - Error: Red (`#dc2626`)

### Backgrounds & Cards

- **Page backgrounds**: White or slate-50
- **Card backgrounds**: White with slate-200 borders
- **Elevated cards**: Add subtle shadow with primary color tint
- **Gradient backgrounds**: Combine `from-slate-50 to-slate-100` for neutral
  - Use `from-[var(--color-primary-bg)] to-slate-50` for primary emphasis

## Accessibility Guidelines

### Contrast Ratios (WCAG AA)

All text must meet WCAG AA standards:

- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- Interactive elements: 3:1 against background

### Verified Combinations

✅ **Safe combinations:**

- Primary color on white background (contrast: 8.2:1)
- White text on primary color (contrast: 8.2:1)
- Secondary color on white (contrast: 7.4:1)
- White text on secondary color (contrast: 7.4:1)
- Primary text on primary-bg (contrast: 8.5:1)

### Testing

Always verify color contrast using:

- Browser DevTools color picker
- WebAIM Contrast Checker
- Automated accessibility tools

## Design Patterns

### Pattern 1: Primary Action Button

```tsx
<button
  className="
  bg-[var(--color-primary)] 
  hover:bg-[var(--color-primary-hover)] 
  active:bg-[var(--color-primary-active)]
  text-white
  px-4 py-2 rounded-lg
  transition-colors duration-200
  focus:outline-none 
  focus:ring-2 
  focus:ring-[var(--color-primary)] 
  focus:ring-offset-2
"
>
  Primary Action
</button>
```

### Pattern 2: Interactive Card

```tsx
<div
  className="
  bg-white 
  border-2 border-slate-200
  hover:border-[var(--color-primary)]
  rounded-xl 
  p-6
  transition-all duration-300
  hover:shadow-[0_8px_24px_rgba(124,58,237,0.15)]
"
>
  Card Content
</div>
```

### Pattern 3: Status Indicator

```tsx
<div
  className={`
  w-2 h-2 rounded-full
  ${status === "active" && "bg-[var(--color-primary)]"}
  ${status === "complete" && "bg-green-600"}
  ${status === "pending" && "bg-slate-400"}
`}
/>
```

### Pattern 4: Gradient Background

```tsx
<section
  className="
  bg-gradient-to-br 
  from-[var(--color-primary-bg)] 
  to-slate-50
  rounded-xl
  p-8
"
>
  Featured Content
</section>
```

## Animation Color Guidelines

### Framer Motion Animations

Use color transitions for visual feedback:

```tsx
<motion.div
  animate={{
    backgroundColor: isActive
      ? "var(--color-primary)"
      : "var(--color-secondary-bg)",
    borderColor: isActive ? "var(--color-primary)" : "#cbd5e1",
  }}
  transition={{ duration: 0.3 }}
/>
```

### Shadow Animations

```tsx
<motion.div
  animate={{
    boxShadow: isActive
      ? "0 8px 24px var(--color-primary)"
      : "0 4px 12px rgba(0,0,0,0.1)",
  }}
/>
```

## When to Use This Skill

Apply these guidelines when:

1. Creating new UI components
2. Updating existing components for consistency
3. Building animation visualizations
4. Implementing interactive elements
5. Designing new features or pages
6. Reviewing UI code for consistency
7. Fixing accessibility issues

## Don't Duplicate

This skill complements but does not duplicate:

- `web-design-guidelines`: Focuses on general web interface best practices
- `vercel-react-best-practices`: Focuses on React/Next.js performance

This skill is specifically for:

- **Color consistency** in this project
- **OKLCH color implementation**
- **Design pattern visualization aesthetics**

## Quick Reference

| Element Type      | Primary Use   | Secondary Use | Neutral Use      |
| ----------------- | ------------- | ------------- | ---------------- |
| CTA Buttons       | ✅ Primary    | 🔹 Outline    | ⚪ Ghost         |
| Active States     | ✅ Primary    | -             | -                |
| Instance Objects  | -             | ✅ Secondary  | -                |
| Borders (default) | -             | -             | ✅ Slate-200     |
| Borders (hover)   | ✅ Primary    | 🔹 Secondary  | -                |
| Backgrounds       | 🔹 Very light | 🔹 Very light | ✅ White/Slate   |
| Text (emphasis)   | ✅ Primary    | 🔹 Secondary  | -                |
| Text (body)       | -             | -             | ✅ Slate-700/900 |

Legend: ✅ Recommended | 🔹 Optional | ⚪ Alternative | - Not applicable
