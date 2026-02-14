// ========== CONFIGURATION ==========
// 🎯 CAMBIA ESTA URL por el video de YouTube que quieras
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=j09cI6t18NA';

// ========== DOM ELEMENTS ==========
const heroSection = document.getElementById('heroSection');
const letterSection = document.getElementById('letterSection');
const valentines = document.querySelector('.valentines');
const surpriseBtn = document.getElementById('surpriseBtn');

// ========== STATE ==========
// No complex state needed for this version

// ========== ACTIONS ==========

/**
 * Handle Envelope Click (Open Letter)
 */
if (valentines) {
    valentines.addEventListener('click', () => {
        // Animate the card going up (simulated by CSS hover originally, enforced here)
        const card = document.querySelector('.val-card');
        if (card) {
            card.style.top = '-90px';
        }

        // Wait for animation then switch sections
        setTimeout(() => {
            heroSection.classList.add('hidden');
            letterSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1000);
    });
}

/**
 * Handle Book Page Turning
 */
const pages = document.querySelectorAll('.letter-page');

// Initialize z-indexes so first page is on top
pages.forEach((page, index) => {
    // Reverse z-index: first page gets highest value
    page.style.zIndex = pages.length - index;

    // Add click event to Front (Flip Forward)
    const front = page.querySelector('.page-front');
    if (front) {
        front.addEventListener('click', (e) => {
            // Check if clicking button (prevent flip)
            if (e.target.closest('button')) return;

            page.classList.add('flipped');
            // Set z-index for left stack (Later pages on top of earlier pages)
            page.style.zIndex = index + 1;
        });
    }

    // Add click event to Back (Flip Backward)
    const back = page.querySelector('.page-back');
    if (back) {
        back.addEventListener('click', (e) => {
            page.classList.remove('flipped');
            // Restore original z-index (Highest on top of right stack)
            setTimeout(() => {
                page.style.zIndex = pages.length - index;
            }, 600); // 600ms match half transition
        });
    }
});

/**
 * Handle Surprise Button (Redirect)
 */
if (surpriseBtn) {
    surpriseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent clicking the page underneath

        // Add a fun exit animation to the body
        document.body.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        document.body.style.transform = 'scale(1.2)';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = YOUTUBE_URL;
        }, 800);
    });
}

// ========== FLOATING HEARTS (Background Effect) ==========
const heartsContainer = document.getElementById('heartsContainer');

function createFloatingHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const hearts = ['💖', '💕', '💗', '❤️', '💝', '🌹', '✨', '💘'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 16000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 800);
// Initial burst
for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// ========== SPARKLE CURSOR EFFECT ==========
const sparkleContainer = document.getElementById('sparkleContainer');
let sparkleThrottle = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - sparkleThrottle < 80) return;
    sparkleThrottle = now;

    if (!sparkleContainer) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = ['✨', '💕', '⭐', '💖'][Math.floor(Math.random() * 4)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
});
