'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSchedule');
  },
  async down(queryInterface, Sequelize) {
    console.warn('No Undo option for removal migration');
  },
};
