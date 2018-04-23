const encryption = require("../utilities/encryption");
const User = require('../models').User;

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    details: (req, res) => {
        res.render('user/details');
    },

    registerPost: (req, res) => {
        let registerArgs = req.body;

        User.findOne({where: {email: registerArgs.email}}).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'This email is already in use.';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {

                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    country: registerArgs.country,
                    city: registerArgs.city,
                    birthDate: registerArgs.birthDate,
                    website: registerArgs.website,
                    facebook: registerArgs.facebook,
                    profilePic: registerArgs.profilePic,
                    salt: salt
                };

                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs.dataValues);
                            return;
                        }
                        res.redirect('/')
                    })
                })
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {
        let loginArgs = req.body;
        User.findOne({where: {email: loginArgs.email}}).then(user => {
            if (!user || !user.authenticate(loginArgs.password)) {
                loginArgs.error = 'Either username or password is invalid!';
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.redirect('/user/login', {error: err.message});
                    return;
                }

                res.redirect('/');
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
};