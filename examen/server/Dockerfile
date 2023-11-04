
FROM node:18

WORKDIR /app

COPY package*.json ./ 

RUN npm install sequelize pg sequelize-typescript
RUN npm install


COPY . .

EXPOSE 5000
