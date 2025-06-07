# Dockerfile simplificado para debug
FROM node:18-alpine AS production

WORKDIR /app

# Copiar todos los archivos
COPY . .

# Instalar dependencias
RUN npm install

# Construir
RUN npm run build

# Verificar que main.js existe
RUN echo "Checking main.js..." && ls -la dist/main.js

# Crear usuario
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 4000

# Intentar ejecutar
CMD ["sh", "-c", "ls -la dist/ && node dist/main.js"]