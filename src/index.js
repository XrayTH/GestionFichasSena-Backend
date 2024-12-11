const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https'); 
const fs = require('fs');       
const sequelize = require('./config/db');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const programaRoutes = require('./routes/programaRoutes');
const intructorRoutes = require('./routes/instructorRoutes');
const coordinadorRoutes = require('./routes/coordinadorRoutes');
const jornadaRoutes = require('./routes/jornadaRoutes');
fichaRoutes = require('./routes/fichaRoutes');
asignacionRoutes = require('./routes/asignacionRoutes');
const emailMasivoRoutes = require('./routes/emailMasivoRoutes');
const emailRoutes = require('./routes/emailRoutes');
const ambienteRoutes = require('./routes/ambienteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = null;
try {
  const privateKey = fs.readFileSync('/etc/ssl_httpd/private/httpd.key', 'utf8');
  const certificate = fs.readFileSync('/etc/ssl_httpd/certs/httpd.crt', 'utf8');
  credentials = { key: privateKey, cert: certificate };
} catch (error) {
  console.warn('Certificados no encontrados o inválidos. El servidor funcionará en HTTP.');
}

const PORT = process.env.PORT || 3000;

app.use('/fichaSenaService', usuarioRoutes);
app.use('/fichaSenaService', programaRoutes);
app.use('/fichaSenaService', intructorRoutes);
app.use('/fichaSenaService', coordinadorRoutes);
app.use('/fichaSenaService', jornadaRoutes);
app.use('/fichaSenaService', fichaRoutes);
app.use('/fichaSenaService', asignacionRoutes);
app.use('/fichaSenaService', emailMasivoRoutes);
app.use('/fichaSenaService', emailRoutes);
app.use('/fichaSenaService', ambienteRoutes);

app.get('/fichaSenaService/status', (req, res) => {
  res.status(200).json({ status: 'El backend está funcionando correctamente' });
});

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    if (credentials) {
      https.createServer(credentials, app).listen(443, '0.0.0.0', () => {
        console.log('Servidor HTTPS escuchando en el puerto 443');
      });
    } else {
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
      });
    }
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startServer();