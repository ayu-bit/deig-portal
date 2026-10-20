module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Unread', 'Read', 'Resolved'),
        defaultValue: 'Unread',
      },
      division: {
        type: DataTypes.ENUM('General', 'HR', 'Procurement', 'Media'),
        defaultValue: 'General',
      },
    });
    return Contact;
  };