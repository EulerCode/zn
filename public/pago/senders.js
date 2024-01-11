


function sendEmail() {
    const queryString2 = window.location.search;
    const urlParams2 = new URLSearchParams(queryString2);
    //titular desde globals
    //linkImgMail desde globals
    //PaginaWeb  desde globals
    //Direccion desde globals
    const productos = obtenerNombresCarritoDesdeLocalStorage();
    var total = urlParams2.get('CostoTotal');
    var envPrecio = urlParams2.get('CostoEnvio');
    var precio = urlParams2.get('precio');
    var dir = urlParams2.get('dir') + ". " + urlParams2.get('loc') +". " + urlParams2.get('prov'); 
    var nombre = urlParams2.get('nombre');
    var mail = urlParams2.get('mail');
    var fecha = urlParams2.get('fecha');
    var sPostal = urlParams2.get('correo');
    var domiSN = urlParams2.get('domicilio');
    var phone = urlParams2.get('phone');
    //link de seguimiento segun servicio postal
    if (sPostal == "Andreani") {
        var seguimiento = "https://andreanionline.com/link-envio/5004298544765";
    } else {
        var seguimiento = "https://www.correoargentino.com.ar/formularios/e-commerce/994198437728";
    }
 
 
    window.open('/end/?titular=' + titular + '&productos=' + productos + '&total=' + total + '&envPrecio=' + envPrecio + 
    '&precio=' + precio + '&dir=' + dir + '&nombre=' + nombre + '&mail=' + mail + '&fecha=' + fecha
    + '&sPostal=' + sPostal + '&domiSN=' + domiSN + '&seguimiento=' + seguimiento + '&linkImgMail=' + linkImgMail + '&PaginaWeb=' + PaginaWeb + '&Direccion=' + Direccion + '&phone=' + phone, '_self');  
};








function obtenerNombresCarritoDesdeLocalStorage() {
    const carritoEnLocalStorage = localStorage.getItem('cart');
    if (!carritoEnLocalStorage) {
        return "El carrito está vacío.";
    }

    try {
        const carrito = JSON.parse(carritoEnLocalStorage);
        const nombresProductos = [];

        for (const producto in carrito) {
            const cantidad = carrito[producto].quantity;
            const nombreProducto = cantidad > 1 ? `${producto}(${cantidad})` : producto;
            nombresProductos.push(nombreProducto);
        }

        return nombresProductos.join(', ');
    } catch (error) {
        console.error('Error al parsear el carrito desde localStorage:', error);
        return "Error al leer el carrito.";
    }
}





/*		<script>
            document.getElementById('confirmar').addEventListener("click", () => {
                window.open('/end/?cbu=' + cbu + '&titular=' + titular, '_self');
            })
        </script>*/