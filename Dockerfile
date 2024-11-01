FROM node:22.9.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY ./angular.json ./tsconfig* .
COPY ./src ./src
ARG PROJECT_NAME
ENV PROJECT_NAME=${PROJECT_NAME}
RUN npm run build:${ENV}

FROM nginx:1.25.2
COPY --from=build /app/dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 50003
CMD [ "nginx", "-g", "daemon off;" ]
