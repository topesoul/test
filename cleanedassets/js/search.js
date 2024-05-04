document.addEventListener("DOMContentLoaded", function() {
    initMap();
    loadProfessionals();
});

let map; // Declare the map variable globally to access it throughout the script

function initMap() {
    // Set the initial view of the map and the zoom level
    map = L.map('map').setView([51.505, -0.09], 13); 

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function loadProfessionals() {
    fetch('professionals.json')
        .then(response => response.json())
        .then(data => {
            let professionals = data.professionals;
            updateMapWithProfessionals(professionals);
            updateListWithProfessionals(professionals);
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

function updateMapWithProfessionals(professionals) {
    professionals.forEach(prof => {
        // Add markers to the map
        L.marker([prof.location.coordinates.lat, prof.location.coordinates.lng])
            .addTo(map)
            .bindPopup(`${prof.name}, ${prof.specialty}`);
    });
}

function updateListWithProfessionals(professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = ''; // Clear the list before adding new entries
    professionals.forEach(prof => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prof.name} - ${prof.specialty}, ${prof.location.city}`;
        list.appendChild(listItem);
    });
}
