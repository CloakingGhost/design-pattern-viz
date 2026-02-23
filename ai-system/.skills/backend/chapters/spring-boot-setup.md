# Spring Boot 3 — Project Setup

## Overview

The backend uses **Spring Boot 3** with **Java 21** and **Gradle** build system.

## Project Directory

```
backend/
├── build.gradle
├── settings.gradle
├── gradlew / gradlew.bat
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/designpatternviz/
│   │   │       ├── Application.java
│   │   │       ├── domain/        # DDD domain layer
│   │   │       ├── application/   # Application services
│   │   │       ├── infrastructure/# DB, external APIs
│   │   │       └── presentation/  # Controllers, DTOs
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-dev.yml
│   └── test/
└── docker-compose.yml (dev)
```

## Key Dependencies

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-security'

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    runtimeOnly 'org.postgresql:postgresql'

    // Dev only
    developmentOnly 'org.springframework.boot:spring-boot-docker-compose'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    implementation 'me.paulschwarz:spring-dotenv'

    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

## Build Commands

| Command                   | Purpose             |
| ------------------------- | ------------------- |
| `./gradlew bootRun`       | Run the application |
| `./gradlew compileJava`   | Compile check       |
| `./gradlew spotlessCheck` | Code style check    |
| `./gradlew spotlessApply` | Auto-format code    |
| `./gradlew test`          | Run tests           |
| `./gradlew build`         | Full build          |
