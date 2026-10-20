
module.exports = (sequelize, DataTypes) => {
    const Tender = sequelize.define('Tender', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('Open', 'Closed'),
        defaultValue: 'Open',
      },
      publishedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      closingDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    });
    return Tender;
  };
