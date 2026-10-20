module.exports = (sequelize, DataTypes) => {
    const AuditLog = sequelize.define('AuditLog', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
      },
      ipAddress: {
        type: DataTypes.STRING,
      },
    }, {
        updatedAt: false, // Audit logs are immutable
    });
    return AuditLog;
  };