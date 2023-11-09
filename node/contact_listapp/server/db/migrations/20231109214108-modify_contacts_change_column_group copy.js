module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'contacts', 
        'group', {
        type: Sequelize.STRING,
        allowNull: true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('contacts', 'group')]);
  },
};