const cors = require('cors');

const corsOptions = {
  origin: '*', // Configurar según tus necesidades
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
