const mongoose = require('mongoose');

// Definir el esquema del tweet
const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Crear el modelo de tweet
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
