'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize
    .define('user', {
        Id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        GoogleId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    }, { 
        tableName: 'users' 
    });

    // list of all created models
    User.associate = (models) => {
        models.users.hasMany(models.snippets, {
            foreignKey: 'UserId'
        });
        models.users.hasMany(models.comments, {
            foreignKey: 'UserId'
        });
    };

    return User;
};