const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.ENUM('Image', 'Video', 'Document', 'Archive'),
    defaultValue: 'Document',
  },
  url: {
    type: DataTypes.STRING,
  },
  uploadedById: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Media;
