# backend/Dockerfile
FROM node:18-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=development

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy built application from development stage
COPY --from=development --chown=nestjs:nodejs /app/dist ./dist
COPY --from=development --chown=nestjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "dist/main"]