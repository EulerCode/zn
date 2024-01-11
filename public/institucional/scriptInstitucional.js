
 document.getElementById("enc").src = linkImgMail;
 document.getElementById("enc").addEventListener("click",()=>{ window.open("/", '_self');});


 var elementosMarca = document.getElementsByClassName("marca"); //getElementsByClassName devuelve una coleccionde elementos
for (var i = 0; i < elementosMarca.length; i++) {
    elementosMarca[i].innerHTML = marca;
}

var elementosCorreo = document.getElementsByClassName("correo"); //getElementsByClassName devuelve una coleccionde elementos
for (var i = 0; i < elementosCorreo.length; i++) {
  elementosCorreo[i].innerHTML = Email;
}
/*
var elementosPagina = document.getElementsByClassName("pagina"); //getElementsByClassName devuelve una coleccionde elementos
for (var i = 0; i < elementosPagina.length; i++) {
  elementosPagina[i].innerHTML = PaginaWeb;
} */
 
document.getElementById("cuit").textContent= cuil;


document.getElementById("wpBtn").addEventListener("click",()=>{ window.open(linkWhatsapp, '_self');});



function abrirClienteCorreo() { 
  var direccionEmail = Email; 
  var asunto = "Consulta"  ; 
  var cuerpo = "Hola,\n\nEscriba aquí el contenido del mensaje."; 
  var enlaceMailto = "mailto:" + encodeURIComponent(direccionEmail) +
                     "?subject=" + encodeURIComponent(asunto) +
                     "&body=" + encodeURIComponent(cuerpo); 
  window.location.href = enlaceMailto;
} 
document.getElementById("correoBtn").addEventListener("click", abrirClienteCorreo);


(function() {
  $(document).on('click', '.accordion .header', function(e) {
    var questionElement, questionIndex;
    questionElement = $(this).parent('.valve');
    questionIndex = $(questionElement).index();
    $(questionElement).toggleClass('open');
    if (!$(questionElement).hasClass('open')) {
      $(".inner-content").css("display", "none");
      $(questionElement).find('.icon').text('+');
      return $('.accordion .valve.closed').removeClass('closed');
    } else {
      $(".inner-content").css("display", "block");
      $(questionElement).find('.icon').text('-');
      $('.accordion .valve:lt(' + questionIndex + ')').addClass('closed').removeClass('open');
      return $('.accordion .valve.closed .icon').text('+');

    }
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBRixDQUFXLENBQUMsRUFBWixDQUFlLE9BQWYsRUFBd0Isb0JBQXhCLEVBQThDLFFBQUEsQ0FBQyxDQUFELENBQUE7QUFDOUMsUUFBQSxlQUFBLEVBQUE7SUFBRSxlQUFBLEdBQWtCLENBQUEsQ0FBRSxJQUFGLENBQUksQ0FBQyxNQUFMLENBQVksUUFBWjtJQUNsQixhQUFBLEdBQWdCLENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsS0FBbkIsQ0FBQTtJQUNoQixDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLFdBQW5CLENBQStCLE1BQS9CO0lBRUEsSUFBRyxDQUFDLENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsUUFBbkIsQ0FBNEIsTUFBNUIsQ0FBSjtNQUNFLENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsT0FBeEIsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxHQUF0QzthQUNBLENBQUEsQ0FBRSwwQkFBRixDQUE2QixDQUFDLFdBQTlCLENBQTBDLFFBQTFDLEVBRkY7S0FBQSxNQUFBO01BSUUsQ0FBQSxDQUFFLGVBQUYsQ0FBa0IsQ0FBQyxJQUFuQixDQUF3QixPQUF4QixDQUFnQyxDQUFDLElBQWpDLENBQXNDLEdBQXRDO01BQ0EsQ0FBQSxDQUFFLHVCQUFBLEdBQTBCLGFBQTFCLEdBQTBDLEdBQTVDLENBQWdELENBQUMsUUFBakQsQ0FBMEQsUUFBMUQsQ0FBbUUsQ0FBQyxXQUFwRSxDQUFnRixNQUFoRjthQUNBLENBQUEsQ0FBRSxnQ0FBRixDQUFtQyxDQUFDLElBQXBDLENBQXlDLEdBQXpDLEVBTkY7O0VBTDRDLENBQTlDO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFjY29yZGlvbiAuaGVhZGVyJywgKGUpIC0+XG4gIHF1ZXN0aW9uRWxlbWVudCA9ICQoQCkucGFyZW50KCcudmFsdmUnKVxuICBxdWVzdGlvbkluZGV4ID0gJChxdWVzdGlvbkVsZW1lbnQpLmluZGV4KClcbiAgJChxdWVzdGlvbkVsZW1lbnQpLnRvZ2dsZUNsYXNzKCdvcGVuJylcblxuICBpZiAhJChxdWVzdGlvbkVsZW1lbnQpLmhhc0NsYXNzKCdvcGVuJylcbiAgICAkKHF1ZXN0aW9uRWxlbWVudCkuZmluZCgnLmljb24nKS50ZXh0KCcrJylcbiAgICAkKCcuYWNjb3JkaW9uIC52YWx2ZS5jbG9zZWQnKS5yZW1vdmVDbGFzcygnY2xvc2VkJylcbiAgZWxzZVxuICAgICQocXVlc3Rpb25FbGVtZW50KS5maW5kKCcuaWNvbicpLnRleHQoJy0nKVxuICAgICQoJy5hY2NvcmRpb24gLnZhbHZlOmx0KCcgKyBxdWVzdGlvbkluZGV4ICsgJyknKS5hZGRDbGFzcygnY2xvc2VkJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxuICAgICQoJy5hY2NvcmRpb24gLnZhbHZlLmNsb3NlZCAuaWNvbicpLnRleHQoJysnKVxuKSJdfQ==
//# sourceURL=coffeescript