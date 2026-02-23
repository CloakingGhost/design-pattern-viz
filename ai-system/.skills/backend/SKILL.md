---
name: backend
description: Backend development guide for Spring Boot 3 with Java 21, DDD architecture, JPA, JWT + Spring Security, Gradle build system, and Swagger UI.
---

# Backend Skill

## Purpose

Provides conventions and guides for building the Spring Boot 3 backend located in `backend/`.

## When to Use

This skill activates when working with:

- Java source files (`backend/src/main/java/**`)
- Gradle build files (`backend/build.gradle*`)
- Backend configuration and entity classes

## Tech Stack

- **Framework**: Spring Boot 3
- **Language**: Java 21
- **ORM**: JPA (Hibernate)
- **Auth**: JWT (Access Token TTL: 30min, Refresh Token TTL: 7 days) + Spring Security
- **Build**: Gradle
- **Docs**: Swagger UI
- **Validation**: Spring Validation
- **Utility**: Lombok
- **Testing**: spring-boot-starter-test
- **Architecture**: Domain-Driven Design (DDD)

### Dev-only Dependencies

- `spring-boot-docker-compose` — auto-start Docker containers
- `spring-boot-devtools` — hot reload
- `spring-dotenv` — `.env` file loading

## Key Rules

1. **DDD architecture** — Follow domain layer separation (see `chapters/ddd-architecture.md`)
2. **Spotless compliance** — Run `cd backend && ./gradlew spotlessCheck` before committing
3. **Compile check** — Run `cd backend && ./gradlew compileJava` to verify
4. **Lombok** — Use `@Getter`, `@Builder`, `@RequiredArgsConstructor` etc.
5. **JWT security** — Follow security patterns in `chapters/security-jwt.md`

## Chapter References

See `INDEX.md` for detailed guides.
