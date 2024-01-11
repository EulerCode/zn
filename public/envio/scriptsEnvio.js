


function calcularTotal() {        //SE CALCULA EL TOTAL DEL PEDIDO
    // Obtener el contenido de la clave 'cart' en localStorage
    const cartString = localStorage.getItem('cart');

    // Verificar si la clave 'cart' existe en localStorage y tiene contenido
    if (cartString) {
        try {
            // Convertir el JSON almacenado en 'cart' a un objeto JavaScript
            const cart = JSON.parse(cartString);

            // Inicializar la variable total
            let total = 0;

            // Iterar sobre los productos en el carrito
            for (const productName in cart) {
                if (cart.hasOwnProperty(productName)) {
                    const product = cart[productName];
                    // Sumar el precio del producto multiplicado por la cantidad al total
                    total += product.price * product.quantity;
                }
            }

            // Imprimir el total en la consola (puedes hacer lo que necesites con 'total')


            // Devolver el total
            return total;
        } catch (error) {
            console.error('Error al parsear el contenido de "cart":', error);
        }
    } else {
        console.log('No hay contenido en "cart"');
    }

    // Si ocurre algún problema o no hay contenido en 'cart', devolver null o lo que consideres adecuado
    return null;
}

// Llamar a la función para calcular el total
const totalCarrito = calcularTotal().toFixed(3);
document.getElementById('total').innerHTML = "$" + totalCarrito;




//SE DESPLIEGA LA LISTA DE PRODUCTOS

function mostrarPedido() {
    // Obtener el contenido de la clave 'cart' en localStorage
    const cartString = localStorage.getItem('cart');

    // Verificar si la clave 'cart' existe en localStorage y tiene contenido
    if (cartString) {
        try {
            // Convertir el JSON almacenado en 'cart' a un objeto JavaScript
            const cart = JSON.parse(cartString);

            // Obtener el elemento del DOM con id 'pedido'
            const pedidoElement = document.getElementById('pedido');

            // Limpiar el contenido existente en el elemento
            pedidoElement.innerHTML = '';

            // Iterar sobre los productos en el carrito
            for (const productName in cart) {
                if (cart.hasOwnProperty(productName)) {
                    const product = cart[productName];

                    // Crear un elemento div para cada producto y agregar clases de estilo
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('producto-en-pedido');

                    // Crear una etiqueta de imagen y establecer la fuente desde el almacenamiento
                    const imgElement = document.createElement('img');
                    imgElement.style.maxWidth = "30%";
                    imgElement.style.marginRight = "3%";
                    imgElement.style.border = "solid 1px #0000001f";
                    imgElement.style.borderRadius = "9px";
                    imgElement.src = product.image;
                    imgElement.alt = productName;

                    // Crear un div para la información del producto
                    const infoDiv = document.createElement('div');
                    infoDiv.classList.add('info-producto');
                    infoDiv.style.display = "flex";
                    infoDiv.style.alignItems = "center";
                    // Truncar el nombre del producto si es demasiado largo
                    const truncatedName = productName.length > 36 ? productName.substring(0, 35) + '-' : productName;

                    // Crear un párrafo para mostrar el nombre, el talle, la cantidad y el precio del producto
                    const infoElement = document.createElement('p');
                    infoElement.innerHTML = `<strong>${truncatedName}</strong><br><a style="color:#00000080;">Talle:</a> ${product.size}<br><a style="color:#00000080;">Cantidad:</a> ${product.quantity}<br><a style="font-size:16px;">$${(product.price * product.quantity).toFixed(3)}</a>`;

                    // Agregar la imagen y la información al div del producto
                    infoDiv.appendChild(imgElement);
                    infoDiv.appendChild(infoElement);
                    productDiv.appendChild(infoDiv);

                    // Agregar el div del producto al elemento del pedido
                    pedidoElement.appendChild(productDiv);
                }
            }

            // Calcular y mostrar el precio total del pedido
            const totalCarrito = calcularTotal();
        } catch (error) {
            console.error('Error al parsear el contenido de "cart":', error);
        }
    } else {
        console.log('No hay contenido en "cart"');
    }
}

// Llamar a la función para mostrar el pedido
mostrarPedido();




var CostoTotal = 0;
var domicilio = "si";
var fecha = "";
var CodigoPostal = "";
calcularEnvio();

function geocode(query, callback) {
    $.ajax({
        url: 'https://api.opencagedata.com/geocode/v1/json',
        method: 'GET',
        data: {
            'key': 'ce70ce4d00fa49d5a38a28aab0d1976c',
            'countrycode': 'ar',
            'q': query,
            'limit': 1,
            'no_annotations': 1  // Cambiado a 1 para excluir anotaciones
        },
        dataType: 'json',
        success: function (response) {
            if (response.results && response.results.length > 0) {
                var components = response.results[0].components;
                var country = components.country;
                var province = components.state;
                var locality = components.city || components.town;

                var formatted = `País: ${country}, Provincia: ${province}, Localidad: ${locality}`;
                callback(formatted);
            }
        },
        error: function () {
            console.log('Error en la solicitud AJAX');
        }
    });
}






