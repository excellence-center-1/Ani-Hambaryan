//models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const UserModel = require('./user-model.js')(sequelize, Sequelize);
const TokenSchema = require('./token-model.js')(sequelize, Sequelize);

UserModel.hasMany(TokenSchema, { foreignKey: 'userId' });
TokenSchema.belongsTo(UserModel, { foreignKey: 'userId' });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.UserModel = UserModel;
db.TokenSchema = TokenSchema;

module.exports = db;
