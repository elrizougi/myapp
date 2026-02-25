# ===== deps =====
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ===== build =====
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ===== runtime =====
FROM node:20-alpine AS runtime
WORKDIR /app

# انسخ ملفات npm أولاً
COPY package*.json ./

# ثبّت كل الاعتمادات (بما فيها dev) قبل تفعيل production
RUN npm ci --include=dev

# الآن فعّل production للتشغيل
ENV NODE_ENV=production

# انسخ ناتج البناء
COPY --from=build /app/dist ./dist

# Drizzle config + schema (adjust if your schema is elsewhere)
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/server ./server
COPY --from=build /app/shared ./shared

EXPOSE 3000
CMD ["npm", "run", "start"]