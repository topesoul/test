// Global variables for map, markers, and professionals data
let map;
let markers = [];
let professionalsData = [];
let suggestions = [];
let currentUser = null;

// Function to initialize the application
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    initMap();
    
    // Load professionals data
    loadProfessionals();
    
    // Retrieve the currently logged-in user from local storage
    currentUser = getLoggedInUser();

    // Add event listener for search button click
    document.getElementById('search-button').addEventListener('click', () => filterProfessionals());

    // Add event listener for search input to show suggestions and filter professionals in real-time
    document.getElementById('search-input').addEventListener('input', function(event) {
        const query = event.target.value;
        showSuggestions(query);
        filterProfessionals(query);
    });
});

// Function to initialize the map
function initMap() {
    // Set the view of the map
    map = L.map('map').setView([54.3781, -3.4360], 6); // Centred over the UK
    
    // Add tile layer to the map
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
            professionalsData = data.professionals;
            updateMapWithProfessionals(professionalsData);
            updateListWithProfessionals(professionalsData);
            updateSuggestions(professionalsData);
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

// Function to update the map with professionals data
function updateMapWithProfessionals(professionals) {
    clearMarkers(); // Clear existing markers
    professionals.forEach(prof => {
        const marker = L.marker([prof.location.coordinates.lat, prof.location.coordinates.lng])
            .bindPopup(`
                <strong>${prof.name}</strong> - ${prof.specialty}, ${prof.location.city}<br>
                <em>${prof.description}</em><br>
                ${getConsultationButton(prof.id)}
            `);
        marker.addTo(map);
        markers.push({data: prof, marker: marker});
    });

    // Adjust the map view based on filtered professionals
    if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map(({marker}) => marker.getLatLng()));
        map.fitBounds(bounds);
    } else {
        map.setView([54.3781, -3.4360], 6); // Default UK view
    }
}

// Function to update the list with professionals data
function updateListWithProfessionals(professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = '';
    if (professionals.length === 0) {
        list.innerHTML = '<li>No professionals match your search criteria. Please try another keyword.</li>';
        return;
    }
    professionals.forEach(prof => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${prof.name}</strong> - ${prof.specialty}, ${prof.location.city}<br>
            <em>${prof.description}</em><br>
            <a href="mailto:${prof.contact}">${prof.contact}</a><br>
            ${getConsultationButton(prof.id)}
        `;
        list.appendChild(listItem);

        listItem.addEventListener('click', function() {
            map.flyTo([prof.location.coordinates.lat, prof.location.coordinates.lng], 13);
        });
    });
}

// Function to update the suggestions with professionals data
function updateSuggestions(professionals) {
    suggestions = professionals.map(prof => `${prof.name}, ${prof.specialty}, ${prof.location.city}`);
}

// Function to show suggestions based on user input (optional)
function showSuggestions(query) {
    const searchTerm = query.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchTerm));

    // TODO: Create an autocomplete dropdown UI for the filtered suggestions
}

// Function to clear markers
function clearMarkers() {
    markers.forEach(({marker}) => map.removeLayer(marker));
    markers = [];
}

// Function to filter professionals based on search input
function filterProfessionals(query) {
    const searchTerm = query || document.getElementById('search-input').value.toLowerCase();
    const filteredProfessionals = professionalsData.filter(prof =>
        prof.name.toLowerCase().includes(searchTerm) ||
        prof.specialty.toLowerCase().includes(searchTerm) ||
        prof.location.city.toLowerCase().includes(searchTerm));

    updateMapWithProfessionals(filteredProfessionals);
    updateListWithProfessionals(filteredProfessionals);
}

// Function to get the currently logged-in user from local storage
function getLoggedInUser() {
    const email = localStorage.getItem('loggedInUser');
    if (email) {
        const user = localStorage.getItem(email);
        return user ? JSON.parse(user) : null;
    }
    return null;
}

// Function to get a consultation button based on the user's login status
function getConsultationButton(professionalId) {
    if (currentUser) {
        return `<a href="consultation.html?professional=${professionalId}" class="button-like">Request Consultation</a>`;
    }
    return `<a href="login.html?redirect=consultation.html?professional=${professionalId}" class
