'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const POSTGRES_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequlizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URL, sequlizeOptions);

const users = require('./user.modal');
const userModal = users(sequelize, DataTypes);
const Collection = require('./collection-class.modal');
const userCollection = new Collection(userModal);

module.exports = {
    db: sequelize,
    userCollection: userCollection
}