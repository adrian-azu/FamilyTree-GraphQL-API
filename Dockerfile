FROM node:16-alpine

ENV MONGO_URL=mongodb://mongodb:27017/family_tree \
    NODE_ENV=development \
    PORT=3000

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install && npm cache clean --force

CMD ["node", "app.js"]

EXPOSE 8081
