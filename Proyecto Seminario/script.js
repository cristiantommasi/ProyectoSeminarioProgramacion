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
const nombreAtraccion = urlParams.get('nombre');

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

          // Configurar el clic en el boton de ir al mapa
            document.getElementById('ir-al-mapa').onclick = function() {
                const coordenadasTexto = document.getElementById('coordenadas').innerText;
               
                // Usa la expresión regular para extraer latitud y longitud
                const coords = coordenadasTexto.match(/Lat:([-\d.]+)\s+Long:([-\d.]+)/);

                if (coords) {
                    const lat = parseFloat(coords[1]);
                    const lng = parseFloat(coords[2]);
                    const nombrePais = document.getElementById('nombre-pais').innerText;
                    window.open(`?lat=${lat}&lng=${lng}&nombre=${encodeURIComponent(nombrePais)}`, '_blank');
                } else {
                    console.error('No se pudieron obtener las coordenadas');
                }
            };
        })
            .catch(error => console.error('Error al obtener los datos del país:', error));
            }

           // Iniciar el mapa
    function initMap(lat, lng, nombrePais) {
        map = L.map('map').setView([lat, lng], 5); // Inicializa el mapa en el centro del país con un zoom adecuado

        // Agregar la capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 4,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${nombrePais}</b>`)
            .openPopup();

        // Obtener los límites del país (usa las coordenadas de latitud y longitud del país)
        const bounds = [
            [lat - 5, lng - 5], // Coordenada de la esquina noroeste (ajustar según el país)
            [lat + 5, lng + 5]  // Coordenada de la esquina sureste (ajustar según el país)
        ];

        // Ajustar el mapa para que se vea todo el país
        map.fitBounds(bounds);

        // Si se tienen coordenadas más precisas, puedes hacer el ajuste aún más exacto.
        setTimeout(() => {
            map.invalidateSize(); // Redimensiona el mapa para que se ajuste al nuevo tamaño del contenedor
        }, 100);  // Un pequeño retraso para asegurar que el contenedor haya sido procesado
    }

    const paises = {
        "Colombia": [
            { nombre: "San Andrés", lat: 12.5833, lng: -81.7, foto: "Imagenes/foto_San_Andres.jpg" },
            { nombre: "Cartagena de Indias", lat: 10.4236, lng:  -75.5252, foto: "Imagenes/foto_Cartagena.jpg" },
            { nombre: "Guatapé", lat: 6.2325, lng:  -75.1586, foto: "Imagenes/foto_Guatape.jpg" }
        ],
        "Argentina": [
            { nombre: "Cataratas del Iguazú", lat: -25.6953, lng: -54.4367, foto: "Imagenes/foto_Iguazu.jpg" },
            { nombre: "Glaciar Perito Moreno", lat: -50.4950, lng: -73.1393, foto: "Imagenes/foto_Glaciar.jpg" },
            { nombre: "Quebrada de Humahuaca", lat: -23.1998, lng: -65.3488, foto: "Imagenes/foto_Quebrada.jpg" }
        ],
        "Australia": [
            { nombre: "Barrera de Coral", lat: -18.5677, lng: 148.5552, foto: "Imagenes/foto_Barrera_Coral.jpg" },
            { nombre: "Blue Mountains", lat: -33.615, lng:  150.4177, foto: "Imagenes/foto_Blue_Montain.jpg" },
            { nombre: "Sidney", lat: -33.8677, lng: 151.21, foto: "Imagenes/foto_Sidney.jpg" }
        ],
        "Mexico": [
            { nombre: "Chichen Itzá", lat: 20.6829, lng: -88.5686, foto: "Imagenes/foto_Chichen.jpg" },
            { nombre: "Teotihuacán", lat: 19.6925, lng: -98.8433, foto: "Imagenes/foto_Teotihuacan.jpg" },
            { nombre: "Cancún", lat: 21.1743, lng: -86.8310, foto: "Imagenes/foto_Cancun.jpg" }
    ],
    };

const atracciones = paises[nombrePais];

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
