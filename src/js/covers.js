document.addEventListener("scroll", function() {
    const sectionTop = document.querySelector('.covers-section').getBoundingClientRect().top;
    const sectionHeight = document.querySelector('.covers-section').offsetHeight;
    const windowHeight = window.innerHeight;

    // Перевіряємо, чи секція з'являється в полі зору
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const images = document.querySelectorAll('.covers-content-project-img');
        images.forEach(img => {
            img.style.animation = 'marqueeLine 10s ease-in-out infinite';
        });
    }
});