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
    const faqDiv = item.querySelector(".faq-div-icon");

    content.style.maxHeight = "0px";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out";
    content.style.opacity = "0";

    item.querySelector(".faq-div-icon").addEventListener("click", function () {
      const isOpen = item.classList.contains("active");

      item.classList.toggle("active", !isOpen);
      content.style.display = isOpen ? "none" : "block";

      if (isOpen) {
        content.style.opacity = "0";
        content.style.transition = "opacity 0.4s ease-in-out";

        setTimeout(() => {
          content.style.maxHeight = "0px";
          content.style.transition = "max-height 0.6s ease-in-out";
        }, 100);
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = "1";
        content.style.transition = "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out";
      }

      arrow.classList.toggle("rotate", !isOpen);
      faqDiv.style.marginBottom = isOpen ? "" : "16px";
    });
  });
});