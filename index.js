// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');

// Crear una instancia de la aplicación Express
const app = express();

mongoose.connect('mongodb://localhost:27017/TweetScapeDB')

app.get("/users", (req,res) => {
  User.find({}).then(function(users) {
    res.json(users)
  }).catch(function(err){
    console.log(err)
  })
})


// Puerto en el que se ejecutará el servidor
const PORT = 

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Middleware
app.use(bodyParser.json()); // Middleware para parsear JSON en las solicitudes
app.use(cors()); // Middleware para habilitar CORS

// Rutas
app.use('/tweets', require('./routes/tweetRoutes')); // Rutas relacionadas con los tweets

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});