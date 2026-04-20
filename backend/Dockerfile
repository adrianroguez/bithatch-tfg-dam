# ── Etapa 1: Build ────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Instalamos Maven
RUN apk add --no-cache maven

# Copiamos el POM primero (cache de dependencias)
COPY pom.xml .

RUN mvn dependency:go-offline -B

# Copiamos el código fuente
COPY src src

# Compilamos y empaquetamos (sin tests para acelerar el build)
RUN mvn package -DskipTests -B

# ── Etapa 2: Runtime ───────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine AS runtime

WORKDIR /app

# Copiamos el JAR generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
