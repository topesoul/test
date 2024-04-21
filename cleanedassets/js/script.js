// Global variables to maintain state across functions
let autoplay; // Used for the autoplay interval ID
let testimonialsGlobal; // Used to store the fetched testimonials globally
let currentIndex = 0; // Used to track the current index for testimonials

document.addEventListener("DOMContentLoaded", function() {
    initializeTestimonials();
    initializeImageSlider();
    setupHamburgerMenu();
    highlightActiveNav();
    // Set up event listeners for window resize
    window.addEventListener("resize", highlightActiveNav);
});

// Fetches and initializes testimonials with autoplay functionality
function initializeTestimonials() {
    const carousel = document.getElementById("testimonialCarousel");
    carousel.setAttribute("aria-live", "polite");

    fetch("testimonials.json")
        .then(response => response.json())
        .then(testimonials => {
            testimonialsGlobal = testimonials; // Store testimonials globally
            testimonials.forEach((testimonial, index) => {
                const testimonialElement = createTestimonialElement(testimonial, index);
                carousel.appendChild(testimonialElement);
            });
            updateTestimonialsDisplay(0); // Display the first testimonial
            autoplay = startAutoplay(); // Begin autoplay
        })
        .catch(error => console.error("Error fetching testimonials:", error));
}

// Starts the autoplay functionality and returns the interval ID
function startAutoplay() {
    return setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialsGlobal.length;
        updateTestimonialsDisplay(currentIndex);
    }, 3000); // Autoplay interval set to 3 seconds
}

// Creates HTML for a testimonial
function createTestimonialElement(testimonial, index) {
    const element = document.createElement("div");
    element.className = "testimonial";
    element.id = `testimonial-${index}`;
    element.innerHTML = `
        <div class="testimonial-star-rating">${generateStars(testimonial.rating)}</div>
        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
        <p class="testimonial-text">${testimonial.text}</p>
        <p class="testimonial-author">- ${testimonial.name}, ${testimonial.title}</p>
    `;
    return element;
}

// Generates star ratings
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Updates the display of the current testimonial
function updateTestimonialsDisplay(index) {
    testimonialsGlobal.forEach((_, i) => {
        const testimonialElement = document.getElementById(`testimonial-${i}`);
        testimonialElement.style.display = i === index ? "block" : "none";
    });
}

// Initializes Swiper for the image slider
function initializeImageSlider() {
    new Swiper(".swiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });
}

// Highlights the active navigation link
function highlightActiveNav() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.href.includes(currentLocation)) {
            link.classList.add("active");
        }
    });
}

// Setup the hamburger menu functionality for mobile navigation
function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.getElementById("navigation-menu");
    
    hamburger.addEventListener("click", () => {
        const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !isExpanded);
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}
