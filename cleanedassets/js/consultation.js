/*global document, flatpickr, fetch, console, alert, localStorage, window, URLSearchParams */

// Document ready event listener
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Flatpickr for the date and time input with specific configurations
    flatpickr("#datetime", {
        disable: [
            function (date) {
                // Disable Sundays
                return (date.getDay() === 0);
            }
        ],
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
    });

    // Check if a professional is selected from the URL parameters
    const professionalInfoSection = document.getElementById("professional-info");
    const urlParams = new URLSearchParams(window.location.search);
    const professionalId = urlParams.get("professional");

    // Fetch professional data and display it if a professional is selected
    if (professionalId) {
        fetch("professionals.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const professional = data.professionals.find(function (prof) {
                    return prof.id === parseInt(professionalId, 10);
                });
                if (professional) {
                    professionalInfoSection.innerHTML = `
                        <h2>${professional.name} - ${professional.specialty}</h2>
                        <p><strong>Location:</strong> ${professional.location.city}</p>
                        <p><strong>Description:</strong> ${professional.description}</p>
                    `;
                } else {
                    professionalInfoSection.innerHTML = `
                        <p>Professional not found. Please select another professional from the search page.</p>
                    `;
                }
            })
            .catch(function (error) {
                console.error("Error loading professionals data:", error);
                professionalInfoSection.innerHTML = `
                    <p>Error loading data. Please try again later.</p>
                `;
            });
    } else {
        professionalInfoSection.innerHTML = `
            <p>Please select a professional from the search page to book a consultation.</p>
        `;
    }

    // Form submission handling
    const form = document.getElementById("consultation-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check user login status
        if (!isUserLoggedIn()) {
            alert("You must be logged in to book a consultation.");
            window.location.href = "login.html"; // Redirect to the login page
            return;
        }

        // Validate that a professional is selected
        if (!professionalId) {
            alert("Please select a professional first.");
            return;
        }

        // Validate form inputs
        const datetime = document.getElementById("datetime").value;
        const message = document.getElementById("message").value;
        if (!datetime) {
            alert("Please select a date and time for your consultation.");
            return;
        }

        console.log(`Booking confirmed for: ${datetime} with message: ${message}`);
        alert("Your consultation has been booked!");
    });
});

/**
 * Simulated function to check user login status
 * @returns {boolean} True if the user is logged in, false otherwise
 */
function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}