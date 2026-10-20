const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// --- User Model ---
const User = require('./user');

// --- Role Model ---
const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, 
  description: { type: DataTypes.STRING },
  permissions: { type: DataTypes.JSON, defaultValue: [] }, 
});

// --- Industry Model ---
const Industry = require('./industry');

// --- Supplier Model ---
const Supplier = sequelize.define('Supplier', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  companyName: { type: DataTypes.STRING, allowNull: false },
  regNumber: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  country: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  contactName: { type: DataTypes.STRING, allowNull: false },
  contactTitle: { type: DataTypes.STRING },
  contactEmail: { type: DataTypes.STRING, allowNull: false },
  contactPhone: { type: DataTypes.STRING },
  services: { type: DataTypes.TEXT },
  documentsUrl: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Pending', 'Verified', 'Blacklisted', 'Archived'), defaultValue: 'Pending' },
  registeredAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// --- News Model ---
const News = require('./news');

// --- Vacancy Model ---
const Vacancy = require('./vacancy');

// --- Applicant Model ---
const Applicant = sequelize.define('Applicant', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('New', 'Reviewed', 'Interview', 'Hired', 'Rejected'), defaultValue: 'New' },
  cvUrl: { type: DataTypes.STRING },
  notes: { type: DataTypes.JSON, defaultValue: [] },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

// --- Page Model ---
const Page = require('./page');

// --- Inquiry Model ---
const Inquiry = require('./inquiry');

// --- SecurityLog Model ---
const SecurityLog = require('./securityLog');

// --- Media Model ---
const Media = require('./media');

// --- Tender Model ---
const Tender = require('./tender');

// --- Relationships ---
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

Vacancy.hasMany(Applicant, { foreignKey: 'vacancyId' });
Applicant.belongsTo(Vacancy, { foreignKey: 'vacancyId' });

User.hasMany(News, { foreignKey: 'authorId', as: 'authoredNews' });
News.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Media, { foreignKey: 'uploadedById', as: 'uploadedAssets' });
Media.belongsTo(User, { foreignKey: 'uploadedById', as: 'uploadedBy' });

User.hasMany(SecurityLog, { foreignKey: 'userId' });
SecurityLog.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Inquiry, { foreignKey: 'assignedToId', as: 'assignedInquiries' });
Inquiry.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });

module.exports = {
  sequelize,
  User, Role, Industry, News, Vacancy, Applicant, Page, Supplier, Tender, Inquiry, SecurityLog, Media
};
