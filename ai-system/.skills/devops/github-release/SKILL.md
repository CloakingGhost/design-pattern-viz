---
name: github-release
description: Analyzes git log to generate release notes, requests user approval, and publishes GitHub Releases via GitHub CLI.
---

# GitHub Release Skill

## Purpose

Automates the GitHub Release lifecycle: analyze commit history → generate structured release notes → get user approval → publish via GitHub CLI.

## When to Use

Activate this skill when:

- User requests a GitHub Release or version tag
- User asks to generate release notes
- Deployment is complete and a version record is needed
- User mentions `gh release`, versioning, or changelog

## Prerequisites

GitHub CLI must be installed and authenticated:

```bash
# Check
gh --version
gh auth status

# Install (Windows)
winget install --id GitHub.cli

# Authenticate
gh auth login
```

## Process

1. **Collect git log**

   ```bash
   git log --pretty=format:"%H|%ad|%s|%an" --date=short --all
   ```

2. **Read current version** from `package.json`

3. **Generate release notes** — classify commits by category and organize by date
   (See `chapters/release-note-format.md` for template and rules)

4. **Save artifact** to `{brain}/{conversation-id}/release-notes.md`

5. **Request user approval** via `notify_user()`
   - Are release notes accurate?
   - Is the version number appropriate?
   - Draft or publish immediately?
   - Mark as pre-release?

6. **Create GitHub Release** using the helper script
   (See `chapters/release-automation.md` for full workflow and options)

7. **Verify** — provide release URL and confirm tag creation

## Constraints

- ❌ Do NOT create GitHub Release before user approval
- ❌ Do NOT add changes not present in git log
- ✅ Use semantic versioning (`MAJOR.MINOR.PATCH`)
- ✅ Omit empty category sections from release notes

## Chapter References

See `INDEX.md` for detailed guides.
