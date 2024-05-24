const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Controladores para las rutas de usuario
const userController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Nombre de usuario o email ya existen' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'Usuario registrado exitosamente', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  },

  followUser: async (req, res) => {
    const { id } = req.params;

    try {
      const userToFollow = await User.findById(id);

      if (!userToFollow) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const currentUser = await User.findById(req.user._id);

      if (!currentUser.following.includes(id)) {
        currentUser.following.push(id);
        await currentUser.save();
      }

      res.status(200).json({ message: 'Usuario seguido exitosamente', currentUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al seguir usuario' });
    }
  }
};

module.exports = userController;
