const express = require('express');
const router = express.Router();
const fichaController = require('../controllers/fichaController');

router.get('/fichas/', fichaController.verTodosFichas);
router.get('/fichas/:codigo', fichaController.buscarFicha);
router.post('/fichas/', fichaController.crearFicha);
router.put('/fichas/:codigo', fichaController.actualizarFicha);
router.delete('/fichas/:codigo', fichaController.borrarFicha);

module.exports = router;

