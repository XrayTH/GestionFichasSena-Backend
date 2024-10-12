const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (req, res) => {
  const { emails, subject, content } = req.body;
  const files = req.files; // Cambia el acceso a archivos

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const attachments = files ? files.map(file => ({
    path: path.join(__dirname, '../uploads', file.filename)
  })) : [];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emails.join(','),
    subject: subject,
    text: content,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Correos enviados con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar los correos');
  }
};

module.exports = { sendEmail };

