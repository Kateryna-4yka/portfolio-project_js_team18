import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import Swiper from 'swiper';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  const accordion = new Accordion('.about-me-accordion', {
    duration: 400,
    showMultiple: true,
    collapse: false,
  });

  const items = document.querySelectorAll('.about-me-item');
  items.forEach((item, index) => {
    const content = item.querySelector('div:nth-of-type(2)');
    const arrow = item.querySelector('.icon-arrow');

    content.classList.add('about-me-content');

    if (index === 0) {
      item.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
      arrow.style.transform = 'rotate(180deg)';
    }
  });

  document.querySelectorAll('.about-me-icon').forEach(title => {
    title.addEventListener('click', function () {
      const item = this.closest('.about-me-item');
      const content = item.querySelector('div:nth-of-type(2)');
      const arrow = item.querySelector('.icon-arrow');
      const isOpen = item.classList.toggle('open');

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }

      arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });
});

const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 2,
  modules: [Navigation, Mousewheel, Keyboard],
  navigation: {
    nextEl: '.swiper-button-next',
  },
  keyboard: { enabled: true, onlyInViewport: false, pageUpDown: true },
  mousewheel: true,
  roundLengths: true,
  breakpoints: {
    768: { slidesPerView: 3 },
    1440: { slidesPerView: 6 },
  },
});
swiper.on('slideChange', function () {
  const activeSlide = swiper.slides[swiper.activeIndex];
  // Убедитесь, что элемент существует, прежде чем добавлять класс
  if (activeSlide) {
    document
      .querySelectorAll('.about-me-item-skils')
      .forEach(el => el.classList.remove('active'));
    activeSlide.classList.add('active');
  }
});
