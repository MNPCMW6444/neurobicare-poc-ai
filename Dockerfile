FROM node:12.13.0-alpine as build 
WORKDIR /appc
COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM nginx 
EXPOSE 5665
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /appc/build /usr/share/nginx/html
