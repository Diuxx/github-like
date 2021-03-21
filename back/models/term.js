'use strict';

module.exports = (sequelize, DataTypes) => {
    const Term = sequelize.define('term', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Libelle: DataTypes.TEXT
    }, {
        tableName: 'terms'
    });

    Term.associate = (models) => {
        models.terms.hasMany(models.occurrences, { foreignKey: 'TermId' });
    };

    return Term;
};