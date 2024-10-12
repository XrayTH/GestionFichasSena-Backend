const express = require('express');
const { 
  getUsuarios, 
  getUsuarioById, 
  createUsuario, 
  updateUsuarioById, 
  verificarUsuario,
  eliminarUsuarioPorId
} = require('../controllers/usuarioController');

const router = express.Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuarioById);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:id', updateUsuarioById);

router.post('/usuarios/verificar', verificarUsuario);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', eliminarUsuarioPorId);

module.exports = router;
