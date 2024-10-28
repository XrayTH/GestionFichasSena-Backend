const Coordinador = require('../models/Coordinador');

exports.obtenerTodos = async (req, res) => {
  try {
    const coordinadores = await Coordinador.findAll({
      order: [['nombre', 'ASC']], 
    });
    res.status(200).json(coordinadores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los coordinadores', error });
  }
};

exports.crear = async (req, res) => {
  const { documento, nombre, email, telefono } = req.body;

  if (!documento || !nombre) {
    return res.status(400).json({ message: 'El campo documento y nombre son obligatorios' });
  }

  try {
    const nuevoCoordinador = await Coordinador.create({
      documento,
      nombre,
      email,
      telefono,
    });
    res.status(201).json({ message: 'Coordinador creado con éxito', coordinador: nuevoCoordinador });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el coordinador', error });
  }
};

exports.obtenerPorDocumento = async (req, res) => {
  const { documento } = req.params;
  try {
    const coordinador = await Coordinador.findByPk(documento);
    if (coordinador) {
      res.status(200).json(coordinador);
    } else {
      res.status(404).json({ message: 'Coordinador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el coordinador', error });
  }
};

exports.obtenerPorNombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    const coordinador = await Coordinador.findOne({ where: { nombre } });
    if (coordinador) {
      res.status(200).json(coordinador);
    } else {
      res.status(404).json({ message: 'Coordinador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el coordinador', error });
  }
};

exports.actualizarPorDocumento = async (req, res) => {
  const { documento } = req.params;
  const { nombre, email, telefono } = req.body;

  if (!documento || !nombre) {
    return res.status(400).json({ message: 'El campo documento y nombre son obligatorios' });
  }

  try {
    const coordinador = await Coordinador.findByPk(documento);
    if (coordinador) {
      coordinador.nombre = nombre || coordinador.nombre;
      coordinador.email = email || coordinador.email;
      coordinador.telefono = telefono || coordinador.telefono;
      await coordinador.save();
      res.status(200).json({ message: 'Coordinador actualizado con éxito', coordinador });
    } else {
      res.status(404).json({ message: 'Coordinador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el coordinador', error });
  }
};

exports.eliminarPorDocumento = async (req, res) => {
  const { documento } = req.params;

  try {
    const coordinador = await Coordinador.findByPk(documento);
    if (coordinador) {
      await coordinador.destroy();
      res.status(200).json({ message: 'Coordinador eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Coordinador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el coordinador', error });
  }
};
