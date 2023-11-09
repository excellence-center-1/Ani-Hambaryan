//users.model.js
const db=require('../db')
const { DataTypes} = require('sequelize');
const Contacts = require('./contacts.model');

    const User = db.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    // User.associate = (models) => {
    
    //   User.hasMany(models.Contacts, {
    //     foreignKey: 'user_id',
    //     onDelete: 'CASCADE',
    //   });

    // };



    module.exports=User


  