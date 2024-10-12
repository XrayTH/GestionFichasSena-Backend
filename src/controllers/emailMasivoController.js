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

// Definir el orden correcto de los días de la semana
const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Función para obtener los horarios de un instructor, filtrando por el mes actual y ordenando los días de la semana
async function obtenerHorariosInstructor(instructorId) {
  // Consultar todas las asignaciones del instructor
  const asignaciones = await Asignacion.findAll({ where: { instructor: instructorId } });

  const horarios = [];
  const fechaActual = new Date();

  // Filtrar asignaciones que caen dentro del mes actual
  const asignacionesFiltradas = asignaciones.filter(asignacion => {
    const inicio = new Date(asignacion.inicio);
    const fin = new Date(asignacion.fin);

    // Comparar el mes y año de inicio y fin con el mes y año actual
    return (inicio.getFullYear() === fechaActual.getFullYear() && inicio.getMonth() === fechaActual.getMonth()) ||
           (fin.getFullYear() === fechaActual.getFullYear() && fin.getMonth() === fechaActual.getMonth());
  });

  // Ordenar las asignaciones por el día de la semana, respetando el orden de los días
  const asignacionesOrdenadas = asignacionesFiltradas.sort((a, b) => {
    const diaA = diasDeLaSemana.indexOf(a.dia.charAt(0).toUpperCase() + a.dia.slice(1).toLowerCase()); // Capitalizar el primer carácter
    const diaB = diasDeLaSemana.indexOf(b.dia.charAt(0).toUpperCase() + b.dia.slice(1).toLowerCase());
    
    return diaA - diaB;
  });

  // Generar el listado de horarios con los datos de cada asignación
  for (const asignacion of asignacionesOrdenadas) {
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
      fecha de fin: ${asignacion.fin}
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
  const fechaActual = new Date();

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
