/*global document, L, fetch, console, alert, localStorage, JSON */

/*
 * Global variables to hold the map instance, marker objects, professionals data,
 * and the currently logged-in user.
 */
let map;
let markers = [];
let professionalsData = [];
let currentUser = null;

/*
 * Initialize the application once the DOM is fully loaded.
 * This sets up the map, loads professionals data, and sets event listeners
 * for the search input and button.
 */
document.addEventListener("DOMContentLoaded", function () {
    initMap();
    loadProfessionals();
    currentUser = getLoggedInUser();
    document.getElementById("search-input")
        .addEventListener("input", handleSearchInput);
    document.getElementById("search-button")
        .addEventListener("click", executeSearch);
});

/*
 * Initialize the Leaflet map with a default view.
 * Sets the map's initial center and zoom level, and adds the OpenStreetMap tile layer.
 */
function initMap() {
    map = L.map("map").setView([54.3781, -3.4360], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19
    }).addTo(map);
}

/*
 * Load professionals data from a JSON file and update the map and list.
 * Fetches data from 'professionals.json', updates the global professionalsData variable,
 * and calls functions to update the map and list.
 */
function loadProfessionals() {
    fetch("assets/json/professionals.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            professionalsData = data.professionals;
            updateMapWithProfessionals(professionalsData);
            updateListWithProfessionals(professionalsData);
        })
        .catch(function (error) {
            console.error("Error loading the professionals data:", error);
        });
}

/*
 * Handle input events in the search box.
 * Updates suggestions and filters professionals based on the current input value.
 */
function handleSearchInput(event) {
    const query = event.target.value;
    updateSuggestions(query);
}

/*
 * Execute search when the search button is clicked.
 * Checks if the search input is not empty, and then filters professionals based on the input value.
 */
function executeSearch() {
    const query = document.getElementById("search-input").value;
    console.log("Search button clicked with query:", query); // Debug log
    if (!query.trim()) {
        alert("Please enter a search term.");
        return;
    }
    filterProfessionals(query);
}

/*
 * Update the map with markers for professionals.
 * Clears existing markers and adds new ones for each professional in the given list,
 * then adjusts the map view to fit all markers.
 */
function updateMapWithProfessionals(professionals) {
    clearMarkers();
    professionals.forEach(function (prof) {
        const marker = L.marker([
            prof.location.coordinates.lat,
            prof.location.coordinates.lng
        ]).bindPopup(
            "<strong>" + prof.name + "</strong> - " +
            prof.specialty + ", " + prof.location.city
        );
        marker.addTo(map);
        markers.push({
            data: prof,
            marker
        });
    });
    adjustMapView();
}

/*
 * Update the list of professionals displayed on the page.
 * Clears the current list and creates a new list item for each professional in the given list.
 */
function updateListWithProfessionals(professionals) {
    const list = document.getElementById("professionals-list");
    list.innerHTML = "";
    professionals.forEach(function (prof) {
        const listItem = document.createElement("li");
        listItem.innerHTML = (
            "<strong>" + prof.name + "</strong> - " +
            prof.specialty + ", " + prof.location.city + "<br>" +
            "<em>" + prof.description + "</em><br>" +
            getConsultationButton(prof.id)
        );
        list.appendChild(listItem);
    });

    if (professionals.length === 0) {
        list.innerHTML = (
            "<li>No professionals found. Please try a different search term." + "</li>"
        );
    }
}

/*
 * Update suggestions dropdown based on the current search query.
 * Filters professionals based on the query and updates the suggestions dropdown with matching results.
 */
function updateSuggestions(query) {
    const suggestionsDropdown = document.getElementById("suggestions-dropdown");
    suggestionsDropdown.innerHTML = "";

    if (query.trim() !== "") {
        const filteredSuggestions = professionalsData.filter(function (prof) {
            return (
                prof.name.toLowerCase().includes(query.toLowerCase()) ||
                prof.specialty.toLowerCase().includes(query.toLowerCase()) ||
                prof.location.city.toLowerCase().includes(query.toLowerCase())
            );
        });

        filteredSuggestions.forEach(function (prof) {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = (
                prof.name + " - " + prof.specialty + ", " + prof.location.city
            );
            suggestionItem.className = "suggestion-item";
            suggestionItem.onclick = function () {
                document.getElementById("search-input").value = prof.name;
                suggestionsDropdown.style.display = "none";
                filterProfessionals(prof.name);
            };
            suggestionsDropdown.appendChild(suggestionItem);
        });

        suggestionsDropdown.style.display = (
            filteredSuggestions.length > 0 ? "block" : "none"
        );
    } else {
        suggestionsDropdown.style.display = "none";
    }
}

/*
 * Filter professionals based on the search query.
 * Filters the global professionalsData array based on the query and updates the map and list with the filtered results.
 */
function filterProfessionals(query) {
    console.log("Filtering professionals with query:", query); // Debug log
    const filteredProfessionals = professionalsData.filter(function (prof) {
        return (
            prof.name.toLowerCase().includes(query.toLowerCase()) ||
            prof.specialty.toLowerCase().includes(query.toLowerCase()) ||
            prof.location.city.toLowerCase().includes(query.toLowerCase())
        );
    });
    console.log("Filtered professionals:", filteredProfessionals); // Debug log
    updateMapWithProfessionals(filteredProfessionals);
    updateListWithProfessionals(filteredProfessionals);
}

/*
 * Clear all markers from the map.
 * Removes all markers currently displayed on the map.
 */
function clearMarkers() {
    markers.forEach(function (markerObj) {
        map.removeLayer(markerObj.marker);
    });
    markers = [];
}

/*
 * Adjust the map view to fit all markers.
 * Sets the map view to fit the bounds of all markers, or resets to the default view if no markers are present.
 */
function adjustMapView() {
    if (markers.length > 0) {
        const bounds = L.latLngBounds(
            markers.map(function (markerObj) {
                return markerObj.marker.getLatLng();
            })
        );
        map.fitBounds(bounds);
    } else {
        map.setView([54.3781, -3.4360], 6);
    }
}

/*
 * Retrieve the currently logged-in user from local storage.
 * Gets the email of the logged-in user and returns the user data from local storage.
 */
function getLoggedInUser() {
    const email = localStorage.getItem("loggedInUser");
    return (
        email ?
            JSON.parse(localStorage.getItem(email)) :
            null
    );
}

/*
 * Generate a consultation button for a professional.
 * Returns an HTML string for the consultation button, which
 * either links to the consultation page or prompts the user to log in.
 */
function getConsultationButton(professionalId) {
    if (currentUser) {
        return (
            "<a href=\"consultation.html?professional=" + professionalId +
            "\" class=\"button-like\">Request Consultation</a>"
        );
    }
    return (
        "<a href=\"login.html?redirect=consultation.html?professional=" +
        professionalId +
        "\" class=\"button-like\">Login to Request Consultation</a>"
    );
}
