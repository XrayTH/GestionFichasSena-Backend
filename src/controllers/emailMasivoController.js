require('dotenv').config();
const nodemailer = require('nodemailer');
const Asignacion = require('../models/asignacion');
const Ficha = require('../models/ficha');
const Instructor = require('../models/Instructor');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

async function obtenerHorariosInstructor(instructorId) {
  const asignaciones = await Asignacion.findAll({ where: { instructor: instructorId } });

  const horarios = [];
  const fechaActual = new Date();

  const asignacionesFiltradas = asignaciones.filter(asignacion => {
    const inicio = new Date(asignacion.inicio);
    const fin = new Date(asignacion.fin);

    return (inicio.getFullYear() === fechaActual.getFullYear() && inicio.getMonth() === fechaActual.getMonth()) ||
           (fin.getFullYear() === fechaActual.getFullYear() && fin.getMonth() === fechaActual.getMonth());
  });

  const asignacionesOrdenadas = asignacionesFiltradas.sort((a, b) => {
    const diaA = diasDeLaSemana.indexOf(a.dia.charAt(0).toUpperCase() + a.dia.slice(1).toLowerCase()); 
    const diaB = diasDeLaSemana.indexOf(b.dia.charAt(0).toUpperCase() + b.dia.slice(1).toLowerCase());
    
    return diaA - diaB;
  });

  for (const asignacion of asignacionesOrdenadas) {
    const ficha = await Ficha.findOne({ where: { codigo: asignacion.ficha } });

    if (ficha) {
      horarios.push(`
      - Día: ${asignacion.dia}
      + Jornada: ${asignacion.jornada}
      Código Ficha: ${ficha.codigo}
      Programa: ${ficha.programa}
      Municipio: ${ficha.municipio}
      Ambiente: ${ficha.ambiente}
      fecha de fin: ${asignacion.fin}
      `);
    }
  }

  return horarios.join('\n');
}

async function enviarCorreosMasivos(req, res) {
  const enviados = [];
  const noEnviados = [];
  const fechaActual = new Date();

  try {
    const instructores = await Instructor.findAll();

    for (const instructor of instructores) {
      try {
        const horarios = await obtenerHorariosInstructor(instructor.nombre);

        if (horarios.length > 0) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: instructor.email,
            subject: `Horarios de este mes para ${instructor.nombre}`,
            text: `
              Instructor: ${instructor.nombre}
              Sus horarios de este mes son:
              ${horarios}
            `
          };

          await transporter.sendMail(mailOptions);
          console.log(`Correo enviado a ${instructor.email}`);
          enviados.push(instructor.email);
        }
      } catch (emailError) {
        console.error(`Error al enviar correo a ${instructor.email}:`, emailError);
        noEnviados.push(instructor.email);
      }
    }

    res.status(200).json({
      message: 'Proceso de envío de correos completado',
      enviados,
      noEnviados
    });
  } catch (error) {
    console.error('Error general al procesar el envío de correos:', error);
    res.status(500).json({
      message: 'Error general al enviar correos',
      enviados,
      noEnviados
    });
  }
}

module.exports = enviarCorreosMasivos;
