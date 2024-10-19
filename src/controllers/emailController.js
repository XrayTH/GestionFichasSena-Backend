const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async (req, res) => {
  try {
    let emails = req.body.emails;
    if (typeof emails === 'string') {
      emails = JSON.parse(emails);
    }

    if (!Array.isArray(emails)) {
      return res.status(400).send('El campo "emails" debe ser un array');
    }

    const { subject, content } = req.body;
    const files = req.files;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      timeout: 50000, 
      connectionTimeout: 50000, 
    });

    const attachments = files ? files.map(file => ({
      filename: file.originalname,
      path: path.join(__dirname, '../uploads', file.filename)
    })) : [];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails.join(','),
      subject: subject,
      text: content,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Correos enviados con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar los correos');
  }
};

module.exports = { sendEmail };
