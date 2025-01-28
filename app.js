// Array para almacenar los nombres de los amigos
let listaAmigos = [];

// Función para formatear el nombre (primera letra en mayúscula, el resto en minúscula)
function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim(); // Eliminar espacios en blanco al inicio y final

    // Validar que el campo no esté vacío y que contenga solo letras
    if (!nombre.trim()) {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    const soloLetras = /^[A-Za-z]+$/;
    if (!soloLetras.test(nombre)) {
        alert('Por favor, ingresa solo letras en el nombre.');
        return;
    }

    // Formatear el nombre
    const nombreFormateado = formatearNombre(nombre);

    // Agregar el nombre al array y limpiar el campo de texto
    listaAmigos.push(nombreFormateado);
    input.value = '';

    // Actualizar la lista visible en pantalla
    actualizarLista();
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
