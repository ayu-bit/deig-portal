
module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Published', 'Draft'),
        defaultValue: 'Draft',
      },
    });
    return News;
  };
