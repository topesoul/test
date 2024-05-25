/*global document, fetch, console, window, URL, Swiper */

// Module to manage testimonials with autoplay functionality
const TestimonialManager = (function () {
    let autoplayInterval;
    let testimonials = [];
    let currentIndex = 0;
    let isPlaying = true;  // Autoplay starts active by default

    // Wait until the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById("testimonialCarousel");
        if (carousel) {  // Ensure the carousel element is present before initializing
            initializeTestimonials();
            setupTestimonialControls();
        }
    });

    // Fetch and display testimonials from a JSON file
    function initializeTestimonials() {
        const carousel = document.getElementById("testimonialCarousel");
        carousel.setAttribute("aria-live", "polite");  // Improve accessibility
        fetch("assets/json/testimonials.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                testimonials = data;
                testimonials.forEach(function (testimonial, index) {
                    const testimonialElement = createTestimonialElement(
                        testimonial, index
                    );
                    carousel.appendChild(testimonialElement);
                });
                // Display the first testimonial initially
                updateTestimonialsDisplay(0);
                // Start the autoplay feature
                autoplayInterval = startAutoplay();
            })
            .catch(function (error) {
                console.error("Error fetching testimonials:", error);
                carousel.textContent = "Failed to load testimonials.";
            });
    }

    // Create a DOM element for each testimonial
    function createTestimonialElement(testimonial, index) {
        const element = document.createElement("div");
        element.className = "testimonial";
        element.id = "testimonial-" + index;
        element.innerHTML = `
            <div class="testimonial-rating">
                ${generateStars(testimonial.rating)}
            </div>
            <img src="${testimonial.image}" alt="Photo of ${testimonial.name}">
            <blockquote>${testimonial.text}
                <footer>- ${testimonial.name}</footer>
            </blockquote>
        `;
        return element;
    }

    // Generate star ratings based on the testimonial's rating
    function generateStars(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    // Update the display to show the current testimonial
    function updateTestimonialsDisplay(index) {
        testimonials.forEach(function (_, i) {
            let element = document.getElementById("testimonial-" + i);
            element.style.display = (
                i === index
            ) ? "block" : "none";
        });
    }

    // Start the autoplay functionality
    function startAutoplay() {
        return setInterval(function () {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonialsDisplay(currentIndex);
        }, 3000);  // Change testimonial every 3 seconds
    }

    // Setup controls to toggle autoplay on and off
    function setupTestimonialControls() {
        const toggleButton = document.getElementById("toggleAutoplayBtn");
        const pauseIcon = document.getElementById("pauseIcon");
        const playIcon = document.getElementById("playIcon");
        const buttonText = document.getElementById("buttonText");

        toggleButton.addEventListener("click", function () {
            if (isPlaying) {
                clearInterval(autoplayInterval);
                buttonText.textContent = "Play Testimonials";
                pauseIcon.style.display = "none";
                playIcon.style.display = "inline-block";
            } else {
                autoplayInterval = startAutoplay();
                buttonText.textContent = "Pause Testimonials";
                pauseIcon.style.display = "inline-block";
                playIcon.style.display = "none";
            }
            isPlaying = !isPlaying;
        });
    }

    return {
        toggleAutoplay: function () {
            const button = document.getElementById("toggleAutoplayBtn");
            const pauseIcon = document.getElementById("pauseIcon");
            const playIcon = document.getElementById("playIcon");
            const buttonText = document.getElementById("buttonText");

            if (isPlaying) {
                clearInterval(autoplayInterval);
                buttonText.textContent = "Play Testimonials";
                pauseIcon.style.display = "none";
                playIcon.style.display = "inline-block";
            } else {
                autoplayInterval = startAutoplay();
                buttonText.textContent = "Pause Testimonials";
                pauseIcon.style.display = "inline-block";
                playIcon.style.display = "none";
            }
            isPlaying = !isPlaying;
        }
    };
}());

// Navigation module for handling mobile menu and highlighting active links
const NavigationManager = (function () {
    document.addEventListener("DOMContentLoaded", function () {
        setupHamburgerMenu();
        highlightActiveNav();
    });

    // Toggle the visibility of the mobile navigation menu
    function setupHamburgerMenu() {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.getElementById("navigation-menu");

        hamburger.addEventListener("click", function () {
            const isExpanded = (
                hamburger.getAttribute("aria-expanded") === "true"
            );
            hamburger.setAttribute("aria-expanded", !isExpanded);
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Highlight the current active navigation link
    function highlightActiveNav() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll(".nav-links a");
        navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (new URL(link.href).pathname === currentLocation) {
                link.classList.add("active");
            }
        });
    }
}());

// Image slider module using the Swiper library
const ImageSlider = (function () {
    document.addEventListener("DOMContentLoaded", function () {
        // Ensure the .swiper element is present before initializing the slider
        if (document.querySelector(".swiper")) {
            initializeImageSlider();
        }
    });

    // Initialize the Swiper image slider with settings
    function initializeImageSlider() {
        const swiper = new Swiper(".swiper", {  // Assign the instance to a variable to avoid the warning
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            scrollbar: {
                el: ".swiper-scrollbar"
            },
            breakpoints: {
                "320": {  // Single slide for very small screens
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                "480": {  // Two slides for small screens
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                "640": {  // Three slides for medium and larger screens
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    }
}());
