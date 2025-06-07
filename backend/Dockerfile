# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Debug: Verificar estructura antes del build
RUN echo "=== PRE-BUILD DEBUG ===" && \
  echo "Source structure:" && \
  find src/ -name "*.ts" | head -10 && \
  echo "Config files:" && \
  ls -la tsconfig*.json nest-cli.json || true

# Construir la aplicación
RUN npm run build

# Debug: Verificar qué se generó
RUN echo "=== POST-BUILD DEBUG ===" && \
  echo "Dist contents:" && \
  find dist/ -type f && \
  echo "Checking for main.js specifically:" && \
  ls -la dist/main.js 2>/dev/null || echo "main.js NOT FOUND"

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar archivos compilados desde builder
COPY --from=builder /app/dist ./dist

# Copiar archivos de data-source si existen
COPY --from=builder /app/data-source.* ./

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001

# Cambiar ownership de archivos
RUN chown -R nestjs:nodejs /app

# Debug final
RUN echo "=== FINAL CHECK ===" && \
  ls -la dist/ && \
  echo "Checking main.js:" && \
  ls -la dist/main.js 2>/dev/null || echo "main.js still missing!"

USER nestjs

# Exponer puerto
EXPOSE 4000

ENV PORT=4000
ENV HOSTNAME="0.0.0.0"

# Comando de inicio con fallback
CMD ["sh", "-c", "if [ -f dist/main.js ]; then node dist/main.js; else echo 'main.js not found, available files:'; ls -la dist/; exit 1; fi"]