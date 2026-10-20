
module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      contactPerson: {
        type: DataTypes.STRING,
      },
      contactEmail: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      profileUrl: {
        type: DataTypes.STRING, // Path to uploaded PDF
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending',
      }
    });
    return Supplier;
  };
