# Domain-Driven Design (DDD) Architecture

## Overview

The backend follows **DDD** with clear layer separation.

## Layer Structure

```
backend/src/main/java/com/designpatternviz/
├── domain/                  # Core business logic (no framework deps)
│   ├── model/               # Entities, Value Objects, Enums
│   ├── repository/          # Repository interfaces (ports)
│   └── service/             # Domain services
│
├── application/             # Use cases, orchestration
│   ├── service/             # Application services
│   ├── dto/                 # Request/Response DTOs
│   └── mapper/              # Entity ↔ DTO mappers
│
├── infrastructure/          # External concerns
│   ├── persistence/         # JPA repository implementations (adapters)
│   ├── config/              # Spring config classes
│   ├── security/            # Security config, JWT filter
│   └── external/            # External API clients
│
└── presentation/            # HTTP layer
    ├── controller/          # REST controllers
    └── advice/              # Global exception handlers
```

## Layer Rules

### Import Direction

```
presentation → application → domain
                    ↓
              infrastructure
```

- ✅ `presentation/` imports `application/` (DTOs, services)
- ✅ `application/` imports `domain/` (entities, repository interfaces)
- ✅ `infrastructure/` implements `domain/` interfaces
- ❌ `domain/` must NEVER import from other layers
- ❌ `domain/` must NOT depend on Spring framework

### Domain Layer Guidelines

- Entities use JPA annotations but remain framework-agnostic in logic
- Repository interfaces defined in `domain/repository/` — implementations in `infrastructure/persistence/`
- Use Value Objects for types like `Email`, `Password`

### Application Layer Guidelines

- Application services orchestrate domain objects
- DTOs live here — never expose domain entities to controllers
- Mappers convert between entities and DTOs

### Presentation Layer Guidelines

- Controllers receive DTOs, delegate to application services
- Use `@Valid` for request validation
- Return consistent response format
- Swagger annotations for API documentation
