const express = require('express');
const router = express.Router();
const enviarCorreosMasivos = require('../controllers/emailMasivoController');

router.get('/enviar-correos', enviarCorreosMasivos);

module.exports = router;
