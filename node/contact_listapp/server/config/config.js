require('dotenv').config();

module.exports = {
  username: process.env.PG_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: 'localhost',
  dialect: 'postgres',
  timezone: 'Etc/GMT-4',
  minifyAliases: true,
  seederStorage: 'sequelize',
  logging: console.log,
};
