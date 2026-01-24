# build deps
FROM node:18-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# builder
FROM node:18-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# runtime (uses standalone)
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# install only runtime deps from the standalone package.json
COPY --from=builder /app/.next/standalone/package.json ./package.json
RUN npm install --production --omit=dev

EXPOSE 3000
CMD ["node", "server.js"]
