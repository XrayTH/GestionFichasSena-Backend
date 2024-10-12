const express = require('express');
const {
  crearJornada,
  obtenerJornadas,
  obtenerJornadaPorId,
  actualizarJornada,
  eliminarJornada,
} = require('../controllers/jornadaController');

const router = express.Router();

router.post('/jornadas', crearJornada);
router.get('/jornadas', obtenerJornadas);
router.get('/jornadas/:id', obtenerJornadaPorId);
router.put('/jornadas/:id', actualizarJornada);
router.delete('/jornadas/:id', eliminarJornada);

module.exports = router;
