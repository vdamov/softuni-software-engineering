const router = require('express').Router();
const {body} = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/is-auth', authController.isAuth);

module.exports = router;
