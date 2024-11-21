document.addEventListener('DOMContentLoaded', function() {
    // Manejador para el botón "Volver"
    document.getElementById('boton-volver').addEventListener('click', function() {
        location.href = 'index_01.html'; // Redirige a la página principal
    });
    document.getElementById('turista-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const pasaporte = document.getElementById('pasaporte').value;
        const dni = document.getElementById('dni').value;
        const destino = document.getElementById('destino').value;
        const apiKey = '9fbb8e5b3c7f4442a3d75781e5f900cd';

        const turistaData = {
            nombre: nombre,
            apellido: apellido,
            pasaporte: pasaporte,
            dni: dni,
            destino: destino
        };

        // Enviar los datos al servidor
        fetch('https://673e728a0118dbfe860b5075.mockapi.io/agregar/travellers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turistaData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response-message').textContent = '¡Formulario enviado correctamente!';
            document.getElementById('response-message').classList.add('success');
            document.getElementById('response-message').classList.remove('error');

            // Limpiar formulario
            document.getElementById('turista-form').reset();

            // Redirigir a form.html
            location.href = 'form.html';
        })
        .catch(error => {
            document.getElementById('response-message').textContent = 'Error al enviar el formulario. Intente nuevamente.';
            document.getElementById('response-message').classList.add('error');
            document.getElementById('response-message').classList.remove('success');
        });
        document.getElementById('boton-volver').addEventListener('click', function() {
            location.href = 'index_01.html'; 
        });
    });
});
