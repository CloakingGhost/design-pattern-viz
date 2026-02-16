#!/usr/bin/env bash

# GitHub Release 생성 헬퍼 스크립트
# 이 스크립트는 GitHub CLI를 사용하여 릴리즈를 생성합니다.

set -e  # 에러 발생 시 즉시 종료

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 기본값 설정
DRAFT_MODE=false
PRERELEASE=false
LATEST=true
TARGET_BRANCH="main"
VERSION=""
TITLE=""
NOTES_FILE=""
ATTACH_FILES=""

# 함수: 사용법 출력
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -v, --version VERSION        릴리즈 버전 (예: 0.2.0, 필수)"
    echo "  -t, --title TITLE           릴리즈 제목 (필수)"
    echo "  -n, --notes-file FILE       릴리즈 노트 파일 경로 (필수)"
    echo "  -b, --target BRANCH         타겟 브랜치 (기본값: main)"
    echo "  -d, --draft                 Draft 모드로 생성"
    echo "  -p, --prerelease            Pre-release로 표시"
    echo "  --no-latest                 최신 릴리즈로 설정하지 않음"
    echo "  -a, --attach FILES          첨부할 바이너리 파일들 (쉼표로 구분)"
    echo "  -h, --help                  도움말 표시"
    echo ""
    echo "예시:"
    echo "  $0 -v 0.2.0 -t \"v0.2.0 - New Features\" -n release-notes.md"
    echo "  $0 -v 1.0.0-beta -t \"v1.0.0-beta\" -n notes.md -p -d"
    exit 1
}

# 인자 파싱
while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -t|--title)
            TITLE="$2"
            shift 2
            ;;
        -n|--notes-file)
            NOTES_FILE="$2"
            shift 2
            ;;
        -b|--target)
            TARGET_BRANCH="$2"
            shift 2
            ;;
        -d|--draft)
            DRAFT_MODE=true
            shift
            ;;
        -p|--prerelease)
            PRERELEASE=true
            shift
            ;;
        --no-latest)
            LATEST=false
            shift
            ;;
        -a|--attach)
            ATTACH_FILES="$2"
            shift 2
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo -e "${RED}Error: Unknown option: $1${NC}"
            usage
            ;;
    esac
done

# 필수 인자 확인
if [[ -z "$VERSION" ]]; then
    echo -e "${RED}Error: Version is required${NC}"
    usage
fi

if [[ -z "$TITLE" ]]; then
    echo -e "${RED}Error: Title is required${NC}"
    usage
fi

if [[ -z "$NOTES_FILE" ]]; then
    echo -e "${RED}Error: Notes file is required${NC}"
    usage
fi

# 릴리즈 노트 파일 존재 확인
if [[ ! -f "$NOTES_FILE" ]]; then
    echo -e "${RED}Error: Release notes file not found: $NOTES_FILE${NC}"
    exit 1
fi

# GitHub CLI 설치 확인
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo -e "${YELLOW}Please install it with: winget install --id GitHub.cli${NC}"
    exit 1
fi

# GitHub CLI 인증 확인
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI is not authenticated${NC}"
    echo -e "${YELLOW}Please run: gh auth login${NC}"
    exit 1
fi

# 버전 태그 생성 (v 접두사 추가)
TAG="v$VERSION"

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}GitHub Release 생성${NC}"
echo -e "${BLUE}===========================================${NC}"
echo -e "Tag:          ${GREEN}$TAG${NC}"
echo -e "Title:        ${GREEN}$TITLE${NC}"
echo -e "Target:       ${GREEN}$TARGET_BRANCH${NC}"
echo -e "Notes File:   ${GREEN}$NOTES_FILE${NC}"
echo -e "Draft:        ${GREEN}$DRAFT_MODE${NC}"
echo -e "Pre-release:  ${GREEN}$PRERELEASE${NC}"
echo -e "Latest:       ${GREEN}$LATEST${NC}"
if [[ -n "$ATTACH_FILES" ]]; then
    echo -e "Attachments:  ${GREEN}$ATTACH_FILES${NC}"
fi
echo -e "${BLUE}===========================================${NC}"
echo ""

# gh release create 명령 구성
GH_CMD="gh release create \"$TAG\""
GH_CMD="$GH_CMD --title \"$TITLE\""
GH_CMD="$GH_CMD --notes-file \"$NOTES_FILE\""
GH_CMD="$GH_CMD --target \"$TARGET_BRANCH\""

if [[ "$DRAFT_MODE" == true ]]; then
    GH_CMD="$GH_CMD --draft"
fi

if [[ "$PRERELEASE" == true ]]; then
    GH_CMD="$GH_CMD --prerelease"
fi

if [[ "$LATEST" == false ]]; then
    GH_CMD="$GH_CMD --latest=false"
fi

# 첨부 파일이 있는 경우 추가
if [[ -n "$ATTACH_FILES" ]]; then
    IFS=',' read -ra FILES <<< "$ATTACH_FILES"
    for file in "${FILES[@]}"; do
        file=$(echo "$file" | xargs)  # trim whitespace
        if [[ -f "$file" ]]; then
            GH_CMD="$GH_CMD \"$file\""
        else
            echo -e "${YELLOW}Warning: Attachment file not found: $file (skipping)${NC}"
        fi
    done
fi

echo -e "${YELLOW}Executing command:${NC}"
echo -e "${BLUE}$GH_CMD${NC}"
echo ""

# 릴리즈 생성 실행
if eval "$GH_CMD"; then
    echo ""
    echo -e "${GREEN}✓ Release created successfully!${NC}"
    
    # 릴리즈 URL 출력
    REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
    if [[ "$DRAFT_MODE" == true ]]; then
        echo -e "${YELLOW}Draft Release URL:${NC} https://github.com/$REPO/releases"
    else
        echo -e "${GREEN}Release URL:${NC} https://github.com/$REPO/releases/tag/$TAG"
    fi
    
    exit 0
else
    echo ""
    echo -e "${RED}✗ Failed to create release${NC}"
    echo -e "${YELLOW}Possible reasons:${NC}"
    echo -e "  - Tag '$TAG' already exists"
    echo -e "  - No permission to create releases"
    echo -e "  - Network issues"
    exit 1
fi
