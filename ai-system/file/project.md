# Project Tech Stack

- FE : Next.js 16, TypeScript, tailwind, shadcn, zustand, framer-motion, clsx, react-syntax-highlighter, lucide-react, axios, pnpm
- FE-Architecture : Feature-Sliced Design(FSD, App Router) - Warning : conflict "Pages Router"
- BE : Spring Boot 3, Java 21, JPA, spring-boot-starter-test, Validation, lombok, Swagger UI, Gradle
- Auth : JWT(Access Token(TTL:30 minute), Refresh Token(TTL:7 day)), Spring Security
- BE-developmentOnly : spring-boot-docker-compose, spring-boot-devtools, spring-dotenv
- BE-Architecture : Domain-Driven Design(DDD)
- DB : PostgreSQL, Redis
- CI/CD : Git, GitHub, GitHub Actions, Docker, Docker Compose, .env
- Deploy : AWS Linux, AWS(EC2, RDS)-pree tier, HTTPS, Nginx(Reverse Proxy)

# 디자인 패턴 학습 사이트

## 주요 기능

- GoF의 디자인 패턴을 애니매니션화 하여 시각적인 이해에 도움을 줌

# Git Convention

- feat : 새로운 기능 추가, UI 추가
- fix : 버그 수정, UI 수정
- docs : 문서의 수정, 파일 이름 수정
- style : (코드의 수정 없이) 스타일(style)만 변경(들여쓰기 같은 포맷이나 세미콜론을 빼먹은 경우)
- refactor : 코드를 리펙토링
- test : Test 관련한 코드의 추가, 수정
- chore :(코드의 수정 없이) 설정을 변경, 배포 설정(docker, .env), 라이브러리 설정

## Rule

### subject rule

- 제목은 최대 50글자 넘지 않는다.
- 마침표 및 특수기호를 사용하지 않는다.
- 영어로 작성 시 첫 글자는 대문자로 작성한다.
- 명령문을 사용한다.
- 간결하고 요점적으로 서술한다.

### body rule

- 한 줄당 72자 내로 작성한다.
- 상세하게 작성한다.
- 어떻게 보다는 무엇을, 왜 변경했는지 작성한다.

## Template

```bash

# 제목 작성(최대 50글자): ex) feat: Add Key mapping

# 본문 작성


# --- COMMIT END ---
#   <타입> 리스트
#   feat        : 기능 (새로운 기능)
#   fix         : 버그 (버그 수정)
#   refactor    : 리팩토링
#   ...

# ------------------
#   제목 첫 글자를 대문자로
#   제목은 명령문으로
#   제목 끝에 마침표(.) 금지
#   제목과 본문을 한 줄 띄워 분리하기
#   본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#   본문에 여러줄의 메시지를 작성할 땐 "-"로 구분


```

# Code Style

- FE : `ESLint`를 사용하므로 Prettier 충돌을 방지해야 함.
- BE : `Spotless`를 사용하므로 Prettier 충돌을 방지해야 함.

# Database

## PostgreSQL

### Marmaid

```marmaid
erDiagram
    USERS {
        uuid id PK
        varchar email UK "username"
        varchar password
        Enum role
        boolean enabled
        boolean account_non_expired
        boolean account_non_locked
        boolean credentials_non_expired
        int failed_login_attempts
        timestamp last_login_at
        timestamp password_changed_at
        boolean is_deleted
        uuid deleted_by
        timestamp deleted_at
        timestamp created_at
        timestamp updated_at
    }

    PATTERN {
        int id PK
        varchar name_en "IX"
        varchar name_ko "IX"
        varchar description
        varchar example
        boolean is_deleted
        uuid deleted_by
        timestamp deleted_at
        timestamp created_at
        timestamp updated_at
    }

    PATTERN_STATISTICS {
        bigint id PK
        int pattern_id FK
        varchar visitor_identifier "IX"
        varchar session_id
        varchar action_type "VIEW|PLAY|PAUSE|PREV|NEXT|RESET|COMPLETE"
        timestamp created_at "IX (Precision:3)"
    }

    CLASSIFICATIONS {
        int id PK
        varchar name_en "IX"
        varchar name_ko "IX"
        timestamp created_at
        timestamp updated_at
    }

    PATTERN_CLASSIFICATIONS {
        int pattern_id FK
        int classifications_id FK
        timestamp created_at
        timestamp updated_at
    }

    ADVANTAGES {
        int id PK
        int pattern_id FK
        varchar content
        timestamp created_at
        timestamp updated_at
    }

    DISADVANTAGES {
        int id PK
        int pattern_id FK
        varchar content
        timestamp created_at
        timestamp updated_at
    }

    %% 관계 정의
    PATTERN ||--o{ PATTERN_STATISTICS : "tracks actions"
    PATTERN ||--o{ ADVANTAGES : "has"
    PATTERN ||--o{ DISADVANTAGES : "has"
    PATTERN ||--o{ PATTERN_CLASSIFICATIONS : "categorized"
    CLASSIFICATIONS ||--o{ PATTERN_CLASSIFICATIONS : "applied to"

```

