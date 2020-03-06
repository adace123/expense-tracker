FROM node:slim

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY src/ .

RUN yarn && yarn global add parcel-bundler

CMD yarn run dev
