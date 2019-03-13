const router = require('express').Router();
const {body} = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                })
            }),
        body('password')
            .trim()
            .isLength({min: 6})
            .withMessage('Please enter a valid password.'),
        body('username')
            .trim()
            .custom((value) => {
                return User.findOne({username: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Username already exists!');
                    }
                })
            })
            .isLength({min: 6})
            .withMessage('Please enter a valid username.')
    ]
    , authController.signUp);
router.post('/signin', authController.signIn);
router.post('/is-auth', authController.isAuth);

module.exports = router;
