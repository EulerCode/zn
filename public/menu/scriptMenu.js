// menu.js

function mostrarMenu() {
    var overlayHTML = '<div id="overlay" onclick="ocultarMenu();"></div>';
    document.body.insertAdjacentHTML('beforeend', overlayHTML);

    var menuContainerHTML = `
        <div id="menu-container">
        <img src="/menu/colgando.jpg" alt="asdasdasd">
            <div id="menu-content" onclick="event.stopPropagation();">
                <div id="close-btn" onclick="ocultarMenu();">✖</div>
                
                <div id="menu-list">
                    <!-- Agrega aquí los enlaces del menú -->
                    <p onclick="irASeccion('inicio')">Inicio</p>
                    <p onclick="irASeccion('productos')">Productos</p>
                    <p onclick="irASeccion('institucional')">Institucional</p>
                    <p onclick="irASeccion('contacto')">Contacto</p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', menuContainerHTML);

    var overlayStyle = document.getElementById('overlay').style;
    overlayStyle.position = 'fixed';
    overlayStyle.top = '0';
    overlayStyle.left = '0';
    overlayStyle.width = '100%';
    overlayStyle.height = '100%';
    overlayStyle.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlayStyle.zIndex = '1';

    var menuContainerStyle = document.getElementById('menu-container').style;
    menuContainerStyle.width = '300px';
    menuContainerStyle.height = '100%';
    menuContainerStyle.position = 'fixed';
    menuContainerStyle.top = '0';
    menuContainerStyle.left = '-300px';
    menuContainerStyle.backgroundColor = '#fff';
    menuContainerStyle.transition = 'left 0.3s ease';
    menuContainerStyle.zIndex = '999';

    setTimeout(function () {
        menuContainerStyle.left = '0';
    }, 10);
}

function ocultarMenu() {
    var overlay = document.getElementById('overlay');
    var menuContainer = document.getElementById('menu-container');

    overlay.parentNode.removeChild(overlay);
    menuContainer.parentNode.removeChild(menuContainer);
}

function irASeccion(seccion) {

    if(seccion=="inicio"){
        window.open("/", '_self');
    }

    if(seccion=="productos"){
        window.open("/api/products/", '_self');
    }

    if(seccion=="institucional"){
        window.open("/institucional", '_self');
    }

    if(seccion=="contacto"){
        window.open(linkWhatsapp, '_self');
    }
 
}
