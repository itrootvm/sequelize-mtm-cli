'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSchedule', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        fieldName: 'id',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model:'users',key:'id'},
        fieldName: 'userId',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        fieldName: 'date',
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
        fieldName: 'startTime',
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
        fieldName: 'endTime',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        fieldName: 'createdAt',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        fieldName: 'updatedAt',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSchedule');
  },
};
