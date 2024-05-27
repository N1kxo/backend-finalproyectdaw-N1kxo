const Tweet = require('../models/TweetModel.js');
const User = require('../models/UserModel.js');
const Notification = require('../models/Notification.js');

// Controladores para las rutas de tweets
const tweetController = {
  getAllTweets: async (req, res) => {
    try {
      const tweets = await Tweet.find().populate('author', 'username');
      res.status(200).json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener tweets' });
    }
  },

  createTweet: async (req, res) => {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const tweet = new Tweet({
      content,
      author: req.user._id,
    });

    try {
      const newTweet = await tweet.save();
      res.status(201).json(newTweet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear tweet' });
    }
  },

  editTweet: async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    try {
      const tweet = await Tweet.findById(id);

      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }

      if (tweet.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this tweet' });
      }

      tweet.content = content;
      const updatedTweet = await tweet.save();
      res.status(200).json(updatedTweet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al editar tweet' });
    }
  },

  deleteTweet: async (req, res) => {
    const { id } = req.params;

    try {
      const tweet = await Tweet.findById(id);

      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }

      if (tweet.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this tweet' });
      }

      await tweet.remove();
      res.status(200).json({ message: 'Tweet eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar tweet' });
    }
  },

  likeTweet: async (req, res) => {
    const { id } = req.params;

    try {
      const tweet = await Tweet.findById(id);

      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }

      if (!tweet.likes.includes(req.user._id)) {
        tweet.likes.push(req.user._id);
        await tweet.save();

        // Create notification
        const notification = new Notification({
          user: tweet.author,
          type: 'like',
          message: `${req.user.username} liked your tweet!!!`
        });
        await notification.save();
      }

      res.status(200).json(tweet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al dar like al tweet' });
    }
  },

  repostTweet: async (req, res) => {
    const { id } = req.params;

    try {
      const tweet = await Tweet.findById(id);

      if (!tweet) {
        return res.status(404).json({ message: 'Tweet not found' });
      }

      const repost = new Tweet({
        content: tweet.content,
        author: req.user._id,
        repostedFrom: tweet._id,
      });

      const newRepost = await repost.save();

      // Create notification
      const notification = new Notification({
        user: tweet.author,
        type: 'repost',
        message: `${req.user.username} reposted your tweet!!!`
      });
      await notification.save();

      res.status(201).json(newRepost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al repostear tweet' });
    }
  },

  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user._id }).populate('user', 'username');
      const formattedNotifications = notifications.map(notification => ({
        username: notification.user.username,
        type: notification.type,
        message: notification.message,
      }));
      res.status(200).json(formattedNotifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
  },

  searchTweets: async (req, res) => {
    const { query } = req.params;
    try {
      // Buscar tweets que contengan la palabra clave o hashtag en el contenido
      const tweets = await Tweet.find({
        content: { $regex: query, $options: 'i' } // $regex para coincidencia parcial, 'i' para case-insensitive
      }).populate('author', 'username');
      
      res.status(200).json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar tweets' });
    }
  }
};

module.exports = tweetController;
