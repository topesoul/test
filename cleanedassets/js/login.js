/*global document, localStorage, window, URLSearchParams */

// Document ready event listener
document.addEventListener("DOMContentLoaded", function() {
    // Handle Login Form Submission
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const registeredUser = localStorage.getItem(email);

        if (registeredUser && JSON.parse(registeredUser).password === password) {
            localStorage.setItem("loggedInUser", email);
            const redirectUrl = new URLSearchParams(window.location.search).get("redirect");
            const message = `Welcome back, ${email}! You are now logged in.`;
            displayAuthModal(message, redirectUrl || "index.html");
        } else {
            displayAuthModal("Invalid login credentials. Please try again.");
        }
    });

    // Handle Register Form Submission
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("new-email").value;
        const password = document.getElementById("new-password").value;

        if (localStorage.getItem(email)) {
            displayAuthModal("This email is already registered. Please log in instead.");
        } else {
            localStorage.setItem(email, JSON.stringify({ "password": password }));
            localStorage.setItem("loggedInUser", email);
            displayAuthModal(`Thank you for registering, ${email}! You can now log in.`, "index.html");
        }
    });

    // Forgot Password Form Submission
    document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("forgot-password-email").value;

        if (localStorage.getItem(email)) {
            const newPassword = generateRandomPassword();
            localStorage.setItem(email, JSON.stringify({ "password": newPassword }));
            displayAuthModal(`Reset instructions have been sent to ${email}. Check your email to complete the process.`);
        } else {
            displayAuthModal("No account found with this email. Please try again or register.");
        }
        document.getElementById("forgot-password-modal").style.display = "none";
    });

    // Forgot Password Link Click
    document.getElementById("forgot-password-link").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("forgot-password-modal").style.display = "block";
    });

    // Close Modal
    document.getElementById("close-auth-modal").onclick = function() {
        document.getElementById("auth-modal").style.display = "none";
    };

    document.getElementById("close-forgot-password-modal").onclick = function() {
        document.getElementById("forgot-password-modal").style.display = "none";
    };

    /**
     * Display the authentication modal with a message and optional redirect
     * @param {string} message - The message to display in the modal
     * @param {string} [redirectUrl] - The URL to redirect to after closing the modal
     */
    function displayAuthModal(message, redirectUrl) {
        const modalContainer = document.getElementById("auth-modal");
        const modalMessage = document.getElementById("auth-modal-message");
        modalMessage.textContent = message;
        modalContainer.style.display = "block";

        window.onclick = function(event) {
            if (event.target === modalContainer) {
                modalContainer.style.display = "none";
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                }
            }
        };

        document.getElementById("close-auth-modal").onclick = function() {
            modalContainer.style.display = "none";
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        };
    }

    /**
     * Generate a random password with 8 characters
     * @returns {string} The generated password
     */
    function generateRandomPassword() {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < 8; i += 1) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
});
