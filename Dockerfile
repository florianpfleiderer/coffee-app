# Build step #1: build the React front end
FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000

CMD ["yarn", "start"]
