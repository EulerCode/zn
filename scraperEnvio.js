const axios = require('axios');
const cheerio = require('cheerio');

async function scraperEnvioData() {
  try {
    // URL de la página
    const url = 'https://www.dexter.com.ar/ayuda/entregas.html';

    // Obtener el HTML de la página con Axios
    const response = await axios.get(url);
    const html = response.data;

    // Cargar el HTML en Cheerio
    const $ = cheerio.load(html);

    // Extraer el valor de CostoEnvio
    const costoEnvioMatch = $('p:contains("Normal/Prioritario AMBA desde")').text();
    var regex = /\$ (\d+(\.\d{3})*(\,\d{0,2})?)/;
    var costoEnvio = costoEnvioMatch.match(regex);
    costoEnvio=costoEnvio[1];




    // Extraer el valor de EnvioLimite
    const envioLimiteMatch = $('p:contains("Envío normal/prioritario GRATIS para compras de")').text(); 
    var nuevaRegex = /\$([\d,]+(\.\d{3})?)/;
    var envioLimite = envioLimiteMatch.match(nuevaRegex);
     envioLimite = envioLimite[1].replace(/,/g, ''); 


    return { costoEnvio, envioLimite };

  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}

// Llamar a la función para iniciar el scraping
scraperEnvioData();
module.exports = scraperEnvioData;
 