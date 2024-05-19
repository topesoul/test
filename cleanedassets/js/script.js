/*global document, fetch, console, window, URL, Swiper */

// IIFE for Testimonial management with enhanced functionalities and detailed comments
const TestimonialManager = (function () {
    let autoplayInterval;
    let testimonials = [];
    let currentIndex = 0;
    let isPlaying = true;  // Assume autoplay starts active

    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById("testimonialCarousel");
        if (carousel) {  // Check if the carousel element exists
            initializeTestimonials();
            setupTestimonialControls();
        }
    });

    function initializeTestimonials() {
        const carousel = document.getElementById("testimonialCarousel");
        carousel.setAttribute("aria-live", "polite");
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
                // Initialize with the first testimonial
                updateTestimonialsDisplay(0);
                // Start autoplay
                autoplayInterval = startAutoplay();
            })
            .catch(function (error) {
                console.error("Error fetching testimonials:", error);
                carousel.textContent = "Failed to load testimonials.";
            });
    }

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

    function generateStars(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    function updateTestimonialsDisplay(index) {
        testimonials.forEach(function (_, i) {
            let element = document.getElementById("testimonial-" + i);
            element.style.display = (
                i === index
            ) ? "block" : "none";
        });
    }

    function startAutoplay() {
        return setInterval(function () {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonialsDisplay(currentIndex);
        }, 3000);  // Autoplay interval set to 3 seconds
    }

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

const NavigationManager = (function () {
    document.addEventListener("DOMContentLoaded", function () {
        setupHamburgerMenu();
        highlightActiveNav();
    });

    // Improved setupHamburgerMenu function to toggle menu visibility
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

    // Highlights the active navigation link based on the current page
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

const ImageSlider = (function () {
    document.addEventListener("DOMContentLoaded", function () {
        // Check if the .swiper element exists before initializing the image slider
        if (document.querySelector(".swiper")) {
            initializeImageSlider();
        }
    });

    // Initializes the image slider using the Swiper library
    function initializeImageSlider() {
        new Swiper(".swiper", {
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
                "320": {  // Use quoted keys for numeric properties
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                "480": {  // Use quoted keys for numeric properties
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                "640": {  // Use quoted keys for numeric properties
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    }
}());
