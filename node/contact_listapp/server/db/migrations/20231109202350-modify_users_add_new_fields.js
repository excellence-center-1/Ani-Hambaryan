module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'contacts',
        'user_id', 
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
     
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('contacts', 'user_id'),
    ]);
  },
};