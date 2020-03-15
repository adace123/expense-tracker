FROM node:slim

WORKDIR /app

COPY *.json ./

COPY yarn.lock .

RUN yarn && yarn global add nodemon ts-node typescript

COPY src/ .

CMD ["yarn", "dev"]
