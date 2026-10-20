const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tender = sequelize.define('Tender', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  publishedDate: {
    type: DataTypes.DATE,
  },
  closingDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  },
  summary: {
    type: DataTypes.TEXT,
  },
});

module.exports = Tender;
