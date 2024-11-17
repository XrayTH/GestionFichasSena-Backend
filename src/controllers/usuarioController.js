const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.TOKEN_SECRET;

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUsuario = async (req, res) => {
  const { usuario, contraseña, rol, tablas = 0, verProgramacion = 0, editProgramacion = "Ninguno", email = 0, gestionarUsuarios = 0 } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const nuevoUsuario = await Usuario.create({
      usuario,
      contraseña,
      rol: rol || '', 
      tablas,
      verProgramacion,
      editProgramacion,
      email,
      gestionarUsuarios
    });

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.eliminarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    await usuario.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUsuarioById = async (req, res) => {
  const { usuario, contraseña, rol, tablas, verProgramacion, editProgramacion, email, gestionarUsuarios } = req.body;

  if (usuario === undefined || contraseña === undefined) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const usuarioExistente = await Usuario.findByPk(req.params.id);
    if (!usuarioExistente) return res.status(404).json({ message: 'Usuario no encontrado' });

    await usuarioExistente.update({
      usuario,
      contraseña,
      rol: rol !== undefined ? rol : usuarioExistente.rol,
      tablas: tablas !== undefined ? tablas : usuarioExistente.tablas,
      verProgramacion: verProgramacion !== undefined ? verProgramacion : usuarioExistente.verProgramacion,
      editProgramacion: editProgramacion !== undefined ? editProgramacion : usuarioExistente.editProgramacion,
      email: email !== undefined ? email : usuarioExistente.email,
      gestionarUsuarios: gestionarUsuarios !== undefined ? gestionarUsuarios : usuarioExistente.gestionarUsuarios
    });

    res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioExistente });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verificarUsuario = async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ where: { usuario } });
    if (!usuarioExistente) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (usuarioExistente.contraseña !== contraseña) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuarioExistente.id,
        usuario: usuarioExistente.usuario,
        rol: usuarioExistente.rol,
        permisos: {
          tablas: usuarioExistente.tablas,
          verProgramacion: usuarioExistente.verProgramacion,
          editProgramacion: usuarioExistente.editProgramacion,
          email: usuarioExistente.email,
          gestionarUsuarios: usuarioExistente.gestionarUsuarios,
        }
      },
      JWT_SECRET,
      { expiresIn: '24h' } 
    );

    res.json({ message: 'Usuario y contraseña correctos', usuario: usuarioExistente, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verificarTokenYPermisos = async (req, res) => {
  const { token, permisos } = req.body;

  if (!token || !permisos) {
    return res.status(400).json({ message: 'Token y permisos son necesarios' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const usuarioExistente = await Usuario.findByPk(decoded.id);
    if (!usuarioExistente) return res.status(404).json({ message: 'Usuario no encontrado' });

    const permisosDelServidor = {
      tablas: Boolean(usuarioExistente.tablas),
      verProgramacion: Boolean(usuarioExistente.verProgramacion),
      editProgramacion: usuarioExistente.editProgramacion,
      email: Boolean(usuarioExistente.email),
      gestionarUsuarios: Boolean(usuarioExistente.gestionarUsuarios),
    };

    const permisosCoinciden = Object.keys(permisosDelServidor).every(
      permiso => permisosDelServidor[permiso] === permisos[permiso]
    );

    if (!permisosCoinciden) {
      return res.status(403).json({ message: 'Permisos no coinciden' });
    }

    res.json({ message: 'Token y permisos válidos', tokenValido: true, permisosValidos: true});
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    res.status(500).json({ message: err.message });
  }
};
