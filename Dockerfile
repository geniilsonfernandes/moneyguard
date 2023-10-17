FROM node:16 as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
