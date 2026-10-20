const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;

if (process.env.DB_DIALECT === 'sqlite' || !process.env.DB_NAME) {
  // Use SQLite for local development/preview if no MySQL/Postgres config provided
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
  console.log('>>> [DB] Using SQLite (Preview Mode)');
} else {
  // Use MySQL/Postgres as configured
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: process.env.DB_DIALECT || 'mysql',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ ${sequelize.getDialect().toUpperCase()} Connected Successfully`);
    
    // Sync models in development
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('✅ Models Synchronized');
    }
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    // console.error(error);
  }
};

module.exports = { sequelize, connectDB };
