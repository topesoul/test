document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const professionalId = urlParams.get("professional");
    const professionalInfoSection = document.getElementById("professional-info");
    const messageForm = document.getElementById("consultation-form");

    // Load professionals data from JSON and display the relevant professional
    fetch("professionals.json")
        .then(response => response.json())
        .then(data => {
            const professional = data.professionals.find(prof => prof.id === parseInt(professionalId));
            if (professional) {
                displayProfessionalInfo(professional);
            } else {
                professionalInfoSection.innerHTML = "<p>Professional not found. Please try again.</p>";
            }
        })
        .catch(error => console.error("Error loading professionals data:", error));

    // Display professional information
    function displayProfessionalInfo(professional) {
        professionalInfoSection.innerHTML = `
            <h2>${professional.name} - ${professional.specialty}</h2>
            <p><strong>Location:</strong> ${professional.location.city}</p>
            <p><strong>Description:</strong> ${professional.description}</p>
            <p><strong>Contact:</strong> <a href="mailto:${professional.contact}">${professional.contact}</a></p>
        `;
        loadMessages(professional.id);
    }

    // Load previous messages from Local Storage
    function loadMessages(professionalId) {
        const messagesSection = document.getElementById("messages-section");
        const messages = JSON.parse(localStorage.getItem(`messages-${professionalId}`)) || [];
        messagesSection.innerHTML = messages.map(msg => `<p><strong>${msg.sender}:</strong> ${msg.text}</p>`).join('');
    }

    // Save a new message to Local Storage
    function saveMessage(professionalId, message) {
        const messages = JSON.parse(localStorage.getItem(`messages-${professionalId}`)) || [];
        messages.push(message);
        localStorage.setItem(`messages-${professionalId}`, JSON.stringify(messages));
    }

    // Handle consultation form submission
    messageForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const message = document.getElementById("message").value;

        const currentUser = getLoggedInUser();
        if (!currentUser) {
            alert("Please log in to send a consultation request.");
            return;
        }

        // Construct the message and save it to Local Storage
        const newMessage = {
            sender: currentUser.email,
            text: `Consultation requested on ${date} at ${time}.\nMessage: ${message}`
        };
        saveMessage(professionalId, newMessage);

        // Reload the messages section
        loadMessages(professionalId);
    });
});

// Function to get the currently logged-in user from local storage
function getLoggedInUser() {
    const email = localStorage.getItem('loggedInUser');
    if (email) {
        const user = localStorage.getItem(email);
        return user ? JSON.parse(user) : null;
    }
    return null;
}
