document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initContactForm();
    initScrollReveal();
});

/* ============================
   LIGHTBOX (portfolio only)
============================ */

function initLightbox() {
    const items = document.querySelectorAll('.portfolio-item');
    const images = document.querySelectorAll('.portfolio-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const arrowLeft = document.querySelector('.lightbox-arrow.left');
    const arrowRight = document.querySelector('.lightbox-arrow.right');

    // If these elements don't exist, it's not the portfolio page
    if (
        !items.length ||
        !images.length ||
        !lightbox ||
        !lightboxImg ||
        !closeBtn
    ) {
        return;
    }

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;

        const bg = images[index].style.backgroundImage;
        const url = bg.slice(5, -2);

        lightboxImg.src = url;

        if (caption) {
            caption.textContent = items[index].querySelector('h3').textContent;
        }

        lightbox.classList.add('fade-in');
        lightbox.style.display = 'flex';

        setTimeout(() => lightbox.classList.remove('fade-in'), 250);
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Optional navigation arrows
    if (arrowLeft && arrowRight) {
        arrowLeft.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            openLightbox(currentIndex);
        });

        arrowRight.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            openLightbox(currentIndex);
        });
    }

    // Swipe for mobile
    let startX = 0;

    lightbox.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].pageX;
    });

    lightbox.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].pageX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? arrowRight?.click() : arrowLeft?.click();
        }
    });
}

/* ============================
   CONTACT FORM
============================ */

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const popup = document.getElementById('successPopup');

    if (!form || !popup) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form).entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                popup.classList.add('show');
                form.reset();

                setTimeout(() => popup.classList.remove('show'), 3500);
            } else {
                console.error("Contact form error:", await res.text());
            }

        } catch (err) {
            console.error("Contact form fetch failed:", err);
        }
    });
}

/* ============================
   SCROLL REVEAL
============================ */

function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal');

    if (!revealItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => observer.observe(item));
}
