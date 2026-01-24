# ---- Dependencies ----
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

<<<<<<< HEAD
# ---- Production ----
=======
# ---- Runtime ----
>>>>>>> ee9b82e6f6306a28b98a4df56d7d8e20dbaba5ac
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

<<<<<<< HEAD
# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
=======
# Next standalone app + static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Provide runtime deps
COPY --from=deps /app/node_modules ./node_modules
>>>>>>> ee9b82e6f6306a28b98a4df56d7d8e20dbaba5ac

EXPOSE 3000
CMD ["node", "server.js"]
