# syntax=docker/dockerfile:1.7

# ---- builder ----
FROM eclipse-temurin:25-jdk AS builder
WORKDIR /app

# Copia wrapper e pom primeiro para cachear dependências
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B -q dependency:go-offline

# Build
COPY src ./src
RUN ./mvnw -B -q -DskipTests package

# ---- runner ----
FROM eclipse-temurin:25-jdk AS runner
WORKDIR /app

RUN groupadd --system spring \
  && useradd --system --gid spring --home /app --shell /sbin/nologin spring

COPY --from=builder /app/target/*.jar /app/app.jar

USER spring:spring
EXPOSE 8080

ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","exec java $JAVA_OPTS -jar /app/app.jar"]
