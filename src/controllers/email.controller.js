const pool = require("../db");
const nodemailer = require('nodemailer');

const createEmail = async (req, res) => {
  const { cl_name, us_name, qu_ident, qu_value, cl_email, cl_address } = req.body;

  contentHTML = `
      <h1>Hola ${cl_name}! </h1>

      <h3> Te compartimos el resumen de la cotización solicitada: </h3>

      <h2>Cotización # ${qu_ident}</h2>
     
      <h3>Cotización generada por ${us_name} por un total de: ${qu_value}</h3>
    

      <h3> En caso de aceptar la cotizacion, sus productos seran enviados
       a la siguiente direccion: ${cl_address} </h3>
  `

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ioyne.proyect@gmail.com',
      pass: 'bflxjlzruyoajipy'
    }
  });

  let info = await transporter.sendMail({
    from: 'ioyne.proyect@gmail.com', // sender address,
    to: `${cl_email}`,
    subject: 'IOYNE QUOTATION',
    html: contentHTML
  })

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = {
  createEmail
}


