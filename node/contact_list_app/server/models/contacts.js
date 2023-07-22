

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Contacts = sequelize.define(
        'Contacts',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
        },
        {
            tableName: 'contacts',
            timestamps: false,
        }
    );

   

    return Contacts;
};
