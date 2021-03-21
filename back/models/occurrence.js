'use strict';

module.exports = (sequelize, DataTypes) => {
    const Occurrence = sequelize.define('occurrence', {
        SnippetId: {
            type: DataTypes.STRING, 
            primaryKey: true,
            allowNull: false
        },
        TermId: {
            type: DataTypes.STRING, 
            primaryKey: true,
            allowNull: false
        },
        Count: DataTypes.INTEGER,
    }, {
        tableName: 'occurrences'
    });

    Occurrence.associate = (models) => {
        models.occurrences.belongsTo(models.terms, { foreignKey: 'TermId' });
        models.occurrences.belongsTo(models.snippets, { foreignKey: 'SnippetId' });
    };

    return Occurrence;
};