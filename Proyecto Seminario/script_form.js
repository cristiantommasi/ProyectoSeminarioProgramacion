document.addEventListener('DOMContentLoaded', function() {
    // Variables de DOM
    const botonVolver = document.getElementById('boton-volver');
    const formulario = document.getElementById('turista-form');
    const responseMessage = document.getElementById('response-message');
    
    // Función para actualizar el mensaje de respuesta
    const updateResponseMessage = (message, isSuccess = true) => {
        responseMessage.textContent = message;
        responseMessage.classList.toggle('success', isSuccess);
        responseMessage.classList.toggle('error', !isSuccess);
    };

    // Manejador para el botón "Volver"
    botonVolver.addEventListener('click', () => {
        location.href = 'index_01.html'; // Redirige a la página principal
    });

    // Manejador para el envío del formulario
    formulario.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Recopilación de datos del formulario
        const turistaData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            pasaporte: document.getElementById('pasaporte').value,
            dni: document.getElementById('dni').value,
            destino: document.getElementById('destino').value
        };

        const apiKey = '9fbb8e5b3c7f4442a3d75781e5f900cd';  // Se puede usar si se necesita en futuras implementaciones

        try {
            // Enviar los datos al servidor
            const response = await fetch('https://673e728a0118dbfe860b5075.mockapi.io/agregar/travellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turistaData)
            });

            const data = await response.json();

            // Actualizar el mensaje de éxito
            updateResponseMessage('¡Formulario enviado correctamente!', true);

            // Limpiar el formulario
            formulario.reset();

            // Redirigir a form.html
            location.href = 'form.html';

        } catch (error) {
            // En caso de error, actualizar el mensaje de error
            updateResponseMessage('Error al enviar el formulario. Intente nuevamente.', false);
        }
    });
});
