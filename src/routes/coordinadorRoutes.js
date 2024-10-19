const express = require('express');
const router = express.Router();
const coordinadorController = require('../controllers/coordinadorController'); 

router.get('/coordinadores', coordinadorController.obtenerTodos);

router.post('/coordinadores', coordinadorController.crear);

router.get('/coordinadores/:documento', coordinadorController.obtenerPorDocumento);

router.get('/coordinadores/:documento', coordinadorController.obtenerPorDocumento);

router.get('/coordinadores/nombre/:nombre', coordinadorController.obtenerPorNombre);

router.put('/coordinadores/:documento', coordinadorController.actualizarPorDocumento);

router.delete('/coordinadores/:documento', coordinadorController.eliminarPorDocumento);

module.exports = router;