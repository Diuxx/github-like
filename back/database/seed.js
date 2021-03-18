'use strict';

const { nanoid } = require('nanoid');

var env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config.json`)[env];

const baseId = 'uid-';

// seed data
var seedUsers = require(`${__dirname}/seeds/users.json`);
var seedLanguages = require(`${__dirname}/seeds/languages.json`);

console.log(`[seed.js] - Performing seed on ${config.db}`);

module.exports = async (db) => {
    // get all users
    const users = await db.tables.users.findAll({ raw: true });
    const languages = await db.tables.languages.findAll({ raw: true });

    // check database users Id's
    const usersAlreadySeeded = users.some(u => u.Id.includes(`${baseId}`));
    const languagesAlreadySeeded = languages.some(l => l.Id.includes(`${baseId}`));
    
    if(!usersAlreadySeeded) {
        seedUsers.forEach(async (user) => await db.tables.users.create({
            Id: `${user.Id}`,
            GoogleId: `${user.GoogleId}`,
            Name: `${user.Name}`
        }));
        console.log('[seed.js] - users table hase been seeded');
    }

    if(!languagesAlreadySeeded) {
        seedLanguages.forEach(async (language) => {
            await db.tables.languages.create({
                Id: `${language.Id}`,
                Name: `${language.Name}`,
                Extension: `${language.Extension}`,
                Icon: `${language.Icon}`
            })
        });
        console.log('[seed.js] - language table hase been seeded');
    }
    return null;
}