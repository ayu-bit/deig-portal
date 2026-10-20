
module.exports = (sequelize, DataTypes) => {
    const Industry = sequelize.define('Industry', {
      id: {
        type: DataTypes.STRING, // Using shortName as ID, e.g., 'haei'
        primaryKey: true,
        allowNull: false,
      },
      shortName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      fullName: {
        type: DataTypes.JSON, // {en: "...", am: "..."}
        allowNull: false,
      },
      description: {
        type: DataTypes.JSON, // {en: "...", am: "..."}
        allowNull: false,
      },
      icon: {
        type: DataTypes.TEXT,
      },
      capabilities: {
        type: DataTypes.JSON, // {en: [], am: []}
      },
      productsOrServices: {
        type: DataTypes.JSON, // {en: [], am: []}
      },
      heroImage: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      facilityPhotos: {
        type: DataTypes.JSON,
      },
      technicalHighlights: {
        type: DataTypes.JSON, // {en: [], am: []}
      },
      divisionalContact: {
        type: DataTypes.JSON,
      },
      coordinates: {
        type: DataTypes.JSON,
      },
      contactPerson: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('Online', 'Maintenance'),
        defaultValue: 'Online',
      },
    });
    return Industry;
  };
