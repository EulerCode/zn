const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsiteDesc(baseUrl) {
     url = baseUrl;
     

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Busca el elemento que contiene la descripción
        const descriptionElement = $('.value.content p');

        // Obtiene el texto de la descripción
        const description = descriptionElement.text().trim();

         
        // Devuelve directamente el objeto con la descripción
        return { description };
    } catch (error) {
        throw new Error('Error al hacer la solicitud:', error.message);
    }
}

module.exports = scrapeWebsiteDesc;
