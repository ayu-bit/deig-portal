
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const settings = [
      { key: 'site_name', value: 'DEIG - Defense Industry Engineering Group', type: 'string', group: 'General', description: 'The public name of the website.', createdAt: new Date(), updatedAt: new Date() },
      { key: 'maintenance_mode', value: 'false', type: 'boolean', group: 'General', description: 'Enable maintenance mode to disable public access.', createdAt: new Date(), updatedAt: new Date() },
      { key: 'contact_email', value: 'contact@deig.gov', type: 'string', group: 'Contact', description: 'Main contact email displayed in footer.', createdAt: new Date(), updatedAt: new Date() },
      { key: 'contact_phone', value: '+251 11 555 0000', type: 'string', group: 'Contact', description: 'Main phone number.', createdAt: new Date(), updatedAt: new Date() },
      { key: 'max_upload_size', value: '5', type: 'number', group: 'System', description: 'Max upload size in MB.', createdAt: new Date(), updatedAt: new Date() },
      { key: 'allow_public_registration', value: 'false', type: 'boolean', group: 'System', description: 'Allow users to register publicly (usually false for corporate sites).', createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Settings', settings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Settings', null, {});
  }
};
