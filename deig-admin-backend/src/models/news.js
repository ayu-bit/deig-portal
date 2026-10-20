const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleAm: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  contentAm: {
    type: DataTypes.TEXT,
  },
  excerpt: {
    type: DataTypes.TEXT,
  },
  excerptAm: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Published', 'Draft', 'Archived'),
    defaultValue: 'Draft',
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = News;
