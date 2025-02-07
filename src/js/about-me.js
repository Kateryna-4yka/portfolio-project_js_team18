import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';


document.addEventListener("DOMContentLoaded", function () {
    
    const accordion = new Accordion(".about-me-accordion", {
        duration: 400, 
        showMultiple: true,  
        collapse: false  
    });

    
    const items = document.querySelectorAll(".about-me-item");

    items.forEach((item, index) => {
        const content = item.querySelector("div:nth-of-type(2)");
        const arrow = item.querySelector(".icon-arrow");

        if (index === 0) { 
            
            item.classList.add("open");
            content.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
        } else {
            
            item.classList.remove("open");
            content.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
        }
    });

    
    document.querySelectorAll(".about-me-icon").forEach(title => {
        title.addEventListener("click", function () {
            const item = this.closest(".about-me-item");
            const content = item.querySelector("div:nth-of-type(2)");
            const arrow = item.querySelector(".icon-arrow");

            const isOpen = item.classList.toggle("open");
            content.style.display = isOpen ? "block" : "none";
            arrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".about-me-skils-slider", {
        direction: 'horizontal',
        loop: true, 
        loopedSlides: 8,  

        slidesPerView: 6, 
        navigation: {
            nextEl: ".swiper-button-next",
        },
        keyboard: { enabled: true, onlyInViewport: true },
        breakpoints: {
            768: { slidesPerView: 3 }, 
            320: { slidesPerView: 2 },
        },
    });

    swiper.on("slideChange", function () {
        document.querySelectorAll(".about-me-item-skils").forEach(el => el.classList.remove("active"));
        swiper.slides[swiper.activeIndex].classList.add("active");
    });
});