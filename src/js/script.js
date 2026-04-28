// ===================================================
// script.js — lógica específica da home
// Menu lateral, rodapé e WhatsApp: components.js
// ===================================================

// ===== HEADER =====
const header    = document.getElementById('site-header');
const logoImg   = document.getElementById('logo-img');
const heroEl    = document.querySelector('.hero');
const logoWhite = './src/imagens/logo-branco.png';
const logoBlack = './src/imagens/logo-preta.png';

let lastScrollY  = window.scrollY;
let headerOculto = false;

if (header) {
    header.style.transition = 'transform 0.35s ease, background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
}

function updateHeader() {
    if (!header || !logoImg) return;
    const scrollY    = window.scrollY;
    const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;
    const scrollando = scrollY > lastScrollY;

    if (heroBottom <= 70) {
        header.classList.remove('header-transparente', 'header-grande');
        header.classList.add('header-solido');
        logoImg.src = logoBlack;
    } else {
        header.classList.add('header-transparente', 'header-grande');
        header.classList.remove('header-solido');
        logoImg.src = logoWhite;
    }

    if (heroBottom <= 70) {
        if (scrollando && scrollY > 120) {
            if (!headerOculto) {
                header.style.transform = 'translateY(-100%)';
                headerOculto = true;
            }
        } else {
            if (headerOculto) {
                header.style.transform = 'translateY(0)';
                headerOculto = false;
            }
        }
    } else {
        header.style.transform = 'translateY(0)';
        headerOculto = false;
    }

    lastScrollY = scrollY;
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ===== CARROSSEL — com setas e swipe =====
function initCarrossel(trackId, prevSelector, nextSelector, dotsId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const wrap = track.closest('.promo-carrossel-wrap, .colecao-carrossel-wrap');
    const prev = wrap ? wrap.querySelector(prevSelector) : null;
    const next = wrap ? wrap.querySelector(nextSelector) : null;

    const dotsWrap = dotsId ? document.getElementById(dotsId) : null;
    const dots     = dotsWrap ? dotsWrap.querySelectorAll('.promo-dot') : [];

    const total = track.children.length;
    let current = 0;

    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend',   e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (diff > 50)  goTo(current + 1);
        if (diff < -50) goTo(current - 1);
    }, { passive: true });
}

initCarrossel('promo-track',        '.promo-seta-prev',   '.promo-seta-next',   'promo-dots');
initCarrossel('colecao-praia-track','.colecao-seta-prev', '.colecao-seta-next', null);
initCarrossel('colecao-pedra-track','.colecao-seta-prev', '.colecao-seta-next', null);
