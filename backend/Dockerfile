# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Verificar que se generó correctamente
RUN ls -la dist/ && echo "Build artifacts:" && find dist/ -name "*.js" | head -10

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar archivos compilados desde builder
COPY --from=builder /app/dist ./dist

# Copiar data-source.js si existe (para migraciones)
COPY --from=builder /app/data-source.* ./

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001

# Cambiar ownership de archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer puerto
EXPOSE 4000

# Verificar archivos antes de ejecutar
RUN ls -la dist/ && echo "Main file check:" && ls -la dist/main.js

# Comando de inicio
CMD ["node", "dist/main.js"]