const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Industry = sequelize.define('Industry', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  acronym: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  focus: {
    type: DataTypes.STRING,
  },
  capabilities: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  products: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  gallery: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  model3d: {
    type: DataTypes.STRING,
  },
  video: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.JSON,
  },
  technicalHighlights: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  contact: {
    type: DataTypes.JSON,
  },
  facilityInfo: {
    type: DataTypes.JSON,
  },
  status: {
    type: DataTypes.ENUM('Published', 'Draft', 'Archived'),
    defaultValue: 'Draft',
  },
  contactPerson: {
    type: DataTypes.STRING,
  },
});

module.exports = Industry;
