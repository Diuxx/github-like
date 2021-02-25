'use strict';

module.exports = (sequelize, DataTypes) => {
    const Langage = sequelize.define('langage', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        Extention: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        Icon: DataTypes.STRING(255),
    },
    {
        tableName: 'langages'
    });

    // Add table associations
    Langage.associate = (models) => {
        // hasMany Files
        models.langages.hasMany(models.files, {
            foreignKey: 'LangageId'
        });
    };

    return Langage;
};