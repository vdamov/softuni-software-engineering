const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/memes', feedController.getMemes);
router.post('/add-meme', feedController.addMeme);
router.post('/add-vote', feedController.addVote);

module.exports = router;