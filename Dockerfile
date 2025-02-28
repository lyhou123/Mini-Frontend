# Use the official Node.js image as the base image
FROM node:18-alpine as builder


WORKDIR /app


COPY package*.json ./


RUN npm install

COPY . .

# Build the Vue.js application
RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4031

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]