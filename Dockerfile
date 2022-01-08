FROM node:12.16.3-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /etc/ngnix
ADD ngnix.conf /etc/ngnix/ngnix.conf

COPY --from=build /app/build /usr/share/ngnix/html
EXPOSE 443
CMD ["ngnix", "-g", "daemon off;"]