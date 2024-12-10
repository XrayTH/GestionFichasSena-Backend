const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const programaRoutes = require('./routes/programaRoutes');
const intructorRoutes = require('./routes/instructorRoutes');
const coordinadorRoutes = require('./routes/coordinadorRoutes');
const jornadaRoutes = require('./routes/jornadaRoutes');
const fichaRoutes = require('./routes/fichaRoutes');
const asignacionRoutes = require('./routes/asignacionRoutes');
const emailMasivoRoutes = require('./routes/emailMasivoRoutes');
const emailRoutes = require('./routes/emailRoutes');
const ambienteRoutes = require('./routes/ambienteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const IP = process.env.IP || "localhost"
const PORT = process.env.PORT || 3000;

const verifySameOrigin = (req, res, next) => {
  const allowedHost = `${IP}:${PORT}`; 

  const host = req.get('Host');
  
  if (!host || host !== allowedHost) {
    return res.status(403).json({ message: 'Acceso denegado: Solo solicitudes internas permitidas' });
  }

  next();
};

app.use('/fichaSenaService', verifySameOrigin);

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

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

startServer();