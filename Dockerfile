FROM node:12.18.2-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .