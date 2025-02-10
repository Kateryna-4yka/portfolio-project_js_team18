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


let allReviews = []; 
let currentIndex = 0; 
let cardsPerPage = 1; 

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.001) {
                
                if (window.matchMedia("(max-width: 768px)").matches) {
                    cardsPerPage = 1;
                } else if (window.matchMedia("(max-width: 1440px)").matches) {
                    cardsPerPage = 2;
                } else {
                cardsPerPage = 4;}
                request();
                observer.disconnect(); 
            }
        });
    }, { threshold: [0.001] });
    observer.observe(document.querySelector("#reviews"));
});
nextButton.addEventListener (`click`, showNextCards);

function httpRequest () {
    return axios.get("https://portfolio-js.b.goit.study/api/reviews");}

function createCart (element) {
    return `
            <li class="swiper-slide reviews-list">
            <img class="reviews-list-avatar"
            src="${element.avatar_url}" alt="${element.author} reviews" />
            <h3 class="reviews-list-title">${element.author}</h3>
            <p class="reviews-list-text">${element.review}</p>
            </li>
`;}
 
async function request (event) {
try {
    const serverInform = await httpRequest ();

if (serverInform.data.length === 0) {
    iziToast.error({
      position: 'topRight' ,
      message: 'Not found!',
  });return;}
allReviews = serverInform.data; 
currentIndex = 0;
showNextCards(); 
}
catch (er) {
    iziToast.error({
      position: 'topRight' ,
      message: 'Not found!',
  })}}

function showNextCards() {
    if (currentIndex >= allReviews.length) return; 
    const nextCards = allReviews.slice(currentIndex, currentIndex + cardsPerPage)
        .map(createCart)
        .join('');
    reviewsCatalog.insertAdjacentHTML('beforeend', nextCards);
    currentIndex += cardsPerPage; 
    cardsPerPage = 1;
    
    if (currentIndex >= allReviews.length) {
        nextButton.disabled = true;
        nextButton.classList.add("disabled"); 
    }
    if (!window.swiperInstance) {
        window.swiperInstance = new Swiper('.reviews-swiper', {
            slidesPerView: 1,
            modules: [Navigation, Mousewheel, Keyboard],
            navigation: {
                nextEl: '.reviews-swiper-button-next',
                prevEl: '.reviews-swiper-button-prev',
            },
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