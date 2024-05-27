require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const errorHandler = require('./middlewares/errorHandler');
const corsMiddleware = require('./middlewares/corsMiddleware');

const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

app.use(bodyParser.json());
app.use(corsMiddleware);

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
