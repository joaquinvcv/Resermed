import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

var dbPass = process.env.DB_PASS ? process.env.DB_PASS : 'pass123';

var db = {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
};

export const sequelize = new Sequelize('resermed', 'postgres', dbPass, db);
