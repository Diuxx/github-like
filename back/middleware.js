const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const decodeIDToken = require('./authenticateToken');

module.exports = (app) => {
    app.use(cors());
    app.use(decodeIDToken);
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
};