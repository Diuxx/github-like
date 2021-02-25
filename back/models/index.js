'use strict';

// db connexion
const db = require('../database/config');
const { DataTypes } = require('sequelize');

// check db authenticate
db.sequelize.authenticate()
.then(() => console.log('INFO - Database connected.'))
.catch(err => console.log('ERROR - Unable to connect to the database', err));

// models
const tables = {};
tables['users'] = require('./user')(db.sequelize, DataTypes);
tables['snippets'] = require('./snippet')(db.sequelize, DataTypes);
tables['files'] = require('./file')(db.sequelize, DataTypes);
tables['langages'] = require('./langage')(db.sequelize, DataTypes);
tables['comments'] = require('./comment')(db.sequelize, DataTypes);

Object.values(tables).forEach(table => {
    if (table.associate) table.associate(tables);
});

db.tables = tables; // assigne tables configuration to db

// migrate tables
require('../database/migration')(db);

// seeding
require('../database/seed')(db);

module.exports = db;