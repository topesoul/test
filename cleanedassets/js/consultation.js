// Ensure that the script is executed after the entire document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#datetime", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true,
        disable: [
            function(date) {
                return (date.getDay() === 0);
            }
        ],
        onChange: function(selectedDates, dateStr, instance) {
            console.log("Selected date is: " + dateStr);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const professionalInfoSection = document.getElementById("professional-info");
    const urlParams = new URLSearchParams(window.location.search);
    const professionalId = urlParams.get("professional");

    if (!professionalId) {
        professionalInfoSection.innerHTML = "<p>Please select a professional from the search page to book a consultation.</p>";
        return;
    }

    fetch("professionals.json")
        .then(response => response.json())
        .then(data => {
            const professional = data.professionals.find(prof => prof.id === parseInt(professionalId));
            if (professional) {
                displayProfessionalInfo(professional);
                setupDateTimePicker(professional);
            } else {
                professionalInfoSection.innerHTML = "<p>Professional not found. Please select another professional from the search page.</p>";
            }
        })
        .catch(error => {
            console.error("Error loading professionals data:", error);
            professionalInfoSection.innerHTML = "<p>Error loading data. Please try again later.</p>";
        });

    function displayProfessionalInfo(professional) {
        professionalInfoSection.innerHTML = `<h2>${professional.name} - ${professional.specialty}</h2><p><strong>Location:</strong> ${professional.location.city}</p><p><strong>Description:</strong> ${professional.description}</p>`;
    }

    function setupDateTimePicker(professional) {
        flatpickr("#datetime", {
            enableTime: true,
            minDate: "today",
            dateFormat: "Y-m-d H:i",
            disable: professional.unavailableDates || [],
            onChange: function(selectedDates, dateStr, instance) {
                console.log("Selected date is: " + dateStr);
            }
        });
    }

    document.getElementById('consultation-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const datetime = document.getElementById('datetime').value;
        const message = document.getElementById('message').value;
        console.log("Booking confirmed for: " + datetime + " with message: " + message);
    });
});
