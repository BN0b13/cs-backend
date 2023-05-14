import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.PG_DATABASE_NAME, process.env.PG_USERNAME, process.env.PG_PASSWORD, { 
    dialect: 'postgres', 
    dialectModule: pg,
    dialectOptions: {},
    host: process.env.HOST,
    port: 5432,
    pool: {
        max: 10
    }
});

export {
    sequelize
}