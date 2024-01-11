const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(baseUrl) {
  const url = baseUrl;
  const urlPura = "https://www.dexter.com.ar";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const sneakersList = [];

    $('.product-tile').each((index, element) => {
      const name = $(element).find('.pdp-link a').text().trim();
      const price = LimpiarPrecio($(element).find('.sales .value').text().trim());
      const baseImageLink = $(element).find('.tile-image').attr('src'); 
      const linkProduct = urlPura + $(element).find('.pdp-link a').attr('href'); // Nuevo código para capturar el enlace del producto
      const imageLinks = Array.from({ length: 4 }, (_, i) => {
        const modifiedLink = baseImageLink.replace(/\?.*$/, '');
        const match = modifiedLink.match(/-(\d+)\.JPG/);
        if (match) {
          const currentNumber = parseInt(match[1]);
          const suffix = currentNumber + i;
          return modifiedLink.replace(/-\d+\.JPG$/, `-${suffix}.JPG`);
        } else {
          return modifiedLink;
        }
      });
    
       
      sneakersList.push({ name, price, imageLinks, linkProduct });
    });

    return sneakersList;
  } catch (error) {
    throw new Error('Error al hacer la solicitud:', error.message);
  }
}

module.exports = scrapeWebsite;


function LimpiarPrecio(precio){  //para casos donde el precio ha sido rebajado y la cadena es mas extnsa
  const cleanedPrice = precio.replace(/[^\d.]/g, '');
  return cleanedPrice;
}