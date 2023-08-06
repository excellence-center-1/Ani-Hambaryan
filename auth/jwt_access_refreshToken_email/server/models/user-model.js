//models/user-model.js
module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define(
      'users',
      {
        id: { 
          type: Sequelize.INTEGER, 
          primaryKey: true, 
          autoIncrement: true 
        },
        email: { 
          type: Sequelize.STRING, 
          unique: true 
        },
        password: { 
          type: Sequelize.STRING 
        },
        isActivated: { 
          type: Sequelize.BOOLEAN, 
          defaultValue: false 
        },
        activationLink: { 
          type: Sequelize.STRING 
        },
      },
      {
        tableName: 'users',
        timestamps: false,
      }
    );
    return UserModel;
  };
  