FROM node

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY src/ .

RUN yarn

RUN yarn global add parcel-bundler

CMD yarn run dev
