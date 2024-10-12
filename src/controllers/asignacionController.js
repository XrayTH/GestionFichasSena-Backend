const { Op } = require('sequelize');
const Asignacion = require('../models/asignacion');
const Ficha = require('../models/ficha');

// Obtener todas las asignaciones
exports.getAllAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones' });
  }
};

// Obtener asignación por ID
exports.getAsignacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const asignacion = await Asignacion.findByPk(id);
    if (asignacion) {
      res.json(asignacion);
    } else {
      res.status(404).json({ error: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la asignación' });
  }
};

// Obtener asignaciones por ficha
exports.getAsignacionesByFicha = async (req, res) => {
  const { ficha } = req.params;
  try {
    const asignaciones = await Asignacion.findAll({ where: { ficha } });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones por ficha' });
  }
};

// Obtener asignaciones por instructor
exports.getAsignacionesByInstructor = async (req, res) => {
  const { instructor } = req.params;
  try {
    const asignaciones = await Asignacion.findAll({ where: { instructor } });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones por instructor' });
  }
};

// Obtener asignaciones por día
exports.getAsignacionesByDia = async (req, res) => {
  const { dia } = req.params;
  try {
    const asignaciones = await Asignacion.findAll({ where: { dia } });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones por día' });
  }
};

// Obtener asignaciones por jornada
exports.getAsignacionesByJornada = async (req, res) => {
  const { jornada } = req.params;
  try {
    const asignaciones = await Asignacion.findAll({ where: { jornada } });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las asignaciones por jornada' });
  }
};

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
  const { ficha, dia, jornada, instructor, inicio, fin } = req.body;

  if (!ficha || !dia || !jornada || !instructor || !inicio || !fin) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Obtener la ficha asociada para verificar el rango de fechas
    const fichaData = await Ficha.findByPk(ficha);
    if (!fichaData) {
      return res.status(400).json({ error: 'Ficha no encontrada' });
    }

    // Verificar si las fechas de la asignación están dentro del rango de la ficha
    if (inicio < fichaData.inicio || fin > fichaData.fin) {
      return res.status(400).json({
        error: `Las fechas de la asignación deben estar dentro del rango de la ficha (inicio: ${fichaData.inicio}, fin: ${fichaData.fin})`
      });
    }

    // Verificar si ya existe una asignación en el mismo día y jornada que se superponga en el tiempo para el mismo instructor
    const existingAsignacion = await Asignacion.findOne({
      where: {
        dia,
        jornada,
        instructor, // Asegúrate de que sea el mismo instructor
        inicio: {
          [Op.lt]: fin // Comienza antes de que la nueva asignación termine
        },
        fin: {
          [Op.gt]: inicio // Termina después de que la nueva asignación comienza
        }
      }
    });

    if (existingAsignacion) {
      return res.status(400).json({ 
        error: `Ya existe una asignación para el instructor ${instructor} en este día y jornada que se superpone con el rango de tiempo proporcionado. Detalles de la asignación conflictiva: ${JSON.stringify(existingAsignacion)}` 
      });
    }

    const nuevaAsignacion = await Asignacion.create({
      ficha,
      dia,
      jornada,
      instructor,
      inicio,
      fin
    });
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la asignación' });
  }
};

// Actualizar una asignación por ID
exports.updateAsignacionById = async (req, res) => {
  const { id } = req.params;
  const { ficha, dia, jornada, instructor, inicio, fin } = req.body;

  if (!ficha || !dia || !jornada || !instructor || !inicio || !fin) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const asignacion = await Asignacion.findByPk(id);
    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    // Obtener la ficha asociada para verificar el rango de fechas
    const fichaData = await Ficha.findByPk(ficha);
    if (!fichaData) {
      return res.status(400).json({ error: 'Ficha no encontrada' });
    }

    // Verificar si las fechas de la asignación están dentro del rango de la ficha
    if (inicio < fichaData.inicio || fin > fichaData.fin) {
      return res.status(400).json({
        error: `Las fechas de la asignación deben estar dentro del rango de la ficha (inicio: ${fichaData.inicio}, fin: ${fichaData.fin})`
      });
    }

    // Verificar si ya existe una asignación en el mismo día y jornada que se superponga en el tiempo para el mismo instructor
    const existingAsignacion = await Asignacion.findOne({
      where: {
        dia,
        jornada,
        instructor, // Asegúrate de que sea el mismo instructor
        inicio: {
          [Op.lt]: fin // Comienza antes de que la asignación actual termine
        },
        fin: {
          [Op.gt]: inicio // Termina después de que la asignación actual comienza
        },
        // Excluir la asignación que se está actualizando
        id: {
          [Op.ne]: id
        }
      }
    });

    if (existingAsignacion) {
      return res.status(400).json({ 
        error: `Ya existe una asignación para el instructor ${instructor} en este día y jornada que se superpone con el rango de tiempo proporcionado. Detalles de la asignación conflictiva: ${JSON.stringify(existingAsignacion)}` 
      });
    }

    await asignacion.update({ ficha, dia, jornada, instructor, inicio, fin });
    res.json(asignacion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la asignación' });
  }
};

// Borrar asignación por ID
exports.deleteAsignacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const asignacion = await Asignacion.findByPk(id);
    if (asignacion) {
      await asignacion.destroy();
      res.json({ message: 'Asignación eliminada' });
    } else {
      res.status(404).json({ error: 'Asignación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al borrar la asignación' });
  }
};

// Obtener el número de asignaciones de un instructor en un rango de fechas
exports.getNumeroAsignacionesPorInstructorYFechas = async (req, res) => {
  const { instructor } = req.params;
  const { fechaInicio, fechaFin } = req.query;  // Fechas en formato 'YYYY-MM-DD'

  // Validar que se hayan proporcionado ambas fechas
  if (!fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'Se requiere un rango de fechas (fechaInicio y fechaFin)' });
  }

  try {
    // Contar el número de asignaciones del instructor dentro del rango de fechas
    const numeroAsignaciones = await Asignacion.count({
      where: {
        instructor,
        inicio: {
          [Op.between]: [fechaInicio, fechaFin]  // Filtrar por fechas
        }
      }
    });

    // Retornar el número de asignaciones
    res.json({ numeroAsignaciones });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el número de asignaciones' });
  }
};

