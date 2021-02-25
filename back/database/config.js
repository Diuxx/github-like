'use strict';

const { Sequelize } = require('sequelize');

// get environement
var env = process.env.NODE_ENV || 'development';

// configuration variables
const config = require(`${__dirname}/config.json`)[env];
var db = {};

// create database if not exist
const sequelize = new Sequelize({
        ...config,
        pool: { max: 5, min: 0, idle: 10000 },
        logging: false
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;