const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
        trim: true
    },
    hashedPassword: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    salt: {
        type: Schema.Types.String,
        required: true
    },
    roles: [{type: Schema.Types.String, required: true}]
});

userSchema.method({
    authenticate: function (password) {
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, 'Admin1');
        return User.create({
            username: 'Admin',
            email: 'admin@admin.com',
            salt,
            hashedPassword,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;