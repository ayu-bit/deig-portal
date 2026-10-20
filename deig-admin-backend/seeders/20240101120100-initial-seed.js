
'use strict';
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed Roles
    const roles = [
      { name: 'Admin', description: 'Full control over the entire system.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Editor', description: 'Can manage news, pages, and media.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Industry Manager', description: 'Manages content for their assigned division.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HR Manager', description: 'Manages vacancies and applications.', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Viewer', description: 'Read-only access to specific modules.', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Roles', roles, {});

    // Get the Admin role ID
    const adminRole = await queryInterface.sequelize.query(
      `SELECT id from "Roles" WHERE name = 'Admin';`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const adminRoleId = adminRole[0].id;

    // Seed a default Admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('AdminPassword123!', salt);

    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@deig.gov',
      password: hashedPassword,
      roleId: adminRoleId,
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
