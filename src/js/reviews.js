import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Swiper from 'swiper';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
const prevButton = document.querySelector (".icon-left-arrow");
const nextButton = document.querySelector (".icon-right-arrow");
const reviewsCatalog = document.querySelector (".reviews-catalog");
const div = document.querySelector('.reviews-swiper');
const swiper = document.querySelector('.swiper');
const rSBN = document.querySelector('.reviews-swiper-button-next');
const rSBP = document.querySelector('.reviews-swiper-button-prev');
let allReviews = []; // Зберігає всі відгуки після першого запиту
let currentIndex = 0; // Відстежує, скільки карток уже відмальовано
let cardsPerPage = 1; // Кількість карток на екран
// запит на сервер відбувається тільки якщо секція потрапила в поле зору користувача 0.1% секції
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.001) {
                // перевірочка, щоб на маленький екранах була 1 картка, потім 2, потім 4
                if (window.matchMedia("(max-width: 768px)").matches) {
                    cardsPerPage = 1;
                } else if (window.matchMedia("(max-width: 1440px)").matches) {
                    cardsPerPage = 2;
                } else {
                cardsPerPage = 4;}
                request();
                observer.disconnect(); // Зупиняємо спостереження після першого спрацювання
            }
        });
    }, { threshold: [0.001] });
    observer.observe(document.querySelector("#reviews"));
});
nextButton.addEventListener (`click`, showNextCards);
// функція, що робить запит на сервер
function httpRequest () {
    return axios.get("https://portfolio-js.b.goit.study/api/reviews");}
// функція, що відмальовує картки по запиту
function createCart (element) {
    return `
            <li class="swiper-slide reviews-list">
            <img class="reviews-list-avatar"
            src="${element.avatar_url}" alt="${element.author} reviews" />
            <h3 class="reviews-list-title">${element.author}</h3>
            <p class="reviews-list-text">${element.review}</p>
            </li>
`;}
 // функція, що обробляє інформацію з сервера
async function request (event) {
try {
    const serverInform = await httpRequest ();
// перевірка результатів з сервера, чи прийшли данні
if (serverInform.data.length === 0) {
    iziToast.error({
      position: 'topRight' ,
      message: 'Not found!',
  });return;}
allReviews = serverInform.data; // Зберігаємо всі отримані дані
currentIndex = 0;
showNextCards(); // Відображаємо перші 4 картки
}
catch (er) {
    iziToast.error({
      position: 'topRight' ,
      message: 'Not found!',
  })}}
// Функція для відображення наступних карток
function showNextCards() {
    if (currentIndex >= allReviews.length) return; // Якщо картки закінчилися - не додаємо
    const nextCards = allReviews.slice(currentIndex, currentIndex + cardsPerPage)
        .map(createCart)
        .join('');
    reviewsCatalog.insertAdjacentHTML('beforeend', nextCards);
    currentIndex += cardsPerPage; // Оновлюємо індекс
    cardsPerPage = 1;
    // Ховаємо кнопку, якщо більше карток немає
    if (currentIndex >= allReviews.length) {
        nextButton.disabled = true;
        nextButton.classList.add("disabled"); // Додаємо клас для стилізації кнопки. Але є момент....вона не стає знову світлою, якщо я просто переключаюсь між сладами. Треба подумати.
    }
    if (!window.swiperInstance) {
        window.swiperInstance = new Swiper('.reviews-swiper', {
            slidesPerView: 1,
            modules: [Navigation, Mousewheel, Keyboard],
            navigation: {
                nextEl: '.reviews-swiper-button-next',
                prevEl: '.reviews-swiper-button-prev',
            },
            spaceBetween: 16,  // Відстань між слайдами
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