module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'contacts', 
        'group', {
        type: Sequelize.STRING,
        allowNull: false
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('contacts', 'group')]);
  },
};