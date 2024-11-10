FROM node:20.18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]