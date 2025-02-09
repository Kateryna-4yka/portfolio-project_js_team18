import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    modules: [Navigation, Pagination],
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    centeredSlides: true,
    speed: 600,
    keyboard: {
      enabled: true,
    },
  });
  const prevButton = document.querySelector('.swiper-button-prev');
  const nextButton = document.querySelector('.swiper-button-next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () =>
      console.log('Previous button clicked')
    );
    nextButton.addEventListener('click', () =>
      console.log('Next button clicked')
    );
  }
  swiper.on('slideChange', function () {
    console.log('Slide changed to: ' + swiper.activeIndex);
  });
});
