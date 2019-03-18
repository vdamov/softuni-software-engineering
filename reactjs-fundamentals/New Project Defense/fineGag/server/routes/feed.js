const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/memes', feedController.getMemes);
router.post('/add-meme', isAuth, feedController.addMeme);
router.post('/add-vote', isAuth, feedController.addVote);
router.post('/add-comment', isAuth, feedController.addComment);
router.post('/delete-comment', isAuth, feedController.deleteComment);
router.post('/delete-meme', isAuth, feedController.deleteMeme);

module.exports = router;