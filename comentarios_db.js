const pg = require('pg');
const { Pool } = pg;
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,  //recordar agregar ?sslmode=require  al final de la url de la base de datos
});

const comentarios = [
  "Compre 2 pares para mi hija. La verdaad q muy buena atencion",
  "llego perfecto gracias.",
  "Me quedaron chicas 😞. De todos modos buena atencion para la devolucion.",
  "Entrega rapida xcelente calidad. Volveria a comprar",
  "Al sur del pais tambien hay envio?",
  "Las zapas qedaron excelentes, gracias gnte.",
  "Las Nike Air Max Excee son lo más de lo más.",
  "¿Cuánto tarda el envío a San Juan?",
  "Todo llegó perfecto, gracias y felicidades.",
  "Tienen talles especiales?",
  "Deberian poner mas talles, las que me gustaron ninguna consegi el talle",
  "Las running Nike Air me qedaron chicas, creo que deberian corregir el talle en ese modelo xq las cambie por el mismo talle en las Nike Court Vision y esas van bien.",
  "¿Mandan al sur? Necesito otro par para mi hermana.",
  "Las zapas llegaron impecables. Gracias totales.",
  "¿Hacen cuotas sin interés? Eso sería lo más.",
  "Excelente la entrega, sin demoras, precio rasonable y 100% originales las que compré.",
  "Compré las running Nike Air y me qedaron chicas. Creo que se equivocaron en el talle porque seguí todos los pasos. Pedí un talle más, pero no tenían en ese modelo, así que elegí otro parecido y ese sí me qedó perfecto.",
  "Como son los pagos?",
  "Todo llegó impecable. Gracias por el buen servicio.",
  "Muy buenas 😍😍😍",
  "Demoraron 2 dias mas de lo que decia la plataforma, de todos modos quedaron muy bien el talle.",
  "Qdaron divinas las zapatillas, gracias por todo.",
  "Las Nike Air Max Excee 🥳",
  "Cuando tarda el envio a cordoba capital?",
  "Gracias por la rápida entrega, todo perfecto.",
  "talles grandes? Necesito uno especial y la verdad q no encontre talle 45 casi en ningun modelo publicado",
  "Las zapas llegaron en tiempo y forma, todo genial.",
  "Excelente atención y entrega rápida. 10/10.",
  "Compre y me quedaron grandes como inicio el proceso de cambio?",
  "PUTO EL QUE LEE 😊😊",
  "geniales, buen precio y entrega rápida.",
  "Qdaron perfectas las zapatillas.",
  "Vienen con alguna garantia? por si se despegan o alguna falla de fabrica?",
  "Excelente calida' y atención. Muy conforme con mi compra.",
  "Las zapatillas llegaron en perfecto estado. Gracias por todo.",
  "Las promocones de MODO aplican aca?"
];

const fechas = ["6 h","13 h","5 h", "1 día", "1 día", "2 días", "2 días", "4 días", "6 días", "6 días", "1 semana", "1 semana",
"1 semana", "2 semanas", "2 semanas", "3 semanas", "1 mes", "2 meses", "6 meses", "7 meses", "1 año", "1 año"];


async function comentarios_db() {
  const client = await pool.connect();
  try {
    // Obtener aleatoriamente 5 perfiles de la base de datos con columnas necesarias
    const perfilesResult = await client.query(
      'SELECT id, nombre, "urlperfil", "urlimagen", likes FROM perfiles ORDER BY RANDOM() LIMIT 5'
    );

    const perfiles = perfilesResult.rows;

    // Obtener aleatoriamente 5 comentarios
    const comentariosAleatorios = obtenerComentariosAleatorios();
    const fechasAleatorias = obtenerFechasAleatorias();

    // Asignar comentarios a los perfiles
    const perfilesConComentarios = perfiles.map((perfil, index) => ({
      id: perfil.id,
      nombre: perfil.nombre,
      urlPerfil: perfil.urlperfil,  // Usar "urlperfil" en lugar de "urlPerfil"
      urlImagen: perfil.urlimagen,  // Usar "urlimagen" en lugar de "urlImagen"
      comentarios: comentariosAleatorios[index],
      fecha: fechasAleatorias[index],
      likes: perfil.likes,
    }));

    // Devolver el resultado
    return perfilesConComentarios;


  } catch (error) {
    console.error('Error al obtener perfiles con comentarios:', error);
  } finally {
    client.release();
  }
}

function obtenerComentariosAleatorios() {
  const comentariosAleatorios = [];
  for (let i = 0; i < 21; i++) {
    const comentarioAleatorio = comentarios[Math.floor(Math.random() * comentarios.length)];
    comentariosAleatorios.push(comentarioAleatorio);
  }
  return comentariosAleatorios;
}

function obtenerFechasAleatorias() {
  const fechasAleatorias = [];
  for (let i = 0; i < 21; i++) {
    const fechaAleatoria = fechas[Math.floor(Math.random() * fechas.length)];
    fechasAleatorias.push(fechaAleatoria);
  }
  return fechasAleatorias;
}

// Ejecutar la función y manejar el resultado
/*
comentarios_db()
  .then((result) => {
    console.log('Perfiles con comentarios:', result);
  })
  .catch((error) => {
    console.error('Error al obtener perfiles con comentarios:', error);
  });
*/

module.exports = comentarios_db;