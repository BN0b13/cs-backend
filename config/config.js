import 'dotenv/config';

export default {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgresql"
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgresql"
  },
  "production": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE_NAME,
    "seederStorage": "sequelize",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgresql"
  }
}