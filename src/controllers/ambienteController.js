const Ambiente = require('../models/Ambiente');

exports.obtenerAmbientes = async (req, res) => {
  try {
    const ambientes = await Ambiente.findAll();
    res.status(200).json(ambientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los ambientes" });
  }
};

exports.crearAmbiente = async (req, res) => {
    try {
      const { nombre } = req.body; 
      if (!nombre) {
        return res.status(400).json({ error: "El nombre del ambiente es requerido" });
      }
  
      const nuevoAmbiente = await Ambiente.create({ nombre });
  
      res.status(201).json(nuevoAmbiente);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el ambiente" });
    }
  };

exports.obtenerAmbientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const ambiente = await Ambiente.findByPk(id);
    if (ambiente) {
      res.status(200).json(ambiente);
    } else {
      res.status(404).json({ error: "Ambiente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el ambiente" });
  }
};

exports.obtenerAmbientePorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const ambientes = await Ambiente.findAll({ where: { nombre } });
    if (ambientes.length > 0) {
      res.status(200).json(ambientes);
    } else {
      res.status(404).json({ error: "No se encontraron ambientes con ese nombre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el ambiente" });
  }
};

exports.eliminarAmbientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ambiente.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Ambiente eliminado con éxito" });
    } else {
      res.status(404).json({ error: "Ambiente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el ambiente" });
  }
};

exports.eliminarAmbientePorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const deleted = await Ambiente.destroy({ where: { nombre } });
    if (deleted) {
      res.status(200).json({ message: "Ambiente(s) eliminado(s) con éxito" });
    } else {
      res.status(404).json({ error: "No se encontraron ambientes con ese nombre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el ambiente" });
  }
};

exports.actualizarAmbientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const [updated] = await Ambiente.update({ nombre }, { where: { id } });
    if (updated) {
      const updatedAmbiente = await Ambiente.findByPk(id);
      res.status(200).json(updatedAmbiente);
    } else {
      res.status(404).json({ error: "Ambiente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el ambiente" });
  }
};

exports.actualizarAmbientePorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { nuevoNombre } = req.body;
    const [updated] = await Ambiente.update({ nombre: nuevoNombre }, { where: { nombre } });
    if (updated) {
      const updatedAmbientes = await Ambiente.findAll({ where: { nombre: nuevoNombre } });
      res.status(200).json(updatedAmbientes);
    } else {
      res.status(404).json({ error: "No se encontraron ambientes con ese nombre" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el ambiente" });
  }
};
