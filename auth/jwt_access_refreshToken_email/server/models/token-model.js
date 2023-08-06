// models/token-models.js

module.exports = (sequelize, Sequelize) => {
    const TokenSchema = sequelize.define(
        'token_schema', 
        {
        id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        userId: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        refreshToken: { 
            type: Sequelize.STRING }, 
    }, {
        tableName: 'token_schema',
        timestamps: false,
    });

    return TokenSchema;
};
