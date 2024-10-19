const express = require('express');
const router = express.Router();
const programaController = require('../controllers/programaController');

router.post('/programas', programaController.crear);

router.get('/programas', programaController.obtenerProgramas);

router.get('/programas/:id', programaController.obtenerPorId);

router.get('/programas/nombre/:nombre', programaController.obtenerPorNombre);

router.put('/programas/:id', programaController.actualizarPorId);

router.delete('/programas/:id', programaController.eliminarPorId);

module.exports = router;
