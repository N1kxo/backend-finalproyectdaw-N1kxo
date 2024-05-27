const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', tweetController.getAllTweets);
router.post('/', protect, tweetController.createTweet);
router.put('/:id', protect, tweetController.editTweet);
router.delete('/:id', protect, tweetController.deleteTweet);
router.post('/:id/like', protect, tweetController.likeTweet);
router.post('/:id/repost', protect, tweetController.repostTweet);
router.get('/notifications', protect, tweetController.getNotifications);
router.get('/search/:query', tweetController.searchTweets);

module.exports = router;
