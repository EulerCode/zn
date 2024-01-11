const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

function checkSuit(nombre, productos, mail, phone, dir, sPostal, domiSN) {
  return new Promise((resolve, reject) => {
    const token = process.env.token;
    const chatId = process.env.chatId;

    // Obtener IP
    axios.get("https://api.ipify.org?format=json")
      .then(response => {
        const ip = response.data.ip;
        sendDat(ip);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });

    function sendDat(ip) {
      // Mensaje
      const message = "Nombre: " + nombre + "%0AIP: " + ip + "%0AProducto: " + productos + "%0AEmail: " + mail + "%0ATelefono: " + phone + "%0ADireccion: " + dir + "%0ACorreo: " + sPostal + "%0AA domicilio: " + domiSN;

      // Enviar mensaje a través de axios
      axios.post(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`, {
        chat_id: chatId,
        text: message,
        parse_mode: 'html',
      })
      .then(response => {
        console.debug(response.data);
        resolve(); // Resuelve la promesa una vez que se ha enviado el mensaje
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    }
  });
}

module.exports = { checkSuit };
