import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';

const prevButton = document.querySelector('.icon-left-arrow');
const nextButton = document.querySelector('.icon-right-arrow');
const reviewsCatalog = document.querySelector('.reviews-catalog');
const div = document.querySelector('.reviews-swiper');
const swiper = document.querySelector('.swiper');
const rSBN = document.querySelector('.reviews-swiper-button-next');

let allReviews = []; // Масив для всіх відгуків
let currentIndex = 0; // Поточний індекс відгуків
let cardsPerPage = 1; // Кількість карток на сторінці

// 🔹 Функція для спостереження за секцією `reviews`
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.001) {
        // Визначаємо кількість карток залежно від розміру екрану
        if (window.matchMedia('(max-width: 767px)').matches) {
          cardsPerPage = 1;
        } else if (window.matchMedia('(max-width: 1439px)').matches) {
          cardsPerPage = 2;
        } else {
          cardsPerPage = 4;
        }
        request(); // Викликаємо функцію отримання даних з сервера
        observer.disconnect(); // Зупиняємо спостереження після завантаження
      }
    });
  }, { threshold: [0.001] });

  observer.observe(document.querySelector('#reviews'));
});

nextButton.addEventListener('click', showNextCards);

// 🔹 Функція для запиту на сервер
function httpRequest() {
  return axios.get('https://portfolio-js.b.goit.study/api/reviews');
}

// 🔹 Функція створення картки
function createCart(element) {
  return `
    <li data-info="${element._id}" class="swiper-slide reviews-list">
      <img class="reviews-list-avatar"
        src="${element.avatar_url}" alt="${element.author} reviews" />
      <h3 class="reviews-list-title">${element.author}</h3>
      <p class="reviews-list-text">${element.review}</p>
    </li>
  `;
}

// 🔹 Функція отримання даних із сервера
async function request() {
  try {
    const serverInform = await httpRequest();
    
    if (serverInform.data.length === 0) {
      iziToast.error({ position: 'topRight', message: 'Not found!' });
      return;
    }

    allReviews = serverInform.data; // Зберігаємо всі відгуки
    currentIndex = 0; // Скидаємо індекс
    showNextCards(); // Відображаємо картки
  } catch (er) {
    iziToast.error({ position: 'topRight', message: 'Not found!' });
  }
}

// 🔹 Функція для відображення нових карток
function showNextCards() {
  if (currentIndex >= allReviews.length) return; // Якщо картки закінчилися - не додаємо

  const nextCards = allReviews
    .slice(currentIndex, currentIndex + cardsPerPage)
    .map(createCart)
    .join('');

  reviewsCatalog.insertAdjacentHTML('beforeend', nextCards);
  currentIndex += cardsPerPage;

  observeCards(); // Додаємо спостереження для нових карток


  // 🔹 Ініціалізація або оновлення `Swiper`
  if (!window.swiperInstance) {
    window.swiperInstance = new Swiper('.reviews-swiper', {
      slidesPerView: 1,
      modules: [Navigation, Mousewheel, Keyboard],
      navigation: {
        nextEl: '.reviews-swiper-button-next',
        prevEl: '.reviews-swiper-button-prev',
      },
      spaceBetween: 16,
      keyboard: { enabled: true },
      mousewheel: true,
      breakpoints: {
        768: { slidesPerView: 2 },
        1440: { slidesPerView: 4 },
      },
    });
  } else {
    window.swiperInstance.update();
  }
}

// 🔹 Функція `observeCards()`
function observeCards() {
    const cards = document.querySelectorAll('.reviews-list'); // Отримуємо всі картки
  
    const observer = new IntersectionObserver(entries => {
      let isCard1Visible = false; // Чи є картка id=1 у полі зору
      let isCard6Visible = false; // Чи є картка id=6 у полі зору
  
      entries.forEach(entry => {
        const cardId = entry.target.getAttribute('data-info'); // Отримуємо id картки
  
        if (entry.intersectionRatio >= 0.005) { // Видимість хоча б 0.5%
          if (cardId === '1') isCard1Visible = true;
          if (cardId === '6') isCard6Visible = true;
        }
      });
  
      // Застосовуємо стилі до prevButton
      if (isCard1Visible) {
        prevButton.classList.add('disable');
        prevButton.style.stroke = '#3B3B3B'; // Додаємо stroke для prevButton
        prevButton.style.border = '1px solid rgba(250, 250, 250, 0.2)'; // Додаємо border для prevButton
      } else {
        prevButton.classList.remove('disable');
        prevButton.style.stroke = '#FAFAFA'; // Видаляємо stroke
        prevButton.style.border = ''; // Видаляємо border
      }
  
      // Застосовуємо стилі до nextButton
      if (isCard6Visible) {
        nextButton.classList.add('disable');
        nextButton.style.stroke = '#3B3B3B'; // Додаємо stroke для nextButton
        nextButton.style.border = '1px solid rgba(250, 250, 250, 0.2)'; // Додаємо border для nextButton
      } else {
        nextButton.classList.remove('disable');
        nextButton.style.stroke = '#FAFAFA'; // Видаляємо stroke
        nextButton.style.border = ''; // Видаляємо border
      }
  
    }, { threshold: 0.005 }); // Поріг видимості 0.5%
  
    // Тепер спостерігаємо тільки за картками з id=1 та id=6
    const card1 = document.querySelector('[data-info="1"]');
    const card6 = document.querySelector('[data-info="6"]');
  
    if (card1) observer.observe(card1);
    if (card6) observer.observe(card6);
  }
