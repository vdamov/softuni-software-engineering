const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');


module.exports = {
    signUp: async (req, res, next) => {

        try {
            const {username, password, email} = req.body;

            const checkEmail = await User.findOne({email: email});

            if (checkEmail) {
                const error = new Error('A user with this email already exists!');
                error.statusCode = 422;
                return res.status(422).json({message: 'A user with this email already exists!', error})
            }
            const checkUsername = await User.findOne({username: username});

            if (checkUsername) {
                const error = new Error('A user with this username already exists!');
                error.statusCode = 422;
                return res.status(422).json({message: 'A user with this username already exists!', error})
            }
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);

            User.create({
                email,
                hashedPassword,
                username,
                salt
            }).then((user) => {
                const token = jwt.sign({
                        username: user.username,
                        userId: user._id.toString()
                    }
                    , 'somesupersecret'
                    , {expiresIn: '1h'});

                res.status(201)
                    .json({
                        message: 'You have been successfully registered.',
                        username: user.username,
                        userId: user.id,
                        token,
                        isAdmin: user.roles.indexOf('Admin') !== -1
                    });
            })

        } catch (e) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});

        }

    },
    signIn: (req, res, next) => {
        const {email, password} = req.body;

        User.findOne({email})
            .then((user) => {
                if (!user) {
                    const error = new Error('A user with this email could not be found');
                    error.statusCode = 422;
                    return res.status(422).json({message: 'A user with this email could not be found', error})
                }

                if (!user.authenticate(password)) {
                    const error = new Error('The email or password is incorrect.');
                    error.statusCode = 422;
                    return res.status(422).json({message: 'The email or the password is incorrect.', error})
                }

                const token = jwt.sign({
                        username: user.username,
                        userId: user._id.toString()
                    }
                    , 'somesupersecret'
                    , {expiresIn: '1h'});

                res.status(200).json(
                    {
                        message: 'User successfully logged in!',
                        token,
                        username: user.username,
                        isAdmin: user.roles.indexOf('Admin') !== -1,
                        userId: user.id
                    });
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            })
    },
    isAuth: async (req, res) => {
        try {
            const token = req.body.token;
            const decoded = jwt.verify(token, 'somesupersecret');
            const user = await User.findOne({_id: decoded.userId});

            res.status(200).json(
                {
                    message: 'User successfully logged in!',
                    username: decoded.username,
                    isAdmin: user.roles.indexOf('Admin') !== -1,
                    userId: decoded.userId
                });
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});
        }


    }
};