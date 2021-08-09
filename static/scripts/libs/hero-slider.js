const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    grabCursor: true,
    direction: 'horizontal',
    loop: true,
    effect:'fade',
    slidesPerView: 1,
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    spaceBetween: 30,
    speed: 1000,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });