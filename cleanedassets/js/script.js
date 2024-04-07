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
