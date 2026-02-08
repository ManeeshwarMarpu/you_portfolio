FROM node:20-alpine AS build
WORKDIR /app

# 1. Install pnpm globally
RUN npm install -g pnpm

# 2. Copy only dependency files first
COPY pnpm-lock.yaml package.json ./

# 3. Install ALL dependencies (including devDeps like TypeScript)
RUN pnpm install --frozen-lockfile

# 4. Copy the rest of your source code
# (The .dockerignore will ensure node_modules isn't copied here)
COPY . .

# 5. Build the project
RUN pnpm run build

# --- Stage 2: Nginx ---
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]