// ===== MENU LATERAL =====
const btnMenu  = document.querySelector('.btn-menu');
const btnClose = document.querySelector('.btn-close');
const menu     = document.getElementById('nav-links');
const overlay  = document.querySelector('.overlay');

function openMenu() {
    menu.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menu.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

btnMenu.addEventListener('click', openMenu);
btnClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// ===== BOTTOM NAV – ACTIVE STATE =====
const bottomItems = document.querySelectorAll('.bottom-item');
bottomItems.forEach(item => {
    item.addEventListener('click', () => {
        bottomItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// ===== ACCORDION DO RODAPÉ =====
const accordionBtns = document.querySelectorAll('.rodape-accordion-btn');
accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const estaAberto = btn.classList.contains('aberto');
        accordionBtns.forEach(b => {
            b.classList.remove('aberto');
            b.nextElementSibling.classList.remove('aberto');
        });
        if (!estaAberto) {
            btn.classList.add('aberto');
            content.classList.add('aberto');
        }
    });
});

// ===== HEADER — transparente no hero, sólido fora, hide/show no scroll =====
const header    = document.getElementById('site-header');
const logoImg   = document.getElementById('logo-img');
const heroEl    = document.querySelector('.hero');
const logoWhite = './src/imagens/logo.branco.png';
const logoBlack = './src/imagens/logo-preta.png';

let lastScrollY  = window.scrollY;
let headerOculto = false;

header.style.transition = 'transform 0.35s ease, background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';

function updateHeader() {
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

// ===== CARROSSEL — com setas e swipe/arrasto =====
function initCarrossel(trackId, prevSelector, nextSelector, dotsId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const wrap = track.closest('.promo-carrossel-wrap, .colecao-carrossel-wrap');
    const prev = wrap ? wrap.querySelector(prevSelector) : null;
    const next = wrap ? wrap.querySelector(nextSelector) : null;

    const dotsWrap = dotsId ? document.getElementById(dotsId) : null;
    const dots     = dotsWrap ? dotsWrap.querySelectorAll('.promo-dot') : [];

    const total  = track.children.length;
    let current  = 0;

    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    // setas
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    // swipe/arrasto — touch
    let touchStartX = 0;
    let touchEndX   = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        // arrasto maior que 50px para contar como swipe
        if (diff > 50)  goTo(current + 1); // deslizou para esquerda: próximo
        if (diff < -50) goTo(current - 1); // deslizou para direita: anterior
    }, { passive: true });
}

// Promoções
initCarrossel('promo-track', '.promo-seta-prev', '.promo-seta-next', 'promo-dots');

// Coleção Praia
initCarrossel('colecao-praia-track', '.colecao-seta-prev', '.colecao-seta-next', null);

// Coleção Pedra do Ano
initCarrossel('colecao-pedra-track', '.colecao-seta-prev', '.colecao-seta-next', null);
