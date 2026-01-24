FROM node:18-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production --omit=dev

FROM node:18-slim AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npx", "next", "start"]
