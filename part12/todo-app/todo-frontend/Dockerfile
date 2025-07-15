# 🧪 Etapa 1: test
FROM node:20 AS test

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Se ejecutan los tests (si fallan, el build se interrumpe)
RUN npm run test


# 🏗️ Etapa 2: build de producción
FROM node:20 AS build

WORKDIR /usr/src/app

# Copia completa desde la etapa test (incluye node_modules, código, etc.)
COPY --from=test /usr/src/app /usr/src/app

ENV VITE_BACKEND_URL=/api

RUN npm run build


# 🚀 Etapa final: imagen lista para servir la app
# FROM node:20 AS production

# WORKDIR /usr/src/app

# COPY --from=build /usr/src/app/dist ./dist

# RUN npm install -g serve

# EXPOSE 3000

# CMD ["serve", "dist"]


# 🚀 Etapa final: servir con NGINX
# FROM nginx:1.20.1 AS production

# # Borra el default.conf de Nginx si existe (opcional)
# RUN rm /etc/nginx/conf.d/default.conf

# # Copia archivos estáticos
# COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# EXPOSE 80
