// Array para almacenar los nombres de los amigos
let listaAmigos = [];

// Enfocar el input al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('amigo');
    input.focus(); // Enfocar el input al cargar la página
});

// Función para formatear el nombre (primera letra en mayúscula, el resto en minúscula)
function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

// Función para validar el nombre
function validarNombre(nombre) {
    const soloLetras = /^[A-Za-z]+$/;

    return !nombre.trim() 
        ? (mostrarAlertaPersonalizada('Por favor, ingresa un nombre válido.'), false) 
        : !soloLetras.test(nombre) 
            ? (mostrarAlertaPersonalizada('Por favor, ingresa solo letras en el nombre.'), false) 
            : true;
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim(); // Eliminar espacios en blanco al inicio y final

    // Validar el nombre
    if (!validarNombre(nombre)) {
        return; // Detener la ejecución si la validación falla
    }

    // Formatear el nombre
    const nombreFormateado = formatearNombre(nombre);

    // Validar que el nombre no esté duplicado (ya formateado)
    if (listaAmigos.includes(nombreFormateado)) {
        mostrarAlertaPersonalizada('Este nombre ya ha sido agregado. Ingresa un nombre diferente.');
        input.value = '';
        return;
    }

    // Agregar el nombre al array y limpiar el campo de texto
    listaAmigos.push(nombreFormateado);
    input.value = '';

    // Enfocar el input automáticamente después de agregar un amigo
    input.focus();

    // Actualizar la lista visible en pantalla
    actualizarLista();

    // Si hay más de un nombre, habilitar el botón de "Reiniciar"
    if (listaAmigos.length > 1) {
        aplicarEstilosBotonReiniciar(true);
    } else {
        aplicarEstilosBotonReiniciar(false);
    }
}

// Función para mostrar la lista de amigos en la página
function actualizarLista() {
    const ulListaAmigos = document.getElementById('listaAmigos');
    ulListaAmigos.innerHTML = ''; // Limpiar el contenido anterior

    // Crear elementos de lista para cada nombre
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        ulListaAmigos.appendChild(li);
    });
}

// Función para validar diferente de 0 amigos y menor a 2
function validarListaAmigos() {
    if (listaAmigos.length < 2) {
        mostrarAlertaPersonalizada(listaAmigos.length === 0 
            ? 'La lista de amigos está vacía. Agrega nombres antes de sortear.' 
            : 'Debe haber al menos dos amigos para realizar el sorteo.'
        );
    // Enfocar el input después de validar
    const input = document.getElementById('amigo');
    input.focus();
        return false; // Indica que la validación falló
    }
    return true; // Indica que la validación fue exitosa
}

// Función para realizar el sorteo del amigo secreto
function sortearAmigo() {
    // Validación
    if (!validarListaAmigos()) {
        return;
    }

    // Lógica del sorteo
    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSecreto = listaAmigos[indiceAleatorio];

    // Mostrar el resultado en la página
    const ulResultado = document.getElementById('resultado');
    ulResultado.innerHTML = `<li>El amigo secreto es: <strong>${amigoSecreto}</strong></li>`;

    // Lanzar el confeti
    lanzarConfeti();

    // Enfocar el input después de sortear
    const input = document.getElementById('amigo');
    input.focus();
}

// Función para lanzar el confeti
function lanzarConfeti() {
    confetti({
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 }, 
        colors: ['#ff4e00', '#ff7d3c', '#ffbb5a', '#ffea8a'], 
    });
}

// Función para reiniciar la lista y limpiar la pantalla
function reiniciarLista() {
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';

    // Deshabilitar el botón de reiniciar y aplicar los estilos deshabilitados
    aplicarEstilosBotonReiniciar(false);

    // Mensaje después de reiniciar
    mostrarAlertaPersonalizada('Sorteo reiniciado!');

    // Enfocar el input después de reiniciar
    const input = document.getElementById('amigo');
    input.focus();
}

// Función para aplicar o restaurar los estilos del botón de reiniciar
function aplicarEstilosBotonReiniciar(habilitado) {
    const botonReiniciar = document.querySelector('.button-restart');
    
    // Limpiar las clases existentes
    botonReiniciar.classList.remove('habilitado', 'deshabilitado');

    // Agregar la clase correspondiente dependiendo del estado
    if (habilitado) {
        botonReiniciar.classList.add('habilitado');
        botonReiniciar.disabled = false;
    } else {
        botonReiniciar.classList.add('deshabilitado');
        botonReiniciar.disabled = true;
    }
}

function mostrarAlertaPersonalizada(mensaje) {
    const customAlert = document.getElementById('customAlert');
    customAlert.textContent = mensaje;
    customAlert.style.display = 'block';

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 5000); // 5000 milisegundos = 5 segundos
}