document.addEventListener('DOMContentLoaded', function() {
    initializeTestimonials();
    initializeImageSlider();
});

// Function to initialize the testimonials with autoplay functionality
function initializeTestimonials() {
    const carousel = document.getElementById('testimonialCarousel');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    let currentIndex = 0;
    let autoplayInterval = 3000; // milliseconds for the interval between testimonials

    fetch('testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            testimonials.forEach((testimonial, index) => {
                const testimonialElement = createTestimonialElement(testimonial, index);
                carousel.appendChild(testimonialElement);
            });
            updateTestimonialsDisplay(testimonials, currentIndex);

            // Start autoplay
            let autoplay = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialsDisplay(testimonials, currentIndex);
            }, autoplayInterval);

            // Add event listeners for navigation with manual control
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonialsDisplay(testimonials, currentIndex);
                resetAutoplay();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialsDisplay(testimonials, currentIndex);
                resetAutoplay();
            });

            // Function to reset the autoplay when manually interacted
            function resetAutoplay() {
                clearInterval(autoplay);
                autoplay = setInterval(() => {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    updateTestimonialsDisplay(testimonials, currentIndex);
                }, autoplayInterval);
            }
        })
        .catch(error => console.error('Error fetching testimonials:', error));
}

// Function to create testimonial HTML element
function createTestimonialElement(testimonial, index) {
    const element = document.createElement('div');
    element.className = 'testimonial';
    element.id = `testimonial-${index}`;
    element.innerHTML = `
        <div class="testimonial-star-rating">${generateStars(testimonial.rating)}</div>
        <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
        <p class="testimonial-text">"${testimonial.text}"</p>
        <p class="testimonial-author">- ${testimonial.name}, ${testimonial.title}</p>
    `;
    return element;
}

// Function to generate star ratings for testimonials
function generateStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Function to update the display of testimonials based on the current index
function updateTestimonialsDisplay(testimonials, currentIndex) {
    testimonials.forEach((_, i) => {
        const testimonialElement = document.getElementById(`testimonial-${i}`);
        testimonialElement.style.display = 'none'; // Hide all testimonials
    });
    const currentTestimonialElement = document.getElementById(`testimonial-${currentIndex}`);
    currentTestimonialElement.style.display = 'block'; // Show only the current testimonial
}

// Function to initialize the image slider with Swiper
function initializeImageSlider() {
    new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
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
