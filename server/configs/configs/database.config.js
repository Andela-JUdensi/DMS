require('dotenv').config();

export default {
  development: {
    database: process.env.DEV_DB_NAME,
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    url: process.env.DEV_DATABASE_URL,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    url: process.env.TEST_DATABASE_URL,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    database: process.env.PROD_DB_NAME,
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    url: process.env.PROD_DATABASE_URL,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