$(document).ready(function () {
    const overlay = $('#overlay');
    const inputCP = $('#cp');


    // Muestra el overlay al cargar la página
    overlay.show();
    $('#cp').focus();
    // Verifica el valor del input cuando cambia
    inputCP.on('input', function () {
        const codigoPostal = $(this).val();

        if (codigoPostal.length === 4) {
            // Si se ingresan 4 números, cierra el overlay
            overlay.hide();
            geocode(codigoPostal, function (formatted) {
                var country, province, locality;

                if (formatted) {
                    var matches = formatted.match(/País: (.*), Provincia: (.*), Localidad: (.*)/);
                    if (matches && matches.length === 4) {
                        country = matches[1].trim();
                        province = matches[2].trim();
                        locality = matches[3].trim();
                    }
                }

                $('#pais').val(country !== "undefined" ? country : '');
                $('#prov').val(province !== "undefined" ? province : '');
                $('#loc').val(locality !== "undefined" ? locality : '');

                CodigoPostal = $('#cp').val();
                console.log(CodigoPostal);

            });
        }
    });

    // Asigna la función al evento change del select
    $('#correo').change(calcularEnvio);
});



function formatearProductos(cadenaProductos) {
    // Dividir la cadena por comas
    const productos = cadenaProductos.split(',');

    // Formatear cada producto
    const productosFormateados = productos.map(producto => {
        // Eliminar espacios en blanco al principio y al final de cada producto
        const productoLimpio = producto.trim();

        // Agregar el punto y coma al principio de cada producto con un salto de línea
        return `· ${productoLimpio}\n`;
    });

    // Unir los productos formateados en una cadena
    return productosFormateados.join('');
}


function calcularEnvio() {

    if (parseFloat(totalCarrito) >= parseFloat(EnvioLimite)) {

        if (document.getElementById("correo").value == "Correo Argentino") {
            calcularFecha(3);
            document.getElementById('CostoEnvio').innerHTML = "Gratis";
            document.getElementById('CostoEnvio').style["color"] = "#2fc62f";
            CostoTotal = totalCarrito;
            document.getElementById('total').innerHTML = CostoTotal;
        } else {
            calcularFecha(4);
            document.getElementById('CostoEnvio').innerHTML = "Gratis";
            document.getElementById('CostoEnvio').style["color"] = "#2fc62f";
            CostoTotal = totalCarrito;
            document.getElementById('total').innerHTML = CostoTotal;
        }

    }

    if (parseFloat(totalCarrito) < parseFloat(EnvioLimite)) {
        if (document.getElementById("correo").value == "Correo Argentino") {
            document.getElementById('CostoEnvio').innerHTML = "$" + CostoEnvio;
            calcularFecha(4);

        } else {
            document.getElementById('CostoEnvio').innerHTML = "$" + (parseFloat(CostoEnvio) + parseFloat((CostoEnvio * 0.12))).toFixed(3);
            calcularFecha(3);


        }
    }

    if (document.getElementById("domicilioSi").checked) {

        if (document.getElementById("correo").value == "Correo Argentino") {

            var CostoEnvioTemp = (parseFloat(CostoEnvio) + parseFloat((CostoEnvio * 0.16))).toFixed(3);
        } else {

            var CostoEnvioTemp = (parseFloat(CostoEnvio) + parseFloat((CostoEnvio * 0.20))).toFixed(3);
        }


        document.getElementById('CostoEnvio').innerHTML = "$" + CostoEnvioTemp;

        CostoTotal = (parseFloat(totalCarrito) + parseFloat(CostoEnvioTemp)).toFixed(3);
        domicilio = "si";
    } else {
        CostoTotal = (parseFloat(totalCarrito) + parseFloat(CostoEnvio)).toFixed(3);
        domicilio = "no";
    }

    if (parseFloat(totalCarrito) >= parseFloat(EnvioLimite)) {
        document.getElementById('CostoEnvio').innerHTML = "Gratis";
        document.getElementById('CostoEnvio').style["color"] = "#2fc62f";
        CostoTotal = totalCarrito;
        document.getElementById('total').innerHTML = CostoTotal;
    }

    document.getElementById('total').innerHTML = "$" + CostoTotal;

}




function calcularFecha(sumar) {
    // Obtener la fecha actual
    var fechaActual = new Date();

    // Definir el número de días a sumar
    var diasASumar = sumar;

    // Obtener el día de la semana (0 es domingo, 1 es lunes, ..., 6 es sábado)
    var diaDeSemana = fechaActual.getDay();
    // Ajustar la cantidad de días a sumar si la fecha actual es un día cercano al domingo
    if (diaDeSemana + diasASumar >= 7) {
        diasASumar += 1;
    }

    // Sumar los días a la fecha actual
    fechaActual.setDate(fechaActual.getDate() + diasASumar);

    // Formatear la nueva fecha como "Día dd/MM/yyyy"
    var opcionesFormato = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
    var nuevaFechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFormato);
    nuevaFechaFormateada = nuevaFechaFormateada.charAt(0).toUpperCase() + nuevaFechaFormateada.slice(1); //mayus la 1ra
    document.getElementById('fechaEstimada').innerHTML = "Llega el " + nuevaFechaFormateada;
    fecha = nuevaFechaFormateada;
}


