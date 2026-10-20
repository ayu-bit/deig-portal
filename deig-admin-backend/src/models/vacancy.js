module.exports = (sequelize, DataTypes) => {
    const Vacancy = sequelize.define('Vacancy', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      responsibilities: {
        type: DataTypes.JSON,
      },
      qualifications: {
        type: DataTypes.JSON,
      },
      benefits: {
        type: DataTypes.JSON,
      },
      experienceLevel: {
        type: DataTypes.ENUM('Entry-Level', 'Mid-Level', 'Senior'),
      },
      status: {
        type: DataTypes.ENUM('Open', 'Closed'),
        defaultValue: 'Open',
      },
      type: {
        type: DataTypes.ENUM('Full-Time', 'Part-Time', 'Contract'),
      },
      closingDate: {
        type: DataTypes.DATE,
      },
    });
    return Vacancy;
  };