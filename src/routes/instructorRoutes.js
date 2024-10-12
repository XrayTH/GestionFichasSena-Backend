const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController'); // Ajusta la ruta según tu estructura

// Ruta para obtener todos los instructores
router.get('/instructores', instructorController.obtenerTodos);

router.post('/instructores', instructorController.crear);

// Ruta para obtener un instructor por documento
router.get('/instructores/:documento', instructorController.obtenerPorDocumento);

// Ruta para obtener un instructor por nombre
router.get('/instructores/nombre/:nombre', instructorController.obtenerPorNombre);

// Ruta para actualizar un instructor por documento
router.put('/instructores/:documento', instructorController.actualizarPorDocumento);

router.delete('/instructores/:documento', instructorController.eliminarPorDocumento);

module.exports = router;
