# AI System 구현 보고서

> **Agent**: Planning Agent
> **Date**: 2026-02-24
> **Scope**: AI System 전체 구축 (Phase 0–5)

---

## 1. 프로젝트 개요

**design-pattern-viz** 모노레포에 AI 에이전트 시스템을 구축했습니다.
AI가 일관되고 고품질의 결과물을 생산하도록 **매뉴얼 · 기억 · 품질 · 보고** 4가지 체계를 완성했습니다.

---

## 2. 구현 결과

### 생성 파일: 총 33개

```
design-pattern-viz/
├── CONVENTIONS.md                          ← 프로젝트 전역 규칙
├── .agent/workflows/                       ← 워크플로우 4개
│   ├── plan.md                               /plan — 계획 수립 강제
│   ├── memory.md                             /memory — 기억 문서 생성
│   ├── check.md                              /check — 품질 검사
│   └── report.md                             /report — 보고서 작성
│
└── ai-system/
    ├── .skills/                             ← 스킬 26개 파일
    │   ├── skill-creator/SKILL.md            메타 스킬 (1)
    │   ├── frontend/                         FE 매뉴얼 (5)
    │   │   ├── SKILL.md + INDEX.md
    │   │   └── chapters/ (3개)
    │   ├── backend/                          BE 매뉴얼 (5)
    │   │   ├── SKILL.md + INDEX.md
    │   │   └── chapters/ (3개)
    │   ├── database/                         DB 매뉴얼 (4)
    │   │   ├── SKILL.md + INDEX.md
    │   │   └── chapters/ (2개)
    │   ├── devops/                           DevOps 매뉴얼 (4)
    │   │   ├── SKILL.md + INDEX.md
    │   │   └── chapters/ (2개)
    │   ├── quality-gate/                     품질 게이트 (4)
    │   │   ├── SKILL.md + INDEX.md
    │   │   └── chapters/ (2개)
    │   └── agents/                           전문 에이전트 (3)
    │       ├── qa-agent/SKILL.md
    │       ├── test-agent/SKILL.md
    │       └── planning-agent/SKILL.md
    │
    └── .memory/                             ← 작업 기억 문서
        ├── PLAN_ai_system.md
        ├── CONTEXT_ai_system.md
        ├── CHECKLIST_ai_system.md
        └── reports/.gitkeep
```

---

## 3. 4대 시스템 상세

### 3.1 자동 매뉴얼 시스템 (Skills)

| 스킬              | 트리거 조건                           | 주요 내용                                            |
| :---------------- | :------------------------------------ | :--------------------------------------------------- |
| **frontend**      | `**/app/**`, `**/*.tsx`, `**/*.ts`    | Next.js 16 App Router, FSD 아키텍처, Tailwind+shadcn |
| **backend**       | `**/src/main/java/**`, `**/*.java`    | Spring Boot 3, DDD 레이어, JWT+Security              |
| **database**      | `**/*.sql`, `**/entity/**`            | PostgreSQL 스키마(DBML), Redis 설정                  |
| **devops**        | `**/docker-compose*`, `**/.github/**` | Docker Compose, AWS 배포, Nginx                      |
| **quality-gate**  | `/check` 실행 시                      | 셀프 체크 리마인더, 오류 심각도 가이드               |
| **skill-creator** | 새 스킬 생성 시                       | 스킬 디렉토리 구조, YAML 형식, INDEX.md 작성법       |

**3단계 로딩 구조**:

| Level | 로딩 시점                  | 토큰   |
| :---- | :------------------------- | :----- |
| L1    | YAML 프론트매터 — **항상** | ~100   |
| L2    | SKILL.md 본문 — 트리거 시  | <5k    |
| L3+   | chapters/ — AI 판단 시     | 무제한 |

### 3.2 작업 기억 시스템 (Memory)

| 워크플로우 | 기능                                                                       |
| :--------- | :------------------------------------------------------------------------- |
| `/plan`    | 한국어 계획 → 사용자 승인 → `/memory` 호출                                 |
| `/memory`  | Plan·Context·Checklist 3종 영문 문서를 `ai-system/.memory/`에 저장 후 멈춤 |

**핵심 원칙**: 계획은 **한국어**, 문서는 **영어**, 저장 후 **새 대화에서 이어서 작업**

### 3.3 자동 품질 검사 시스템 (Quality)

`/check` 워크플로우 실행 흐름:

```
git diff → 변경 파일 수집
  ├── FE: cd frontend && npx eslint + tsc --noEmit
  ├── BE: cd backend && ./gradlew spotlessCheck + compileJava
  ├── 셀프 체크 리마인더 출력
  └── 오류 분류:
       ├── 🟢 Minor (1-3개) → AI 자동 수정
       ├── 🟡 Moderate → AI 수정 + 사용자 리뷰
       └── 🔴 Major (4+개) → 전문 에이전트 추천
```

### 3.4 전문 에이전트 시스템 (Agents)

| 에이전트           | 역할                                | 진입 조건                |
| :----------------- | :---------------------------------- | :----------------------- |
| **QA Agent**       | 정적 분석, 코드 리뷰, 구조 개선     | `/check`에서 다수 오류   |
| **Test Agent**     | 테스트 실행, 런타임 진단, 화면 검증 | 테스트 실패, 런타임 오류 |
| **Planning Agent** | 계획 수립, 문서 작성 (코드 수정 ❌) | 신규 기능 계획 필요 시   |

모든 에이전트는 `/report` 워크플로우를 통해 구조화된 보고서를 `ai-system/.memory/reports/`에 저장합니다.

---

## 4. 검증 결과

| 검증 항목                                 | 결과              |
| :---------------------------------------- | :---------------- |
| SKILL.md YAML 유효성 (name + description) | ✅ 9/9            |
| 워크플로우 파일 존재                      | ✅ 4/4            |
| 스킬 파일 전체 (SKILL + INDEX + chapters) | ✅ 26/26          |
| 메모리 문서                               | ✅ 3/3 + reports/ |
| CONVENTIONS.md                            | ✅ 루트 배치      |

---

## 5. 시스템 흐름 요약

```
사용자 프롬프트 입력
  → Antigravity가 키워드 · 파일 패턴 감지
  → ai-system/.skills/에서 SKILL.md 자동 로딩 (L1 → L2 → L3)
  → 큰 작업? → /plan → 한국어 계획 → 승인 → /memory → 영문 3종 문서
  → AI 작업 수행
  → /check → git diff → lint/type-check → 셀프 체크
  → 오류 적음? → AI 자동 수정
  → 오류 다수? → 전문 에이전트 → /report → ai-system/.memory/reports/
  → ✅ 완료
```

---

## 6. 향후 과제

- `Verification` 항목 중 실제 런타임 테스트 (FE 질문 시 스킬 자동 로딩 등)는 실사용 중 검증 필요
- Backend 프로젝트 실제 생성 후 `/check` BE 명령어 실행 검증
- CI/CD 파이프라인과 `/check` 워크플로우 연동 검토
