// Initialize Swiper
var swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    // pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

$.ajax({
    url: 'https://tinyfac.es/api/data?limit=50&quality=0',
    dataType: 'json',
    success: function(data) {
        console.log(data);
    }
});

<script>
    // Select the hamburger icon
    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('nav ul');

    // Listen for a click on the hamburger icon
    hamburger.addEventListener('click', () => {
        // Toggle the "active" class on both the hamburger and the nav UL
        hamburger.classList.toggle('active');
        navUL.classList.toggle('active');
    });
</script>
