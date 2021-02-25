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
        // belongsTo User
        UserId: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, {
        tableName: 'snippets'
    });

    Snippet.associate = (models) => {
        // belongsTo User
        models.snippets.belongsTo(models.users, { onDelete: 'CASCADE', foreignKey: 'UserId' });
        // hasMany Files
        models.snippets.hasMany(models.files, { foreignKey: 'SnippetId' });
        // models.snippets.hasMany(models.comments, { foreignKey: 'SnippetId' });
    };

    // Snippet.associate = (models) => {
    //     // hasMany Comments
    //     models.snippets.hasMany(models.comments, {
    //         foreignKey: 'SnippetId'
    //     });
    // };

    return Snippet;
};