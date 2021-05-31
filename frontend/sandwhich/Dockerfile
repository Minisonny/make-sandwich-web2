FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN chmod +x ./wait-for-it.sh

EXPOSE 3000

CMD ["npm", "start"]
