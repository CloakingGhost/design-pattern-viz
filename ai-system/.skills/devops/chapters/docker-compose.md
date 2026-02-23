# Docker Compose — Local Development

## Overview

Local development uses Docker Compose to run PostgreSQL and Redis. Spring Boot's `spring-boot-docker-compose` dependency auto-starts containers.

## docker-compose.yml

Located at `backend/docker-compose.yml` (or monorepo root):

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:16
    ports:
      - "${DB_PORT:-5432}:5432"
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "${REDIS_PORT:-6379}:6379"

volumes:
  postgres-data:
```

## Environment Variables

Use `.env` file (loaded by `spring-dotenv`):

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=design_pattern_viz
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_ACCESS_EXPIRATION=1800000
JWT_REFRESH_EXPIRATION=604800000
```

## Important Notes

- `.env` is in `.gitignore` — never commit secrets
- `spring-boot-docker-compose` is `developmentOnly` — not included in production build
- `spring-boot-devtools` enables hot reload during development
