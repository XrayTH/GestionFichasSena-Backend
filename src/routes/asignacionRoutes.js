const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacionController');

router.get('/asignacion', asignacionController.getAllAsignaciones);
router.get('/asignacion/:id', asignacionController.getAsignacionById);
router.get('/asignacion/ficha/:ficha', asignacionController.getAsignacionesByFicha);
router.get('/asignacion/instructor/:instructor', asignacionController.getAsignacionesByInstructor);
router.get('/asignacion/dia/:dia', asignacionController.getAsignacionesByDia);
router.get('/asignacion/jornada/:jornada', asignacionController.getAsignacionesByJornada);
router.post('/asignacion/', asignacionController.createAsignacion);
router.put('/asignacion/:id', asignacionController.updateAsignacionById);
router.delete('/asignacion/:id', asignacionController.deleteAsignacionById);
router.get('/asignacion/instructor/:instructor/numero', asignacionController.getNumeroAsignacionesPorInstructorYFechas);

module.exports = router;
