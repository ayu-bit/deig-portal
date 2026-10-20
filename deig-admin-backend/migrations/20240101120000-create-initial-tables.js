'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Roles table first
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Users table
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        defaultValue: 'Active'
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create AuditLogs table
    await queryInterface.createTable('AuditLogs', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false
        },
        details: {
          type: Sequelize.STRING
        },
        ipAddress: {
          type: Sequelize.STRING
        },
        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });

    // Create Contacts table
    await queryInterface.createTable('Contacts', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('Unread', 'Read', 'Resolved'),
            defaultValue: 'Unread'
        },
        division: {
            type: Sequelize.ENUM('General', 'HR', 'Procurement', 'Media'),
            defaultValue: 'General'
        },
        assigneeId: {
            type: Sequelize.UUID,
            references: {
                model: 'Users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contacts');
    await queryInterface.dropTable('AuditLogs');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Roles');
  }
};