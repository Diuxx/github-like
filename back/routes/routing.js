const express = require('express');
const path = require('path');

const db = require('../models');

// middlewares
const index = require('./index')(db);
const users = require('./users')(db);
const languages = require('./languages')(db);
const snippets = require('./snippets')(db);

module.exports = (app) => {
    app.use('/', index);
    app.use('/snippets', snippets);
    app.use('/languages', languages);
    app.use('/users', users);
    app.use('/public/snippets', express.static(path.join(__dirname, 'public/snippets')));
};