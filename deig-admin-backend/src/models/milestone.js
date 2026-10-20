
module.exports = (sequelize, DataTypes) => {
    const Milestone = sequelize.define('Milestone', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event: {
        type: DataTypes.JSON, // { en: "...", am: "..." }
        allowNull: false,
      },
    });
    return Milestone;
  };
