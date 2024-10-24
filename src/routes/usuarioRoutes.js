const express = require('express');
const { 
  getUsuarios, 
  getUsuarioById, 
  createUsuario, 
  updateUsuarioById, 
  verificarUsuario,
  eliminarUsuarioPorId,
  verificarTokenYPermisos 
} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuarioById);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:id', updateUsuarioById);

router.post('/usuarios/verificar', verificarUsuario);

router.delete('/usuarios/:id', eliminarUsuarioPorId);

router.post('/usuarios/verificar-permisos', verificarTokenYPermisos);

module.exports = router;

