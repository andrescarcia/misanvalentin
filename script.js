// ========== CONFIGURATION ==========
// 🎯 CAMBIA ESTA URL por el video de YouTube que quieras
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// ========== DOM ELEMENTS ==========
const heroSection = document.getElementById('heroSection');
const letterSection = document.getElementById('letterSection');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');

const continueBtn = document.getElementById('continueBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const rejectionMessage = document.getElementById('rejectionMessage');
const rejectionText = document.getElementById('rejectionText');
const noCounter = document.getElementById('noCounter');
const noCountEl = document.getElementById('noCount');
const heartsContainer = document.getElementById('heartsContainer');
const sparkleContainer = document.getElementById('sparkleContainer');
const confettiContainer = document.getElementById('confettiContainer');
const buttonsContainer = document.getElementById('buttonsContainer');

// ========== STATE ==========
let noCount = 0;
let yesBtnScale = 1;

// ========== REJECTION MESSAGES ==========
const rejectionMessages = [
    "🚫 ¡Fino, ese botón no sirve! Hazme el favor y dale al correcto :)",
    "🤨 ¿Tú estás loca? Se te resbaló el dedo, dale al otro pues...",
    "⚠️ ERROR: Después de 5 años ese botón no funciona, captaste?.",
    "⚠️ Jajaja qué chevere tú. Ya va, ahora sí dale al que es...",
    "💔 Mira, esta pagina no procesa esa vaina. Solo acepta SÍ.",
    "🤖 RESPUESTA NO VÁLIDA. Intente de nuevo. Opciones disponibles: Sí / Sí. Listo.",
    "😤 ¿5 años pa' eso? Ni de vaina, dale otra vez.",
    "🎭 co*o vale tú eres burda de graciosa. Pero no. Dale al SÍ, vale.",
    "🔄 Cargando opciones... Opción 1: Sí. Opción 2: También sí. Ya quedó ✅",
    "⚠️ Según mis cálculos, hay un 100% de probabilidad de que digas SÍ. Es matemática pura.",
    "⚠️ Si dices que no, un perrito se pone triste. ¿Tú quieres eso en tu conciencia?",
    "😤 Si aceptas te invito unos tequeños. Si no... igual te invito, pero no hay besitos",
    "⚠️ ADVERTENCIA: Negarse puede causar exceso de abrazos forzados y besos a traición.",
    "⚠️ Mira vale, 'No' no existe en mi vocabulario. Dale al SÍ que no te va a pasar nada.",
    "🌹 Esta rosa se marchita cada vez que le das a No... ¿Tú quieres cargar con eso? 😢",
];

// ========== FLOATING HEARTS ==========
function createFloatingHeart() {
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
let sparkleThrottle = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - sparkleThrottle < 80) return;
    sparkleThrottle = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = ['✨', '💕', '⭐', '💖'][Math.floor(Math.random() * 4)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
});

// ========== SECTION TRANSITIONS ==========
function showSection(hideEl, showEl) {
    hideEl.classList.add('hidden');
    showEl.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const valentines = document.querySelector('.valentines');

// ... (other vars)

// ========== EVENT: OPEN LETTER ==========
if (valentines) {
    valentines.addEventListener('click', () => {
        // Optional: Animate out before switching?
        // helping the card go up if not hovered
        const card = document.querySelector('.val-card');
        if (card) card.style.top = '-90px';

        setTimeout(() => {
            showSection(heroSection, letterSection);
        }, 800);
    });
}

// ========== EVENT: CONTINUE TO QUESTION ==========
continueBtn.addEventListener('click', () => {
    showSection(letterSection, questionSection);
});

// ========== EVENT: YES BUTTON ==========
yesBtn.addEventListener('click', () => {
    showSection(questionSection, successSection);
    launchConfetti();
    // Burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createFloatingHeart, i * 100);
    }
});

// ========== EVENT: NO BUTTON ==========
noBtn.addEventListener('click', () => {
    noCount++;
    noCountEl.textContent = noCount;

    // Show counter after first attempt
    noCounter.classList.remove('hidden');

    // Show rejection message
    const msgIndex = (noCount - 1) % rejectionMessages.length;
    rejectionText.textContent = rejectionMessages[msgIndex];
    rejectionMessage.classList.remove('hidden');

    // Re-trigger shake animation
    rejectionMessage.style.animation = 'none';
    rejectionMessage.offsetHeight; // force reflow
    rejectionMessage.style.animation = 'shakeIn 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)';

    // Make Yes button grow
    yesBtnScale += 0.12;
    yesBtn.style.transform = `scale(${yesBtnScale})`;

    // Make No button react
    handleNoButtonBehavior();
});

// ========== NO BUTTON BEHAVIORS ==========
function handleNoButtonBehavior() {
    if (noCount <= 2) {
        // First few: just shake
        noBtn.style.animation = 'none';
        noBtn.offsetHeight;
        noBtn.style.animation = 'shakeIn 0.4s ease';
    } else if (noCount <= 4) {
        // Shrink the No button
        noBtn.style.transform = `scale(${1 - (noCount - 2) * 0.15})`;
        noBtn.style.opacity = `${1 - (noCount - 2) * 0.15}`;
    } else if (noCount <= 7) {
        // Run away - move to random position within container
        noBtn.classList.add('running-away');
        const containerRect = buttonsContainer.getBoundingClientRect();
        const maxX = containerRect.width - noBtn.offsetWidth;
        const maxY = 100;
        const randomX = (Math.random() - 0.5) * maxX;
        const randomY = (Math.random() - 0.5) * maxY;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${0.7 - (noCount - 5) * 0.1})`;
    } else if (noCount <= 9) {
        // Change text
        const texts = ['¿En serio?', '¡Noooo!', '😭'];
        noBtn.querySelector('span:last-child').textContent = texts[noCount - 8] || '😭';
        noBtn.style.transform = `scale(0.4)`;
        noBtn.style.opacity = '0.4';
    } else {
        // After many attempts, make it nearly invisible and tiny
        noBtn.style.transform = `scale(0.2)`;
        noBtn.style.opacity = '0.2';
        noBtn.style.pointerEvents = 'none';

        // Change text of No button
        noBtn.querySelector('span:last-child').textContent = 'Me rindo...';
    }
}

// ========== EVENT: SURPRISE BUTTON (REDIRECT) ==========
surpriseBtn.addEventListener('click', () => {
    // Add a fun exit animation
    document.body.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    document.body.style.transform = 'scale(1.1)';
    document.body.style.opacity = '0';

    setTimeout(() => {
        window.location.href = YOUTUBE_URL;
    }, 500);
});

// ========== CONFETTI ==========
function launchConfetti() {
    const colors = ['#e91e63', '#f48fb1', '#ffd54f', '#ff5722', '#9c27b0', '#4caf50', '#2196f3'];

    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = (Math.random() * 10 + 5) + 'px';
            piece.style.height = (Math.random() * 10 + 5) + 'px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            piece.style.animationDelay = Math.random() * 0.3 + 's';
            confettiContainer.appendChild(piece);

            setTimeout(() => piece.remove(), 4000);
        }, i * 50);
    }
}

// ========== PREVENT RIGHT CLICK (optional, for fun) ==========
// document.addEventListener('contextmenu', e => e.preventDefault());
