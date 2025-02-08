import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

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

        content.classList.add("about-me-content");

        if (index === 0) {
            item.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.style.transform = "rotate(180deg)";
        }
    });

    document.querySelectorAll(".about-me-icon").forEach(title => {
        title.addEventListener("click", function () {
            const item = this.closest(".about-me-item");
            const content = item.querySelector("div:nth-of-type(2)");
            const arrow = item.querySelector(".icon-arrow");
            const isOpen = item.classList.toggle("open");

            if (isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }

            arrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        });
    });
});
