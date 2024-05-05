// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear una instancia de la aplicación Express
const app = express();

// Middleware
app.use(bodyParser.json()); // Middleware para parsear JSON en las solicitudes
app.use(cors()); // Middleware para habilitar CORS

// Rutas
app.use('/api/users', require('./routes/userRoutes')); // Rutas relacionadas con los usuarios
app.use('/api/tweets', require('./routes/tweetRoutes')); // Rutas relacionadas con los tweets

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5173;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
