// Initializes the web application when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    initializeTestimonials();
    initializeImageSlider();
});

// Function to initialize the testimonials with autoplay functionality
function initializeTestimonials() {
    const carousel = document.getElementById("testimonialCarousel");
    carousel.setAttribute("aria-live", "polite");

    fetchTestimonials();
}

// Fetches testimonials from a JSON file and processes them
function fetchTestimonials() {
    fetch("testimonials.json")
        .then((response) => response.json())
        .then((testimonials) => {
            testimonials.forEach((testimonial, index) => {
                const testimonialElement = createTestimonialElement(testimonial, index);
                carousel.appendChild(testimonialElement);
            });
            updateTestimonialsDisplay(testimonials, 0);

            let currentIndex = 0;
            let autoplayInterval = 3000; // milliseconds for the interval between testimonials
            let autoplay = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialsDisplay(testimonials, currentIndex);
            }, autoplayInterval);

            // Event listeners for pausing and resuming autoplay on user interaction
            carousel.addEventListener("mouseenter", pauseAutoplay);
            carousel.addEventListener("mouseleave", resumeAutoplay);
            carousel.addEventListener("focusin", pauseAutoplay);
            carousel.addEventListener("focusout", resumeAutoplay);

            function pauseAutoplay() {
                clearInterval(autoplay);
            }

            function resumeAutoplay() {
                autoplay = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    updateTestimonialsDisplay(testimonials, currentIndex);
                }, autoplayInterval);
            }
        })
        .catch((error) => console.error("Error fetching testimonials:", error));
}

// Creates a new testimonial HTML element
function createTestimonialElement(testimonial, index) {
    const element = document.createElement("div");
    element.className = "testimonial";
    element.id = `testimonial-${index}`;
    element.innerHTML = `
        <div class="testimonial-star-rating">${generateStars(testimonial.rating)}</div>
        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.name}, ${testimonial.title}</p>
    `;
    return element;
}

// Generates star ratings for testimonials
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Updates the display of testimonials based on the current index
function updateTestimonialsDisplay(testimonials, currentIndex) {
    testimonials.forEach((_, i) => {
        const testimonialElement = document.getElementById(`testimonial-${i}`);
        testimonialElement.style.display = "none"; // Hide all testimonials
    });
    const currentTestimonialElement = document.getElementById(`testimonial-${currentIndex}`);
    currentTestimonialElement.style.display = "block"; // Show only the current testimonial
}

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
