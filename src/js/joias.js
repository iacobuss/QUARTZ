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
if (btnMenu)  btnMenu.addEventListener('click', openMenu);
if (btnClose) btnClose.addEventListener('click', closeMenu);
if (overlay)  overlay.addEventListener('click', closeMenu);

// ===== HEADER =====
const header    = document.getElementById('joias-header');
const logoImg   = document.getElementById('logo-img');
const heroEl    = document.querySelector('.joias-hero');
const logoWhite = './src/imagens/logo-branca.png';
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
        header.classList.remove('header-transparente');
        header.classList.add('header-solido');
        logoImg.src = logoBlack;
    } else {
        header.classList.add('header-transparente');
        header.classList.remove('header-solido');
        logoImg.src = logoWhite;
    }

    if (heroBottom <= 70) {
        if (scrollando && scrollY > 120) {
            if (!headerOculto) { header.style.transform = 'translateY(-100%)'; headerOculto = true; }
        } else {
            if (headerOculto) { header.style.transform = 'translateY(0)'; headerOculto = false; }
        }
    } else {
        header.style.transform = 'translateY(0)';
        headerOculto = false;
    }
    lastScrollY = scrollY;
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ===== HERO CARROSSEL =====
const heroTrack   = document.getElementById('joias-hero-track');
const totalSlides = heroTrack ? heroTrack.children.length : 0;
let heroAtual = 0;
function avancarHero() {
    heroAtual = (heroAtual + 1) % totalSlides;
    heroTrack.style.transform = `translateX(-${heroAtual * 100}%)`;
}
if (totalSlides > 1) setInterval(avancarHero, 4000);

// ===== FILTRO DE ABAS =====
const abas     = document.querySelectorAll('.btn-aba');
const produtos = document.querySelectorAll('.produto-card');

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        abas.forEach(b => b.classList.remove('active'));
        aba.classList.add('active');
        const filtro = aba.dataset.filtro;
        produtos.forEach(card => {
            if (filtro === 'todos' || card.dataset.metal === filtro) {
                card.classList.remove('oculto');
            } else {
                card.classList.add('oculto');
            }
        });
    });
});

// ===== DROPDOWN ORDENAR POR =====
const btnOrdenar      = document.getElementById('btn-ordenar');
const dropdownOrdenar = document.getElementById('ordenar-dropdown');
const opcoesOrdenar   = document.querySelectorAll('.ordenar-opcao');

if (btnOrdenar && dropdownOrdenar) {
    btnOrdenar.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownOrdenar.classList.toggle('aberto');
        btnOrdenar.classList.toggle('aberto');
    });

    document.addEventListener('click', () => {
        dropdownOrdenar.classList.remove('aberto');
        btnOrdenar.classList.remove('aberto');
    });
}

opcoesOrdenar.forEach(opcao => {
    opcao.addEventListener('click', (e) => {
        e.stopPropagation();
        opcoesOrdenar.forEach(o => o.classList.remove('ativo'));
        opcao.classList.add('ativo');

        if (btnOrdenar) btnOrdenar.childNodes[0].textContent = opcao.textContent + ' ';
        if (dropdownOrdenar) { dropdownOrdenar.classList.remove('aberto'); btnOrdenar.classList.remove('aberto'); }

        const ordem = opcao.dataset.ordem;
        const grid  = document.querySelector('.produtos-grid');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('.produto-card'));
        if (ordem === 'maior-preco') cards.sort((a, b) => getPreco(b) - getPreco(a));
        else if (ordem === 'menor-preco') cards.sort((a, b) => getPreco(a) - getPreco(b));
        cards.forEach(card => grid.appendChild(card));
    });
});

function getPreco(card) {
    const txt = card.querySelector('.produto-preco')?.textContent || '0';
    return parseFloat(txt.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
}

// ===== ACCORDION DO RODAPÉ =====
const accordionBtns = document.querySelectorAll('.rodape-accordion-btn');
accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content    = btn.nextElementSibling;
        const estaAberto = btn.classList.contains('aberto');
        accordionBtns.forEach(b => {
            b.classList.remove('aberto');
            if (b.nextElementSibling) b.nextElementSibling.classList.remove('aberto');
        });
        if (!estaAberto) {
            btn.classList.add('aberto');
            if (content) content.classList.add('aberto');
        }
    });
});
