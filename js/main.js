document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initContactForm();
});

/* ========== LIGHTBOX ========== */

function initLightbox() {
    const items = Array.from(document.querySelectorAll('.portfolio-item'));
    const images = items.map(i => i.querySelector('.portfolio-img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const arrowLeft = document.querySelector('.lightbox-arrow.left');
    const arrowRight = document.querySelector('.lightbox-arrow.right');

    // If we’re not on the portfolio page, bail out
    if (
        !items.length ||
        !lightbox ||
        !lightboxImg ||
        !caption ||
        !closeBtn ||
        !arrowLeft ||
        !arrowRight
    ) {
        return;
    }

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;

        const imgDiv = images[index];
        const bg = imgDiv.style.backgroundImage;
        const url = bg.slice(5, -2);

        lightboxImg.src = url;
        caption.textContent = items[index].querySelector('h3').textContent;

        lightbox.classList.add('fade-in');
        lightbox.style.display = 'flex';

        setTimeout(() => lightbox.classList.remove('fade-in'), 300);
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    arrowLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    });

    arrowRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    });

    // Mobile swipe
    let startX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].pageX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].pageX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                arrowRight.click(); // swipe left → next
            } else {
                arrowLeft.click(); // swipe right → previous
            }
        }
    });
}

/* ========== CONTACT FORM + POPUP ========== */

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const popup = document.getElementById('successPopup');

    if (!form || !popup) return;

    form.addEventListener('submit', async (e) => {
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

                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3500);
            } else {
                console.error('Contact form error:', await res.text());
            }
        } catch (err) {
            console.error('Contact form fetch failed:', err);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initContactForm();
});

/* ========== LIGHTBOX ========== */

function initLightbox() {
    const items = Array.from(document.querySelectorAll('.portfolio-item'));
    const images = items.map(i => i.querySelector('.portfolio-img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const arrowLeft = document.querySelector('.lightbox-arrow.left');
    const arrowRight = document.querySelector('.lightbox-arrow.right');

    // If we’re not on the portfolio page, bail out
    if (
        !items.length ||
        !lightbox ||
        !lightboxImg ||
        !caption ||
        !closeBtn ||
        !arrowLeft ||
        !arrowRight
    ) {
        return;
    }

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;

        const imgDiv = images[index];
        const bg = imgDiv.style.backgroundImage;
        const url = bg.slice(5, -2);

        lightboxImg.src = url;
        caption.textContent = items[index].querySelector('h3').textContent;

        lightbox.classList.add('fade-in');
        lightbox.style.display = 'flex';

        setTimeout(() => lightbox.classList.remove('fade-in'), 300);
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    arrowLeft.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    });

    arrowRight.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    });

    // Mobile swipe
    let startX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].pageX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].pageX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                arrowRight.click(); // swipe left → next
            } else {
                arrowLeft.click(); // swipe right → previous
            }
        }
    });
}

/* ========== CONTACT FORM + POPUP ========== */

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const popup = document.getElementById('successPopup');

    if (!form || !popup) return;

    form.addEventListener('submit', async (e) => {
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

                setTimeout(() => {
                    popup.classList.remove('show');
                }, 3500);
            } else {
                console.error('Contact form error:', await res.text());
            }
        } catch (err) {
            console.error('Contact form fetch failed:', err);
        }
    });
}
// Scroll reveal animation
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(item => observer.observe(item));
