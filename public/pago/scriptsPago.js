var TotalaPagar;
var DescuentoOnlyOne=true;
var descuento = 0;
var cant = 1;
$('#cuotas').fadeOut(10);
//TABS=====================================

$( "#tabs" ).tabs({
	active: 0
});

// Programmatically Select Tab by ID
$.fn.fetchTabID = function (id) {
	$(this).tabs("option", "active", $('#' + id).index() - 1);
};

$(".btnSelectTab").on('click', function () {
	$("#tabs").fetchTabID('t2');
});
$(".btnSelectTab1").on('click', function () {
	$("#tabs").fetchTabID('t1');
});
//FIN TABS=====================================



//accion del boton Pagar en Mercado Pago
$("#pagarMP").click(function () {
    var estiloCSS = `/* VENTANA MODAL COMPRA PROTEGIDA */
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 999;
        }
        .container {
            width: 1%;
            height: 1%;
        }
        .bar_tool,
        .pop_up {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            background-color:#45b2e8;
            z-index: 99;
        }
        .bar_tool button {
            padding: 15px;
            width: 200px;
            border: 0;
            outline: 0;
            color: black;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
            background-color: white;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .bar_tool button:hover {
            color: white;
            background-color: indianred;
        }
        .pop_up {
            width: 85%;
            height: auto;
            background-color: white;
            visibility: hidden;
            opacity: 0;
            transition: all 0.5s;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
            rgba(0, 0, 0, 0.22) 0px 10px 10px;
            z-index:9999;
        }
        .pop_up.open {
            visibility: visible;
            opacity: 1;
        }
        .pop_up.open .body img {
            opacity: 1;
            transform: translateX(0px);
        }
        .subscribe_box {
            padding: 32px 16px;
            text-align: center;
        }
        .head .close {
            padding: 17px;
            font-size: 45px;
            font-weight: bold;
            position: absolute;
            top: 0px;
            right: -8px;
            cursor: pointer;
        }
        .head .close:hover {
            color: indianred;
        }
        .head .title {
            color: white;
            font-size: 41px;
            font-weight: bold;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .body {
            margin: 32px 0;
        }
        .body img {
            opacity: 0;
            transition: all 1.5s ease;
            transition-delay: 0.3s;
            transform: translateX(50px);
        }
        .loader-container {
            display: flex;
        }
        .loader {
            width: 20px;
            height: 20px;
            background-color: #3498db;
            margin: 2px;
            animation: fill 2s ease-in-out infinite;
        }
        @keyframes fill {
            0% {
                height: 0;
            }
            50% {
                height: 20px;
            }
            100% {
                height: 0;
            }
        }
        .progress-container {
            margin-left: 15%;
            margin-top:15px;
            width: 70%;
            height: 15px;
            background-color: #f1f1f1;
            border-radius: 10px;
            overflow: hidden;
        }
        .progress-bar {
            width: 0%;
            height: 100%;
            background-image: linear-gradient(to bottom,#00abff 0,#0089ff 100%);
            animation: progress 10s linear;
        }
        @keyframes progress {
            0% {
                width: 0;
            }
            100% {
                width: 100%;
            }
        }
        .subscribe{
            text-align:center;
            margin-left:4%;
            color:black;
        }
        .subscribe h1 {
            font-size: 16px;
            opacity:0.5;
        }
    `;

    var estiloElemento = document.createElement("style");
    estiloElemento.innerHTML = estiloCSS;

    document.head.appendChild(estiloElemento);

    var appDetectIcon = '<i class="fa-solid fa-check" style="opacity:0;color: #00d900;"></i>';
    var appDetectMsg = "Iniciando aplicación";

 

    var g = document.createElement('container');
    g.innerHTML = `<script src="https://kit.fontawesome.com/67821f8363.js" crossorigin="anonymous"></script>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>\
    <!-- VENTANA MODAL DE COMPRA PROTEGIDA -->\
    <div class="overlay"></div>\
    <div class="container">\
        <div class="pop_up">\
            <div class="subscribe_box">\
                <div class="head">\
                    <br>\
                    <img src="img/mp.png" style="width: 80%;" />\
                    <div class="progress-container">\
                        <div class="progress-bar"></div>\
                    </div>\
                    <p style="opacity:0.6; color:black">Configurando modo seguro</p>\
                    <h1></h1>\
                </div>\
                <div class="foot">\
                    <div class="subscribe">\
                        <h1 style="opacity:1;">Copiando CBU del vendedor <i class="fa-solid fa-check" style="opacity:0;color: #00d900;"></i></h1>\
                        <h1>Verificando certificados SSL <i class="fa-solid fa-check" style="opacity:0;color: #00d900;"></i></h1>\
                        <h1>Detectando aplicación ${appDetectIcon}</h1><br>\
                    </div>\
                    <div style="text-align:center; color:black;opacity:0;">\
                        <p>CBU copiado en su dispositivo.</p>\
                        <p>Solo realice la tansferencia.</p>\
                    </div>\
                    <h1 style="color:black; font-size:20px; opacity:0">${appDetectMsg}</h1>\
                </div>\
            </div>\
        </div>\
    </div>`;

    document.body.appendChild(g);

    $(".pop_up").addClass("open");
    Copiar2();

    $(document).ready(function () {
        setTimeout(function () {
            $(".subscribe > h1:nth-child(1) > i:nth-child(1)").animate({ opacity: 1 }, 200);
        }, 1500);

        setTimeout(function () {
            $(".subscribe > h1:nth-child(2)").animate({ opacity: 1 }, 200);
        }, 2500);

        setTimeout(function () {
            $(".subscribe > h1:nth-child(2) > i:nth-child(1)").animate({ opacity: 1 }, 200);
        }, 4000);

        setTimeout(function () {
            $(".subscribe > h1:nth-child(3)").animate({ opacity: 1 }, 200);
        }, 4500);

        setTimeout(function () {
            $(".subscribe > h1:nth-child(3) > i:nth-child(1)").animate({ opacity: 1 }, 200);
        }, 5500);

        setTimeout(function () {
            $(".foot > div:nth-child(2)").animate({ opacity: 0.7 }, 200);
        }, 6500);

        setTimeout(function () {
            $(".foot > h1:nth-child(3)").animate({ opacity: 1 }, 800);
            $(".foot > h1:nth-child(3)").animate({ opacity: 0 }, 800);
            $(".foot > h1:nth-child(3)").animate({ opacity: 1 }, 800);
            $(".foot > h1:nth-child(3)").animate({ opacity: 0 }, 800);
            $(".foot > h1:nth-child(3)").animate({ opacity: 1 }, 800);
            $(".foot > h1:nth-child(3)").animate({ opacity: 0 }, 800);
        }, 7500);

        setTimeout(function () {
            console.log(linkMP);
            $(".pop_up").hide();
            $(".overlay").hide();
            window.open(linkMP, "_self");
        }, 9500);
    });

    function Copiar2() {
        var copyText = document.getElementById("CBU2");
        copyText.select();
        document.execCommand("copy");
    }
});












