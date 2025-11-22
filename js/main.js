<script src="js/main.js">
// Lightbox Functionality
document.querySelectorAll('.portfolio-img').forEach(img => {
    img.addEventListener('click', () => {
        const bg = img.style.backgroundImage;
        const url = bg.slice(5, -2); // extract the url from css background-image

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = url;
        lightbox.style.display = 'flex';
    });
});

document.querySelector('.lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        document.getElementById('lightbox').style.display = 'none';
    }
});
</script>
