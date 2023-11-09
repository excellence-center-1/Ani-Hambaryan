//contacts.model.js

const db=require('../db')
const { DataTypes} = require('sequelize');
const User = require('./users.model');

    const Contacts = db.define(
        'contacts',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cellphoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            group: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // user_id: {
            //   type: DataTypes.INTEGER,
            //   allowNull: false,
            // }
        },
        {
            timestamps: false,
        }
    );

    // Contacts.associate = (models) => {
    
    //   Contacts.belongsTo(models.User, {
    //     foreignKey: 'user_id',
    //     onDelete: 'CASCADE',
    //   });

    // };
   
    module.exports=Contacts