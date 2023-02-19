const pool = require("../db");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit-table");

const fs = require("fs");
const { path } = require("pdfkit");

/* const createEmail = async (req, res, next) => {
  const { cl_name, us_name, qu_ident, qu_value, cl_email, cl_address } =
    req.body;

  contentHTML = `
      <h1>Hola ${cl_name}! </h1>

      <h3> Te compartimos el resumen de la cotización solicitada: </h3>

      <h2>Cotización # ${qu_ident}</h2>
     
      <h3>Cotización generada por ${us_name} por un total de: ${qu_value}</h3>
    

      <h3> En caso de aceptar la cotizacion, sus productos seran enviados
       a la siguiente direccion: ${cl_address} </h3>
  `;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ioyne.proyect@gmail.com",
      pass: "bflxjlzruyoajipy",
    },
  });

  let info = await transporter.sendMail({
    from: "ioyne.proyect@gmail.com", // sender address,
    to: `${cl_email}`,
    subject: "IOYNE QUOTATION",
    html: contentHTML,
  });
 */
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//};

const createEmailPdf = async (req, res, next) => {
  try {
    const { qu_ident, descuento, tipoDescuento } = req.body;
    const result = await pool.query(
      `
        SELECT 	
            quotations.client_id,
            quotations.qu_value,
            quotations.user_id,
            clients.cl_name,
            clients.cl_lastname,
            clients.cl_email,
            clients.cl_address,
            requested_products.quantity,
            requested_products.product_id,
            products.pd_name,
            products.pd_price,
            products.pd_description,
            users.us_name,
            users.us_lastname
        FROM quotations 
        LEFT JOIN clients 
            ON quotations.client_id = clients.client_id
        LEFT JOIN requested_products 
            ON   quotations.qu_ident = requested_products.qu_ident
        LEFT JOIN products
            ON requested_products.product_id = products.product_id
        LEFT JOIN users
            ON quotations.user_id = users.user_id
        WHERE quotations.qu_ident = $1`,
      [qu_ident]
    );
    /* res.json(result.rows) */
    const data = result.rows;
    
    function generateInvoice(fileName) {
      const doc = new PDFDocument({ size: "A4" });

      // Creamos un stream para guardar el archivo PDF en disco
      /* const facturaPath = path.join(__dirname, 'cotización.pdf'); */
      const stream = fs.createWriteStream(fileName);

      // Agregamos metadatos del documento
      doc.info["Title"] = "Cotización";
      doc.info["Author"] = "IOYNE";

      // Creamos un encabezado para la factura
      doc
        .fontSize(20)
        .text("COTIZACIÓN IOYNE REF" + qu_ident, { align: "center" });
      doc.moveDown();

      // Agregamos los datos del cliente
      doc.fontSize(12).text("Nombre: " + data[0].cl_name + " "+ data[0].cl_lastname);
      doc.fontSize(12).text("Email: " + data[0].cl_email);
      doc.fontSize(12).text("Dirección: " + data[0].cl_address);
      doc.moveDown();

      // Agregamos una tabla con los detalles de la factura
      const table = {
        headers: [
          "Producto",
          "Descripción",
          "Cantidad",
          "Precio por unidad",
          "Precio total",
        ],
        rows: [],
      };

      let subtotal = 0;

      data.forEach((item) => {
        const row = [
          item.pd_name,
          item.pd_description,
          item.quantity,
          "$" + item.pd_price,
          "$" + item.quantity * item.pd_price,
        ];
        table.rows.push(row);
        subtotal += item.quantity * item.pd_price;
        
      });
      const descuento = data[0].qu_value - subtotal

      table.rows.push(["", "", "", "Subtotal:", "$" + subtotal]);
      table.rows.push(["", "", "", "Descuento:", "$" + descuento])
      table.rows.push(["", "", "", "Total:", "$" + data[0].qu_value]);
      

      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold"),
        prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
        headerBorderWidth: 1,
        borderHorizontalWidth: 1,
        borderVerticalWidth: 1,
        borderColor: "#000",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20,
      });
      
      // Finalizamos el documento y cerramos el stream
      doc.end();
      stream.on("finish", () => {
        console.log(`PDF creado en: ${fileName}`);
      });
      doc.pipe(stream);
    }
    // Generamos el archivo PDF de la factura
    generateInvoice("cotización.pdf");


    contentHTML = `
      <h1>Hola ${data[0].cl_name} ${data[0].cl_lastname}! </h1>

      <h3> Te compartimos el resumen de la cotización solicitada: </h3>

      <h2>Cotización # ${qu_ident}</h2>
     
      <h3>Cotización generada por ${data[0].us_name}  ${data[0].us_lastname} por un total de: $ ${data[0].qu_value}</h3>
    

      <h3> En caso de aceptar la cotizacion, sus productos seran enviados
       a la siguiente direccion: ${data[0].cl_address} </h3>
  `;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ioyne.proyect@gmail.com",
      pass: "bflxjlzruyoajipy",
    },
  });

  let info = await transporter.sendMail({
    from: "ioyne.proyect@gmail.com", // sender address,
    to: `${data[0].cl_email}`,
    subject: "IOYNE QUOTATION",
    html: contentHTML,
    attachments: [{
      filename: "cotización.pdf",
      path: "./cotización.pdf"
  }]
  });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmailPdf,
};
