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
RUN echo "Build completed, checking dist contents:" && find dist/ -type f -name "*.js" -exec echo "Found: {}" \;
RUN echo "Source files:" && find src/ -name "*.ts" -exec echo "Source: {}" \;

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

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001

# Cambiar ownership de archivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exponer puerto
EXPOSE 4000
ENV PORT=3000

# Verificar archivos antes de ejecutar
RUN ls -la dist/ && echo "Main file check:" && ls -la dist/main.js

# Comando de inicio
ENV HOSTNAME="0.0.0.0"
CMD ["node", "dist/main.js"]