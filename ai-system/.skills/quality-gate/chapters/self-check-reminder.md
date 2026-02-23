# Self-Check Reminder Checklist

## Overview

After every code change, review this checklist before committing. These reminders catch common issues that static analysis tools may miss.

## Universal Checks

- [ ] **Error handling**: Are `try-catch` blocks added where exceptions can occur?
- [ ] **Security**: No hardcoded secrets, passwords, or API keys?
- [ ] **Type safety**: Are all types properly defined (no `any` in TS, no raw types in Java)?
- [ ] **Null safety**: Are null/undefined cases handled?
- [ ] **Input validation**: Is user input validated before processing?

## Frontend Checks

- [ ] **Import direction**: Following FSD layer rules? (no upward imports)
- [ ] **Public API**: Importing from `index.ts` barrel files only?
- [ ] **Client/Server**: Is `"use client"` added only where needed?
- [ ] **Accessibility**: Do interactive elements have proper ARIA attributes?
- [ ] **Responsive**: Does the UI work on mobile viewports?
- [ ] **Loading states**: Are loading/error states handled for async operations?

## Backend Checks

- [ ] **DDD layers**: Following import direction? (domain has no external dependencies)
- [ ] **DTO separation**: Never exposing domain entities directly to controllers?
- [ ] **Validation**: `@Valid` annotations on request DTOs?
- [ ] **Transaction**: Are service methods properly annotated with `@Transactional`?
- [ ] **Soft delete**: Using `is_deleted` flag instead of hard delete?
- [ ] **Audit fields**: Are `created_at` / `updated_at` being set?

## Database Checks

- [ ] **Index usage**: Are queries using existing indexes?
- [ ] **N+1 problem**: Are JPA fetch strategies appropriate?
- [ ] **Migration**: Does the schema change require a migration script?
