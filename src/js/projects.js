import Swiper from 'swiper';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';

const swiperProjects = new Swiper('.projects-swiper', {
  loop: false,
  slidesPerView: 1,
  modules: [Navigation, Mousewheel, Keyboard],
  navigation: {
    nextEl: '.projects-arrow-item-prev',
    prevEl: '.projects-arrow-item-next',
  },
  keyboard: { enabled: true, onlyInViewport: false, pageUpDown: true },
  mousewheel: true,
  roundLengths: true,
  breakpoints: {
    768: { slidesPerView: 1 },
    1440: { slidesPerView: 1 },
  },
});

