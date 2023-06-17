# Build step #1: build the React front end
FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
COPY ./src ./src
COPY ./public ./public
RUN yarn install

CMD ["yarn", "start"]
