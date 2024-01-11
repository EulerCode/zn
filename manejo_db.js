const pg = require('pg');
const { Pool } = pg;
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

// CRAR TABLA
async function crearTabla() {
    const client = await pool.connect();
    try {
        // Ejecutar la consulta de creación de tabla
        const result = await client.query(`
        CREATE TABLE IF NOT EXISTS perfiles (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(255),
          urlPerfil VARCHAR(512),
          urlImagen VARCHAR(512),
          likes INTEGER
        );
      `);

        console.log('Tabla creada correctamente.');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    } finally {
        client.release();
    }
}



// CONSULTAR
async function realizarConsulta() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM perfiles');
        console.log(result.rows);
    } finally {
        client.release();
    }
}

//INSERTAR
async function insertarPerfil(perfil) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO perfiles (nombre, urlPerfil, urlImagen, likes) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [perfil.nombre, perfil.urlPerfil, perfil.urlImagen, perfil.likes];

        const result = await client.query(query, values);
        console.log('Perfil insertado:', result.rows[0]);
    } finally {
        client.release();
    }
}

// Ejemplo de perfil
const nuevoPerfil = {
    nombre: 'Rodrigo Luna',
    urlPerfil: 'https://www.facebook.com/profile.php?id=100012437911258',
    urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/416065467_1811681042589809_8643111564444008811_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=CSgnv9G1aVEAX9t-fvc&_nc_ht=scontent.faep8-1.fna&oh=00_AfD-X_gYtE0XMZshenuWEN1tJ182O3HOKn3rTm6ZLV16nw&oe=65A1E89B',
    likes: 1,
};

// ELIMINAR
async function eliminarPerfilPorId(id) {
    const client = await pool.connect();
    try {
        // Ejecutar la consulta de eliminación
        const result = await client.query('DELETE FROM perfiles WHERE id = $1 RETURNING *', [id]);

        // Verificar si se eliminó alguna fila
        if (result.rows.length > 0) {
            console.log('Perfil eliminado:', result.rows[0]);
        } else {
            console.log('No se encontró un perfil con el ID especificado.');
        }
    } catch (error) {
        console.error('Error al eliminar el perfil:', error);
    } finally {
        client.release();
    }
}


// MODIFICAR
async function modificarValorPorId(id, nuevoValor) {
    const client = await pool.connect();
    try {
        // Ejecutar la consulta de actualización
        const result = await client.query('UPDATE perfiles SET nombre = $1 WHERE id = $2 RETURNING *', [nuevoValor, id]);

        // Verificar si se actualizó alguna fila
        if (result.rows.length > 0) {
            console.log('Perfil modificado:', result.rows[0]);
        } else {
            console.log('No se encontró un perfil con el ID especificado.');
        }
    } catch (error) {
        console.error('Error al modificar el perfil:', error);
    } finally {
        client.release();
    }
}

//AGREGAR MULTIPLIES PERFILES

async function insertarPerfiles(perfiles) {
    const client = await pool.connect();
    try {
        // Utilizar Promise.all para ejecutar múltiples consultas en paralelo
        const resultados = await Promise.all(
            perfiles.map(async (perfil) => {
                const query = 'INSERT INTO perfiles (nombre, urlPerfil, urlImagen, likes) VALUES ($1, $2, $3, $4) RETURNING *';
                const values = [perfil.nombre, perfil.urlPerfil, perfil.urlImagen, perfil.likes];
                return client.query(query, values);
            })
        );

        // Imprimir información de los perfiles insertados
        resultados.forEach((result, index) => {
            if (result.rows.length > 0) {
                console.log(`Perfil ${index + 1} insertado:`, result.rows[0]);
            } else {
                console.log(`No se pudo insertar el perfil ${index + 1}.`);
            }
        });
    } catch (error) {
        console.error('Error al insertar perfiles:', error);
    } finally {
        client.release();
    }
}

