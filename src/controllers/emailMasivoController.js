require('dotenv').config();
const nodemailer = require('nodemailer');
const Asignacion = require('../models/asignacion');
const Ficha = require('../models/ficha');
const Instructor = require('../models/Instructor');

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia el servicio si usas otro proveedor de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Función para obtener los horarios de un instructor
async function obtenerHorariosInstructor(instructorId) {
  // Consultar todas las asignaciones del instructor
  const asignaciones = await Asignacion.findAll({ where: { instructor: instructorId } });

  const horarios = [];

  for (const asignacion of asignaciones) {
    // Consultar los detalles de la ficha asociados con la asignación
    const ficha = await Ficha.findOne({ where: { codigo: asignacion.ficha } });

    if (ficha) {
      horarios.push(`
      - Día: ${asignacion.dia}
      + Jornada: ${asignacion.jornada}
      Código Ficha: ${ficha.codigo}
      Programa: ${ficha.programa}
      Municipio: ${ficha.municipio}
      Ambiente: ${ficha.ambiente}
      `);
    }
  }

  return horarios.join('\n');
}

// Controlador para enviar los correos masivos
async function enviarCorreosMasivos(req, res) {
  // Arrays para almacenar correos enviados y no enviados
  const enviados = [];
  const noEnviados = [];

  try {
    // Obtener todos los instructores
    const instructores = await Instructor.findAll();

    // Iterar sobre cada instructor
    for (const instructor of instructores) {
      try {
        const horarios = await obtenerHorariosInstructor(instructor.nombre);

        // Si el instructor tiene asignaciones, enviar correo
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

          // Intentar enviar el correo
          await transporter.sendMail(mailOptions);
          console.log(`Correo enviado a ${instructor.email}`);
          // Agregar a la lista de enviados
          enviados.push(instructor.email);
        }
      } catch (emailError) {
        // Si ocurre un error al enviar el correo, agregar a la lista de no enviados
        console.error(`Error al enviar correo a ${instructor.email}:`, emailError);
        noEnviados.push(instructor.email);
      }
    }

    // Retornar la lista de correos enviados y no enviados
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
