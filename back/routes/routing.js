const express = require('express');
const path = require('path');

const db = require('../models');

// middlewares
const index = require('./index')(db);
const users = require('./users')(db);
const languages = require('./languages')(db);
const snippets = require('./snippets')(db);
const files = require('./files.js')(db);
const comments = require('./comments.js')(db);

module.exports = (app) => {
    app.use('/', index);
    app.use('/comments', comments);
    app.use('/files', files);
    app.use('/snippets', snippets);
    app.use('/languages', languages);
    app.use('/users', users);
    app.use('/public/snippets', express.static(path.join(__dirname, 'public/snippets')));
};