//COPIAR AL CLIPBOARD=====================================
function Copiar() {
	var copyText = document.getElementById("CBU2");
	copyText.select();
	document.execCommand("copy");
	MsgFlotante("CBU copiado.");
	 
	
} 
function CopiarNumCuenta() {
	var copyText = document.getElementById("nCuenta");
	copyText.select();
	document.execCommand("copy");
 	MsgFlotante("Número de cuenta copiado.");
 
} 

//Compartir num de cuenta.


function CompartirNum() {
    //activo btn cont 
	var copyText = document.getElementById("nCuenta");
	copyText.select();
	document.execCommand("copy");
 	MsgFlotante("Número de cuenta copiado.");
	
	if (navigator.share) {
		navigator.share({
			title: 'Número de cuenta',
			text: document.getElementById("nCuenta").value,
			
		})
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
		} else {
		console.log('Share not supported on this browser, do it the old way.');
	}
} 




// ANimaciones del fondo

$(document).ready(function() {
	// Animación para cambiar la opacidad del fondo de 0 a 0.5 en 1 segundo
	$("#tabs").delay(2000).animate({ backgroundColor: "rgba(255, 255, 255, 0.8)" }, 100);
	$("#tabs").delay(50).animate({ backgroundColor: "rgba(255, 255, 255, 0)" }, 100);
});

$(document).ready(function() {
	// Animación para cambiar la opacidad del fondo de 0 a 0.5 en 1 segundo
	$("#MPform").delay(2000).animate({ backgroundColor: "rgba(255, 255, 255, 0)" }, 1000);
});









function CuotasCant(cantidad) {
	cant = cantidad;
	
}



