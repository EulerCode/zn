
 
function openDetalles(productName, precio, DetallesLink, imageLinks) {

	window.location.href = '/api/products/detalles/?DetallesLink=' + DetallesLink + "&imageLinks=" + imageLinks + "&precio=" + precio + "&name=" + productName;

}


if (checkCookie("VerCarrito")) {
	mostrarCarrito();
	document.cookie = "VerCarrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //se lleva la cookie al pasado para eliminarla
}



showLoader(); // muesrta spinner


// LOGICA DEL SELECTOR DE ORDEN DE PRODUCTOS-
document.addEventListener('DOMContentLoaded', function () {


	const selector = document.getElementById('selector');

	// Restaurar la selección anterior desde la cookie
	const selectedOption = getCookie('selectedOption');
	if (selectedOption) {
		selector.value = selectedOption;
	}

	// Manejar el cambio en el selector
	selector.addEventListener('change', function () {
		// Obtén el valor del selector
		const selectedOption = selector.value;

		// Guardar la selección en la cookie
		setCookie('selectedOption', selectedOption);

		// Redireccionar a la nueva URL
		window.location.href = '/api/products?baseUrl=' + encodeURIComponent(ArmarUrl());
	});




	// Oculta el spinner cuando la página está completamente cargada
	hideLoader();
});


//LOGICA DE FILTROS

//TIPO
function updateTipo(text) {

	document.getElementById('TipoDropdownToggle').innerText = text;

	// Cierra la lista desplegable después de actualizar
	var marcaDropdown = document.getElementById('tipoDropdown');
	var menu = marcaDropdown.querySelector('.dropdown-menu');
	var arrow = marcaDropdown.querySelector('i.icon-arrow');

	menu.classList.remove('show');
	menu.classList.add('hide');
	arrow.classList.remove('open');
	arrow.classList.add('close');

	//se guarda la eleccione en una cookie
	setCookie('filtro', text.toLowerCase());
	// Redireccionar a la nueva URL
	window.location.href = '/api/products?baseUrl=' + encodeURIComponent(ArmarUrl());
}

//MARCA
function updateMarca(text) {

	document.getElementById('marcaDropdownToggle').innerText = text;

	// Cierra la lista desplegable después de actualizar
	var marcaDropdown = document.getElementById('marcaDropdown');
	var menu = marcaDropdown.querySelector('.dropdown-menu');
	var arrow = marcaDropdown.querySelector('i.icon-arrow');

	menu.classList.remove('show');
	menu.classList.add('hide');
	arrow.classList.remove('open');
	arrow.classList.add('close');

	//se guarda la eleccione en una cookie
	setCookie('filtro', text.toLowerCase());
	// Redireccionar a la nueva URL
	window.location.href = '/api/products?baseUrl=' + encodeURIComponent(ArmarUrl());
}

//CATEGORIA
function updateCat(text) {

	document.getElementById('CatDropdownToggle').innerText = text;

	// Cierra la lista desplegable después de actualizar
	var marcaDropdown = document.getElementById('catDropdown');
	var menu = marcaDropdown.querySelector('.dropdown-menu');
	var arrow = marcaDropdown.querySelector('i.icon-arrow');

	menu.classList.remove('show');
	menu.classList.add('hide');
	arrow.classList.remove('open');
	arrow.classList.add('close');

	//se guarda la eleccione en una cookie
	setCookie('filtro', text.toLowerCase());
	// Redireccionar a la nueva URL
	window.location.href = '/api/products?baseUrl=' + encodeURIComponent(ArmarUrl());
}




// Función para establecer una cookie
function setCookie(name, value) {
	document.cookie = name + '=' + value + ';path=/';
}

// Función para obtener el valor de una cookie 
function getCookie(name) {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

	return match ? match[2] : null;
}

// Función para verifficar existencia de cookie
function checkCookie(cookieName) {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim();
		if (cookie.indexOf(cookieName + '=') === 0) {
			return true; // La cookie existe
		}
	}

	return false; // La cookie no existe
}


