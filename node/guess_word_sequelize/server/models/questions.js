const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Question = sequelize.define(
      'Question',
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          word: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          question: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          level: {
            type: DataTypes.STRING,
            allowNull: false,
          },
      },
      {
        tableName: 'questions',
        timestamps: false,
      }
    );
  
    return Question;
  };
  