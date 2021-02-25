const express = require('express');
const path = require('path');

const db = require('../models');

// middlewares
const index = require('./index')(db);
const users = require('./users')(db);

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/public/snippets', express.static(path.join(__dirname, 'public/snippets')));
};