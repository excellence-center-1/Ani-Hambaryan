//models/index.js
const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/config.js'); // Import the sequelize instance

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
