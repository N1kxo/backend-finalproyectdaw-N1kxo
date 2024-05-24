const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  repostedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
