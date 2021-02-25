'use strict';

const { nanoid } = require('nanoid');

var env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config.json`)[env];

const baseId = 'seed_';

// seed data
var seedUsers = require(`${__dirname}/seeds/users.json`);

console.log(`[seed.js] - Performing seed on ${config.db}`);

module.exports = async (db) => {
    // get all users
    const users = await db.tables.users.findAll({ raw: true });
    // check database users Id's
    const usersAlreadySeeded = users.some(u => u.Id.includes(`${baseId}`));
    
    if(!usersAlreadySeeded) {
        seedUsers.forEach(async (user) => await db.tables.users.create({
            Id: `${baseId}${nanoid(9)}`,
            GoogleId: `${user.GoogleId}`,
            Name: `${user.Name}`
        }));
        console.log('[seed.js] - users table hase been seeded');
    }
    return null;
}