function armarLink() {


    console.log(CostoTotal);
    console.log(CostoEnvio);
    console.log(fecha);
    console.log(CodigoPostal);
    var pais = document.getElementById('pais').value;
    var prov = document.getElementById('prov').value;
    var loc = document.getElementById('loc').value;
    var dir = document.getElementById('dir').value;
    var nombre = document.getElementById('nombre').value;
    var mail = document.getElementById('mail').value;
    var phone = document.getElementById('phone').value;
    var correo = document.getElementById('correo').value;
    console.log(domicilio);


    var ValorEnvioFinal = document.getElementById('CostoEnvio').innerHTML;
    console.log(ValorEnvioFinal);
    if (ValorEnvioFinal == "Gratis") {
        ValorEnvioFinal = 0;
        console.log("valor" + ValorEnvioFinal);
    } else {
        ValorEnvioFinal = ValorEnvioFinal.replace(/\$/g, '');
    }


    window.open('../pago/pago.html?precio=' + totalCarrito + '&CostoTotal=' + CostoTotal + '&CostoEnvio=' + ValorEnvioFinal + '&fecha=' + fecha + '\
		&pais=' + pais + '&prov=' + prov + '&loc=' + loc + '&dir=' + dir + '\
	&nombre=' + nombre + '&mail=' + mail + '&phone=' + phone + "&correo=" + correo + "&domicilio=" + domicilio + "&CodigoPostal=" + CodigoPostal, '_self');


}


//Boton continuar
document.addEventListener('DOMContentLoaded', function () {
    var botonContinuar = document.getElementById('continuar');
    var inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');

    botonContinuar.addEventListener('click', function (event) {
        var formValido = true;

        inputs.forEach(function (input) {
            input.classList.remove('campo-invalido'); // Limpiar clases de campo-invalido
            var value = input.value.trim();

            if (value === '') {
                input.classList.add('campo-invalido');
                formValido = false;
            }

            // Validación específica para el campo de teléfono
            if (input.type === 'tel' && !/^[0-9]{10}$/.test(value)) {
                input.classList.add('campo-invalido');
                formValido = false;
            }

            // Validación específica para el campo de correo electrónico
            if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                input.classList.add('campo-invalido');
                formValido = false;
            }
        });

        // Verificar si el formulario es válido y redirigir al usuario
        if (formValido) {
            armarLink();
        } else {
            scrollToTop();
            event.preventDefault();
        }
    });

    // Agregar un manejador de eventos a cada campo para quitar la clase de campo-invalido cuando el usuario escribe en el campo
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            this.classList.remove('campo-invalido');
        });
    });
});



// Desplaza suavemente hacia arriba
function scrollToTop() {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para otros navegadores
}






document.getElementById('domicilioSi').addEventListener('click', function (event) {
    ActualizarSucursales();
    document.getElementById("sucursalesMap").style.display = "none";  //desaparece mapa de sucursales   

});

document.getElementById('domicilioNo').addEventListener('click', function (event) {
    ActualizarSucursales();
    document.getElementById("sucursalesMap").style.display = "block";  //aparece mapa de sucursales 

});





function ActualizarSucursales() {

    var divAEliminar = document.getElementById("sucursalesMap");
    if (divAEliminar) {
        if (divAEliminar.parentNode) {
            divAEliminar.parentNode.removeChild(divAEliminar);
        }
    }
        // Crear el nuevo elemento div solo si se selecciona "Sucursal de correo más cercana"
        var nuevoDiv = document.createElement("div");
        nuevoDiv.id = "sucursalesMap";
        nuevoDiv.style.display = "none";

        // Contenido del nuevo div con la estructura del mapa
        nuevoDiv.innerHTML = `
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=sucursales de correo argentino en cordoba - arias&t=&z=11&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    <br>
                    <style>.mapouter{position:relative;text-align:right;height:100%;width:100%;}</style>
                    <style>.gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;}</style>
                </div>
            </div>
            <div>Recibirá un email y un mensaje de texto cuando su pedido ya esté en sucursal.<d/iv>
        `;

        // Obtener el elemento existente por su id
        var domicilioNo = document.getElementById("labelSucur");

        // Insertar el nuevo div después del div existente
        domicilioNo.parentNode.insertBefore(nuevoDiv, domicilioNo.nextSibling);



        var elemento = document.getElementById("gmap_canvas");
        elemento.src = "https://maps.google.com/maps?q=sucursales de " + document.getElementById("correo").value + " en " + $('#prov').val() + " localidad de " + $('#loc').val() + " codigo postal "+ $('#cp').val() +"&t=&z=11&ie=UTF8&iwloc=&output=embed ";

    }
















