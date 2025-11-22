<script src="js/main.js">
document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll('.portfolio-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    images.forEach(img => {
        img.addEventListener('click', () => {

            // Extract URL from background-image: url("img/file.png")
            const bg = img.style.backgroundImage;
            const url = bg.slice(5, -2); // handles .png and .png.png

            lightboxImg.src = url;
            lightbox.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});

</script>
