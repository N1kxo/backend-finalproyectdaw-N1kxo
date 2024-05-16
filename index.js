// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

// Crear una instancia de la aplicación Express
const app = express();

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/TweetScapeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Middleware
app.use(bodyParser.json()); // Middleware para parsear JSON en las solicitudes
app.use(cors()); // Middleware para habilitar CORS

// Rutas
app.use('/api/users', userRoutes); // Rutas relacionadas con los usuarios
app.use('/api/tweets', authMiddleware, tweetRoutes); // Rutas protegidas con autenticación para tweets


// Middleware de manejo de errores
app.use(errorHandler);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
