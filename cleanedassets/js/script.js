// IIFE for Testimonial management with enhanced functionalities and detailed comments
const TestimonialManager = (function() {
    let autoplayInterval;
    let testimonials = [];
    let currentIndex = 0;
    let isPlaying = true;  // Assume autoplay starts active

    document.addEventListener("DOMContentLoaded", function() {
        const carousel = document.getElementById("testimonialCarousel");
        if (carousel) {  // Check if the carousel element exists
            initializeTestimonials();
            setupTestimonialControls();
        }
    });
    
    function initializeTestimonials() {
        const carousel = document.getElementById("testimonialCarousel");
        carousel.setAttribute("aria-live", "polite");
        fetch("testimonials.json")
            .then(response => response.json())
            .then(data => {
                testimonials = data;
                testimonials.forEach((testimonial, index) => {
                    const testimonialElement = createTestimonialElement(testimonial, index);
                    carousel.appendChild(testimonialElement);
                });
                updateTestimonialsDisplay(0);  // Initialize with the first testimonial
                autoplayInterval = startAutoplay();  // Start autoplay
            })
            .catch(error => {
                console.error("Error fetching testimonials:", error);
                carousel.textContent = "Failed to load testimonials.";
            });
    }

    function createTestimonialElement(testimonial, index) {
        const element = document.createElement("div");
        element.className = "testimonial";
        element.id = `testimonial-${index}`;
        element.innerHTML = `
            <div class="testimonial-rating">${generateStars(testimonial.rating)}</div>
            <img src="${testimonial.image}" alt="Photo of ${testimonial.name}">
            <blockquote>${testimonial.text} <footer>- ${testimonial.name}</footer></blockquote>
        `;
        return element;
    }

    function generateStars(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    function updateTestimonialsDisplay(index) {
        testimonials.forEach((_, i) => {
            document.getElementById(`testimonial-${i}`).style.display = i === index ? "block" : "none";
        });
    }

    function startAutoplay() {
        return setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonialsDisplay(currentIndex);
        }, 3000);  // Autoplay interval set to 3 seconds
    }

    function setupTestimonialControls() {
        const toggleButton = document.getElementById('toggleAutoplayBtn');
        const pauseIcon = document.getElementById('pauseIcon');
        const playIcon = document.getElementById('playIcon');
        const buttonText = document.getElementById('buttonText');
        
        toggleButton.addEventListener('click', function() {
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
        toggleAutoplay: function() {
            const button = document.getElementById('toggleAutoplayBtn');
            const pauseIcon = document.getElementById('pauseIcon');
            const playIcon = document.getElementById('playIcon');
            const buttonText = document.getElementById('buttonText');
            
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
})();

// IIFE for managing navigation and mobile menu functionality
const NavigationManager = (function() {
    document.addEventListener("DOMContentLoaded", function() {
        setupHamburgerMenu();
        highlightActiveNav();
    });

// Improved setupHamburgerMenu function to adjust menu height and slider interaction
function setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.getElementById("navigation-menu");
    const header = document.querySelector("header");

    hamburger.addEventListener("click", () => {
        const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !isExpanded);
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        // Dynamic adjustment of the navigation menu's position and height based on the header
        if (navMenu.classList.contains("active")) {
            const headerHeight = header.offsetHeight;
            navMenu.style.top = `${headerHeight}px`;
            navMenu.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
        } else {
            navMenu.style.maxHeight = null;
        }
    });
}

    // Highlights the active navigation link based on the current page
    function highlightActiveNav() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll(".nav-links a");
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (new URL(link.href).pathname === currentLocation) {
                link.classList.add("active");
            }
        });
    }
})();

// IIFE for the Swiper initialization - separate from the other functionalities for clarity
const ImageSlider = (function() {
    document.addEventListener("DOMContentLoaded", function() {
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
})();