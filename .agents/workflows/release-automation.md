---
description: GitHub Release Automation Workflow - From Release Note Generation to Deployment
---

# GitHub Release Automation Workflow

This workflow performs Git log analysis, release note generation, and automatic GitHub Release deployment after user approval.

## Prerequisites

1. **GitHub CLI Installation Check**

   ```bash
   gh --version
   ```

   If not installed:

   ```bash
   winget install --id GitHub.cli
   ```

2. **GitHub CLI Authentication**
   ```bash
   gh auth login
   ```

## Workflow Steps

### 1. Git Log Analysis and Release Note Generation

Analyze Git logs to generate date-based release notes:

```bash
git log --pretty=format:"%H|%ad|%s|%an" --date=short --all > /tmp/git-log.txt
```

AI analyzes these logs to automatically generate release notes.

### 2. Check Current Version from package.json

// turbo

```bash
cat package.json | grep version
```

Check current version and determine next release version.

### 3. Generate Release Title

Summarize major changes from Git logs to create release title.

Format: `v{version} - {Summary of major features}`

Examples:

- `v0.2.0 - Factory Method Pattern & Performance Improvements`
- `v1.0.0 - Major Architecture Refactoring`
- `v0.3.0-beta - New Animation System (Beta)`

### 4. Save Release Notes Artifact

Save generated release notes to:

- `C:\Users\Lee\.gemini\antigravity\brain\{conversation-id}\release-notes.md`

### 5. Request User Approval

Request user to review release notes via `notify_user()`.

**User Verification Checklist:**

- [ ] Are the release notes accurate?
- [ ] Is the version number appropriate?
- [ ] Are there any missing changes?
- [ ] Should it be marked as Pre-release?

### 6. Determine GitHub Release Creation Options

After user approval, determine the following options:

| Option         | Description                          | Default                     |
| :------------- | :----------------------------------- | :-------------------------- |
| `--draft`      | Create in Draft mode (not published) | false (publish immediately) |
| `--prerelease` | Mark as Pre-release (beta/alpha)     | false                       |
| `--target`     | Target branch                        | main                        |
| `--no-latest`  | Don't set as latest release          | false (set as latest)       |

### 7. Create GitHub Release

Create release using helper script:

**Basic Release (Immediate Publishing):**

```bash
bash .agents/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - Factory Method Pattern & Performance Improvements" \
  --notes-file "C:\Users\Lee\.gemini\antigravity\brain\{conversation-id}\release-notes.md" \
  --target "main"
```

**Draft Release (Manual Publishing After Review):**

```bash
bash .agents/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - New Features" \
  --notes-file "release-notes.md" \
  --draft
```

**Pre-release (Beta/Alpha Version):**

```bash
bash .agents/scripts/create-github-release.sh \
  --version "1.0.0-beta.1" \
  --title "v1.0.0-beta.1 - Beta Release" \
  --notes-file "release-notes.md" \
  --prerelease
```

**Attach Binary Files:**

```bash
bash .agents/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - Release" \
  --notes-file "release-notes.md" \
  --attach "dist/bundle.zip,dist/app.exe"
```

### 8. Verify Results

After successful release creation:

1. **Check Release URL**
   - Published release: `https://github.com/{owner}/{repo}/releases/tag/v{version}`
   - Draft release: `https://github.com/{owner}/{repo}/releases`

2. **Verify Git Tag**

   ```bash
   git tag -l
   ```

3. **Check on GitHub Web**
   - Visit releases page
   - Review release notes content
   - Edit or delete if needed

## Troubleshooting

### GitHub CLI Authentication Error

```bash
gh auth login
```

Log in with your GitHub account in browser

### Tag Already Exists

```bash
# Delete existing tag (use with caution)
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0
```

### Recreate Release After Deletion

```bash
# Delete release
gh release delete v0.2.0 --yes

# Delete tag
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Recreate
bash .agents/scripts/create-github-release.sh ...
```

## Version Management Strategy

### Semantic Versioning (Recommended)

- **MAJOR.MINOR.PATCH** format (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features with backward compatibility
- **PATCH**: Bug fixes with backward compatibility

### Pre-release Versions

- **Alpha**: `1.0.0-alpha.1`, `1.0.0-alpha.2`
- **Beta**: `1.0.0-beta.1`, `1.0.0-beta.2`
- **RC (Release Candidate)**: `1.0.0-rc.1`, `1.0.0-rc.2`

## Automation Tips

1. **Auto-increment package.json Version**

   ```bash
   npm version patch  # 0.1.0 -> 0.1.1
   npm version minor  # 0.1.1 -> 0.2.0
   npm version major  # 0.2.0 -> 1.0.0
   ```

2. **Reuse Release Note Templates**
   - Generate new notes based on previous release notes
   - Auto-organize date-based sections

3. **Draft-First Strategy**
   - Create as Draft first
   - Final review on GitHub web
   - Manually publish
