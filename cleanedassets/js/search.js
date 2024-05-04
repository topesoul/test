let map;
let professionals = [];

document.addEventListener("DOMContentLoaded", function() {
    initMap();
    loadProfessionals();
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 8,
    });
}

function loadProfessionals() {
    fetch('professionals.json')
        .then(response => response.json())
        .then(data => {
            professionals = data;
            updateMapWithProfessionals();
            updateListWithProfessionals();
        })
        .catch(error => console.error('Error loading the professionals data:', error));
}

function updateMapWithProfessionals() {
    professionals.forEach(prof => {
        const marker = new google.maps.Marker({
            position: { lat: prof.lat, lng: prof.lng },
            map: map,
            title: prof.name
        });
    });
}

function updateListWithProfessionals() {
    const list = document.getElementById('professionals-list');
    professionals.forEach(prof => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prof.name} - ${prof.location}`;
        list.appendChild(listItem);
    });
}