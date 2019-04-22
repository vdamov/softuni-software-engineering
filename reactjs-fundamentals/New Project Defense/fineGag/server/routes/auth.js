const router = require('express').Router();
const authController = require('../controllers/auth');
require('../models/User');
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/is-auth', authController.isAuth);
router.post('/delete/user', authController.deleteUser);
router.put('/edit/user', authController.editUser);
router.get('/users', authController.getAllUsers);
router.get('/user/:username', authController.getUserByUsername);

module.exports = router;
