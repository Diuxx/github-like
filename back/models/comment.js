'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize
    .define('comment', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        Content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SnippetId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    });

    Comment.associate = (models) => {
        models.comments.belongsTo(models.snippets, {
            // onDelete: 'CASCADE',
            foreignKey: 'SnippetId'
            , as: 'Snippets' 
        });
        models.comments.belongsTo(models.users, {
            // onDelete: 'CASCADE',
            foreignKey: 'UserId'
            , as: 'User' 
        });
    }
    return Comment;
};