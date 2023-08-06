require('dotenv').config();

module.exports = {
  username: process.env.PG_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: 'postgres',
  timezone: 'Etc/GMT-4',
  minifyAliases: true,
  seederStorage: 'sequelize',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};