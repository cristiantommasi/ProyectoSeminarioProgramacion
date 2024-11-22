const apiKey = 'f8499b630a9d46dbd6416a0d32844d9c'; // Clave de la API
const urlParams = new URLSearchParams(window.location.search);
const lat = parseFloat(urlParams.get('lat'));
const lng = parseFloat(urlParams.get('lng'));
const nombrePais = urlParams.get('nombre');
const paisUrl = `https://restcountries.com/v3.1/name/${nombrePais}`;
const urlBanderas = `https://flagsapi.com/${nombrePais}/shiny/64.png`; // URL de bandera

let map; // Variable del mapa
let marker; // Variable del marcador

// Función para inicializar el mapa
function initMap(lat, lng, nombrePais) {
    map = L.map('map').setView([lat, lng], 5); // Inicializa el mapa en el centro con zoom adecuado

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 4,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${nombrePais}</b>`)
        .openPopup();

    const bounds = [
        [lat - 5, lng - 5], 
        [lat + 5, lng + 5]
    ];

    map.fitBounds(bounds);

    setTimeout(() => map.invalidateSize(), 100);  // Ajustar tamaño del mapa después de cargar
}

// Función para mostrar la información del país
function mostrarInformacionPais(data) {
    const info = data[0];
    document.getElementById('nombre-pais').innerText = info.name.common;
    document.getElementById('bandera').src = info.flags.svg;
    document.body.style.backgroundImage = `url(${info.flags.svg})`;

    document.getElementById('pais').innerText = info.name.common;
    document.getElementById('continente').innerText = info.region;
    document.getElementById('capital').innerText = info.capital;
    document.getElementById('moneda').innerText = info.currencies[Object.keys(info.currencies)[0]].name;
    document.getElementById('habitantes').innerText = info.population;
    document.getElementById('coordenadas').innerText = `Lat:${info.latlng[0]} Long:${info.latlng[1]}`;

    // Configurar el clic en el botón para abrir el mapa
    document.getElementById('ir-al-mapa').onclick = function() {
        const coords = document.getElementById('coordenadas').innerText.match(/Lat:([-\d.]+)\s+Long:([-\d.]+)/);
        if (coords) {
            const lat = parseFloat(coords[1]);
            const lng = parseFloat(coords[2]);
            window.open(`?lat=${lat}&lng=${lng}&nombre=${encodeURIComponent(info.name.common)}`, '_blank');
        } else {
            console.error('No se pudieron obtener las coordenadas');
        }
    };
}

// Si hay coordenadas en la URL, mostrar solo el mapa
if (!isNaN(lat) && !isNaN(lng)) {
    document.body.innerHTML = `<div id="map" style="height: 100vh; width: 100%;"></div>`;
    document.title = `Mapa de ${nombrePais}`;
    initMap(lat, lng, nombrePais);
} else {
    fetch(paisUrl)
        .then(response => response.json())
        .then(mostrarInformacionPais)
        .catch(error => console.error('Error al obtener los datos del país:', error));
}

// Función para cargar las atracciones de un país
function cargarAtracciones() {
    const paises = {
        "Colombia": [
            { nombre: "San Andrés", lat: 12.5833, lng: -81.7, foto: "Imagenes/foto_San_Andres.jpg" },
            { nombre: "Cartagena de Indias", lat: 10.4236, lng: -75.5252, foto: "Imagenes/foto_Cartagena.jpg" },
            { nombre: "Guatapé", lat: 6.2325, lng: -75.1586, foto: "Imagenes/foto_Guatape.jpg" }
        ],
        "Argentina": [
            { nombre: "Cataratas del Iguazú", lat: -25.6953, lng: -54.4367, foto: "Imagenes/foto_Iguazu.jpg" },
            { nombre: "Glaciar Perito Moreno", lat: -50.4950, lng: -73.1393, foto: "Imagenes/foto_Glaciar.jpg" },
            { nombre: "Quebrada de Humahuaca", lat: -23.1998, lng: -65.3488, foto: "Imagenes/foto_Quebrada.jpg" }
        ],
        "Australia": [
            { nombre: "Barrera de Coral", lat: -18.5677, lng: 148.5552, foto: "Imagenes/foto_Barrera_Coral.jpg" },
            { nombre: "Blue Mountains", lat: -33.615, lng: 150.4177, foto: "Imagenes/foto_Blue_Montain.jpg" },
            { nombre: "Sidney", lat: -33.8677, lng: 151.21, foto: "Imagenes/foto_Sidney.jpg" }
        ],
        "Mexico": [
            { nombre: "Chichen Itzá", lat: 20.6829, lng: -88.5686, foto: "Imagenes/foto_Chichen.jpg" },
            { nombre: "Teotihuacán", lat: 19.6925, lng: -98.8433, foto: "Imagenes/foto_Teotihuacan.jpg" },
            { nombre: "Cancún", lat: 21.1743, lng: -86.8310, foto: "Imagenes/foto_Cancun.jpg" }
        ],
    };

    const atracciones = paises[nombrePais];
    if (atracciones && Array.isArray(atracciones)) {
        atracciones.forEach((atraccion, index) => {
            if (index < 3) {
                const elemento = document.getElementById(`name${index + 1}`);
                if (elemento) {
                    elemento.innerHTML = `
                        <h4>${atraccion.nombre}</h4>
                        <img src="${atraccion.foto}" alt="${atraccion.nombre}">
                        <a href="pais_01.html?lat=${atraccion.lat}&lng=${atraccion.lng}&nombre=${encodeURIComponent(atraccion.nombre)}" target="_blank">Visitar el mapa</a>
                    `;
                }
            }
        });
    }
}

// Cargar las atracciones si el nombre del país está presente
if (nombrePais) cargarAtracciones();
