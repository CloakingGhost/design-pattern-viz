---
name: generate_and_publish_release
description: Generates GitHub release notes from git log, requests user approval, and optionally publishes to GitHub Releases with full customization
disable-model-invocation: false
argument-hint: version (string, optional), prerelease (boolean), draft (boolean), target-branch (string)
---

# GitHub Release Automation Skill

This skill analyzes Git logs to generate release notes and automatically deploys GitHub Releases after user approval.

## 🎯 Objective

1. **Automatic Release Note Generation**: Analyze Git commit history by date to create professional release notes
2. **User Approval Process**: Users review and approve generated release notes
3. **Automatic GitHub Release Deployment**: Auto-generate releases via GitHub CLI after approval

## 📋 Prerequisites

### GitHub CLI Installation and Authentication

This skill uses GitHub CLI (`gh`):

```bash
# Check installation
gh --version

# Install on Windows (if not installed)
winget install --id GitHub.cli

# Authenticate
gh auth login
```

## 🔄 Execution Flow

### Phase 1: Release Note Generation

1. **Collect Git Logs**

   ```bash
   git log --pretty=format:"%H|%ad|%s|%an" --date=short --all
   ```

2. **Organize by Date**
   - Group commits by date
   - Categorize each commit (Features, Bug Fixes, Refactoring, etc.)

3. **Generate Release Title**
   - Format: `v{version} - {Summary of major changes}`
   - Example: `v0.2.0 - Factory Method Pattern & Performance Improvements`

4. **Write Release Notes**
   - Organize into date-based sections
   - Categorize each change
   - Output in Markdown format

### Phase 2: User Approval

Save generated release notes as artifact and request review via `notify_user()`:

**User Verification Items:**

- ✅ Are the release notes accurate?
- ✅ Is the version number appropriate?
- ✅ Are there any missing changes?
- ✅ Should it be created as Draft or published immediately?
- ✅ Should it be marked as Pre-release?

### Phase 3: GitHub Release Deployment

After user approval, execute the following steps:

1. **Verify GitHub CLI**

   ```bash
   gh --version
   gh auth status
   ```

2. **Extract Version Information**
   - Read current version from `package.json`
   - Use user-specified version (optional)

3. **Create Release**

   ```bash
   bash .agents/scripts/create-github-release.sh \
     --version "{version}" \
     --title "{release_title}" \
     --notes-file "release-notes.md" \
     --target "{branch}" \
     [--draft] [--prerelease]
   ```

4. **Return Results**
   - Provide Release URL
   - Output success/failure message

## 📝 Release Note Template

Generated release notes follow this format:

```markdown
# Release Notes

## YYYY-MM-DD

### ✨ Features

- **Feature Name**: Description ([`commit-hash`](link))

### 🐛 Bug Fixes

- **Fix Description**: Description ([`commit-hash`](link))

### 🔄 Refactoring

- **Refactoring Details**: Description ([`commit-hash`](link))

### 📝 Documentation

- **Documentation Update**: Description ([`commit-hash`](link))

---

## Summary of Key Changes

### 🎯 Core Features

- Major feature 1
- Major feature 2

### 🏗️ Architecture

- Architecture changes
```

## ⚙️ GitHub Release Options

### Basic Options

| Option    | Description                   | Default                   |
| :-------- | :---------------------------- | :------------------------ |
| `version` | Release version (e.g., 0.2.0) | version from package.json |
| `title`   | Release title                 | Auto-generated            |
| `target`  | Target branch                 | main                      |

### Advanced Options

| Option         | Description                 | When to Use                                             |
| :------------- | :-------------------------- | :------------------------------------------------------ |
| `--draft`      | Create in Draft mode        | When you want manual review before publishing on GitHub |
| `--prerelease` | Mark as Pre-release         | For beta/alpha versions                                 |
| `--no-latest`  | Don't set as latest release | When patching old versions                              |
| `--attach`     | Attach binary files         | When deploying build artifacts                          |

## 🏷️ Commit Classification Rules

Analyze Git commit messages and auto-categorize into:

| Category      | Keywords                              | Emoji |
| :------------ | :------------------------------------ | :---- |
| Features      | `feat`, `add`, `implement`, `new`     | ✨    |
| Bug Fixes     | `fix`, `resolve`, `patch`, `hotfix`   | 🐛    |
| Refactoring   | `refactor`, `clean`, `structure`      | 🔄    |
| Performance   | `optimize`, `speed`, `seo`, `perf`    | ⚡    |
| Documentation | `docs`, `readme`, `comment`           | 📝    |
| UI/UX         | `ui`, `design`, `style`, `component`  | 🎨    |
| DevOps        | `deploy`, `ci/cd`, `webhook`, `build` | ⚙️    |

## 📋 Usage Examples

### Example 1: Basic Release (Immediate Publishing)

**User Request:**

> "Generate v0.2.0 release notes and deploy to GitHub"

**AI Execution:**

1. Analyze Git logs
2. Generate release notes (organize changes by date)
3. Request user review
4. After approval:
   ```bash
   bash .agents/scripts/create-github-release.sh \
     --version "0.2.0" \
     --title "v0.2.0 - New Features & Improvements" \
     --notes-file "release-notes.md"
   ```

### Example 2: Draft Release (Manual Review Before Publishing)

**User Request:**

> "Create v1.0.0 release as Draft"

**AI Execution:**

1. Generate release notes
2. After user approval:
   ```bash
   bash .agents/scripts/create-github-release.sh \
     --version "1.0.0" \
     --title "v1.0.0 - Major Release" \
     --notes-file "release-notes.md" \
     --draft
   ```
3. Can be manually published on GitHub web

### Example 3: Pre-release (Beta Version)

**User Request:**

> "Create v2.0.0-beta.1 beta release"

**AI Execution:**

```bash
bash .agents/scripts/create-github-release.sh \
  --version "2.0.0-beta.1" \
  --title "v2.0.0-beta.1 - Beta Release" \
  --notes-file "release-notes.md" \
  --prerelease
```

## 🚫 Constraints

- Do not add features that are not in Git logs
- Maintain professional and clear tone in release notes
- Do not display category sections if they have no items
- Do not create GitHub Release without user approval

## 🔧 Troubleshooting

### GitHub CLI Not Installed

```
Error: GitHub CLI (gh) is not installed
Solution: winget install --id GitHub.cli
```

### Authentication Error

```
Error: GitHub CLI is not authenticated
Solution: gh auth login
```

### Tag Duplicate Error

```
Error: Tag already exists
Solution:
1. Delete existing release: gh release delete v0.2.0 --yes
2. Delete tag: git tag -d v0.2.0 && git push origin :refs/tags/v0.2.0
3. Recreate
```

## 📚 Related Files

- **Helper Script**: `.agents/scripts/create-github-release.sh`
- **Workflow Documentation**: `.agents/workflows/release-automation.md`
- **Release Notes Artifact**: `C:\Users\Lee\.gemini\antigravity\brain\{conversation-id}\release-notes.md`
