'use strict';

module.exports = (sequelize, DataTypes) => {
    const Snippet = sequelize.define('snippet', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Repository: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Desc: DataTypes.TEXT,
        UserId: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, {
        tableName: 'snippets'
    });

    Snippet.associate = (models) => {
        models.snippets.belongsTo(models.users, { onDelete: 'CASCADE', foreignKey: 'UserId' });
        models.snippets.hasMany(models.files, { foreignKey: 'SnippetId' });
    };

    return Snippet;
};