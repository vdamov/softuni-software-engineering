const Sequelize = require('sequelize');
const encryption = require("../utilities/encryption");

module.exports = function (sequelize) {
    const User = sequelize.define('User', {
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
            allowNull: false
        },
        passwordHash: {
            type: Sequelize.STRING,
            required: true
        },
        fullName: {
            type: Sequelize.STRING,
            required: true
        },
        country: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'Bulgaria'

        },
        city: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'Sofia'
        },
        website: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'website.com'

        },
        facebook: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'facebook.com'
        },
        birthDate: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: '1995-01-01'
        },
        profilePic: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            defaultValue: 'http://placehold.it/380x500'
        },
        salt: {
            type: Sequelize.STRING,
            required: true
        },

    }, {
        timestamps: false
    });

    User.prototype.authenticate = function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        return inputPasswordHash === this.passwordHash;
    };

    User.associate = (models) => {
        User.hasMany(models.Article, {
            foreignKey: 'authorId',
            sourceKey: 'id'
        });
    };


    return User;
};