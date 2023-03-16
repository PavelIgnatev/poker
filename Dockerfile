FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=3000

EXPOSE $APP_PORT

CMD PORT=$APP_PORT npm run start