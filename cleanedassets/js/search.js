// Initialisation of map and markers
let map;
let markers = [];

document.addEventListener("DOMContentLoaded", function() {
    initMap();
    loadProfessionals();
    document.getElementById('search-input').addEventListener('input', debounce(filterProfessionals, 300)); // Debounced search to improve performance
});

// Function to initialise the map
function initMap() {
    map = L.map('map').setView([54.3781, -3.4360], 6); // Centred over the UK
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Function to load professionals from a JSON source
function loadProfessionals() {
    fetch('professionals.json')
        .then(response => response.json())
        .then(data => {
            updateMapWithProfessionals(data.professionals);
            updateListWithProfessionals(data.professionals);
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

// Update map with professionals
function updateMapWithProfessionals(professionals) {
    professionals.forEach(prof => {
        let marker = L.marker([prof.location.coordinates.lat, prof.location.coordinates.lng])
            .bindPopup(`${prof.name}, ${prof.specialty}`);
        marker.addTo(map);
        markers.push({data: prof, marker: marker});
    });
}

// Update list with professionals
function updateListWithProfessionals(professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = '';
    professionals.forEach(prof => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prof.name} - ${prof.specialty}, ${prof.location.city}`;
        list.appendChild(listItem);
    });
}

// Debounce function to limit how often a function can fire
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Filter professionals based on search input
function filterProfessionals() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProfessionals = markers.filter(({data}) => 
        data.name.toLowerCase().includes(searchTerm) ||
        data.specialty.toLowerCase().includes(searchTerm) ||
        data.location.city.toLowerCase().includes(searchTerm));

    markers.forEach(({marker}) => map.removeLayer(marker)); // Clear existing markers

    filteredProfessionals.forEach(({marker, data}) => {
        marker.addTo(map);
        const listItem = document.createElement('li');
        listItem.textContent = `${data.name} - ${data.specialty}, ${data.location.city}`;
        document.getElementById('professionals-list').appendChild(listItem);
    });
}
