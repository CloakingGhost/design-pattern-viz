# AWS Deployment

## Overview

Production deployment uses AWS Free Tier resources with Nginx reverse proxy and HTTPS.

## Architecture

```
[Client] → [HTTPS] → [Nginx (Reverse Proxy)]
                          ├── / → Next.js (frontend)
                          └── /api → Spring Boot (backend)
                                        ├── PostgreSQL (RDS)
                                        └── Redis (ElastiCache or local)
```

## AWS Resources

| Service | Purpose             | Tier      |
| :------ | :------------------ | :-------- |
| EC2     | Application server  | Free Tier |
| RDS     | PostgreSQL database | Free Tier |
| Route53 | DNS (optional)      | Paid      |

## Nginx Configuration

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## GitHub Actions CI/CD

Workflow file: `.github/workflows/` (at monorepo root)

Typical pipeline:

1. **Test** — Run frontend lint/type-check + backend compile/test
2. **Build** — Build Docker images for frontend and backend
3. **Deploy** — SSH into EC2 and pull/restart containers

## Important Notes

- Keep RDS within free tier limits (db.t3.micro, 20GB)
- Use Let's Encrypt for free SSL certificates
- Store AWS credentials as GitHub Secrets, never in code
