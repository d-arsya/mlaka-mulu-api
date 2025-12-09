# 1. Builder Stage
FROM node:22-alpine AS builder

# Install necessary utilities like git, etc. if you have dependencies that need compilation
# RUN apk add --no-cache python3 g++ make

WORKDIR /app
COPY package*.json ./
# Use 'npm ci' for clean, reproducible installs, which is best practice for CI/CD
RUN npm ci

COPY . .
# Run the NestJS build command
RUN npm run build

# 2. Production Stage
# Use a lightweight, minimal base image for security and size optimization
FROM node:22-alpine AS production

# Security best practice: Run as a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
WORKDIR /app

# Copy package.json to install production dependencies
COPY package*.json ./
# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy only the compiled output (dist) from the builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Switch to the non-root user
USER nestjs

EXPOSE 3000

# Run the compiled application
CMD ["node", "dist/main"]