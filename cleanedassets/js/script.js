// Initialize Swiper
var swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,  // Change this line
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

// Toggling hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});
// For Testimonial Carousel
$(document).ready(function(){
    $('.testimonial-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    });
});

//Generating Additional Testimonials Entries 
function generateTestimonials() {
    const baseTestimonials = [
        {
            name: "Alicia",
            title: "Homeowner",
            text: "Homevise made my home renovation project a breeze! The expert advice I received was invaluable and the project management tools kept me organized. Highly recommend!",
            image: "assets/images/user-image.png"
        },
        {
            name: "Jamie",
            title: "Interior Designer",
            text: "As a professional, Homevise has helped me connect with clients I wouldn't have found otherwise. The platform is easy to use and the team is always supportive.",
            image: "assets/images/construction-worker.png"
        },
        {
            name: "Taylor",
            title: "DIY Enthusiast",
            text: "I was unsure about my DIY project, but the guides on Homevise gave me the confidence to do it myself. Plus, I knew professional help was just a click away if I needed it.",
            image: "assets/images/professional-consultant.png"
        }
    ];

    let testimonials = [];
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * baseTestimonials.length);
        const testimonial = {...baseTestimonials[randomIndex]};
        testimonial.id = i + 1;
        testimonials.push(testimonial);
    }
    return testimonials;
}

function displayTestimonials() {
    const testimonials = generateTestimonials();
    const container = document.getElementById('testimonial-container');
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <p>"${testimonial.text}"</p>
            <p>- ${testimonial.name}, ${testimonial.title}</p>
        `;
        container.appendChild(testimonialElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayTestimonials();
});
