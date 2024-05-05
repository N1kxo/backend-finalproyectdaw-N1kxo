const express = require('express');
const router = express.Router();

// Importar el controlador de tweets
const tweetController = require('../controllers/tweetController');

// Rutas para tweets
router.get('/', tweetController.getAllTweets); // Ruta para obtener todos los tweets
router.post('/', tweetController.createTweet); // Ruta para crear un nuevo tweet
router.put('/:id', tweetController.editTweet); // Ruta para editar un tweet existente
router.delete('/:id', tweetController.deleteTweet); // Ruta para eliminar un tweet

module.exports = router;
