

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Contactlist = sequelize.define(
        'Contactlist',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // user_id: {
            //     type: DataTypes.INTEGER,
            //     // allowNull: false,
            // },
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
            tableName: 'contactlist',
            timestamps: false,
        }
    );

   
    // Contactlist.associate = (models) => {
    //     Contactlist.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // };

    return Contactlist;
};