// ARMAR URL
function ArmarUrl() {
	if (!checkCookie("selectedOption") && checkCookie("filtro")) {
		return 'https://www.dexter.com.ar/hombre/calzado/' + getCookie('filtro');
	}

	if (checkCookie("selectedOption") && !checkCookie("filtro")) {
		return 'https://www.dexter.com.ar/hombre/calzado?srule=' + getCookie('selectedOption') + '&start=0&sz=36';
	}

	if (checkCookie("selectedOption") && checkCookie("filtro")) {
		return 'https://www.dexter.com.ar/hombre/calzado/' + getCookie('filtro') + "?srule=" + getCookie('selectedOption') + '&start=0&sz=36';
	}


}




//=============================================MOSTRAR VENTANA DE CARRITO=====================================
function irEnvio() {
	window.location.href = "/envio/";
}

function mostrarCarrito() {
	// Crear el overlay oscuro
	var overlayHTML = '<div id="overlay" onclick="ocultarCarrito();"></div>';
	document.body.insertAdjacentHTML('beforeend', overlayHTML);



	// Crear el contenedor del carrito
	var cartContainerHTML = `
        <div id="cart-container">
            <div id="cart-content" onclick="event.stopPropagation();">
                <div id="close-btn" onclick="ocultarCarrito();">✖</div>
				<p style="margin-left: 5%;font-weight: 600;">Carrito de compras</p>		
                <div id="cart-list"></div> 
				<p id="iniCompra" style="background: #ef4011;
				margin-left: 15%;
				font-weight: 600;
				text-align: center;
				margin-right: 15%;
				padding: 10px;
				color: white;
				border-radius: 8px;" onclick='irEnvio()'>INICIAR COMPRA</p>	
            </div>
        </div>
    `;


	// Agregar el contenedor del carrito al cuerpo del documento
	document.body.insertAdjacentHTML('beforeend', cartContainerHTML);

	// Aplicar estilos al overlay
	var overlayStyle = document.getElementById('overlay').style;
	overlayStyle.position = 'fixed';
	overlayStyle.top = '0';
	overlayStyle.left = '0';
	overlayStyle.width = '100%';
	overlayStyle.height = '100%';
	overlayStyle.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	overlayStyle.zIndex = '1';

	// Aplicar estilos al contenedor del carrito
	var cartContainerStyle = document.getElementById('cart-container').style;
	cartContainerStyle.width = '300px';
	cartContainerStyle.height = '100%';
	cartContainerStyle.position = 'fixed';
	cartContainerStyle.top = '0';
	cartContainerStyle.right = '-300px';
	cartContainerStyle.backgroundColor = '#fff';
	cartContainerStyle.transition = 'right 0.3s ease';
	cartContainerStyle.zIndex = '2';

	// Aplicar estilos al X
	var closeBtn = document.getElementById('close-btn').style;
	closeBtn.position = "absolute";
	closeBtn.right = "5%";

	// Mostrar el carrito deslizándolo desde la derecha
	setTimeout(function () {
		cartContainerStyle.right = '0';
	}, 10);

	// Obtener el carrito del Local Storage
	const cartData = JSON.parse(localStorage.getItem('cart')) || {};

	// Obtener el elemento donde se mostrará la lista de productos
	const cartListContainer = document.getElementById('cart-list');

	// Función para renderizar el carrito
	function renderCart() {
		cartListContainer.innerHTML = ''; // Limpiar el contenido actual del carrito

		if (Object.keys(cartData).length === 0) {
			// Carrito vacío
			document.getElementById("iniCompra").style.display="none";
			cartListContainer.innerHTML = '<p style="margin-left: 5%;text-align: center;font-size: 23px;margin-top: 50%;">Tu carrito está vacío <img src="/cart/cart-empty.jpg" style="width: 30%;margin-top: 10%;"></p>';
			return;
		}

		// Renderizar cada elemento del carrito
		let total = 0;
		for (const productName in cartData) {
			if (cartData.hasOwnProperty(productName)) {
				const product = cartData[productName];
				const totalPrice = product.price * product.quantity;
				total += totalPrice;

				const cartItemHTML = `
					<div class="cart-item" style="margin-left: 5%;">
					  <div style="display:flex"> 
					     <div>
					         <div style="display:flex; align-items: center;"> 
							     <img src="${product.image}" alt="${productName}" style="max-width: 50%; margin-right: 5%;">
                                 <p style="font-size:10px;font-weight: 600;">${productName}</p>
					         </div>    
					   
						     <div style="display:flex; justify-content: space-between;margin-left: 16%; margin-top: -5%;"> 
					            <p style="font-size:10px;font-weight: 600;">Talle: ${product.size}</p>                       
					            <p style="font-size:10px;font-weight: 600;">Cantidad: ${product.quantity}</p>
					            <p style="font-size:10px;font-weight: 600;">$${totalPrice.toFixed(3)}</p>					      
					         </div>    
						 </div>
					     <button class="delete-button" style="width: 75%;border: none;background: none;" onclick="removeFromCart('${productName}')"><i class="fa-regular fa-trash-can" style="color: #f23a0d;"></i></button>
					   </div> 
                    </div>
					<hr style="width: 90%;color: #4848483b;">
                `;
				cartListContainer.innerHTML += cartItemHTML;
			}
		}

		// Mostrar el total
		cartListContainer.innerHTML += `
		<div style="display:flex; justify-content: space-between;font-weight: 600;">
		    <p id="total" style="position: relative;right: 0%; margin-left: 5%;">Total:</p>
			<p id="total" style="position: relative;right: 0%; margin-right: 5%;">$${total.toFixed(3)}</p>
		</div>`;
	}

	// Función para eliminar un elemento del carrito
	window.removeFromCart = function (productName) {
		delete cartData[productName];
		localStorage.setItem('cart', JSON.stringify(cartData));
		renderCart();
		// Contar la cantidad de productos restantes en el carrito
		const remainingProducts = Object.keys(cartData).reduce((total, product) => total + cartData[product].quantity, 0);
		document.getElementById('notify').innerHTML = remainingProducts.toString();
	};

	// Inicializar el renderizado del carrito
	renderCart();
}

