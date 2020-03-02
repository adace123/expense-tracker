FROM node

WORKDIR /app

COPY package.json .

COPY yarn.lock .

COPY src/ .

RUN npm install

RUN yarn global add parcel-bundler

CMD npm run dev
