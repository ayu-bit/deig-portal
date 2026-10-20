
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // 1. Industries
    await queryInterface.createTable('Industries', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      shortName: { type: Sequelize.STRING, allowNull: false, unique: true },
      fullName: { type: Sequelize.JSONB, allowNull: false }, // JSONB for {en, am}
      description: { type: Sequelize.JSONB, allowNull: false }, // JSONB for {en, am}
      icon: { type: Sequelize.TEXT },
      capabilities: { type: Sequelize.JSONB }, // JSONB for {en: [], am: []}
      productsOrServices: { type: Sequelize.JSONB }, // JSONB for {en: [], am: []}
      heroImage: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      facilityPhotos: { type: Sequelize.ARRAY(Sequelize.STRING) },
      technicalHighlights: { type: Sequelize.JSONB }, // JSONB for {en: [], am: []}
      divisionalContact: { type: Sequelize.JSONB },
      coordinates: { type: Sequelize.JSONB },
      contactPerson: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('Online', 'Maintenance'), defaultValue: 'Online' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 2. News
    await queryInterface.createTable('News', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.JSONB, allowNull: false }, // JSONB for {en, am}
      content: { type: Sequelize.JSONB, allowNull: false }, // JSONB for {en, am}
      date: { type: Sequelize.DATE, allowNull: false },
      image: { type: Sequelize.STRING },
      category: { type: Sequelize.STRING, allowNull: false }, // Changed to STRING to allow flexibility or match strict ENUM if preferred
      status: { type: Sequelize.ENUM('Published', 'Draft'), defaultValue: 'Draft' },
      authorId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 3. Vacancies
    await queryInterface.createTable('Vacancies', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.JSONB, allowNull: false },
      division: { type: Sequelize.STRING, allowNull: false },
      location: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.JSONB, allowNull: false },
      responsibilities: { type: Sequelize.JSONB },
      qualifications: { type: Sequelize.JSONB },
      benefits: { type: Sequelize.JSONB },
      experienceLevel: { type: Sequelize.ENUM('Entry-Level', 'Mid-Level', 'Senior') },
      status: { type: Sequelize.ENUM('Open', 'Closed'), defaultValue: 'Open' },
      type: { type: Sequelize.ENUM('Full-Time', 'Part-Time', 'Contract') },
      closingDate: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 4. Applicants
    await queryInterface.createTable('Applicants', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      cvUrl: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.ENUM('New', 'Reviewed', 'Interview', 'Hired', 'Rejected'), defaultValue: 'New' },
      submittedDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      notes: { type: Sequelize.TEXT },
      rating: { type: Sequelize.INTEGER },
      vacancyId: {
        type: Sequelize.UUID,
        references: { model: 'Vacancies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 5. Media
    await queryInterface.createTable('Media', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      type: { type: Sequelize.ENUM('Image', 'Video', 'Document', 'Archive'), allowNull: false },
      size: { type: Sequelize.INTEGER, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
      folderPath: { type: Sequelize.STRING, defaultValue: '/' },
      dimensions: { type: Sequelize.JSONB },
      uploaderId: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 6. Milestones
    await queryInterface.createTable('Milestones', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      year: { type: Sequelize.STRING, allowNull: false },
      event: { type: Sequelize.JSONB, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 7. Tenders
    await queryInterface.createTable('Tenders', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      title: { type: Sequelize.JSONB, allowNull: false },
      reference: { type: Sequelize.STRING, allowNull: false, unique: true },
      status: { type: Sequelize.ENUM('Open', 'Closed'), defaultValue: 'Open' },
      publishedDate: { type: Sequelize.DATE, allowNull: false },
      closingDate: { type: Sequelize.DATE, allowNull: false },
      description: { type: Sequelize.JSONB, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 8. Suppliers
    await queryInterface.createTable('Suppliers', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      companyName: { type: Sequelize.STRING, allowNull: false },
      registrationNumber: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING },
      contactPerson: { type: Sequelize.STRING },
      contactEmail: { type: Sequelize.STRING },
      profileUrl: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 9. Settings
    await queryInterface.createTable('Settings', {
      key: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
      value: { type: Sequelize.TEXT },
      type: { type: Sequelize.ENUM('string', 'boolean', 'number', 'text'), defaultValue: 'string' },
      group: { type: Sequelize.STRING, defaultValue: 'General' },
      description: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 10. Security Alerts
    await queryInterface.createTable('SecurityAlerts', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      type: { type: Sequelize.STRING, allowNull: false },
      details: { type: Sequelize.STRING },
      severity: { type: Sequelize.ENUM('Low', 'Medium', 'High', 'Critical'), defaultValue: 'Low' },
      isResolved: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // 11. Whitelisted IPs
    await queryInterface.createTable('WhitelistedIps', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      ipAddress: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING },
      addedBy: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WhitelistedIps');
    await queryInterface.dropTable('SecurityAlerts');
    await queryInterface.dropTable('Settings');
    await queryInterface.dropTable('Suppliers');
    await queryInterface.dropTable('Tenders');
    await queryInterface.dropTable('Milestones');
    await queryInterface.dropTable('Media');
    await queryInterface.dropTable('Applicants');
    await queryInterface.dropTable('Vacancies');
    await queryInterface.dropTable('News');
    await queryInterface.dropTable('Industries');
  }
};