// Función para ocultar el carrito
function ocultarCarrito() {
	// Ocultar el carrito deslizándolo hacia la derecha
	var cartContainerStyle = document.getElementById('cart-container').style;
	cartContainerStyle.right = '-300px';

	// Eliminar el overlay y el contenedor del carrito después de la animación
	setTimeout(function () {
		var overlay = document.getElementById('overlay');
		var cartContainer = document.getElementById('cart-container');

		if (overlay) {
			overlay.parentNode.removeChild(overlay);
		}

		if (cartContainer) {
			cartContainer.parentNode.removeChild(cartContainer);
		}
	}, 300);
}

// Evento para mostrar el carrito al hacer clic en el icono de carrito
document.getElementById('carrito').addEventListener('click', mostrarCarrito);


//NOTIFICACION DEL CARRITO notify

// Obtener el carrito desde el localStorage (puede devolver null si no existe)
const cart = JSON.parse(localStorage.getItem('cart')) || {};

// Función para calcular la cantidad total del carrito y actualizar el elemento #notify
function actualizarCantidadTotal() {
	let total = 0;

	// Verificar si el carrito existe y tiene elementos
	if (cart && Object.keys(cart).length > 0) {
		// Sumar las cantidades
		for (const item in cart) {
			total += cart[item].quantity;
		}
	}

	// Actualizar el contenido del elemento #notify
	const notifyElement = document.getElementById('notify');
	notifyElement.textContent = total.toString();

	// Ocultar el elemento si la cantidad total es cero
	notifyElement.style.display = total === 0 ? 'none' : 'block';
}

// Llamar a la función al cargar la página
window.onload = actualizarCantidadTotal;
















/* funciones del spinner */
function showLoader() {
	const spinnerContainer = document.getElementById('spinner-container');
	spinnerContainer.style.display = 'flex'; // Muestra el spinner

}

function hideLoader() {
	const spinnerContainer = document.getElementById('spinner-container');
	spinnerContainer.style.display = 'none'; // Oculta el spinner

}






