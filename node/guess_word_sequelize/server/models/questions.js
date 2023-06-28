const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Question = sequelize.define(
      'questions',
      {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          question: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          word: {
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
  