

module.exports = async (db) => {
    await Object.keys(db.tables).forEach(async (name) => {
        // checks what is the current state of the table in the database
        // (which columns it has, what are their data types, etc),
        // and then performs the necessary changes in the table to make it match the model.
        await db.tables[name].sync({ alter: true });
        console.log(`[migration.js] - The table ${name} was just (re)created!`);
    });
    return null;
}