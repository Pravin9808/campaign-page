FROM node:20-bullseye-slim AS deps
WORKDIR /app
# copy package files first for caching
COPY package*.json ./
# install deps (use `npm ci` if you have a lockfile)
RUN npm install --legacy-peer-deps

FROM node:20-bullseye-slim AS builder
WORKDIR /app
# reuse installed deps
COPY --from=deps /app/node_modules ./node_modules
# copy source and build
COPY . .
RUN npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# copy built output and public assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
# copy node_modules to run the production server
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]