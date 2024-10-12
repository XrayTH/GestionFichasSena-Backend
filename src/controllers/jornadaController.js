const Jornada = require('../models/jornada');

exports.crearJornada = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Validación: Asegurarse de que se incluya un nombre
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const nuevaJornada = await Jornada.create({ nombre });
    return res.status(201).json(nuevaJornada);
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear jornada' });
  }
};

exports.obtenerJornadas = async (req, res) => {
  try {
    const jornadas = await Jornada.findAll({
      order: [['id', 'ASC']], // Ordena por el campo 'id' de menor a mayor
    });
    return res.status(200).json(jornadas);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener jornadas' });
  }
};

exports.obtenerJornadaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const jornada = await Jornada.findByPk(id);
    if (!jornada) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }
    return res.status(200).json(jornada);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener jornada' });
  }
};

exports.actualizarJornada = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Validación: Asegurarse de que se incluya un nombre
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const jornada = await Jornada.findByPk(id);
    if (!jornada) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }
    jornada.nombre = nombre;
    await jornada.save();
    return res.status(200).json(jornada);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar jornada' });
  }
};

exports.eliminarJornada = async (req, res) => {
  try {
    const { id } = req.params;
    const jornada = await Jornada.findByPk(id);
    if (!jornada) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }
    await jornada.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar jornada' });
  }
};
