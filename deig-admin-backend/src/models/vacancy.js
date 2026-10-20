const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vacancy = sequelize.define('Vacancy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  division: {
    type: DataTypes.STRING,
  },
  experienceLevel: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed', 'Archived'),
    defaultValue: 'Open',
  },
  type: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract'),
  },
  closingDate: {
    type: DataTypes.DATE,
  },
  responsibilities: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  requirements: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = Vacancy;
