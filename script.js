const pais = 'Argentina'; // Cambia por el país que desees
const apiKey = 'f8499b630a9d46dbd6416a0d32844d9c'; // Clave de la API
const urlPais = `https://restcountries.com/v3.1/name/${pais}`;
const urlBanderas = `https://flagsapi.com/${pais}/shiny/64.png`; // Cambia según tu uso

// Función para obtener datos del país
fetch(urlPais)
    .then(response => response.json())
    .then(data => {
        const info = data[0];
        document.getElementById('nombre-pais').innerText = info.name.common;
        document.getElementById('bandera').src = info.flags.svg;
        document.getElementById('moneda').innerText = `Moneda: ${info.currencies[Object.keys(info.currencies)[0]].name}`;
        document.getElementById('habitantes').innerText = `Habitantes: ${info.population}`;

        // Inicializar mapa
        initMap(info.latlng[0], info.latlng[1]);
    });

// Función para inicializar el mapa
function initMap(lat, lng) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 5,
    });
    new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
    });
}

// Ejemplo de atracciones
const atracciones = [
    { nombre: 'Atracción 1', lat: -34.61, lng: -58.38 },
    { nombre: 'Atracción 2', lat: -34.70, lng: -58.50 },
];

// Mostrar atracciones en la lista
atracciones.forEach(attraction => {
    const li = document.createElement('li');
    li.innerText = attraction.nombre;
    li.onclick = () => {
        map.setCenter({ lat: attraction.lat, lng: attraction.lng });
        new google.maps.Marker({
            position: { lat: attraction.lat, lng: attraction.lng },
            map: map,
        });
    };
    document.getElementById('atracciones').appendChild(li);
});

document.getElementById('btn-ver').onclick = function() {
    const pais = document.getElementById('pais-select').value;
    if (pais) {
        window.location.href = `pais.html?nombre=${encodeURIComponent(pais)}`;
    } else {
        alert('Por favor, selecciona un país.');
    }
};
