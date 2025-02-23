# Dockerfile
# Created on June 15 2023 by Florian Pfleiderer
# Copyright (c) MIT License

# Build step #1: build the React front end
FROM node:16

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "start"]
