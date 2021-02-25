'use strict';

module.exports = (sequelize, DataTypes) => {
    const File = sequelize
    .define('file', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FileName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SnippetId: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        LangageId: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'files'
    });

    // Add table associations
    File.associate = (models) => {
        models.files.belongsTo(models.snippets, {
            onDelete: 'CASCADE',
            foreignKey: 'SnippetId'
        });
        models.files.belongsTo(models.langages, {
            foreignKey: 'LangageId'
        });
    };

    return File;
};