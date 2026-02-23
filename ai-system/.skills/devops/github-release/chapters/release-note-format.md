# Release Note Format

## Release Note Template

```markdown
# Release Notes

## YYYY-MM-DD

### ✨ Features

- **Feature Name**: Description ([`commit-hash`](link))

### 🐛 Bug Fixes

- **Fix Description**: Description ([`commit-hash`](link))

### 🔄 Refactoring

- **Refactoring Details**: Description ([`commit-hash`](link))

### ⚡ Performance

- **Optimization**: Description ([`commit-hash`](link))

### 📝 Documentation

- **Documentation Update**: Description ([`commit-hash`](link))

### 🎨 UI/UX

- **Design Change**: Description ([`commit-hash`](link))

### ⚙️ DevOps

- **Build/Deploy Change**: Description ([`commit-hash`](link))

---

## Summary of Key Changes

### 🎯 Core Features

- Major feature 1
- Major feature 2

### 🏗️ Architecture

- Architecture changes
```

> Omit any section that has no items.

## Commit Classification Rules

Analyze commit messages and map to categories:

| Category      | Keywords                              | Emoji |
| :------------ | :------------------------------------ | :---- |
| Features      | `feat`, `add`, `implement`, `new`     | ✨    |
| Bug Fixes     | `fix`, `resolve`, `patch`, `hotfix`   | 🐛    |
| Refactoring   | `refactor`, `clean`, `structure`      | 🔄    |
| Performance   | `optimize`, `speed`, `seo`, `perf`    | ⚡    |
| Documentation | `docs`, `readme`, `comment`           | 📝    |
| UI/UX         | `ui`, `design`, `style`, `component`  | 🎨    |
| DevOps        | `deploy`, `ci/cd`, `webhook`, `build` | ⚙️    |

## Release Title Format

```
v{version} - {Summary of major changes}
```

**Examples:**

- `v0.2.0 - Factory Method Pattern & Performance Improvements`
- `v1.0.0 - Major Architecture Refactoring`
- `v0.3.0-beta - New Animation System (Beta)`

## Versioning Strategy

Follow **Semantic Versioning** (`MAJOR.MINOR.PATCH`):

| Type  | When to Increment              | Example           |
| :---- | :----------------------------- | :---------------- |
| MAJOR | Breaking changes               | `1.0.0` → `2.0.0` |
| MINOR | New features (backward-compat) | `1.0.0` → `1.1.0` |
| PATCH | Bug fixes (backward-compat)    | `1.0.0` → `1.0.1` |

**Pre-release suffixes:**

- Alpha: `1.0.0-alpha.1`
- Beta: `1.0.0-beta.1`
- Release Candidate: `1.0.0-rc.1`

**Auto-increment via pnpm:**

```bash
pnpm version patch   # 0.1.0 → 0.1.1
pnpm version minor   # 0.1.1 → 0.2.0
pnpm version major   # 0.2.0 → 1.0.0
```
