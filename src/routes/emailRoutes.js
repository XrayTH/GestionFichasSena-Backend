const express = require('express');
const multer = require('multer');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

// Configurar multer para manejar múltiples archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Cambia upload.single a upload.array para permitir múltiples archivos
router.post('/send-email', upload.array('files'), sendEmail);

module.exports = router;
