'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('{{tableName}}', {
    {{#each attributes}}
      {{@key}}: {
        {{{formatAttributes this 8}}}
      },
    {{/each}}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('{{tableName}}');
  },
};