### DBML(기준)

```
// 유저 정보 테이블 (Spring Security UserDetails 필드 반영)
Table users {
  id uuid [pk]
  email "varchar(255)" [unique, note: 'username']
  password "varchar(60)" [not null]
  role Enum [not null]

  // Spring Security 상태 필드
  enabled boolean [default: true, note: '계정 활성 여부']
  account_non_expired boolean [default: true]
  account_non_locked boolean [default: true]
  credentials_non_expired boolean [default: true]
  failed_login_attempts int [default: 0]

  // 보안 및 로그
  last_login_at "timestamp(0)"
  password_changed_at "timestamp(0)"

  // 감사(Audit) 및 Soft Delete
  is_deleted boolean [default: false]
  deleted_by uuid
  deleted_at "timestamp(0)"
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)"
}

// 디자인 패턴 테이블
Table pattern {
  id int [pk, increment]
  name_en "varchar(32)" [not null]
  name_ko "varchar(32)"
  description "varchar(512)"
  example "varchar(512)"

  is_deleted boolean [default: false]
  deleted_by uuid
  deleted_at "timestamp(0)"
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)" [not null]

  indexes {
    name_en [name: 'idx_pattern_en']
    name_ko [name: 'idx_pattern_ko']
  }
}

// 패턴 조회 통계
Table pattern_statistics {
  id bigint [pk, increment]
  pattern_id int [ref: > pattern.id]
  visitor_identifier "varchar(255)" [not null, note: '회원 UUID, 비회원 UUID']
  session_id "varchar(255)" [not null, note: '방문 세션 구분용']
  action_type "varchar(16)" [not null, note: 'VIEW, PLAY, PAUSE, PREV, NEXT, RESET, COMPLETE']

  // 정밀도를 높인 타임스탬프
  created_at "timestamp(3)" [not null, default: `now()`]

	indexes {
    // [목적 1 & 2 대응] 패턴별로 액션 횟수를 집계하거나,
    // 특정 패턴 안에서 유저들이 어떤 액션을 했는지 그룹화할 때 최적
    (pattern_id, action_type, visitor_identifier) [name: 'idx_pattern_summary']

    // [목적 2-1 대응] 특정 유저의 행동을 '최근 순'으로 나열할 때 최적
    // DESC(내림차순) 정렬을 인덱스에 반영하면 조회 속도가 비약적으로 향상됨
    (visitor_identifier, created_at) [name: 'idx_user_recent_action', note: 'created_at desc 정렬은 어플리케이션 레벨에서 처리']
  }
}

// 분류 테이블
Table classifications {
  id int [pk, increment]
  name_en "varchar(32)" [not null]
  name_ko "varchar(32)"
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)" [not null]

  indexes {
    name_en [name: 'idx_class_en']
    name_ko [name: 'idx_class_ko']
  }
}

// 다대다 매핑
Table pattern_classifications {
  pattern_id int [ref: > pattern.id]
  classifications_id int [ref: > classifications.id]
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)" [not null]
}

// 장단점 테이블
Table advantages {
  id int [pk, increment]
  content "varchar(512)"
  pattern_id int [ref: > pattern.id]
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)" [not null]
}

Table disadvantages {
  id int [pk, increment]
  content "varchar(512)"
  pattern_id int [ref: > pattern.id]
  created_at "timestamp(0)" [not null]
  updated_at "timestamp(0)" [not null]
}
```

## Redis

- Refresh Token 관리 - TTL : 1주일
  `java
// refresh token 생성 및 Redis 저장 (7일 설정 예시)
// 회원인 유저만 해당됨
redisTemplate.opsForValue().set(
		"RT:" + userId, 
		refreshToken, 
		7, 
		TimeUnit.DAYS
);
`
