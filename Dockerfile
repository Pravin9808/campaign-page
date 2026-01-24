#---- Base image for deps ----
FROM node:slim AS deps
WORKDIR /app
COPY package*.json ./
# install dependencies with frozen lockfile for reproducible builds
RUN npm install

# ---- Build stage ----
FROM node:slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only copy the necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./

# Install only production dependencies
# RUN npm ci --omit=dev --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]
