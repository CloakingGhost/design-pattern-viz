# PostgreSQL Schema Design

## Overview

Schema is designed based on DBML definitions in `ai-system/file/project.md`.

## Tables

### users

User table aligned with Spring Security `UserDetails`.

| Column                    | Type           | Constraints   | Notes            |
| :------------------------ | :------------- | :------------ | :--------------- |
| `id`                      | `uuid`         | PK            |                  |
| `email`                   | `varchar(255)` | UNIQUE        | Used as username |
| `password`                | `varchar(60)`  | NOT NULL      | BCrypt hash      |
| `role`                    | `enum`         | NOT NULL      |                  |
| `enabled`                 | `boolean`      | DEFAULT true  | Account active   |
| `account_non_expired`     | `boolean`      | DEFAULT true  |                  |
| `account_non_locked`      | `boolean`      | DEFAULT true  |                  |
| `credentials_non_expired` | `boolean`      | DEFAULT true  |                  |
| `failed_login_attempts`   | `int`          | DEFAULT 0     |                  |
| `last_login_at`           | `timestamp(0)` |               |                  |
| `password_changed_at`     | `timestamp(0)` |               |                  |
| `is_deleted`              | `boolean`      | DEFAULT false | Soft delete      |
| `deleted_by`              | `uuid`         |               |                  |
| `deleted_at`              | `timestamp(0)` |               |                  |
| `created_at`              | `timestamp(0)` | NOT NULL      |                  |
| `updated_at`              | `timestamp(0)` |               |                  |

### pattern

Design pattern definitions.

| Column        | Type           | Constraints        | Notes |
| :------------ | :------------- | :----------------- | :---- |
| `id`          | `int`          | PK, AUTO_INCREMENT |       |
| `name_en`     | `varchar(32)`  | NOT NULL, INDEX    |       |
| `name_ko`     | `varchar(32)`  | INDEX              |       |
| `description` | `varchar(512)` |                    |       |
| `example`     | `varchar(512)` |                    |       |
| `is_deleted`  | `boolean`      | DEFAULT false      |       |
| `deleted_by`  | `uuid`         |                    |       |
| `deleted_at`  | `timestamp(0)` |                    |       |
| `created_at`  | `timestamp(0)` | NOT NULL           |       |
| `updated_at`  | `timestamp(0)` | NOT NULL           |       |

**Indexes**: `idx_pattern_en (name_en)`, `idx_pattern_ko (name_ko)`

### pattern_statistics

User interaction tracking (VIEW, PLAY, PAUSE, PREV, NEXT, RESET, COMPLETE).

| Column               | Type           | Constraints             | Notes                      |
| :------------------- | :------------- | :---------------------- | :------------------------- |
| `id`                 | `bigint`       | PK, AUTO_INCREMENT      |                            |
| `pattern_id`         | `int`          | FK → pattern.id         |                            |
| `visitor_identifier` | `varchar(255)` | NOT NULL                | UUID (member or anonymous) |
| `session_id`         | `varchar(255)` | NOT NULL                | Session tracking           |
| `action_type`        | `varchar(16)`  | NOT NULL                | Enum-like string           |
| `created_at`         | `timestamp(3)` | NOT NULL, DEFAULT now() | Millisecond precision      |

**Indexes**:

- `idx_pattern_summary (pattern_id, action_type, visitor_identifier)` — aggregate queries
- `idx_user_recent_action (visitor_identifier, created_at)` — recent user actions (DESC sort at app level)

### classifications

Pattern classification categories.

| Column       | Type           | Constraints        |
| :----------- | :------------- | :----------------- |
| `id`         | `int`          | PK, AUTO_INCREMENT |
| `name_en`    | `varchar(32)`  | NOT NULL, INDEX    |
| `name_ko`    | `varchar(32)`  | INDEX              |
| `created_at` | `timestamp(0)` | NOT NULL           |
| `updated_at` | `timestamp(0)` | NOT NULL           |

### pattern_classifications (M:N join table)

| Column               | Type           | Constraints             |
| :------------------- | :------------- | :---------------------- |
| `pattern_id`         | `int`          | FK → pattern.id         |
| `classifications_id` | `int`          | FK → classifications.id |
| `created_at`         | `timestamp(0)` | NOT NULL                |
| `updated_at`         | `timestamp(0)` | NOT NULL                |

### advantages / disadvantages

| Column       | Type           | Constraints        |
| :----------- | :------------- | :----------------- |
| `id`         | `int`          | PK, AUTO_INCREMENT |
| `content`    | `varchar(512)` |                    |
| `pattern_id` | `int`          | FK → pattern.id    |
| `created_at` | `timestamp(0)` | NOT NULL           |
| `updated_at` | `timestamp(0)` | NOT NULL           |

## Relationships

```
PATTERN ||--o{ PATTERN_STATISTICS     : "tracks actions"
PATTERN ||--o{ ADVANTAGES             : "has"
PATTERN ||--o{ DISADVANTAGES          : "has"
PATTERN ||--o{ PATTERN_CLASSIFICATIONS : "categorized"
CLASSIFICATIONS ||--o{ PATTERN_CLASSIFICATIONS : "applied to"
```
