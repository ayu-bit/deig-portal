
module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('Media', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('Image', 'Video', 'Document', 'Archive'),
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER, // in bytes
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Additional metadata
        folderPath: {
            type: DataTypes.STRING,
            defaultValue: '/',
        },
        dimensions: {
            type: DataTypes.JSON, // { width, height }
        },
    });
    return Media;
};
