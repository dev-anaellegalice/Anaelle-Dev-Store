document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.lab-featured-products__swiper');

  sliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: 1.25,
      centeredSlides: true,
      rewind: true,
      spaceBetween: 16,
      grabCursor: true,

      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true,
      },

      breakpoints: {
        750: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        990: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  });
});