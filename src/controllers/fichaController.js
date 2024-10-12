const Ficha = require('../models/ficha');

// Ver todas las fichas
exports.verTodosFichas = async (req, res) => {
  try {
    const fichas = await Ficha.findAll();
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las fichas.' });
  }
};

// Buscar una ficha por código
exports.buscarFicha = async (req, res) => {
  const { codigo } = req.params;
  try {
    const ficha = await Ficha.findOne({ where: { codigo } });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada.' });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la ficha.' });
  }
};

// Crear una ficha
exports.crearFicha = async (req, res) => {
  const { codigo, coordinador, programa, gestor, ambiente, municipio, ubicacionGPS, inicio, fin, requerimientos } = req.body;
  try {
    const nuevaFicha = await Ficha.create({
      codigo,
      coordinador,
      programa: programa || null, // Permite que sea nulo
      gestor,
      ambiente,
      municipio,
      ubicacionGPS,
      inicio: inicio || null, // Permite que sea nulo
      fin: fin || null, // Permite que sea nulo
      requerimientos
    });
    res.status(201).json(nuevaFicha);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ficha.' });
  }
};

// Actualizar una ficha
exports.actualizarFicha = async (req, res) => {
  const { codigo } = req.params;
  const { coordinador, programa, gestor, ambiente, municipio, ubicacionGPS, inicio, fin, requerimientos } = req.body;
  try {
    const ficha = await Ficha.findOne({ where: { codigo } });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada.' });

    await ficha.update({
      coordinador,
      programa: programa || null, // Permite que sea nulo
      gestor,
      ambiente,
      municipio,
      ubicacionGPS,
      inicio: inicio || null, // Permite que sea nulo
      fin: fin || null, // Permite que sea nulo
      requerimientos
    });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ficha.' });
  }
};

// Borrar una ficha
exports.borrarFicha = async (req, res) => {
  const { codigo } = req.params;
  try {
    const ficha = await Ficha.findOne({ where: { codigo } });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada.' });

    await ficha.destroy();
    res.json({ message: 'Ficha eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar la ficha.' });
  }
};
