const express = require('express');
const router = express.Router();

// Importar el controlador de usuarios
const userController = require('../controllers/userController');

// Rutas para usuarios
router.post('/register', userController.register); // Ruta para registrar un nuevo usuario
router.post('/login', userController.login); // Ruta para iniciar sesión de usuario
app.get("/users", (req, res) => {
    User.find({})
      .then(users => res.json(users))
      .catch(err => console.log(err));
  });
  

module.exports = router;
