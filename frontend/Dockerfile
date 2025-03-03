# Dockerfile
# Created on June 15 2023 by Florian Pfleiderer
# Copyright (c) MIT License

# Build step #1: build the React front end
FROM node:18

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "start"]
