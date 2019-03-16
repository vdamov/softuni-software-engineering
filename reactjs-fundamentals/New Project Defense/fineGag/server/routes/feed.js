const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/memes', feedController.getMemes);
router.post('/add-meme', feedController.addMeme);
router.post('/add-vote', feedController.addVote);
router.post('/add-comment', feedController.addComment);
router.post('/delete-comment', feedController.deleteComment);
router.post('/delete-meme', feedController.deleteMeme);

module.exports = router;