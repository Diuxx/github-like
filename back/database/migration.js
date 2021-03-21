'use strict';

module.exports = async (db) => {
    // checks what is the current state of the table in the database
    // (which columns it has, what are their data types, etc),
    // and then performs the necessary changes in the table to make it match the model.
    for (const table of Object.keys(db.tables)) {
        try {
            // await db.tables[name].sync({ alter: true });
            await db.tables[table].sync({ force: true })
            .then((e) => {
                console.log(`[migration.js] - The table ${table} was just (re)created!`);
            });
        } catch (err) {
            // print the error details
            console.log(err);
        }
    }

    // seeding
    require('../database/seed')(db);

    return null;
}