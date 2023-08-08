// models/token-models.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const TokenSchema = sequelize.define(
        'token_schema', 
        {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        userId: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        refreshToken: { 
            type: DataTypes.STRING }, 
    }, {
        tableName: 'token_schema',
        timestamps: false,
    });

    return TokenSchema;
};
