// ===============================
// MENU MOBILE
// ===============================
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===============================
// HERO BACKGROUND CAROUSEL
// ===============================
const hero = document.querySelector('.hero');

const heroImages = [
    'recursos/horizontal1.jpg',
    'recursos/horizontal2.webp',
    'recursos/horizontal3.jpg',
    'recursos/horizontal4.webp',
    'recursos/horizontal5.webp'
];

let heroIndex = 0;

// Imagen inicial
hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;

// Cambio automático
setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
}, 5000);

// ===============================
// CARD IMAGE CAROUSEL (INSTANT HOVER)
// ===============================
document.querySelectorAll('.card').forEach(card => {
    const images = card.querySelectorAll('.card-gallery img');
    let index = 0;
    let interval = null;

    if (images.length === 0) return;

    // Estado inicial
    images.forEach(img => img.classList.remove('active'));
    images[0].classList.add('active');

    const showNextImage = () => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    };

    const startCarousel = () => {
        if (interval) return;

        // CAMBIO INSTANTÁNEO AL HOVER
        showNextImage();

        interval = setInterval(showNextImage, 1800);
    };

    const stopCarousel = () => {
        clearInterval(interval);
        interval = null;
        index = 0;

        images.forEach(img => img.classList.remove('active'));
        images[0].classList.add('active');
    };

    // Desktop
    card.addEventListener('mouseenter', startCarousel);
    card.addEventListener('mouseleave', stopCarousel);

    // Mobile (tap)
    card.addEventListener('click', () => {
        startCarousel();
    });
});
