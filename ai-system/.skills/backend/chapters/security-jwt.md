# JWT Authentication + Spring Security

## Overview

Authentication uses **JWT** with Access/Refresh token pair and **Spring Security**.

## Token Configuration

| Token         | TTL        | Storage         |
| :------------ | :--------- | :-------------- |
| Access Token  | 30 minutes | Client (header) |
| Refresh Token | 7 days     | Redis (server)  |

## Redis — Refresh Token Storage

```java
// Save refresh token to Redis with 7-day TTL
// Only for authenticated (registered) users
redisTemplate.opsForValue().set(
    "RT:" + userId,
    refreshToken,
    7,
    TimeUnit.DAYS
);
```

## Spring Security User Model

The `users` table aligns with Spring Security's `UserDetails`:

| Field                     | Purpose                         |
| :------------------------ | :------------------------------ |
| `enabled`                 | Account active flag             |
| `account_non_expired`     | Account expiry flag             |
| `account_non_locked`      | Account lock flag               |
| `credentials_non_expired` | Password expiry flag            |
| `failed_login_attempts`   | Track failed login count        |
| `last_login_at`           | Last successful login timestamp |
| `password_changed_at`     | Password change timestamp       |

## JWT Flow

```
1. Login → Validate credentials → Issue Access + Refresh tokens
2. API Request → Bearer <AccessToken> in Authorization header
3. Access expired → Client sends Refresh token → Issue new Access token
4. Refresh expired → Client must re-login
5. Logout → Delete Refresh token from Redis
```

## Security Filter Chain

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

## Password Encoding

- Use `BCryptPasswordEncoder` — password column is `varchar(60)` for bcrypt hash
- Never store plain-text passwords
