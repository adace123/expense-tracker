FROM node

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY src/ .

RUN yarn

CMD ["yarn", "start"]
