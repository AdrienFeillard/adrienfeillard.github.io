/*******************************************************
 * Project Slider
 ******************************************************/

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const totalCards = projectCards.length;
    let currentIndex = 0;

    function updateSlider() {
        projectCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Also slide the container
        const cardsContainer = document.querySelector('.project-cards');
        if (cardsContainer) {
            cardsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateSlider();
        });
    }

    updateSlider();
});
