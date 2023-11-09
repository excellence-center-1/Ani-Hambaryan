'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('contacts', 'user_id');
  },
  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.dropTable('contacts');
  // }
};