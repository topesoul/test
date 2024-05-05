// Global variables for map and markers
let map;
let markers = [];
let suggestions = [];

// This event listener waits for the HTML document to be completely loaded and parsed
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    initMap();
    
    // Load professionals data
    loadProfessionals();
    
    // Add event listener for search button click
    document.getElementById('search-button').addEventListener('click', filterProfessionals);
    
    // Add event listener for search input to show suggestions
    document.getElementById('search-input').addEventListener('input', function(event) {
        showSuggestions(event.target.value);
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
    // Fetch the professionals data
    fetch('professionals.json')
        .then(response => response.json())
        .then(data => {
            // Update the map and list with professionals data
            updateMapWithProfessionals(data.professionals);
            updateListWithProfessionals(data.professionals);
            
            // Update the suggestions with professionals data
            updateSuggestions(data.professionals);
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

// Function to update the map with professionals data
function updateMapWithProfessionals(professionals) {
    professionals.forEach(prof => {
        // Create a marker for each professional
        let marker = L.marker([prof.location.coordinates.lat, prof.location.coordinates.lng])
            .bindPopup(`${prof.name}, ${prof.specialty}`);
        
        // Add the marker to the map
        marker.addTo(map);
        
        // Add the marker to the markers array
        markers.push({data: prof, marker: marker});
    });
}

// Function to update the list with professionals data
function updateListWithProfessionals(professionals) {
    const list = document.getElementById('professionals-list');
    list.innerHTML = '';
    professionals.forEach(prof => {
        // Create a list item for each professional
        const listItem = document.createElement('li');
        listItem.textContent = `${prof.name} - ${prof.specialty}, ${prof.location.city}`;
        
        // Add the list item to the list
        list.appendChild(listItem);
        
        // Add event listener to list item
        listItem.addEventListener('click', function() {
            map.flyTo([prof.location.coordinates.lat, prof.location.coordinates.lng], 13);
        });
    });
}

// Function to update the suggestions with professionals data
function updateSuggestions(professionals) {
    suggestions = professionals.map(prof => prof.name);
}

// Function to show suggestions based on user input
function showSuggestions(value) {
    const searchTerm = value.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchTerm));
    
    // TODO: Update your UI with the filtered suggestions
}

// Function to filter professionals based on search input
function filterProfessionals() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProfessionals = markers.filter(({data}) => 
        data.name.toLowerCase().includes(searchTerm) ||
        data.specialty.toLowerCase().includes(searchTerm) ||
        data.location.city.toLowerCase().includes(searchTerm));

    // Clear existing markers
    markers.forEach(({marker}) => map.removeLayer(marker));

    if (filteredProfessionals.length > 0) {
        // Add filtered professionals to the map and list
        filteredProfessionals.forEach(({marker, data}) => {
            marker.addTo(map);
        });
        updateListWithProfessionals(filteredProfessionals.map(({data}) => data)); // Update the list

        // Get the bounding box of the filtered professionals
        const bounds = L.latLngBounds(filteredProfessionals.map(({data}) => [data.location.coordinates.lat, data.location.coordinates.lng]));

        // Zoom the map to the bounding box
        map.flyToBounds(bounds);
    } else {
        // Display a message if no matches were found
        alert('No matches were found.');
    }
}
