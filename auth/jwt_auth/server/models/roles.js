//models/roles.js
module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
  },
  {
    tableName: 'roles',
    timestamps: false,
}
  );
return Role;
};