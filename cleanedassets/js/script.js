document.addEventListener('DOMContentLoaded', function() {
    fetchTestimonialsAndInitializeCarousel();
});

function fetchTestimonialsAndInitializeCarousel() {
    fetch('testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            const carousel = document.querySelector('.testimonial-carousel');

            // Dynamically create and append testimonials to the carousel
            testimonials.forEach(t => {
                const testimonialElement = document.createElement('div');
                testimonialElement.className = 'testimonial';
                testimonialElement.innerHTML = `
                    <img src="${t.image}" alt="${t.name}">
                    <p>"${t.text}"</p>
                    <p>- ${t.name}, ${t.title}</p>
                `;
                carousel.appendChild(testimonialElement);
            });

            // Initialize Slick Carousel after testimonials are dynamically added
            $(carousel).slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        })
        .catch(error => console.error('Failed to fetch testimonials:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    var swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

// Swiper slider initialization
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.swiper', {
        // Parameters
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
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });
});
