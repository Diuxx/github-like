'use strict';

require('dotenv/config');
var express = require('express');
var app = express();

// socket io
const io = require('./io')(app);

// routing
require('./routes/routing')(app);

// middleware
require('./middleware')(app);

// error handler
require('./error-handler')(app);

app.listen(process.env.PORT, () => console.log(`Server [node-js] is running on port ${process.env.PORT}`));
module.exports = app;
