import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const accordion = new Accordion(".faq-accordion", {
    duration: 400, 
    showMultiple: true, 
    collapse: false, 
  });

  const items = document.querySelectorAll(".faq-list");
  items.forEach((item, index) => {
    const content = item.querySelector(".faq-content");
    const arrow = item.querySelector(".faq-list-icon");

    content.style.display = "none";

    item.querySelector(".faq-div-icon").addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      item.classList.toggle("active", !isOpen);
      content.style.display = isOpen ? "none" : "block";
      arrow.classList.toggle("rotate", !isOpen);
    });
  });
});