---
name: devops
description: DevOps guide for Docker Compose local development, AWS deployment (EC2, RDS), Nginx reverse proxy, HTTPS, and GitHub Actions CI/CD.
---

# DevOps Skill

## Purpose

Provides conventions for containerized development and cloud deployment.

## When to Use

This skill activates when working with:

- Docker files (`docker-compose*`, `Dockerfile*`)
- GitHub Actions (`**/.github/**`)
- Environment files (`**/.env*`)
- Deployment and infrastructure tasks

## Tech Stack

- **Containerization**: Docker, Docker Compose
- **Cloud**: AWS (EC2, RDS) — Free Tier
- **Reverse Proxy**: Nginx
- **HTTPS**: TLS/SSL certificates
- **CI/CD**: GitHub Actions

## Key Rules

1. **Docker Compose for local dev** — `spring-boot-docker-compose` auto-starts containers
2. **Environment variables via `.env`** — Never hardcode secrets
3. **GitHub Actions at root** — `.github/workflows/` must stay at monorepo root
4. **AWS Free Tier** — Stay within free tier limits for EC2 and RDS

## Chapter References

See `INDEX.md` for deployment guides.
