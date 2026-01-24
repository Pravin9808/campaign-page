# ---- Dependencies (for build) ----
FROM node:18-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---- Build ----
FROM node:18-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runtime (smaller) ----
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy standalone app and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Install only production deps listed in the standalone package.json
# (the standalone folder includes a minimal package.json)
COPY --from=builder /app/.next/standalone/package.json ./package.json
RUN npm install --production --omit=dev

EXPOSE 3000
CMD ["node", "server.js"]
