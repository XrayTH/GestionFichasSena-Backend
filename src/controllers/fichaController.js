const Ficha = require('../models/ficha');

exports.verTodosFichas = async (req, res) => {
  try {
    const fichas = await Ficha.findAll({
      order: [['codigo', 'ASC']] 
    });
    res.json(fichas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las fichas.' });
  }
};

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

exports.crearFicha = async (req, res) => {
  const { codigo, coordinador, programa, gestor, ambiente, municipio, avenida, ubicacionGPS, inicio, fin, requerimientos } = req.body;
  try {
    const nuevaFicha = await Ficha.create({
      codigo,
      coordinador,
      programa: programa || null, 
      gestor,
      ambiente,
      municipio,
      avenida,
      ubicacionGPS,
      inicio: inicio || null, 
      fin: fin || null, 
      requerimientos
    });
    res.status(201).json(nuevaFicha);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ficha.' });
  }
};

exports.actualizarFicha = async (req, res) => {
  const { codigo } = req.params;
  const { coordinador, programa, gestor, ambiente, municipio, avenida, ubicacionGPS, inicio, fin, requerimientos } = req.body;
  try {
    const ficha = await Ficha.findOne({ where: { codigo } });
    if (!ficha) return res.status(404).json({ error: 'Ficha no encontrada.' });

    await ficha.update({
      coordinador,
      programa: programa || null, 
      gestor,
      ambiente,
      municipio,
      avenida,
      ubicacionGPS,
      inicio: inicio || null, 
      fin: fin || null, 
      requerimientos
    });
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ficha.' });
  }
};

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