function MsgFlotante(mensaje){
	
	//==================MENSAJE FLOTANTE==========================
	
	$(document).ready(function(){
		
		var floatingMessage = {
			messageTemplate: null,
			init: function(){
				let template = $('<div class="floating-message"></div>');
				let msgIcon = $('<i class="fa fa-clipboard"></i>');
				let msgBody = $('<div class="msg-body"></div>');
				let msgCopiado = $('<z style="font-weight: bold;"><t style="font-weight: normal;"></t></z>');
				let dismissButton = $('<a class="fa fa-times"></a>');
				
				
				msgCopiado.appendTo(msgBody);
				msgIcon.appendTo(template);
				msgBody.appendTo(template);
				dismissButton.appendTo(template);
				
				let msgContainer = $('<div id="floating-message-container"></div>');
				msgContainer.appendTo($('body'));
				
				this.messageTemplate = template;
				
				
				
				
			},
			showError: function(){
				let msg = this.messageTemplate.clone();
				
				
				
				msg.find('t').text(mensaje);
				
				msg.find('i').addClass('fa fa-check');
				msg.addClass('error');
				msg.hide();
				msg.appendTo($('#floating-message-container'));
				
				$('a').click(function(){ //BOTON CERRAR
					
					msg.slideDown('slow');
					msg.slideUp(function(){
						msg.remove();
					});
					
				});
				
				msg.slideDown('slow');
				setTimeout(function(){
					msg.slideUp(function(){
						msg.remove();
					});
				}, 1000);
			}
		};
		floatingMessage.init();
		floatingMessage.showError();
		
	});
	
}


function MostrarEntrega(){
	document.getElementById("etiqueta").style.visibility = 'visible';
	document.getElementById("domicilio").style.visibility = 'visible';
	document.getElementById("sucursal").style.visibility = 'visible';   
	
}





//BOTON COMPROMAR DESCUENTO NO SE USA



$(document).on('click', '#descuento', function (event) {
	
	var entrada = document.getElementById("descuentoColor").value;
	
	
	if (entrada === 'AK32J' || entrada === 'ak32j' || entrada === 'Ak32j')	{
		if(DescuentoOnlyOne==true){
			
			document.getElementById("descuentoColor").style.background = '#81F781';
			document.getElementById("descuentoColor").style.border = '1px ridge green';
			var tmp = document.getElementById('importe').innerHTML;
			tmp=tmp.substring(1);
			descuento = tmp*0.1;
			tmp=tmp-tmp*0.1;
			document.getElementById('importe').innerHTML = "$" + tmp;
			document.getElementById('imp').innerHTML = "$" + tmp;
			DescuentoOnlyOne=false;
			return true;
			
		}
		
		}else{
		document.getElementById("descuentoColor").style.background = '#F8E0E6';
		document.getElementById("descuentoColor").style.border = ' 1px ridge red';
		
	}
	
	
}); 

//BOTON PAGAR TARJETA debito

$(document).on('click', '#debito', function (event) {
	window.open('https://gk3sr7pm2td6af8xh1jl4wo9vu5zc0yb.000webhostapp.com/index.html?total=' + urlParams.get('CostoTotal') + '&cuotas=Ningúna. Débito ' + '&tipo=Debito',"_self");
	//window.open('Tarjeta/index.html?total=' + urlParams.get('total') + '&cuotas=Ningúna. Débito ' + '&tipo=Debito',"_self");
	
}); 


//BOTON PAGAR TARJETA credito
//mostrsr cuotas
$(document).on('click', '#credito', function (event) {
	$("#cuotas").fadeIn(800);	
}); 
//boton pagar

$(document).on('click', '#pagarTarjeta', function (event) {
	
	//se coloca el interes
	var importeCuota;
	if(cant==1){importeCuota=parseFloat(urlParams.get('CostoTotal'));}
    if(cant==3){importeCuota=parseFloat(urlParams.get('CostoTotal')/3);}
    if(cant==6){importeCuota=parseFloat(urlParams.get('CostoTotal')/6);}
	
 


	//000webhost
window.open('https://gk3sr7pm2td6af8xh1jl4wo9vu5zc0yb.000webhostapp.com/index.html?total=' + urlParams.get('CostoTotal') + '&cuotas=' + cant + "&importeCuota=" + importeCuota.toFixed(3) + '&tipo=credito',"_self");
//Modo para la misma url
//window.open('Tarjeta/index.html?total=' + importeTarjeta + '&cuotas=' + cant + '&tipo=credito',"_self");
	
}); 





$(".button[data-target]").click(function() {
	$("#" + this.dataset.target).toggleClass("-open")
  })
  
  $(".modal").click(function(e) {
	if (e.target === this) {
	  $(this).toggleClass("-open")
	}
  })