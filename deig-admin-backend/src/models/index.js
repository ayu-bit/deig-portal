
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const db = {};

db.Sequelize = DataTypes;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Role = require('./role')(sequelize, DataTypes);
db.Industry = require('./industry')(sequelize, DataTypes);
db.News = require('./news')(sequelize, DataTypes);
db.Vacancy = require('./vacancy')(sequelize, DataTypes);
db.Applicant = require('./applicant')(sequelize, DataTypes);
db.Media = require('./media')(sequelize, DataTypes);
db.Contact = require('./contact')(sequelize, DataTypes);
db.AuditLog = require('./auditLog')(sequelize, DataTypes);
db.Milestone = require('./milestone')(sequelize, DataTypes);
db.Tender = require('./tender')(sequelize, DataTypes);
db.Supplier = require('./supplier')(sequelize, DataTypes);
db.Setting = require('./setting')(sequelize, DataTypes);
db.SecurityAlert = require('./securityAlert')(sequelize, DataTypes);
db.WhitelistedIp = require('./whitelistedIp')(sequelize, DataTypes);

// Define associations
// User - Role
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

// Vacancy - Applicant
db.Vacancy.hasMany(db.Applicant, { foreignKey: 'vacancyId' });
db.Applicant.belongsTo(db.Vacancy, { foreignKey: 'vacancyId' });

// User associations (e.g., who created what)
db.User.hasMany(db.News, { foreignKey: 'authorId', as: 'authoredNews' });
db.News.belongsTo(db.User, { foreignKey: 'authorId', as: 'author' });

db.User.hasMany(db.Media, { foreignKey: 'uploaderId' });
db.Media.belongsTo(db.User, { foreignKey: 'uploaderId', as: 'uploader' });

db.User.hasMany(db.AuditLog, { foreignKey: 'userId' });
db.AuditLog.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Contact, { foreignKey: 'assigneeId', as: 'assignedContacts' });
db.Contact.belongsTo(db.User, { foreignKey: 'assigneeId', as: 'assignee' });


module.exports = db;
