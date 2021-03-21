'use strict';

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('language', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        Extension: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        Icon: DataTypes.STRING(255),
        Color: DataTypes.STRING(16)
    },
    {
        tableName: 'languages'
    });

    // Add table associations
    Language.associate = (models) => {
        // hasMany Files
        models.languages.hasMany(models.files, {
            foreignKey: 'LanguageId'
        });
    };

    return Language;
};