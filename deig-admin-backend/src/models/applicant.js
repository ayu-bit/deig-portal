
module.exports = (sequelize, DataTypes) => {
    const Applicant = sequelize.define('Applicant', {
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
      cvUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('New', 'Reviewed', 'Interview', 'Hired', 'Rejected'),
        defaultValue: 'New',
      },
      submittedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 5 },
      },
    });
    return Applicant;
  };
