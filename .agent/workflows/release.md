---
description: Generate release notes from git log and publish GitHub Release via GitHub CLI
---

# GitHub Release 워크플로우

Git 로그 분석 → 릴리즈 노트 생성 → 사용자 승인 → GitHub Release 배포

## Prerequisites

```bash
gh --version   # GitHub CLI 설치 확인
gh auth status # 인증 상태 확인
```

미설치 시: `winget install --id GitHub.cli` → `gh auth login`

## Step 1. 현재 버전 확인

// turbo

```bash
cat package.json | grep '"version"'
```

## Step 2. Git 로그 수집

// turbo

```bash
git log --pretty=format:"%H|%ad|%s|%an" --date=short --all
```

AI가 로그를 분석하여 릴리즈 노트를 생성합니다.
분류 규칙과 템플릿: `ai-system/.skills/devops/github-release/chapters/release-note-format.md`

## Step 3. 릴리즈 노트 검토 요청

AI가 생성한 릴리즈 노트를 artifact로 저장 후 `notify_user()`로 리뷰 요청.

**확인 항목:**

- [ ] 릴리즈 노트 내용이 정확한가?
- [ ] 버전 번호가 적절한가?
- [ ] 누락된 변경 사항이 없는가?
- [ ] Draft로 생성할 것인가, 즉시 배포할 것인가?
- [ ] Pre-release로 표시할 것인가?

## Step 4. GitHub Release 생성

사용자 승인 후 실행:

**기본 배포 (즉시 배포):**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "{version}" \
  --title "{release_title}" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --target "main"
```

**Draft 모드:**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "{version}" \
  --title "{release_title}" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --draft
```

**Pre-release:**

```bash
bash ai-system/.skills/devops/github-release/scripts/create-github-release.sh \
  --version "{version}" \
  --title "{release_title}" \
  --notes-file "{brain}/{conversation-id}/release-notes.md" \
  --prerelease
```

## Step 5. 결과 확인

Release URL을 사용자에게 제공하고 태그 생성 여부를 확인합니다.

```bash
git tag -l
```
