const pais = 'Argentina'; // Cambia por el país que desees
const apiKey = 'f8499b630a9d46dbd6416a0d32844d9c'; // Clave de la API
const urlPais = `https://restcountries.com/v3.1/name/${pais}`;
const urlBanderas = `https://flagsapi.com/${pais}/shiny/64.png`; // Cambia según tu uso
const urlmaps = 'https://maps.app.goo.gl/rbvXUhPA8aXwqjue7';

// Declarar variables map y marker fuera de cualquier función para evitar errores de inicialización
let map;
let marker;

// Detectar si hay parámetros de latitud y longitud en la URL
const urlParams = new URLSearchParams(window.location.search);
const lat = parseFloat(urlParams.get('lat'));
const lng = parseFloat(urlParams.get('lng'));
const nombrePais = urlParams.get('nombre');

// Si hay coordenadas en la URL, mostrar solo el mapa
if (!isNaN(lat) && !isNaN(lng)) {
    document.body.innerHTML = `<div id="map" style="height: 100vh; width: 100%;"></div>`;
    document.title = `Mapa de ${nombrePais}`;
    initMap(lat, lng, nombrePais);  // Aseguramos pasar el nombre del país
} else {
    // Código para mostrar la información del país y preparar el enlace
    const apiKey = 'f8499b630a9d46dbd6416a0d32844d9c';
    const pais = urlParams.get('nombre');
    const urlPais = `https://restcountries.com/v3.1/name/${pais}`;

    fetch(urlPais)
        .then(response => response.json())
        .then(data => {
            const info = data[0];
            document.getElementById('nombre-pais').innerText = info.name.common;
            document.getElementById('bandera').src = info.flags.svg;
            document.body.style.backgroundImage = `url(${info.flags.svg})`;

            document.getElementById('pais').innerText = info.name.common;
            document.getElementById('continente').innerText = info.region;
            document.getElementById('capital').innerText = info.capital;
            document.getElementById('moneda').innerText = info.currencies[Object.keys(info.currencies)[0]].name;
            document.getElementById('habitantes').innerText = info.population;
            /* document.getElementById('latitud').innerText = info.latlng[0];
            document.getElementById('longitud').innerText = info.latlng[1]; */
            document.getElementById('coordenadas').innerText = `Lat:${info.latlng[0]} Long:${info.latlng[1]}`;

            // Configurar el clic en el nombre del país
            document.getElementById('nombre-pais').onclick = function() {
                const lat = parseFloat(document.getElementById('latitud').innerText);
                const lng = parseFloat(document.getElementById('longitud').innerText);
                const nombrePais = document.getElementById('nombre-pais').innerText;
                window.open(`?lat=${lat}&lng=${lng}&nombre=${encodeURIComponent(nombrePais)}`, '_blank');
            };
        })
        .catch(error => console.error('Error al obtener los datos del país:', error));
}

function initMap(lat, lng, nombrePais) {
    map = L.map('map').setView([lat, lng], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${nombrePais}</b>`)
        .openPopup();
}

// Función para obtener datos del país
/* fetch(urlPais)
    .then(response => response.json())
    .then(data => {
        const info = data[0];
        document.getElementById('nombre-pais').innerText = info.name.common;
        document.getElementById('bandera').src = info.flags.svg;
        document.getElementById('moneda').innerText = `Moneda: ${info.currencies[Object.keys(info.currencies)[0]].name}`;
        document.getElementById('habitantes').innerText = `Habitantes: ${info.population}`;
        document.getElementById('latitud').innerText = `Latitud: ${info.latlng[0]}`;
        document.getElementById('longitud').innerText = `Longitud: ${info.latlng[1]}`;

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
}; */