// Lista de perfiles para insertar (reemplaza con tus datos)
const perfilesParaInsertar = [
    { nombre: 'Rodriigo Montiiel', urlPerfil: 'https://www.facebook.com/rodrigo.montiel.790256', urlImagen: 'https://www.facebook.com/photo.php?fbid=1222997478656233&set=pb.100028379763760.-2207520000&type=3', likes: 0 },
    { nombre: 'Sofia Videla', urlPerfil: 'https://www.facebook.com/profile.php?id=100084345379281', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-1/416697301_341272355360941_6752050016326544636_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5740b7&_nc_ohc=i9hiawE38FQAX_dl87z&_nc_ht=scontent.faep8-2.fna&oh=00_AfCshmgisgr0L82F-DwVCTwcypQAcV2evlhuWG7hpWhV9g&oe=65A1CE14', likes: 10 },
    { nombre: 'Lucas Cristian Perona Aguilar', urlPerfil: 'https://www.facebook.com/lucascristian.peronaaguilar', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/137044611_228449432170180_6711364815936357867_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_ohc=Uk1UEE0lD6cAX_8c1m8&_nc_ht=scontent.faep8-2.fna&oh=00_AfAb6ojgtFfY-eHS718_5u2i2QJbHqptxAB2slIsWiV-QQ&oe=65C4D8B7', likes: 0 },
    { nombre: 'Alicia Menendez', urlPerfil: 'https://www.facebook.com/profile.php?id=100013772701476', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/327165780_609818457167984_7985743522567754523_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=kglCsEoJ75kAX_9_WLr&_nc_ht=scontent.faep8-1.fna&oh=00_AfDX0tXwysuh1KkVtO1dmPMJONkPYaKQTv5UdRPp2QKLiw&oe=65A16306', likes: 0 },
    { nombre: 'Daniel Di Vanni', urlPerfil: 'https://www.facebook.com/daniel.divanni', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/136444631_3741499912608562_3722823254137541734_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=CMFiUIL780EAX_YULUH&_nc_ht=scontent.faep8-1.fna&oh=00_AfC6YQWXqHSKhKmbu17fZZSPiygBn_BOvO6Igw-cIEmxMQ&oe=65C4C7C6', likes: 2 },
    { nombre: 'Alejandro Abel Gonzalez', urlPerfil: 'https://www.facebook.com/alejandroproducciones.imprenta', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.18169-9/14650273_10210912939640724_9018303733708181291_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=be3454&_nc_ohc=GFbgAnTLF3sAX_SrBa-&_nc_ht=scontent.faep8-2.fna&oh=00_AfBfAlKSnViUlOREC0HhOosdgDqc_jyaZyNjxGrkw_bWMw&oe=65C4AC79', likes: 1 },
    { nombre: 'Marcelo Fabian Reichert', urlPerfil: 'https://www.facebook.com/marcelo.f.reichert', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/335667906_923838362140550_6259793763631908609_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=_rkZ4ntyGqMAX9m1sjU&_nc_ht=scontent.faep8-2.fna&oh=00_AfDV94PevEIAWFycU4OfM-w4cF5Xg4QZpItuBTjZixy-JA&oe=65A31BF1', likes: 0 },
    { nombre: 'Ezequiel Mateo', urlPerfil: 'https://www.facebook.com/keky.motorsport', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/405020201_10232238686816902_1241274779539326729_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=28OWFRZj1gwAX-Rj0ZD&_nc_ht=scontent.faep8-1.fna&oh=00_AfBequbonn7DteM6xRWqahljlDkC_UGgP8Cp9Z0bPsqLoQ&oe=65A1900A', likes: 0 },
    { nombre: 'Laura Velasco', urlPerfil: 'https://www.facebook.com/profile.php?id=100089920396882', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/409655498_303347536005924_629786364549676327_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=1dOa0nQeRz0AX9YIuPn&_nc_ht=scontent.faep8-1.fna&oh=00_AfAFrEy4reBhGyFz0KVcIqJia9FpEssdVKHLZQjgHEU2NQ&oe=65A277CC', likes: 0 },
    { nombre: 'Miriam Acevedo', urlPerfil: 'https://www.facebook.com/miriam.acevedo.108', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/401626734_7132554756769313_1904989205474822519_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=t6YCua7ieKQAX9eig8v&_nc_ht=scontent.faep8-2.fna&oh=00_AfBkiZZds-uvqEHXa7dzHG17Lvl-uHF3GMdUEoI0ehBFPw&oe=65A1C767', likes: 0 },
    { nombre: 'Carlos Martin Flores', urlPerfil: 'https://www.facebook.com/carlosmartin.flores.9', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/357806470_5888247497946535_177025602413502770_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=h6dy9HAQu2EAX94Z8TY&_nc_ht=scontent.faep8-2.fna&oh=00_AfC8bDIYftW8xUt-w9HgAOtWSzRSYlhsBF7VHnglINgk4A&oe=65A235DA', likes: 0 },
    { nombre: 'Maria Pauluk', urlPerfil: 'https://www.facebook.com/maria.pauluk.587', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/415905161_1715232508998227_1352431497591809058_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=f2bq-kTlEMUAX9ZqCXZ&_nc_ht=scontent.faep8-1.fna&oh=00_AfDVNANpXdiubdL_M1LBt6ifl3mzyTk1VD9_OPSxvtrhhg&oe=65A1DD66', likes: 3 },
    { nombre: 'Nicolas Ramirez', urlPerfil: 'https://www.facebook.com/profile.php?id=100093668735768', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-1/412877621_233101413155482_8762652062792731093_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=11e7ab&_nc_ohc=3iagV-SvFAcAX-v_N2W&_nc_ht=scontent.faep8-2.fna&oh=00_AfDAlqr8MBe6UXOa16dEC69dE4B7itgudR0qOC8m6-EjtA&oe=65A25265', likes: 0 },
    { nombre: 'Lucas Fernandez', urlPerfil: 'https://www.facebook.com/profile.php?id=100020145435794', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/105913811_550490872299089_3078042666912743974_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=l2g8AfBTrXYAX9icAWU&_nc_ht=scontent.faep8-1.fna&oh=00_AfDmjHRSzJoB2ZShUqMDBPZqFfPM6T7M8etVM1_FdepFJw&oe=65C4B365', likes: 0 },
    { nombre: 'Teresa Prieto González', urlPerfil: 'https://www.facebook.com/alta.suciedad.16', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/401549320_2306929382812410_412756941901527727_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=g6-jWkF8LWMAX8gRV6F&_nc_ht=scontent.faep8-1.fna&oh=00_AfCM2AJty_GeVfZ2eT1hSZxd03D2Nm9KklL6z8uq6SBaEQ&oe=65A2AAFC', likes: 0 },
    { nombre: 'Sil Acosta', urlPerfil: 'https://www.facebook.com/Silviacosper', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/354584283_10227299785553388_7043562411598037528_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=vyqxXMM986sAX9dZemE&_nc_ht=scontent.faep8-1.fna&oh=00_AfAAa-vYx6KDx9WQYL1IOv3kegH8ZT9blCWcUKUSqm76LQ&oe=65A15E8C', likes: 0 },
    { nombre: 'Gonzalo Hernan Carrizo', urlPerfil: 'https://www.facebook.com/profile.php?id=100086270895136', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/415786911_341960825356278_978873434232668545_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=PUNe3hbfzaEAX_8xll_&_nc_ht=scontent.faep8-2.fna&oh=00_AfBt0_TxH1qmiscEQYhyr8QQhXzbuYr0jc6mg95YJqY1rw&oe=65A2A386', likes: 0 },
    { nombre: 'Gaby Fernandez', urlPerfil: 'https://www.facebook.com/profile.php?id=100005495143743', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/400126552_2295754853950997_876268105250605918_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=2nmJEnD_W8YAX8QNEp_&_nc_ht=scontent.faep8-2.fna&oh=00_AfDDseRMhaUEZ72K63ixNrSzprTuZcmHVw6c3A3h2Ta4iw&oe=65A1CEFB', likes: 0 },
    { nombre: 'Hugo Y Gra', urlPerfil: 'https://www.facebook.com/hugo.ygra', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/316286106_3226090837721653_2823220099491481363_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=gNVgR_7EyWYAX8FNBzC&_nc_ht=scontent.faep8-2.fna&oh=00_AfAKxPaJuK5rtYrAex7cNdwr0oMpDeuhBfYerqeu1NjizA&oe=65A197E3', likes: 4 },
    { nombre: 'Damian Gomez', urlPerfil: 'https://www.facebook.com/profile.php?id=100055933567917', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/120512730_103369311537521_1219875172972324327_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=be3454&_nc_ohc=9pDQaQ-9xzwAX-vRT8g&_nc_ht=scontent.faep8-2.fna&oh=00_AfCOrX5cGCDUM0jEixBw3g9y3f4VwopZs4H_LAGna1I51A&oe=65C4BAC2', likes: 1 },
    { nombre: 'Blanca Mansilla', urlPerfil: 'https://www.facebook.com/blanca.mansilla.92123', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/245903247_411096613991525_1137444737634060720_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=AptouNB2cakAX9jTFzg&_nc_oc=AQlzA-husgOt0G3EmcmK5pYWYIvKE_NuJF0vyr-rTK1llRSG3WC-5WTUWAouBDC_v9k&_nc_ht=scontent.faep8-1.fna&oh=00_AfDl-rLksvqKNRa5G0g1hQ8BW5fKt_97ue0C2jhhNbwczQ&oe=65A2E8C6', likes: 2 },
    { nombre: 'Pablo Castillo', urlPerfil: 'https://www.facebook.com/pablo.castillo.5201254', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/240666650_4309188092533936_4440663239006842853_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=5740b7&_nc_ohc=NE5F8wOxh7gAX8LFHTp&_nc_ht=scontent.faep8-1.fna&oh=00_AfB6DBsgs-r3sqizGMNTFENheagt46kkbULlfFpI9ousLA&oe=65A2B814', likes: 0 },
    { nombre: 'Whiskardo Fellini', urlPerfil: 'https://www.facebook.com/whiskardo.fellini', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/410449032_7252367038155302_2527361049079775381_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=gYFlFJSOJlEAX_eUfzt&_nc_ht=scontent.faep8-2.fna&oh=00_AfCQHJ4eiVAWNd-W5_uIigiFo_CEBQ48baAOGQwc4MgZaA&oe=65A29988', likes: 0 },
    { nombre: 'Gabriela Zalazar', urlPerfil: 'https://www.facebook.com/gabriela.zalazar.319', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/364075537_6561239023960052_3008598728766536911_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=DPKXGISiHQkAX_VevtI&_nc_ht=scontent.faep8-1.fna&oh=00_AfAbOSJzzNmbncX9-c3A8mfns68EGPGnav73VHvfNUx_aw&oe=65A31B0C', likes: 0 },
    { nombre: 'Nattaly Frias', urlPerfil: 'https://www.facebook.com/nattaly.frias.7', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-1/119055726_2829459913964142_7815961449222253699_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=ok7_qj-fMwoAX-8A7kb&_nc_ht=scontent.faep8-1.fna&oh=00_AfC1N2_NRBpIYaluwBhEaElIYuOHlRhZahkrub6yizcHKw&oe=65C4E150', likes: 2 },
    { nombre: 'Sebastian Grassano', urlPerfil: 'https://www.facebook.com/smgrassano', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/86274304_10215346135821896_8594747601071374336_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=be3454&_nc_ohc=2Fj_fZ3xih4AX-zyNbN&_nc_ht=scontent.faep8-1.fna&oh=00_AfBjhLRAVmnLD0xq6WWWLHN5zGV-oP36lHhfgEuXyOEF9A&oe=65C4BF08', likes: 0 },
    { nombre: 'Gladys Romero', urlPerfil: 'https://www.facebook.com/gladys.romero.56027281', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/335071103_746736693717245_6517124990231382331_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=5740b7&_nc_ohc=rET9L5PgGz0AX962V72&_nc_ht=scontent.faep8-1.fna&oh=00_AfBbzM59Va8tqfODtD2XD4rhVlFbxZF9vlvBxp2SmtS6wg&oe=65A2291B', likes: 0 },
    { nombre: 'Pablo Lopez', urlPerfil: 'https://www.facebook.com/profile.php?id=611251640', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.18169-1/12987156_10153467422996641_1330618863596655206_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=QGX6RRAmfbsAX9ojaAr&_nc_ht=scontent.faep8-1.fna&oh=00_AfDEVa-t2Ipd08ViuNgKdlesQhmQJZd0KTDS5wWzUXdyKQ&oe=65C4E203', likes: 0 },
    { nombre: 'Demian Loki', urlPerfil: 'https://www.facebook.com/damian.loki.3', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/245011733_4683665131677803_405747692612160424_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=R-hderQj5gQAX8IWPGl&_nc_ht=scontent.faep8-2.fna&oh=00_AfCwyrH1v4ecxk3rm9L5_KxN0WlViMwwt707bdV-vn03gA&oe=65A17F05', likes: 4 },
    { nombre: 'Romina Díaz', urlPerfil: 'https://www.facebook.com/profile.php?id=100054787045343', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/395760978_873152971187596_4767756486423992628_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=3qzFOBdYrxUAX88fO1b&_nc_ht=scontent.faep8-1.fna&oh=00_AfDXZ722ShzM0phPh9qdkWeX8q6AFbRZJwr4QPWD1M0hXQ&oe=65A27084', likes: 0 },
    { nombre: 'Maximiliano Lucas Cordoba', urlPerfil: 'https://www.facebook.com/lucasjmaxi', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/267105368_10226615408634229_5020659631623824296_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=p6rg-dLTLJkAX9wiy-M&_nc_ht=scontent.faep8-2.fna&oh=00_AfBmzCJsP2hvyqT77b4RQasbRH2FIfJBumXAoP72bLmG9Q&oe=65A2E35A', likes: 0 },
    { nombre: 'Tamy Cordoba', urlPerfil: 'https://www.facebook.com/tamyaye.kpa', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/310291912_10224084729601009_6251899576957975458_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=kYNHvak1ougAX_V4Thc&_nc_ht=scontent.faep8-1.fna&oh=00_AfCVA1aW_x89JZKFaJOFCgw80fwEnq41PUeSzkmI9t0a8g&oe=65A21140', likes: 0 },
    { nombre: 'Feer Graizzaro', urlPerfil: 'https://www.facebook.com/feer.graizzaro.5', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/417147629_10228030504406653_4960584881616605026_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=JBHfgwzHN18AX9wSZ4x&_nc_ht=scontent.faep8-1.fna&oh=00_AfAEyxtG_CVU45d3BpEpasUofgn2hUOYQfGTdIqnDUKGcA&oe=65A2F14C', likes: 0 },
    { nombre: 'Rodri Lmds', urlPerfil: 'https://www.facebook.com/terco.lmds', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/409724964_6623769387733046_4681110459751375005_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=rfntESiSJvQAX9xIG0H&_nc_ht=scontent.faep8-2.fna&oh=00_AfC7-TNTXtZBMvK9p3SxwIiOZLTkpts2E-zEoaREam-RGg&oe=65A1608B', likes: 0 },
    { nombre: 'Lafe Ines', urlPerfil: 'https://www.facebook.com/profile.php?id=100011753978994', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/416083503_1960947890973658_8553770337862640201_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=K6q147h8tj4AX-jUnwC&_nc_oc=AQm7Kw5vFt9MtnOSmPIN3YEJL07BTx2IXt7obtO-K-InT1XEzJeydT6idoBqKpirc3g&_nc_ht=scontent.faep8-1.fna&oh=00_AfB42MiI5BwnCmFbbCus1-KtqYYPPxwrDHu8LzaRF4m1xw&oe=65A1C6B5', likes: 0 },
    { nombre: 'Walter Coria', urlPerfil: 'https://www.facebook.com/walter.coria.92', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/404972107_10231967554037603_8186311079363853917_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=3hMMiMaSpL8AX_V1z6w&_nc_ht=scontent.faep8-2.fna&oh=00_AfCmJdvYQgqQteya15IfqWoJ2uRLkH2MVDG-Sgbt6-QzdA&oe=65A28E05', likes: 0 },
    { nombre: 'Loreto Argandoña', urlPerfil: 'https://www.facebook.com/loreto.argandona.9', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/363008546_2809774889157784_2417359329383230123_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=2LHS56tDxsAAX-iwU0o&_nc_ht=scontent.faep8-2.fna&oh=00_AfB_Lhrl0kGAslGbgPOBxZnSHBixJWSsDYM2nD5MivFQqA&oe=65A1D4EC', likes: 2 },
    { nombre: 'Sergio Manzano', urlPerfil: 'https://www.facebook.com/sergio.manzano.509', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/352536598_3394437330868994_6215973041255917152_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=_hD6i0n54A0AX9-V-2k&_nc_ht=scontent.faep8-1.fna&oh=00_AfAuPS_F8WRI_xSMoFav7V_c1nanrKgSsCU422euxsrK4g&oe=65A26F79', likes: 0 },
    { nombre: 'Eduardo Collado', urlPerfil: 'https://www.facebook.com/eduardo.collado.376', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/343086172_559296916091348_9123434890541029862_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=eGgRmx_PwBwAX8uilLf&_nc_ht=scontent.faep8-1.fna&oh=00_AfDDkbkxrF35UyNcXalBzmGppZwciV4I-PtYXNdqgqkBAg&oe=65A2B951', likes: 1 },
    { nombre: 'Marcos Gil', urlPerfil: 'https://www.facebook.com/facundo.cabral.1966', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/297158736_5333189343429729_3178816038405780425_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=eKVuIwkIDJUAX-7skLc&_nc_ht=scontent.faep8-1.fna&oh=00_AfCpeQqYjcRlNjFel1phSrms3cxkbqQfaHC6mjY7MeM2GQ&oe=65A2B174', likes: 3 },
    { nombre: 'Patry Ale Fonzalida Gil', urlPerfil: 'https://www.facebook.com/patricia.gil.777', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/410351308_10229359793754842_9080225367776116928_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=v7xZ-PypRU0AX--n5dy&_nc_ht=scontent.faep8-2.fna&oh=00_AfA2Peo9qBXXTE6R_0tTg6dnsfa6TfyllQsjg1WYzurUoA&oe=65A22E86', likes: 0 },
    { nombre: 'Marcelo Cataldo', urlPerfil: 'https://www.facebook.com/marcelocataldofotografias', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/246713384_10226087159342880_5859896958190366366_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=O172QYH86JcAX9UFStA&_nc_oc=AQkz2aPBV9ngSO0dDonaK8c3cM3NlXttIKcQRM58nunORfy3kXjiRMu-HL83XyQKzbM&_nc_ht=scontent.faep8-1.fna&oh=00_AfB9co5CAE5OgVnw5eBQ5SM56o_MW3oPRCik3UxvCqesvQ&oe=65A1CD52', likes: 0 },
    { nombre: 'Lucho Rojass', urlPerfil: 'https://www.facebook.com/lucho.rojass', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/347619854_752371063097739_852651050424535448_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=5740b7&_nc_ohc=D431a9it5EkAX_rKHYW&_nc_ht=scontent.faep8-1.fna&oh=00_AfAjBilY2ITGEBdhOk9Wp4MZSSY4kn9HGed5UlDU4w4ACQ&oe=65A254F2', likes: 3 },
    { nombre: 'Andres Bustos', urlPerfil: 'https://www.facebook.com/andres.bustos.5621', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/314554553_10228925034256452_4689406737146297673_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=bb1hKWWG5q4AX_zxcmw&_nc_ht=scontent.faep8-2.fna&oh=00_AfD5us9jj_HDNba0vSbplVQ83epCb7DvMQGwM9OYpwSQiA&oe=65A275FE', likes: 0 },
    { nombre: 'Mario Pisano', urlPerfil: 'https://www.facebook.com/mario.pisano.3726', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t31.18172-8/893267_145567315620691_1563646758_o.jpg?_nc_cat=108&ccb=1-7&_nc_sid=be3454&_nc_ohc=ARcUUpQydesAX8iQw3B&_nc_ht=scontent.faep8-2.fna&oh=00_AfALlWLRfsrV3hLQUppw-Ka-9b5kbidltBIKerrzVDQH3Q&oe=65C4AF90', likes: 4 },
    { nombre: 'Maxi Robledo', urlPerfil: 'https://www.facebook.com/maximiliano.robledo.39', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/384550027_2534165933427883_7564129427063671287_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Ijx-iYg4MLgAX9GaeXK&_nc_ht=scontent.faep8-2.fna&oh=00_AfCPrIvpJsXvDvpmVfdFzRYUZkz728vfgQ6Asb1033VW0g&oe=65A274EE', likes: 0 },
    { nombre: 'Ericka Yraima Vivas Quintero', urlPerfil: 'https://www.facebook.com/grerickavi', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/70851590_10220460833093499_1751983671901945856_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=be3454&_nc_ohc=U4nzrUD_zQ8AX8ByJwQ&_nc_ht=scontent.faep8-1.fna&oh=00_AfDqjLNavN9Sb8doGa_T7eyvelriz-X933Z_jAvWB7oFqw&oe=65C4BFF4', likes: 1 },
    { nombre: 'May Ramirez', urlPerfil: 'https://www.facebook.com/may.ramirez.77398', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/50995011_1141989135968299_2284501926605225984_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=be3454&_nc_ohc=CqdAVIwNlvkAX_cxKhA&_nc_ht=scontent.faep8-2.fna&oh=00_AfCq91Pc3NlcRYHSFAbjs9jhiWFMN33kotwNd6YhnZNRxA&oe=65C4DFF6', likes: 3 },
    { nombre: 'Ramon Flores', urlPerfil: 'https://www.facebook.com/ramonf64', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/223112630_10225116540562582_1329795516350145538_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=vPmDWHJ1rY4AX_7MiFA&_nc_ht=scontent.faep8-1.fna&oh=00_AfAmA7Lf_mRozLjvp3oybD7iQubxXr8Vb9LGI6U5cjzyhA&oe=65A184D5', likes: 5 },
    { nombre: 'Luz Clarimar', urlPerfil: 'https://www.facebook.com/luzmedinar', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/412282222_10159732323515222_239783165926913834_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=m1QlnRwSPTsAX8zWEo0&_nc_ht=scontent.faep8-1.fna&oh=00_AfCkcgqWeVt_jP-_bg1Jei60p1DVoQyYGEQs1JVUe8VoIg&oe=65A1D7D5', likes: 6 },
    { nombre: 'Osvaldo Olivares S.', urlPerfil: 'https://www.facebook.com/profile.php?id=1294202936', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.18169-9/27459318_10215052813375793_6770693561496780243_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_ohc=tzcxKiD6WvIAX--UsmL&_nc_ht=scontent.faep8-2.fna&oh=00_AfCaxHmigDDzyScsIWWJvy_272SdfZWyYbryfkerAlc1AA&oe=65C4E1B8', likes: 0 },
    { nombre: 'Angela Tironi', urlPerfil: 'https://www.facebook.com/angela.tironi', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/416706280_10168697815060061_3570888106189261757_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=1y5-t2lYrR8AX_0hib9&_nc_ht=scontent.faep8-1.fna&oh=00_AfAtSUSLwIypu5W4T2MlBwGSmnp5POdg2GBWW3aNU8mMyA&oe=65A3447F', likes: 2 },
    { nombre: 'Víctor Sierra Matute', urlPerfil: 'https://www.facebook.com/victorsierramatute', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/404994144_10163049729242646_4319999693389223149_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GxW5QWQxyeoAX8hNqit&_nc_ht=scontent.faep8-1.fna&oh=00_AfDgSEMf_orxFg7-Bq_ZeX7CQ7w6zUz75iP2sMFewFArlQ&oe=65A1EA0C', likes: 3 },
    { nombre: 'Marlen Rosas', urlPerfil: 'https://www.facebook.com/rosas.marlen', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/324069398_1536807383467699_6691235856752680939_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=tt-C16cb93YAX9x3YBT&_nc_ht=scontent.faep8-1.fna&oh=00_AfCV5e6uJU9qwXeC01fwtjleEcB6xpG_TFOBdpiU5JrDRw&oe=65A30026', likes: 5 },
    { nombre: 'Jake Lefker', urlPerfil: 'https://www.facebook.com/jake.lefker', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/92529252_10158127828344518_8211964993072005120_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=be3454&_nc_ohc=8GIH3d2LWZAAX_Qlz_e&_nc_ht=scontent.faep8-1.fna&oh=00_AfCnQr0hjw26ZOWuX8A1pnp4IM1UpEtRbDT8JX08D-EyUw&oe=65C4B903', likes: 0 },
    { nombre: 'Ivaneide Lima', urlPerfil: 'https://www.facebook.com/ivalima86', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/391580721_7303015209728547_1625262215277000458_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=u21kVyZIyh8AX8qjeCI&_nc_ht=scontent.faep8-1.fna&oh=00_AfBQ1yBt-jEOg3bFRvmdJg5FwoR42YDDKtFma3Aja4gcTg&oe=65A1F4CD', likes: 1 },
    { nombre: 'Paulo Santana', urlPerfil: 'https://www.facebook.com/paulo.santana.5623293', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/379866524_23863694206609496_6027478389297751131_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=bGXTryu9rLAAX_-BkoI&_nc_ht=scontent.faep8-1.fna&oh=00_AfD9QdhV9n7SN84rP89S4kJfWoEeYuX88yhYwx3QMXnvnA&oe=65A168F9', likes: 0 },
    { nombre: 'Gracilene Cunha', urlPerfil: 'https://www.facebook.com/profile.php?id=100008378836946', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/417178502_3720963151526276_553885426931453346_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=5740b7&_nc_ohc=A8kpluOnEdYAX_ucYiP&_nc_ht=scontent.faep8-1.fna&oh=00_AfBZ422-dPzcDEKoJnIsUawCUDcqP5_mnauG9hINovmGGQ&oe=65A28833', likes: 0 },
    { nombre: 'Flavio José', urlPerfil: 'https://www.facebook.com/profile.php?id=100011038036298', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/398723506_2013705742340674_1208037347927776648_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=4MdK_4YSOroAX8a86Ds&_nc_ht=scontent.faep8-2.fna&oh=00_AfACE5kCoNfeS51pVTWyS-ztSLeR1qE8NJPRY50hE0OWYQ&oe=65A2C9EC', likes: 1 },
    { nombre: 'Maurilio Santana', urlPerfil: 'https://www.facebook.com/maurilio.santana.731', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/406616632_1163026108417564_2185512610706583229_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=awjgvkHc2u8AX-kNQ3f&_nc_ht=scontent.faep8-2.fna&oh=00_AfAm6SS1Xq50pyBQAoXMelcoAlEAyDrjxaSxEBa8vWfUyw&oe=65A26759', likes: 0 },
    { nombre: 'Macarena Correa', urlPerfil: 'https://www.facebook.com/macarena.correa.71216', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/415001528_893510835811754_4980362851494249353_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=_cvv9Jq2m98AX9W0cw5&_nc_ht=scontent.faep8-2.fna&oh=00_AfDNIgogHGJWtPr5scti1niYFiFd_mbOHa1TzoiaAO4wOw&oe=65A16792', likes: 0 },
    { nombre: 'Santiago Guasch', urlPerfil: 'https://www.facebook.com/guaschsantiago', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/82244350_10221734999062153_5866020432561307648_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=be3454&_nc_ohc=6ioAW6zo4b0AX-aV83T&_nc_ht=scontent.faep8-2.fna&oh=00_AfCgS3Dmv5K4L6Mzl313vqqZC5kpyExyVU07EH9qMfj8PQ&oe=65C4D851', likes: 1 },
    { nombre: 'Rosana Ariaza', urlPerfil: 'https://www.facebook.com/rosana.ariaza', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/323323695_749131502871786_876545240513829863_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Y2O_faoexNoAX_uVojF&_nc_oc=AQljaBXJ07v1dwgzztlXvv3GIsnGn8AHNSgjzF-kHkYdCTSgw8fucFIPr0KBFssYkZE&_nc_ht=scontent.faep8-1.fna&oh=00_AfAzFrzaJfyI2y2SVtHkz2YFTTLqabDayVJHJlIu1cCyvw&oe=65A32F2F', likes: 0 },
    { nombre: 'Joana Fernandez', urlPerfil: 'https://www.facebook.com/joaniitafernandez15', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/259809526_4475852982484297_159027684852600579_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=3zbyXAog-ggAX__zUAe&_nc_ht=scontent.faep8-2.fna&oh=00_AfD78wQTmen78FyDRMncPqPpD_pJch35s4lXTo1IHM6GOw&oe=65A1A8DB', likes: 0 },
    { nombre: 'Walter Lucero', urlPerfil: 'https://www.facebook.com/walter.lucero.543', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.18169-9/11535720_10153003960487104_196762014468311537_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=be3454&_nc_ohc=sx1FXnWLywEAX_YxFRr&_nc_ht=scontent.faep8-2.fna&oh=00_AfBNzg1YXkJDn9VmknVFuMzB2bHkSJcND15za_tqaa3iTQ&oe=65C4E566', likes: 2 },
    { nombre: 'Shorshy Sosa', urlPerfil: 'https://www.facebook.com/shorshiiii', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-1/377887535_1774875726260896_7737301334629581753_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_ohc=iwQFrl7TZ3MAX_3u8Bb&_nc_ht=scontent.faep8-2.fna&oh=00_AfD1wKFCUpkntWHnXh5URnow5G_b17_kMmbe_1UQHDbb7Q&oe=65A29EC6', likes: 0 },
    { nombre: 'Fabri Martinez', urlPerfil: 'https://www.facebook.com/martinex.fabri', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/404941582_24331351326480635_4992585622656624355_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=JVuSb1VqPSEAX-UqhiN&_nc_ht=scontent.faep8-1.fna&oh=00_AfA-l5It6m1ijXRCj5_EgKiS0tjxu5X5dKZaGNxFxvCL8Q&oe=65A2DACB', likes: 3 },
    { nombre: 'Silvio Sosa', urlPerfil: 'https://www.facebook.com/silvio.sosa.393', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-9/56457844_424332508140221_739625876978663424_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=zkvFb58Z4QAAX9Bvx0r&_nc_ht=scontent.faep8-1.fna&oh=00_AfCHOK8cgRQP3Fc20CzkFU3GSCeDD8uEOHLcfTAzF5FK6Q&oe=65C4CB2D', likes: 0 },
    { nombre: 'Christian Rios', urlPerfil: 'https://www.facebook.com/christianrios120', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/375673678_6570442009691424_6005011788612572897_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=xe1-OLeuWQMAX-x7Pq_&_nc_ht=scontent.faep8-2.fna&oh=00_AfCPDzfVzYGpM4c1BWc3lmtLo-AYb_20tLT4dRGe2MpEgQ&oe=65A2DB85', likes: 0 },
    { nombre: 'NiCo Fernandez', urlPerfil: 'https://www.facebook.com/nicko.fernandez3', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/416097107_7217066641693960_4451573947485372129_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=d8Z5pCM5kNUAX-t2hJM&_nc_ht=scontent.faep8-2.fna&oh=00_AfB0GhWHfleK2i-CJBXiNpz0y0Zop5j7Svge9MWrtNKo8g&oe=65A16A95', likes: 4 },
    { nombre: 'Mayra Sf', urlPerfil: 'https://www.facebook.com/mayra.canabarro.3', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/393420143_1996557294033857_1504666766599495572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=lWPYEcqk8sMAX90zbqD&_nc_ht=scontent.faep8-2.fna&oh=00_AfD0hRMbYdpbeadlpoC5SNM6atxPAjs1Luct9NO0zcAz0A&oe=65A26E95', likes: 0 },
    { nombre: 'Mauro Elían', urlPerfil: 'https://www.facebook.com/profile.php?id=100071715695748', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/405521796_356020146798506_4926347326768560474_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Z7WMNo0y9D4AX9_WLpv&_nc_ht=scontent.faep8-1.fna&oh=00_AfAh6xNBi9pNHgi-8ePlgVqwsMC_1maBslezAYHRMhnbhw&oe=65A2F93A', likes: 0 },
    { nombre: 'Jacque China', urlPerfil: 'https://www.facebook.com/jacqueline.nails.27', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-1/382226783_1257920961588698_3543262774266813091_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_ohc=MIJM3QAqPrsAX_038XR&_nc_ht=scontent.faep8-2.fna&oh=00_AfDKP0VflEOJt1TLvxnFbYMITOk0J6Vbdij47QjIdvw5fQ&oe=65A29825', likes: 1 },
    { nombre: 'Ana Caren', urlPerfil: 'https://www.facebook.com/profile.php?id=61553106699681', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/414503561_122124869630103556_3622060424711524247_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=htWLgnYDqG8AX_ox3Ba&_nc_ht=scontent.faep8-2.fna&oh=00_AfDdSaCBDgmmdihzDjBsB7OojlK6kNNqnRqgLJ1zzVA6RA&oe=65A2506D', likes: 0 },
    { nombre: 'Gustavo Huerta', urlPerfil: 'https://www.facebook.com/profile.php?id=61550902839224', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/376713119_122106704804030094_3269261785427263181_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-JYePpg3LBcAX_wxgcy&_nc_ht=scontent.faep8-1.fna&oh=00_AfCcvOMFo826clS4oHLM0mNoLuCs29kP31nlHHsID4J-bg&oe=65A1E6CD', likes: 0 },
    { nombre: 'Miguel Politano', urlPerfil: 'https://www.facebook.com/profile.php?id=100092747462565', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/355315968_135645346203714_4288852957470181653_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=77xs0IFggukAX84su2X&_nc_ht=scontent.faep8-2.fna&oh=00_AfBTe3c9ZUIxE8C07PiD2qjPe1YLaDNXPhizkwdgwIHBBQ&oe=65A3323B', likes: 0 },
    { nombre: 'Delia Chavez', urlPerfil: 'https://www.facebook.com/profile.php?id=100090467885760', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/370359149_228047436887518_478805674188444857_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=fJF52yQXdKUAX97VW_w&_nc_ht=scontent.faep8-1.fna&oh=00_AfDdwG3rcUPS9HXCBw6mW24AMdy5MclbQ7WAEdRfdm1TpA&oe=65A3274F', likes: 1 },
    { nombre: 'Victor Careaga', urlPerfil: 'https://www.facebook.com/victor.careaga.3950', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/405316877_1017222059579873_2453963640329266690_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=EaoTLWrbpoQAX_4od82&_nc_ht=scontent.faep8-1.fna&oh=00_AfAf1T9mXPlrvCbGUX9l-Ye56BegvN_eXbbX3OliZgyVdw&oe=65A2A178', likes: 0 },
    { nombre: 'Angel Villalba', urlPerfil: 'https://www.facebook.com/profile.php?id=100005970315979', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/329819166_685754033283103_429083905018559364_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=XlZC5AQefXQAX9wxb7w&_nc_oc=AQkFMa5apbQW7QyA4KSM92Kw-2VhiTubYbWNAKxZV0LDYeFsHkEm2HIyIKw5dfAYeaU&_nc_ht=scontent.faep8-1.fna&oh=00_AfByKQTbJ1lnlmQ7uZMWzJ1hVwIvuYB_R_Sa6hqpUd-TAw&oe=65A23661', likes: 0 },
    { nombre: 'Wilma Insfran', urlPerfil: 'https://www.facebook.com/wilma.insfran.9', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/416064073_1407833149839335_3480284264518902539_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=wd3Yq5aK7RAAX92-l3C&_nc_ht=scontent.faep8-2.fna&oh=00_AfChNVbLzfRPbHPQuCeSjIjFOxLuXNgXNRRqF2Tb1_gKdw&oe=65A18451', likes: 2 },
    { nombre: 'Delrrosario Ferreira', urlPerfil: 'https://www.facebook.com/delrrosario.ferreira', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/392940343_1022602972294131_7725181855611051983_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=mnDn4-6H1_EAX8YiYrK&_nc_ht=scontent.faep8-1.fna&oh=00_AfC7cntVoWdebc3_8GZ_GrnjGb9gRC14DaI_IVZtgJPunw&oe=65A2B04F', likes: 0 },
    { nombre: 'Moisés Miranda', urlPerfil: 'https://www.facebook.com/profile.php?id=100095309085320', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/414967618_203529269500708_4269584766495815034_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=EvfRYFspkcoAX8xB1gh&_nc_ht=scontent.faep8-2.fna&oh=00_AfBqwNAd2I-hc01n9-QKEC70afsbk86ZKurOLDArSXXvvw&oe=65A1A096', likes: 3 },
    { nombre: 'Paola Manquilef ', urlPerfil: 'https://www.facebook.com/profile.php?id=61552950848790', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/414859573_122121365018098361_8121430790056033187_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5740b7&_nc_ohc=C_Yw7PWFfr8AX_3x5tk&_nc_ht=scontent.faep8-1.fna&oh=00_AfAINvRn8z8pc2gzY-0j2hI3Kz7FDKtgk9bAIkWwbaCN2g&oe=65A2CCE8', likes: 0 },
    { nombre: 'Aura Ortiz', urlPerfil: 'https://www.facebook.com/profile.php?id=100090376146662', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/358382790_205482802474257_1200408191221802024_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=xuM1-OT2xyAAX-sQ0XV&_nc_ht=scontent.faep8-1.fna&oh=00_AfCVkT5O9-K54go4FlgyLmwVkbm3_S7S0ekhOOgFoiKvuA&oe=65A1F6C8', likes: 4 },
    { nombre: 'Yampier Pinto', urlPerfil: 'https://www.facebook.com/profile.php?id=100088184740567', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/416029032_336252945990861_4636040510124090014_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=LddGhsCW9mMAX-EBI9C&_nc_ht=scontent.faep8-1.fna&oh=00_AfCrbF8I5-_nkav5MfUVMO46N4QrJEGZW3rcHKDCw5DAZw&oe=65A166D0', likes: 0 },
    { nombre: 'Javi Javier', urlPerfil: 'https://www.facebook.com/hector.vargas.925059', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/302531656_2694388034038740_7849687216479344238_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=5740b7&_nc_ohc=aWkb2N3XWNUAX8GVgJ4&_nc_ht=scontent.faep8-1.fna&oh=00_AfCg-yYhCWdCNIQN30kZLwsL9_UM6lIs1OjuEqsppigudA&oe=65A20E52', likes: 0 },
    { nombre: 'Graciela Rioja', urlPerfil: 'https://www.facebook.com/graciela.rioja.543', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/396731941_1561117354653233_4230831673910497993_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=64Ll6_L6luEAX_Ned-n&_nc_ht=scontent.faep8-1.fna&oh=00_AfBnOlblsKybNo738_NPz4VROGjIgNdz0O5HYmzgobTumA&oe=65A2DB1B', likes: 0 },
    { nombre: 'María Ester Melillan', urlPerfil: 'https://www.facebook.com/profile.php?id=100074140105067', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/411404957_401386662342667_2053784500815836597_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=fQeFzM37vNYAX9DIrvX&_nc_ht=scontent.faep8-2.fna&oh=00_AfCF705rj0qaMQIEydJBICbWAvSn0mq00iTgFSJu-KHC7w&oe=65A1916D', likes: 0 },
    { nombre: 'Andrés Félix Gallardo', urlPerfil: 'https://www.facebook.com/profile.php?id=100001581067910', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-1/127143475_3626001400795860_5945310986529162201_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=UEaCaQi3f6cAX-PxHg8&_nc_ht=scontent.faep8-1.fna&oh=00_AfDIGUPmRWUFIt4dAIVtgZLu0tPpKOYistxWrB287JnfyA&oe=65C4D5C0', likes: 0 },
    { nombre: 'Joel Cxaxm', urlPerfil: 'https://www.facebook.com/profile.php?id=100058743913356', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.6435-1/128038538_104437298191067_8006731740797987079_n.jpg?stp=dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=6UIHd_T3sGoAX_fOta4&_nc_ht=scontent.faep8-1.fna&oh=00_AfAknSNK-A9YMAT7ugU6f8mNqBtWlczHiJ8DAsGmy3ThhA&oe=65C4CC42', likes: 0 },
    { nombre: 'Ricardo Albornoz', urlPerfil: 'https://www.facebook.com/ricardo.albornoz.5059', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/338016124_181221184691543_7197862954809778852_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=5t4A4XQraIoAX8z60x2&_nc_ht=scontent.faep8-1.fna&oh=00_AfBWjYGF-yZ5JA4reINMPqH30tfoBwaw2MOAGwof6rwtEA&oe=65A2A4D2', likes: 0 },
    { nombre: 'Ernesto Vargas', urlPerfil: 'https://www.facebook.com/ernesto.vargas.94617', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-1/230308040_1814346785439288_2372513789020445532_n.jpg?stp=c0.6.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5740b7&_nc_ohc=k4wCL4bztUYAX9xGIOO&_nc_ht=scontent.faep8-1.fna&oh=00_AfDqdXsYUsjmoX5ncFgXLGdq3ievbs-xSbC6fNnjwW9q3Q&oe=65A27CED', likes: 0 },
    { nombre: 'Santiago Viñaval', urlPerfil: 'https://www.facebook.com/alejandro.agtaz', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.18169-9/18766087_1961805904039901_5404661976213907003_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=be3454&_nc_ohc=SqaqWEqSsV0AX-bTXwr&_nc_ht=scontent.faep8-2.fna&oh=00_AfABoXkFWX3-HSk7FBnblx3E-8EXVlvPOerwMjKUKRav1Q&oe=65C4DC7E', likes: 0 },
    { nombre: 'José Carlos Pérez Pernas', urlPerfil: 'https://www.facebook.com/josecarlos.perezpernas', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t1.18169-9/14519789_10208731194250100_4257662856674401888_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=be3454&_nc_ohc=rCOZ-KfDag4AX8AGDH8&_nc_ht=scontent.faep8-1.fna&oh=00_AfDDzRTQG567kD9c0WJkHNOJ7mtitOuhSLwnLeY9bZPtoQ&oe=65C4CE58', likes: 0 },
    { nombre: 'Matias', urlPerfil: 'https://www.facebook.com/mati.rojas.90834', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/415519100_752609976785990_7176829924193972443_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=xVE38i2bygQAX9f-Bwq&_nc_ht=scontent.faep8-2.fna&oh=00_AfB3ERTGTZUiSSezznlvaoFs2nYtqdHcWsH1sz3ikmGjcQ&oe=65A21457', likes: 0 },
    { nombre: 'Alejandro De Flores', urlPerfil: 'https://www.facebook.com/profile.php?id=100089426506277', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/400025635_298941906430024_3523137368060980219_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=50hNb9Lss80AX94hmKE&_nc_oc=AQk3VFy4tOfKQbxZaaCpwexQgHE_1rkXAZXcRR9wSb-GHYZcxqhmceA6eReWQfapk_w&_nc_ht=scontent.faep8-1.fna&oh=00_AfD1zrrGcXHV1C2N0AGJ9K2xK40yvH0mdASZPV5UoSMTpw&oe=65A2ED77', likes: 0 },
    { nombre: 'Tadeu Pontarola Jr.', urlPerfil: 'https://www.facebook.com/tadeu.pontarola.9', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/393602373_3128462907295182_3860610410231718175_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=W6t99GMEMjMAX9LdR7y&_nc_ht=scontent.faep8-2.fna&oh=00_AfCqZwjRJcDaVSSD5a90VUT1hHofXWJ6RVacSIJGJsM8ig&oe=65A30B6E', likes: 0 },
    { nombre: 'Patricia Garcia', urlPerfil: 'https://www.facebook.com/plgarcia22', urlImagen: 'https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/347133959_203377995388014_5100821947750271493_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-2KbYg8znVMAX9CMsQZ&_nc_ht=scontent.faep8-1.fna&oh=00_AfDcoBqdvTmHswaFaTcDemQIdlDSV2HxWrqGEvapGfEG1Q&oe=65A203DE', likes: 0 },
    { nombre: 'Maria Obregon', urlPerfil: 'https://www.facebook.com/maria.obregon.3975', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t39.30808-6/350770335_242955315020375_4703326614188875957_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=q6jbDchrQxMAX8lqTxP&_nc_ht=scontent.faep8-2.fna&oh=00_AfCrROwpuPhsC1qgFjQFK2NxpDtSisWTNmc9zjvWPPzwXw&oe=65A2C55B', likes: 0 },
    { nombre: 'Francesc Muro', urlPerfil: 'https://www.facebook.com/francesc.muro', urlImagen: 'https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-1/48371154_10157260682792841_1524362401057603584_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=BLDTa5rFcIoAX9l7Unq&_nc_ht=scontent.faep8-2.fna&oh=00_AfDiCRgBES5QxJ4SaZYEI8JmMfQHvcchmyYSdGK-RYE4Rg&oe=65C4BF35', likes: 0 },
];

https://www.facebook.com/photo/?fbid=228449425503514&set=a.108492144165910&__tn__=%3C



// Llamada consultar
//realizarConsulta();

// Llamada insertar  
//insertarPerfil(nuevoPerfil);

// Llamada eliminar
//eliminarPerfilPorId("3"); 

//Llamada modificar
//modificarValorPorId(2, 'Nuevo Valor');

// Llamada crear tabla
//crearTabla();

// Llamada Insertar múltiples perfiles
insertarPerfiles(perfilesParaInsertar);






