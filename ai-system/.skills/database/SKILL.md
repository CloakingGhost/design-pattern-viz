---
name: database
description: Database guide for PostgreSQL schema (DBML-based design), JPA entity mapping, and Redis configuration for Refresh Token storage.
---

# Database Skill

## Purpose

Provides schema design and data layer conventions for PostgreSQL and Redis.

## When to Use

This skill activates when working with:

- SQL files, migration scripts
- JPA entity classes (`backend/src/**/entity/**`)
- Repository classes (`backend/src/**/repository/**`)

## Tech Stack

- **Primary DB**: PostgreSQL
- **Cache/Session**: Redis (Refresh Token storage)
- **ORM**: JPA (Hibernate)

## Key Rules

1. **DBML is the source of truth** — Schema defined in `ai-system/file/project.md` (DBML section)
2. **Soft delete** — Use `is_deleted`, `deleted_by`, `deleted_at` fields instead of hard delete
3. **Audit fields** — All tables include `created_at`, `updated_at`
4. **UUID for users** — User ID is UUID type
5. **Timestamp precision** — Use `timestamp(0)` by default, `timestamp(3)` for `pattern_statistics`

## Chapter References

See `INDEX.md` for the schema details and Redis configuration.
