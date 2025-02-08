import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

document.addEventListener("DOMContentLoaded", function () {
  const accordion = new Accordion(".faq-accordion", {
    duration: 400,
    showMultiple: true,
    collapse: false,
  });

  const items = document.querySelectorAll(".faq-list");

  items.forEach((item) => {
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-list-icon");

    item.querySelector(".faq-div-icon").addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.maxHeight = "0";
          content.style.opacity = "0";
        });
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
      }

      item.classList.toggle("active", !isOpen);
    });
  });
});
