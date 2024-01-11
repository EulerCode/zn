


const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


// Configuración del transporte para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,

    },
});

  

async function EnviarMail(titular, productos, total, envPrecio, precio, dir, nombre, mail, fecha, sPostal, domiSN, seguimiento, linkImgMail, PaginaWeb, phone) {
  var year = new Date().getFullYear();
  var descuento = 0;
  const info = await transporter.sendMail({
    from: '"Zona Sneakers" <' + process.env.EMAIL + '>',
    to: mail,
    subject: "Información de pago y envío",
    text: "Preparando el pedido...",
    html: `<!DOCTYPE html>
    <html lang="es">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titular}</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
            body {
                font-family: 'Poppins', sans-serif;
                margin: 0;
                padding: 0;
            }
    
            h2 {
                font-weight: bold;
                margin-bottom: 10px;
            }
    
            p b {
                font-weight: bold;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 10px;
            }
    
            footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div>
                <img src="${linkImgMail}" alt="Logo" style="width:100%">
            </div>
            <div>
                <h2>Hola, ${nombre}!</h2>
                <p>Te dejamos toda la información acerca de tu pedido. Ni bien sea despachado, recibirás otro email con el número de seguimiento para que sepas exactamente cuándo llega.</p>
            </div>
            <div>
                <p><b>Productos:</b> ${productos}</p>
                <p><b>Precio:</b> $${precio}</p>
                <p><b>Envío:</b> $${envPrecio}</p>
                <p><b>Total:</b> $${total}</p>
                <p>--------------------------------------------</p>
                <p><b>Servicio Postal:</b> ${sPostal}</p>
                <p><b>Entrega en domicilio:</b> ${domiSN}</p>
                <p><b>Fecha de entrega estimada:</b> ${fecha}</p>
                <p><b>Nombre de quién recibe:</b> ${nombre}</p>
                <p><b>Correo Electrónico:</b> ${mail}</p>
                <p><b>Teléfono:</b> ${phone}</p>
                <p><b>Dirección:</b> ${dir}</p>
                <p><b>Código de seguimiento (estará disponible luego del despacho):</b><br> ${seguimiento}</p>
            </div>
            <footer>
                <p>Gracias por elegir nuestros productos. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nuestro servicio de atención al cliente.</p>
                <p>&copy; ${year} ${PaginaWeb} | Magia en la pisada</p>
            </footer>
        </div> 
    </body>
    
    </html>
    `,
  });
  console.log("Correo electrónico enviado:", info.messageId);

  console.log("Correo electrónico enviado:");
}

 module.exports = EnviarMail;



