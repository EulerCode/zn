const pg = require('pg');
const { Pool } = pg;
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const comentarios = [
  "Compré do pares para mija. Barato y buena calida'. Ningún drama con los talles.",
  "Me re cabe la ond de estas zapas, qedaron joya.",
  "Tuve drama con el talle, pero zafé porque la devolusión fue fácil. Todo bien al final.",
  "La entrega re rápida, llegaron en hora y sin dramas.",
  "La mina que me atendió la primera vez era media colgada, pero todo bien igual.",
  "Las zapas qedaron excelentes, gracias a los chicos por la buena onda.",
  "Las Nike Air Max Excee son lo más de lo más.",
  "¿Cuánto tarda el envío a San Juan? Estoy ansioso por tenerlas.",
  "Todo llegó perfecto, gracias y felisidades.",
  "¿Tienen talles raros? Porque necesito uno así.",
  "Entrega rápida, sin dramas. Precios re zarpados y las zapas originales.",
  "Las running Nike Air me qedaron chicas, pero la devolución fue fácil. Terminé eligiendo otro par y todo bien.",
  "¿Mandan al sur? Necesito otro par para mi hermana.",
  "Las zapas llegaron impecables. Gracias totales.",
  "¿Hacen cuotas sin interés? Eso sería lo más.",
  "Excelente la entrega, sin demoras, precio rasonable y 100% originales las que compré.",
  "Compré las running Nike Air y me qedaron chicas. Creo que se equivocaron en el talle porque seguí todos los pasos. Pedí un talle más, pero no tenían en ese modelo, así que elegí otro parecido y ese sí me qedó perfecto.",
  "¿Hacen envíos al sur? Necesito otro par para mi amigo.",
  "Todo llegó impecable. Gracias por el buen servicio.",
  "¿Hacen cuotas sin interés? Estaría buenísimo eso.",
  "Estoy re contento con las zapas, excelente calida' y precio.",
  "Qdaron divinas las zapatillas, gracias por todo.",
  "Las Nike Air Max Excee son mi nuevo amor. ¡Las mejores!",
  "¿Cuándo llegan mis zapas? Estoy ansioso.",
  "Gracias por la rápida entrega, todo perfecto.",
  "¿Tienen talles grandes? Necesito uno especial.",
  "Las zapas llegaron en tiempo y forma, todo genial.",
  "Excelente atención y entrega rápida. 10/10.",
  "Compré do pares y llegaron súper rápido. Todo perfecto.",
  "¿Hay cuotas sin interés? Me interesa.",
  "Las zapatillas son geniales, buen precio y entrega rápida.",
  "Qdaron perfectas las zapatillas. ¡Gracias!",
  "¿Envían al sur? Necesito otro par para mi hermano.",
  "Excelente calida' y atención. Muy conforme con mi compra.",
  "Las zapatillas llegaron en perfecto estado. Gracias por todo.",
  "¿Hacen cuotas sin interés? Sería genial."
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