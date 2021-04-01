'use strict';

require('dotenv/config');
var express = require('express');
var app = express();

var path = require('path');
global.appRoot = path.resolve(__dirname);
global.snippetsRoot = `${path.resolve(__dirname)}\\public\\snippets`;

console.log(`${snippetsRoot}`);

// socket io
const io = require('./io')(app);

// middleware
require('./middleware')(app);

// routing
require('./routes/routing')(app);

// error handler
require('./error-handler')(app);

app.listen(process.env.PORT, () => console.log(`Server [node-js] is running on port ${process.env.PORT}`));
module.exports = app;
