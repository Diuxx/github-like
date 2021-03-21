'use strict';

const { nanoid } = require('nanoid');

var utils = require(`../utils/utils`);

var env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config.json`)[env];

const baseId = 'uid-';

// seed data
var seedUsers = require(`${__dirname}/seeds/users.json`);
var seedLanguages = require(`${__dirname}/seeds/languages.json`);
var seedSnippets = require(`${__dirname}/seeds/snippets.json`);

console.log(`[seed.js] - Performing seed on ${config.db}`);

module.exports = async (db) => {
    // get all users
    
    const users = await db.tables.users.findAll({ raw: true });
    const languages = await db.tables.languages.findAll({ raw: true });
    const snippets = await db.tables.snippets.findAll({ raw: true });

    // check database users Id's
    const usersAlreadySeeded = users.some(u => u.Id.includes(`${baseId}`));
    const languagesAlreadySeeded = languages.some(l => l.Id.includes(`${baseId}`));
    const snippetsAlreadySeeded = snippets.some(s => s.Id.includes(`${baseId}`))
    
    if(!usersAlreadySeeded) {
        seedUsers.forEach(async (user) => await db.tables.users.create({
            Id: `${user.Id}`,
            GoogleId: `${user.GoogleId}`,
            Name: `${user.Name}`
        }));
        console.log('[seed.js] - users table has been seeded');
    }

    if(!languagesAlreadySeeded) {
        seedLanguages.forEach(async (language) => {
            await db.tables.languages.create({
                Id: `${language.Id}`,
                Name: `${language.Name}`,
                Extension: `${language.Extension}`,
                Icon: `${language.Icon}`,
                Color: `${language.Color}`
            })
        });
        console.log('[seed.js] - language table has been seeded');
    }

    if(!snippetsAlreadySeeded) {
        seedSnippets.forEach(async (snippet) => {

            await db.tables.snippets.create({
                Id: `${snippet.Id}`,
                Title: `${snippet.Title}`,
                Desc: `${snippet.Description}`,
                Repository: `${snippet.Repository}`,
                UserId: `${snippet.UserId}`
            });
            if (snippet.Files != null)
            {
                snippet.Files.forEach(async (file) => {
                    await db.tables.files.create({
                        Id: `${file.Id}`,
                        Name: `${file.Name}`,
                        FileName: `${file.FileName}`,
                        Url: `${file.Url}`,
                        SnippetId: `${snippet.Id}`,
                        LanguageId: `${file.LanguageId}`
                    });
                });
                utils.calculateTf(snippet);
            }
        });
        console.log('[seed.js] - snippet table has been seeded');
    }
    return null;
}