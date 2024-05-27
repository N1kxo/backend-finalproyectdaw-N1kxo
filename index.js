require('dotenv').config();
const dbconnect = require("./config/config.js");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const tweetRoutes = require('./routes/tweetRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const corsMiddleware = require('./middlewares/corsMiddleware.js');
const app = express();

// Conectar a la base de datos
dbconnect();

// Middleware
app.use(bodyParser.json());
app.use(corsMiddleware);

// Rutas
app.use('/tweets', tweetRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.sendStatus(404); // o puedes usar res.json({ message: 'Not Found' });
});

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
