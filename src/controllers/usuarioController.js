const Usuario = require('../models/Usuario');

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
  const { usuario, contraseña, rol, tablas = 0, verProgramacion = 0, editProgramacion = 0, email = 0, gestionarUsuarios = 0 } = req.body;

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

    res.json({ message: 'Usuario y contraseña correctos', usuario: usuarioExistente });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
