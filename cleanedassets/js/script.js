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

