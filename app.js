document.addEventListener('DOMContentLoaded', function() {
    const textoUsuario = document.getElementById('textoUsuario');
    const botonEncriptar = document.querySelector('.boton__Encriptar');
    const botonDesencriptar = document.querySelector('.boton__Desencriptar');
    const botonCopiar = document.querySelector('.boton__Copiar');
    const textoEncriptado = document.getElementById('textoEncriptado');
    const imagen = document.querySelector('.presentacion__Encriptado img');
    const ningunMensajeEncontrado = document.querySelectorAll('.texto__Ningun__Msj');

    // Función para obtener el ancho de la ventana
    const getViewportWidth = () => window.innerWidth;

    const llavesEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const encriptarTexto = (texto) => {
        return texto.split('').map(letra => llavesEncriptacion[letra] || letra).join('');
    };

    const desencriptarTexto = (texto) => {
        let desencriptado = texto;
        for (let [key, value] of Object.entries(llavesEncriptacion)) {
            desencriptado = desencriptado.split(value).join(key);
        }
        return desencriptado;
    };

    const mostrarTextoEncriptado = (texto) => {
        textoEncriptado.textContent = texto;
        textoEncriptado.style.display = 'block';
        imagen.style.display = 'none';
        ningunMensajeEncontrado.forEach(element => element.style.display = 'none');
        botonCopiar.style.display = 'block';
    };

    const mostrarVistaPrincipal = () => {
        if (getViewportWidth() <= 1250) {
            // Para resoluciones menores o iguales a 1250px
            textoEncriptado.style.display = 'none';
           
            ningunMensajeEncontrado.forEach(element => element.style.display = 'block');
            botonCopiar.style.display = 'none';
        } else {
            // Para resoluciones mayores a 1250px
            textoEncriptado.style.display = 'none';
            imagen.style.display = 'block';
            ningunMensajeEncontrado.forEach(element => element.style.display = 'block');
            botonCopiar.style.display = 'none';
        }
    };

    botonEncriptar.addEventListener('click', () => {
        const texto = textoUsuario.value;
        const textoProcesado = encriptarTexto(texto);

        if (textoProcesado) {
            mostrarTextoEncriptado(textoProcesado);
        } else {
            mostrarVistaPrincipal();
        }
    });

    botonDesencriptar.addEventListener('click', () => {
        const texto = textoUsuario.value;
        const textoProcesado = desencriptarTexto(texto);

        if (textoProcesado) {
            mostrarTextoEncriptado(textoProcesado);
        } else {
            mostrarVistaPrincipal();
        }
    });

    botonCopiar.addEventListener('click', () => {
        const texto = textoEncriptado.textContent;
        navigator.clipboard.writeText(texto).then(() => {
            const notificacion = document.getElementById('notificacion');
            notificacion.textContent = 'Texto copiado al portapapeles';
            notificacion.classList.add('mostrar');
            
            setTimeout(() => {
                notificacion.classList.remove('mostrar');
            }, 3000); // Oculta la notificación después de 3 segundos
        });
    });
    

    // Inicialmente muestra la vista principal según la resolución
    mostrarVistaPrincipal();
});
