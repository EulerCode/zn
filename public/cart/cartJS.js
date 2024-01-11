

//==============================================AGREGAR AL CARRITO FUNCIONES Y MAS======================================================

document.getElementById('addCart').addEventListener('click', function () {
    //Si dice "ver carrito" guardo cookie para mostrar automaticamente el modal carrito en la pagina anterior
    // Función para establecer una cookie
    function setCookie(name, value) {
        document.cookie = name + '=' + value + ';path=/';
    }
    addCartTxt = document.getElementById('addCartTxt').textContent;
    if (addCartTxt == "Ver carrito") {
        setCookie("VerCarrito", "si", 7);
        history.replaceState(null, null, document.referrer);
        window.location.reload(true);

        return

    }

    if (allowButtons) {
        document.getElementById('addCart').style.background = "#ef4011";
    } else {
        document.getElementById('addCart').style.background = "#f9a48e";
        document.getElementById('botonesAviso').style.display = "block"
        setTimeout(function () {
            document.getElementById('botonesAviso').style.display = "none";
        }, 4000);
    }

    if (!allowButtons) {
        return
    }





    // ROTACION EN LA ANIMACION DEL BOTON 
    const icono = document.getElementById('btnRotate');
    icono.style.display = "block";
    icono.classList.add('fa-spin');

    // Después de 3 segundos, quitar la clase de rotación y ocultar el icono
    setTimeout(() => {
        icono.classList.remove('fa-spin');
        icono.style.display = 'none';
        document.getElementById('addCart').style.background = "#0aae04";
        document.getElementById('addCartTxt').textContent = "Ver carrito"
        allowButtons = false;

    }, 3000);


    //primero obtengo la primer imagen
    const urlParams = new URLSearchParams(window.location.search);
    const imageLinksParam = urlParams.get('imageLinks');
    const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];



    const productName = document.getElementById('ProductName').textContent;
    const productPrice = parseFloat(document.getElementById('precio').textContent.replace(/[^\d.]/g, ''));
    const productImage = imageLinks[0];
    const talle = numeroTalle;
    const productQty = 1; // Se inicia con una cantidad de 1 al agregar al carrito

    // Verificar si ya hay un carrito almacenado en el localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Verificar si el producto ya está en el carrito
    if (cart[productName]) {
        // Si está en el carrito, incrementar la cantidad
        cart[productName].quantity += 1;
    } else {
        // Si no está en el carrito, agregar un nuevo elemento al carrito
        cart[productName] = {
            price: productPrice,
            image: productImage,
            size: talle,
            quantity: productQty
        };
    }

    // Actualizar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

 


});


//COMPRA DIRECTA

document.getElementById('buy').addEventListener('click', function () {
 
  

    if (!allowButtons) { 
        document.getElementById('botonesAviso').style.display = "block"
        return
    }

    //borro contenido del storage
    localStorage.clear();

   
 

    
    //primero obtengo la primer imagen
    const urlParams = new URLSearchParams(window.location.search);
    const imageLinksParam = urlParams.get('imageLinks');
    const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];



    const productName = document.getElementById('ProductName').textContent;
    const productPrice = parseFloat(document.getElementById('precio').textContent.replace(/[^\d.]/g, ''));
    const productImage = imageLinks[0];
    const talle = numeroTalle;
    const productQty = 1; // Se inicia con una cantidad de 1 al agregar al carrito

    // Verificar si ya hay un carrito almacenado en el localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Verificar si el producto ya está en el carrito
    if (cart[productName]) {
        // Si está en el carrito, incrementar la cantidad
        cart[productName].quantity += 1;
    } else {
        // Si no está en el carrito, agregar un nuevo elemento al carrito
        cart[productName] = {
            price: productPrice,
            image: productImage,
            size: talle,
            quantity: productQty
        };
    }

    // Actualizar el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); 

    window.location.href = "/envio/";


});











/*   const urlParams = new URLSearchParams(window.location.search);
  const imageLinksParam = urlParams.get('imageLinks');
  const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];  */