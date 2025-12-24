const URL_GAS = "https://script.google.com/macros/s/AKfycbxhKssIgHghfM6oM4ASzr3Z2eszxBzbFMXJOyyAxB0j3HO0g0gXck1ucStvO1E8pUs/exec";

let ocupados = [];

// Horarios base de la barbería (puedes cambiarlos)
const configuracionHoras = ["14:00", "14:15", "14:30", "14:45", "15:00", "17:30", "17:45", "18:00"];

window.onload = async () => {
    const resp = await fetch(URL_GAS);
    ocupados = await resp.json();
    // Establecer fecha mínima como "hoy"
    document.getElementById('fechaDia').min = new Date().toISOString().split("T")[0];
};

// Cuando cambia la fecha, generamos los botones
document.getElementById('fechaDia').addEventListener('change', function() {
    const diaSeleccionado = this.value;
    const contenedor = document.getElementById('contenedorHoras');
    contenedor.innerHTML = ""; // Limpiar

    configuracionHoras.forEach(hora => {
        const fullFecha = `${diaSeleccionado}T${hora}:00.000Z`;
        const boton = document.createElement('button');
        boton.type = "button";
        boton.className = "hora-btn";
        boton.innerText = hora;

        // VERIFICAR DISPONIBILIDAD
        // Buscamos si el string de fecha+hora ya existe en el array de Google
        const estaOcupado = ocupados.some(f => f.includes(`${diaSeleccionado}T${hora}`));

        if (estaOcupado) {
            boton.disabled = true;
            boton.innerText = "Ocupado";
        } else {
            boton.onclick = () => seleccionarHora(boton, fullFecha);
        }
        contenedor.appendChild(boton);
    });
});

function seleccionarHora(elemento, fechaFull) {
    // Quitar clase a otros botones
    document.querySelectorAll('.hora-btn').forEach(b => b.classList.remove('seleccionado'));
    // Marcar este
    elemento.classList.add('seleccionado');
    // Guardar valor en el hidden input para el form
    document.getElementById('horaFinal').value = fechaFull;
}

document.getElementById('citaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fechaFinal = document.getElementById('horaFinal').value;
    
    if(!fechaFinal) return alert("Por favor selecciona una hora");

    const btn = document.getElementById('btnEnviar');
    btn.disabled = true;
    btn.innerText = "RESERVANDO...";

    const datos = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        servicio: document.getElementById('servicio').value,
        fechaCita: fechaFinal
    };

    fetch(URL_GAS, { method: 'POST', mode: 'no-cors', body: JSON.stringify(datos) })
    .then(() => {
        alert("¡Turno confirmado!");
        location.reload(); // Recargamos para actualizar ocupados
    });
});