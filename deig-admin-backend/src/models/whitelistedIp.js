
module.exports = (sequelize, DataTypes) => {
    const WhitelistedIp = sequelize.define('WhitelistedIp', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isIP: true },
      },
      description: {
        type: DataTypes.STRING, // e.g., 'HQ Office VPN'
      },
      addedBy: {
        type: DataTypes.STRING, // User name or ID
      }
    });
    return WhitelistedIp;
  };
