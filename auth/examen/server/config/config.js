// require('dotenv').config();
import { config } from 'dotenv';

config();
module.exports = {
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  dialect: 'postgres',
  timezone: 'Etc/GMT-4',
  minifyAliases: true,
  seederStorage: 'sequelize',
  logging: false,
};
