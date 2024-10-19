const express = require('express')
require('dotenv').config()
const cors = require('cors');
const sequelize = require('./config/db')
const usuarioRoutes = require('./routes/usuarioRoutes')
const programaRoutes = require('./routes/programaRoutes')
const intructorRoutes = require('./routes/instructorRoutes')
const coordinadorRoutes = require('./routes/coordinadorRoutes')
const jornadaRoutes = require('./routes/jornadaRoutes')
const fichaRoutes = require('./routes/fichaRoutes')
const asignacionRoutes = require('./routes/asignacionRoutes')
const emailMasivoRoutes = require('./routes/emailMasivoRoutes');
const emailRoutes = require('./routes/emailRoutes')

const app = express()
app.use(cors()); 
app.use(express.json())

app.use('/fichaSenaService', usuarioRoutes)
app.use('/fichaSenaService', programaRoutes)
app.use('/fichaSenaService', intructorRoutes)
app.use('/fichaSenaService', coordinadorRoutes)
app.use('/fichaSenaService', jornadaRoutes)
app.use('/fichaSenaService', fichaRoutes)
app.use('/fichaSenaService', asignacionRoutes)
app.use('/fichaSenaService', emailMasivoRoutes)
app.use('/fichaSenaService', emailRoutes); 


const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida.')
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  }
}

startServer()