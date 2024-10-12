const express = require('express');
const router = express.Router();
const programaController = require('../controllers/programaController');

router.post('/programas', programaController.crear);

// Ruta para obtener todos los programas
router.get('/programas', programaController.obtenerProgramas);

// Ruta para obtener un programa por ID
router.get('/programas/:id', programaController.obtenerPorId);

// Ruta para obtener un programa por nombre
router.get('/programas/nombre/:nombre', programaController.obtenerPorNombre);

// Ruta para actualizar un programa por ID
router.put('/programas/:id', programaController.actualizarPorId);

// Eliminar un programa por ID
router.delete('/programas/:id', programaController.eliminarPorId);

module.exports = router;
