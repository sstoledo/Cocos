# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # Asegúrate que esto genera /app/dist

FROM node:18-alpine AS production
WORKDIR /app

# Copia solo lo necesario
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Verifica que el archivo existe (opcional)
RUN ls -la /app/dist  # Deberías ver main.js aquí

USER 1001
EXPOSE 4000

CMD ["node", "./dist/main.js"]