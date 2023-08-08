//models/user-model.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const UserModel = sequelize.define(
      'users',
      {
        id: { 
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true 
        },
        email: { 
          type: DataTypes.STRING, 
          unique: true 
        },
        password: { 
          type: DataTypes.STRING 
        },
        isActivated: { 
          type: DataTypes.BOOLEAN, 
          defaultValue: false 
        },
        activationLink: { 
          type: DataTypes.STRING 
        },
      },
      {
        tableName: 'users',
        timestamps: false,
      }
    );
    return UserModel;
  };
  