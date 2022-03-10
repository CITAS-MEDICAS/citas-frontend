FROM node:16.3.0-alpine
RUN apt-get update && apt-get install -y curl
RUN yarn
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN yarn run build

#Preferentemente isntalar node -v 16
# # etapa de compilación
# FROM node:9.11.1-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # etapa de producción
# FROM nginx:1.13.12-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


