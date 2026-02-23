# Redis Configuration

## Purpose

Redis is used exclusively for **Refresh Token** storage in this project.

## Key Pattern

```
Key:   RT:{userId}
Value: {refreshToken}
TTL:   7 days
```

## Spring Boot Configuration

```yaml
# application.yml
spring:
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
```

## Usage Example

```java
// Save refresh token
redisTemplate.opsForValue().set(
    "RT:" + userId,
    refreshToken,
    7,
    TimeUnit.DAYS
);

// Retrieve refresh token
String storedToken = redisTemplate.opsForValue().get("RT:" + userId);

// Delete on logout
redisTemplate.delete("RT:" + userId);
```

## Important Notes

- Only **registered users** have refresh tokens
- On logout, the refresh token must be deleted from Redis
- On token refresh, replace the old token with the new one
- Anonymous/guest users do NOT get refresh tokens
