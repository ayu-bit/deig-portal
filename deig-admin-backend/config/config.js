
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
    storage: process.env.DATABASE_URL ? null : './database.sqlite',
    logging: false
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_URL ? 'postgres' : 'sqlite',
    storage: process.env.DATABASE_URL ? null : './database.sqlite',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
