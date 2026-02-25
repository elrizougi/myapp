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
ENV NODE_ENV=production

# نحتاج package.json لتشغيل npm start
COPY package*.json ./
COPY --from=build /app/dist ./dist

# تثبيت production deps فقط
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]