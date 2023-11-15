FROM node:18

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./ 

RUN npm install

COPY . .
# COPY .env .
# COPY config/config.js .



# RUN npx sequelize-cli db:migrate 
# RUN npx sequelize-cli db:seed:all 

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
