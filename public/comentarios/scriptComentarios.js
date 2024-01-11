$(document).on('change', '#selectorOrden', function () {
    var order = $(this).val();
    var commentsContainer = $('#comentarios-container');
    var allComments = commentsContainer.children('.single-comment');

    allComments.sort(function (a, b) {
        const fechaA = obtenerIndiceFecha($(a).find('.timestamp').text());
        const fechaB = obtenerIndiceFecha($(b).find('.timestamp').text());

        if (order === 'antiguo') {
            return fechaB - fechaA;
        } else if (order === 'reciente') {
            return fechaA - fechaB;
        }
    });

    // Limpiar el contenedor de comentarios
    commentsContainer.html('');

    // Mostrar los comentarios ordenados en el contenedor
    allComments.each(function () {
        commentsContainer.append(this);
    });

    console.log('Orden seleccionado:', order);
});

function obtenerIndiceFecha(fechaTexto) {
    const fechas = ["13 h", "5 hs", "1 día", "1 día", "2 días", "2 días", "4 días", "6 días", "6 días", "1 semana", "1 semana",
        "1 semana", "2 semanas", "2 semanas", "3 semanas", "1 mes", "2 meses", "6 meses", "7 meses", "1 año", "1 año"];

    return fechas.indexOf(fechaTexto);
}


