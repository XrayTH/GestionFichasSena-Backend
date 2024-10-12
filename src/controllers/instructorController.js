const Instructor = require('../models/Instructor'); // Ajusta la ruta a tu modelo

// Obtener todos los instructores
exports.obtenerTodos = async (req, res) => {
  try {
    const instructores = await Instructor.findAll();
    res.status(200).json(instructores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los instructores', error });
  }
};

// Crear un nuevo instructor
exports.crear = async (req, res) => {
  const { documento, nombre, email, telefono } = req.body;

  // Validación para que no se permitan valores vacíos o nulos
  if (!documento || !nombre) {
    return res.status(400).json({ message: 'El campo documento y nombre son obligatorios' });
  }

  try {
    const nuevoInstructor = await Instructor.create({
      documento,
      nombre,
      email,
      telefono,
    });
    res.status(201).json({ message: 'Instructor creado con éxito', instructor: nuevoInstructor });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el instructor', error });
  }
};

// Obtener instructor por documento
exports.obtenerPorDocumento = async (req, res) => {
  const { documento } = req.params;
  try {
    const instructor = await Instructor.findByPk(documento);
    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el instructor', error });
  }
};

// Obtener instructor por nombre
exports.obtenerPorNombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    const instructor = await Instructor.findOne({ where: { nombre } });
    if (instructor) {
      res.status(200).json(instructor);
    } else {
      res.status(404).json({ message: 'Instructor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el instructor', error });
  }
};

// Actualizar instructor por documento
exports.actualizarPorDocumento = async (req, res) => {
  const { documento } = req.params;
  const { nombre, email, telefono, areaTematica } = req.body;

  // Validación para que no se actualicen con valores vacíos o nulos
  if (!documento || !nombre) {
    return res.status(400).json({ message: 'El campo documento y nombre son obligatorios' });
  }

  try {
    const instructor = await Instructor.findByPk(documento);
    if (instructor) {
      instructor.nombre = nombre || instructor.nombre;
      instructor.email = email || instructor.email;
      instructor.telefono = telefono || instructor.telefono;
      instructor.areaTematica = areaTematica || instructor.areaTematica;
      await instructor.save();
      res.status(200).json({ message: 'Instructor actualizado con éxito', instructor });
    } else {
      res.status(404).json({ message: 'Instructor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el instructor', error });
  }
};

// Eliminar instructor por documento
exports.eliminarPorDocumento = async (req, res) => {
  const { documento } = req.params;

  try {
    const instructor = await Instructor.findByPk(documento);
    if (instructor) {
      await instructor.destroy();
      res.status(200).json({ message: 'Instructor eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Instructor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el instructor', error });
  }
};
