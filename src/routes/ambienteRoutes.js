const express = require('express');
const router = express.Router();
const ambienteController = require('../controllers/ambienteController');

router.get('/ambientes', ambienteController.obtenerAmbientes);
router.post('/ambientes', ambienteController.crearAmbiente);
router.get('/ambientes/id/:id', ambienteController.obtenerAmbientePorId);
router.get('/ambientes/nombre/:nombre', ambienteController.obtenerAmbientePorNombre);
router.delete('/ambientes/id/:id', ambienteController.eliminarAmbientePorId);
router.delete('/ambientes/nombre/:nombre', ambienteController.eliminarAmbientePorNombre);
router.put('/ambientes/id/:id', ambienteController.actualizarAmbientePorId);
router.put('/ambientes/nombre/:nombre', ambienteController.actualizarAmbientePorNombre);

module.exports = router;