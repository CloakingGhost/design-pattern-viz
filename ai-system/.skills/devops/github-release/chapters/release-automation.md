# Release Automation Workflow

Step-by-step guide from git log analysis to GitHub Release publication.

## Phase 1: Preparation

### Step 1. Verify GitHub CLI

```bash
gh --version
gh auth status
```

If not installed:

```bash
winget install --id GitHub.cli
gh auth login
```

### Step 2. Read current version

```bash
cat package.json | grep version
```

Determine next version based on the change scope (see `release-note-format.md` for versioning strategy).

### Step 3. Collect git log

```bash
git log --pretty=format:"%H|%ad|%s|%an" --date=short --all
```

AI analyzes these logs and generates the release notes artifact.

## Phase 2: User Approval

### Step 4. Save release notes artifact

Save to: `{brain}/{conversation-id}/release-notes.md`

### Step 5. Request user review via `notify_user()`

**User checklist:**

- [ ] Are the release notes accurate?
- [ ] Is the version number appropriate?
- [ ] Are there any missing changes?
- [ ] Publish immediately or create as Draft?
- [ ] Mark as Pre-release?

## Phase 3: Publish

### Step 6. Determine release options

| Option         | Description                     | Default               |
| :------------- | :------------------------------ | :-------------------- |
| `--draft`      | Create as Draft (not published) | false (publish now)   |
| `--prerelease` | Mark as Pre-release (beta)      | false                 |
| `--target`     | Target branch                   | main                  |
| `--no-latest`  | Skip setting as latest release  | false (set as latest) |

### Step 7. Create GitHub Release

**Basic release (publish immediately):**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - Factory Method Pattern & Performance Improvements" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --target "main"
```

**Draft release:**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - New Features" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --draft
```

**Pre-release:**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "1.0.0-beta.1" \
  --title "v1.0.0-beta.1 - Beta Release" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --prerelease
```

**With binary attachments:**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "0.2.0" \
  --title "v0.2.0 - Release" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --attach "dist/bundle.zip,dist/app.exe"
```

## Phase 4: Verification

### Step 8. Confirm the release

1. **Check release URL**
   - Published: `https://github.com/{owner}/{repo}/releases/tag/v{version}`
   - Draft: `https://github.com/{owner}/{repo}/releases`

2. **Verify git tag**

   ```bash
   git tag -l
   ```

## Troubleshooting

### Tag already exists

```bash
# Delete existing tag (use with caution)
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0

# Or delete the release and tag together
gh release delete v0.2.0 --yes
git tag -d v0.2.0
git push origin :refs/tags/v0.2.0
```

### Authentication error

```bash
gh auth login
```
