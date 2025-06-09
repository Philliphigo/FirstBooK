let currentPage = 1;
const totalPages = 10;

function showPage(pageNumber) {
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page${i}`);
        if (i === pageNumber) {
            page.classList.add('show');
            page.classList.remove('hide');
        } else {
            page.classList.remove('show');
            page.classList.add('hide');
        }
    }
    updateButtons(pageNumber);
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function updateButtons(pageNumber) {
    const prevButtons = document.querySelectorAll('.button.previous');
    const nextButtons = document.querySelectorAll('.button.next');

    prevButtons.forEach(button => {
        button.style.display = pageNumber === 1 ? 'none' : 'inline-block';
    });

    nextButtons.forEach(button => {
        button.style.display = pageNumber === totalPages ? 'none' : 'inline-block';
    });

    // Optional: Update page count text (if included)
    const pageCounts = document.querySelectorAll('.page-count');
    pageCounts.forEach(el => {
        el.textContent = `Page ${pageNumber} of ${totalPages}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);

    const backgroundMusic = new Audio('Billie Eilish – ocean eyes.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(err => {
        // Auto-play may be blocked; you can add a play button if needed
        console.log("Autoplay blocked. User interaction required.");
    });

    // Optional: Add event listeners for swipe gestures (for mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextPage();
        }
        if (touchEndX > touchStartX + 50) {
            previousPage();
        }
    }
});
