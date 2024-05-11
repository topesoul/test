// Global variables for map, markers, and professionals data
let map;
let markers = [];
let professionalsData = [];
let suggestions = [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", function () {
    // Initialize map and fetch professionals data
    initMap();
    loadProfessionals();

    // Retrieve the currently logged-in user
    currentUser = getLoggedInUser();

    // Attach event listeners to search input and button
    document.getElementById('search-input').addEventListener('input', handleSearchInput);
    document.getElementById('search-button').addEventListener('click', executeSearch);
});

function initMap() {
    // Initialize Leaflet map
    map = L.map('map').setView([54.3781, -3.4360], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

function loadProfessionals() {
    // Fetch professionals data from JSON file
    fetch('professionals.json')
        .then(response => response.json())
        .then(data => {
            professionalsData = data.professionals;
            updateMapWithProfessionals(professionalsData);
            updateListWithProfessionals(professionalsData);
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

function handleSearchInput(event) {
    const query = event.target.value;
    updateSuggestions(query);
    filterProfessionals(query);
}

function executeSearch() {
    const query = document.getElementById('search-input').value;
    if (!query) alert('Please enter a search term.');
    filterProfessionals(query);
}

function updateMapWithProfessionals(professionals) {
    clearMarkers();
    professionals.forEach(prof => {
        const marker = L.marker([prof.location.coordinates.lat, prof.location.coordinates.lng])
            .bindPopup(`<strong>${prof.name}</strong> - ${prof.specialty}, ${prof.location.city}`);
        marker.addTo(map);
        markers.push({ data: prof, marker: marker });
    });
    adjustMapView();
}

function updateListWithProfessionals(professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = '';
    professionals.forEach(prof => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${prof.name}</strong> - ${prof.specialty}, ${prof.location.city}<br><em>${prof.description}</em><br>${getConsultationButton(prof.id)}`;
        list.appendChild(listItem);
    });
}

function updateSuggestions(query) {
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');
    suggestionsDropdown.innerHTML = '';

    if (query.trim() !== '') {
        const filteredSuggestions = professionalsData.filter(prof =>
            prof.name.toLowerCase().includes(query.toLowerCase()) ||
            prof.specialty.toLowerCase().includes(query.toLowerCase()) ||
            prof.location.city.toLowerCase().includes(query.toLowerCase()));

        filteredSuggestions.forEach(prof => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = `${prof.name} - ${prof.specialty}, ${prof.location.city}`;
            suggestionItem.className = 'suggestion-item';
            suggestionItem.onclick = () => {
                document.getElementById('search-input').value = prof.name;
                suggestionsDropdown.style.display = 'none';
                filterProfessionals(prof.name);
            };
            suggestionsDropdown.appendChild(suggestionItem);
        });
        suggestionsDropdown.style.display = 'block';
    } else {
        suggestionsDropdown.style.display = 'none';
    }
}

function filterProfessionals(query) {
    const filteredProfessionals = professionalsData.filter(prof =>
        prof.name.toLowerCase().includes(query.toLowerCase()) ||
        prof.specialty.toLowerCase().includes(query.toLowerCase()) ||
        prof.location.city.toLowerCase().includes(query.toLowerCase()));
    updateMapWithProfessionals(filteredProfessionals);
    updateListWithProfessionals(filteredProfessionals);
}

function clearMarkers() {
    markers.forEach(({ marker }) => map.removeLayer(marker));
    markers = [];
}

function adjustMapView() {
    if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map(({ marker }) => marker.getLatLng()));
        map.fitBounds(bounds);
    } else {
        map.setView([54.3781, -3.4360], 6);
    }
}

function getLoggedInUser() {
    const email = localStorage.getItem('loggedInUser');
    return email ? JSON.parse(localStorage.getItem(email)) : null;
}

function getConsultationButton(professionalId) {
    if (currentUser) {
        return `<a href="consultation.html?professional=${professionalId}" class="button-like">Request Consultation</a>`;
    }
    return `<a href="login.html?redirect=consultation.html?professional=${professionalId}" class="button-like">Login to Request Consultation</a>`;
}
