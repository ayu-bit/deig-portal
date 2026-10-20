
module.exports = (sequelize, DataTypes) => {
    const Setting = sequelize.define('Setting', {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM('string', 'boolean', 'number', 'text'),
        defaultValue: 'string',
      },
      group: {
        type: DataTypes.STRING, // e.g., 'General', 'Security', 'Contact'
        defaultValue: 'General',
      },
      description: {
        type: DataTypes.STRING,
      }
    });
    return Setting;
  };
