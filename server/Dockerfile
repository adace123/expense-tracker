FROM node:slim

WORKDIR /app

COPY *.json ./

COPY yarn.lock .

COPY src/ .

COPY .env dist/

RUN yarn && yarn global add nodemon ts-node typescript

CMD ["yarn", "dev"]
