const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.PG_USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  port: 5432,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
});

module.exports = sequelize;
