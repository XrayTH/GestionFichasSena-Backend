const Programa = require('../models/Programa'); 

exports.crear = async (req, res) => {
  const { nombre, nombreCorto } = req.body;
  
  if (!nombre || !nombreCorto) {
    return res.status(400).json({ message: 'Los campos nombre y nombreCorto son obligatorios' });
  }

  try {
    const nuevoPrograma = await Programa.create({
      nombre,
      nombreCorto,
    });
    res.status(201).json({ message: 'Programa creado con éxito', programa: nuevoPrograma });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el programa', error });
  }
};

exports.obtenerProgramas = async (req, res) => {
    try {
      const programas = await Programa.findAll();
      res.status(200).json(programas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener programas', error });
    }
  };

exports.actualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { nombre, nombreCorto } = req.body;

  if (!nombre || !nombreCorto) {
    return res.status(400).json({ message: 'Los campos nombre y nombreCorto son obligatorios' });
  }

  try {
    const programa = await Programa.findByPk(id);
    if (programa) {
      programa.nombre = nombre || programa.nombre;
      programa.nombreCorto = nombreCorto || programa.nombreCorto;
      await programa.save();
      res.status(200).json({ message: 'Programa actualizado con éxito', programa });
    } else {
      res.status(404).json({ message: 'Programa no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el programa', error });
  }
};

exports.obtenerPorNombre = async (req, res) => {
    const { nombre } = req.params;

    try {
        const programa = await Programa.findOne({ where: { nombre } }); 
        if (programa) {
            res.status(200).json(programa); 
        } else {
            res.status(404).json({ message: 'Programa no encontrado' }); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el programa', error }); 
    }
};

exports.obtenerPorId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const programa = await Programa.findByPk(id); 
      if (programa) {
        res.status(200).json(programa); 
      } else {
        res.status(404).json({ message: 'Programa no encontrado' }); 
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el programa', error }); 
    }
  };  

exports.eliminarPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const programa = await Programa.findByPk(id);
    if (programa) {
      await programa.destroy();
      res.status(200).json({ message: 'Programa eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Programa no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el programa', error });
  }
};

