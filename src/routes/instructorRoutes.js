const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController'); 

router.get('/instructores', instructorController.obtenerTodos);

router.post('/instructores', instructorController.crear);

router.get('/instructores/:documento', instructorController.obtenerPorDocumento);

router.get('/instructores/nombre/:nombre', instructorController.obtenerPorNombre);

router.put('/instructores/:documento', instructorController.actualizarPorDocumento);

router.delete('/instructores/:documento', instructorController.eliminarPorDocumento);

module.exports = router;
