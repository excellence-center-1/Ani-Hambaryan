
//models/index.js
const config = require('../config/config.js');
const Sequelize = require('sequelize');
const users = require('./users.js');

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./users.js")(sequelize, Sequelize);
db.role = require("./roles.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
