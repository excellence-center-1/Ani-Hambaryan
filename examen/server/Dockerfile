FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# ENV SEQUELIZE_CONFIG_PATH=/app/config/config.js

# COPY ./config/config.js $SEQUELIZE_CONFIG_PATH

# RUN npx sequelize-cli db:migrate --config $SEQUELIZE_CONFIG_PATH
# RUN npx sequelize-cli db:seed:all --config $SEQUELIZE_CONFIG_PATH

COPY . .

EXPOSE 5000
