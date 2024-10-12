const Usuario = require('../models/Usuario');

//GET todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//POST nuevo usuario
exports.createUsuario = async (req, res) => {
  const { usuario, contraseña, rol, editar = 0, crear = 0, gestionarUsuarios = 0 } = req.body;

  // Validaciones para asegurar que se reciban usuario y contraseña
  if (!usuario || !contraseña) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const nuevoUsuario = await Usuario.create({
      usuario,
      contraseña,
      rol: rol || '', // Asigna un valor por defecto si rol no está definido
      editar,
      crear,
      gestionarUsuarios
    });

    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//DELETE eliminar usuario por ID
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


//PUT actualizar usuario por ID
exports.updateUsuarioById = async (req, res) => {
  const { usuario, contraseña, rol, editar, crear, gestionarUsuarios } = req.body;

  // Validaciones para asegurarse de que usuario y contraseña no estén vacíos
  if (usuario === undefined || contraseña === undefined) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
  }

  try {
    const usuarioExistente = await Usuario.findByPk(req.params.id);
    if (!usuarioExistente) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualizar solo los campos que se han proporcionado
    await usuarioExistente.update({
      usuario,
      contraseña,
      rol: rol !== undefined ? rol : usuarioExistente.rol,
      editar: editar !== undefined ? editar : usuarioExistente.editar,
      crear: crear !== undefined ? crear : usuarioExistente.crear,
      gestionarUsuarios: gestionarUsuarios !== undefined ? gestionarUsuarios : usuarioExistente.gestionarUsuarios
    });

    res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioExistente });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//POST verificar usuario y contraseña
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
