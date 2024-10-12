const express = require('express');
const router = express.Router();
const coordinadorController = require('../controllers/coordinadorController'); // Ajusta la ruta según la estructura de tu proyecto

// Ruta para obtener todos los coordinadores
router.get('/coordinadores', coordinadorController.obtenerTodos);

router.post('/coordinadores', coordinadorController.crear);

router.get('/coordinadores/:documento', coordinadorController.obtenerPorDocumento);

// Ruta para obtener un coordinador por documento
router.get('/coordinadores/:documento', coordinadorController.obtenerPorDocumento);

// Ruta para obtener un coordinador por nombre
router.get('/coordinadores/nombre/:nombre', coordinadorController.obtenerPorNombre);

// Ruta para actualizar un coordinador por documento
router.put('/coordinadores/:documento', coordinadorController.actualizarPorDocumento);

// Eliminar un coordinador por documento
router.delete('/coordinadores/:documento', coordinadorController.eliminarPorDocumento);

module.exports = router;