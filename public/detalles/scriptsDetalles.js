 
document.addEventListener('DOMContentLoaded', function () {
  // Obtener los enlaces de imágenes desde el parámetro en el URL
  const urlParams = new URLSearchParams(window.location.search);
  const imageLinksParam = urlParams.get('imageLinks');


  // Convertir la cadena JSON a un array de enlaces
  const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];

  // Generar dinámicamente los elementos de las diapositivas y los puntos
  const glideSlides = document.querySelector('.glide__slides');
  const dotsContainer = document.querySelector('.dots');

  imageLinks.forEach((link, index) => {
    const slide = document.createElement('li');
    slide.classList.add('glide__slide');
    slide.innerHTML = `<img src="${link}" alt="Imagen ${index + 1}">`;
    glideSlides.appendChild(slide);

    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-glide-dir', `=${index}`);
    dotsContainer.appendChild(dot);
  });

  // Configuración de Glide.js
  const glideInstance = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    focusAt: 'center',
    gap: 0,
    // autoplay: 5000, // Cambiar cada 5 segundos
  });

  // Montar Glide.js después de la configuración
  glideInstance.mount();

  // Actualizar el estado de los puntos cuando cambia la diapositiva
  glideInstance.on('run', (move) => {
    const activeDot = document.querySelector('.dot.active');
    if (activeDot) activeDot.classList.remove('active');

    const newActiveDot = document.querySelector(`.dot[data-glide-dir*="${move.direction}"]`);
    if (newActiveDot) newActiveDot.classList.add('active');
  });

});

//accion de los botnoes carrito y comprar
var allowButtons = false;
 

document.getElementById('buy').addEventListener('click', function () {
  if (allowButtons) {
    document.getElementById('buy').style.background = "#2e2e2e";
  } else {
    document.getElementById('buy').style.background = "#a6a6a6";
    document.getElementById('botonesAviso').style.display = "block"
    setTimeout(function () {
      document.getElementById('botonesAviso').style.display = "none";
    }, 4000);
  }
});


function CalcularDia() {
  const diasEnSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const hoy = new Date();
  const diaActual = hoy.getDay(); // 0 es domingo, 1 es lunes, ..., 6 es sábado

  // Sumar 3 días, y asegurarse de que no sea domingo
  let nuevoDia = (diaActual + 3) % 7;
  nuevoDia = nuevoDia === 0 ? 1 : nuevoDia; // Si es domingo, establecerlo como lunes 

  if (gratis == true) {
    return document.getElementById('dia').textContent = diasEnSemana[nuevoDia];
  } else {
    return document.getElementById('dia').textContent = diasEnSemana[nuevoDia] + "  por $" + costo;
  }



}
CalcularDia();


//Modal ventana pagos
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');
  const openModalButton = document.getElementById('medios');
  const closeModalButtons = document.querySelectorAll('.close, #overlay');

  openModalButton.addEventListener('click', function () {
    overlay.style.display = 'block';
    modal.style.display = 'block';
  });

  closeModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      overlay.style.display = 'none';
      modal.style.display = 'none';
    });
  });
});


//Modal ventana pagos
document.addEventListener('DOMContentLoaded', function () {
  $('#accordion, #bs-collapse').on('show.bs.collapse', function (a) {
    $(a.target).prev('.panel-heading').addClass('active');
  }).on('hide.bs.collapse', function (a) {
    $(a.target).prev('.panel-heading').removeClass('active');
  });
});



//CLICK EN TALLES BOTONES
 

var numeroTalle;

function toggleSelected(element) {
  numeroTalle = element.innerHTML;
  var stockAviso = document.getElementById('stockAviso');
  var addCart = document.getElementById('addCart');
  var buy = document.getElementById('buy');
  stockAviso.innerHTML = "Consultando stock"
  stockAviso.style.fontSize = "16px";
  stockAviso.style.color = "rgba(66, 66, 66, 0.63)";
  stockAviso.style.display = "block"; // Mostrar el mensaje
  var barritaAviso = document.getElementById('barritaAviso');
  barritaAviso.style.display = "block";
  barritaAviso.classList.add('cargando');
  addCart.style.background = "#f9a48e";
  document.getElementById('addCartTxt').textContent="Agregar al carrito";
  


  // Iniciar la animación de opacidad
  var intervalId = setInterval(() => {
    // Aumentar la opacidad
    stockAviso.style.opacity = '1';

    // Retraso para mostrar la opacidad completa antes de reducirla
    setTimeout(() => {
      // Reducir la opacidad
      stockAviso.style.opacity = '0.5';
    }, 500);
  }, 1000);



  setTimeout(() => {
    if (element.innerHTML == "34.5" || element.innerHTML == "35.5" || element.innerHTML == "37" || element.innerHTML == "38.5"
      || element.innerHTML == "39.5" || element.innerHTML == "40.5" || element.innerHTML == "41.5" || element.innerHTML == "44.5") {
      stockAviso.style.fontSize = "12px";
      stockAviso.style.color = "#f94848";
      stockAviso.textContent = "Talle " + element.innerHTML + " no se encuentra en stock.";
      clearInterval(intervalId);    // Detener la animación y dejar la opacidad en 1
      stockAviso.style.opacity = '1';
      allowButtons = false;
      addCart.style.background = "#f9a48e";
      buy.style.background = "#a6a6a6";
      
    } else {
      stockAviso.style.fontSize = "12px";
      stockAviso.textContent = "Talle " + element.innerHTML + " en stock";
      stockAviso.style.color = "rgba(0, 113, 7, 0.63)";
      clearInterval(intervalId);    // Detener la animación y dejar la opacidad en 1
      stockAviso.style.opacity = '1';
      allowButtons = true;
      addCart.style.background = "#ef4011";
      buy.style.background = "#2e2e2e";
    }
    barritaAviso.style.display = "none";
    barritaAviso.classList.remove('cargando');
  }, 3000);





  // Desmarcar todos los talles
  const talles = document.querySelectorAll('.talle');
  talles.forEach(talle => talle.classList.remove('selected'));

  // Marcar el talle clickeado
  element.classList.add('selected');
}







//Modal ventana Guia de talles 
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modalTalles');
  const openModalButton = document.getElementById('guiaTalles');
  const closeModalButtons = document.querySelectorAll('.close, #overlay');

  openModalButton.addEventListener('click', function () {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    document.getElementById('nameMedida').textContent = name;

    var barrita = document.getElementById('barritaMedida');
    barrita.classList.add('cargando');

    // Después de 2 segundos, quitar la clase para permitir la recarga
    setTimeout(function () {
      barrita.classList.remove('cargando');
      document.getElementById('cargador').style.display = "none";
      document.getElementById('imgPie').style.display = "block";
      document.getElementById('instruc').style.display = "block";
      document.getElementById('titleTabla').style.display = "block";
      document.getElementById('nameMedida2').textContent = name;
      document.getElementById('tabla').style.display = "block";
      document.getElementById('modalTalles').style.height = "85%";
    }, 5000);

    const urlParams = new URLSearchParams(window.location.search);
    const imageLinksParam = urlParams.get('imageLinks');
    const imageLinks = imageLinksParam ? JSON.parse(decodeURIComponent(imageLinksParam)) : [];
    console.log(imageLinks);
    document.getElementById('imgMedida').setAttribute("src", imageLinks[0]);


  });

  closeModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      overlay.style.display = 'none';
      modal.style.display = 'none';
    });
  });
});





