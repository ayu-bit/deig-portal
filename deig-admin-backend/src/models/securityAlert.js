
module.exports = (sequelize, DataTypes) => {
    const SecurityAlert = sequelize.define('SecurityAlert', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING, // e.g., 'Failed Login', 'Intrusion Attempt'
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
      },
      severity: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
        defaultValue: 'Low',
      },
      isResolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });
    return SecurityAlert;
  };
