// ===================================================
// joias.js — autossuficiente, não depende do script.js
// ===================================================

// ===== MENU LATERAL =====
const btnMenu  = document.querySelector('.btn-menu');
const btnClose = document.querySelector('.btn-close');
const menuEl   = document.getElementById('nav-links');
const overlay  = document.querySelector('.overlay');

function openMenu() {
    menuEl.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    menuEl.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}
if (btnMenu && menuEl && overlay) {
    btnMenu.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
}
if (btnClose) btnClose.addEventListener('click', closeMenu);

// ===== HEADER =====
const headerEl  = document.getElementById('joias-header');
const logoImg   = document.getElementById('logo-img');
const heroEl    = document.querySelector('.joias-hero');
const logoWhite = './src/imagens/logo-branco.png';
const logoBlack = './src/imagens/logo-preta.png';
let lastScrollY  = window.scrollY;
let headerOculto = false;

if (headerEl) {
    headerEl.style.transition = 'transform 0.35s ease, background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
}

function updateHeader() {
    if (!headerEl || !logoImg) return;
    const scrollY    = window.scrollY;
    const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;
    const scrollando = scrollY > lastScrollY;

    if (heroBottom <= 70) {
        headerEl.classList.remove('header-transparente');
        headerEl.classList.add('header-solido');
        logoImg.src = logoBlack;
    } else {
        headerEl.classList.add('header-transparente');
        headerEl.classList.remove('header-solido');
        logoImg.src = logoWhite;
    }

    if (heroBottom <= 70) {
        if (scrollando && scrollY > 120) {
            if (!headerOculto) { headerEl.style.transform = 'translateY(-100%)'; headerOculto = true; }
        } else {
            if (headerOculto) { headerEl.style.transform = 'translateY(0)'; headerOculto = false; }
        }
    } else {
        headerEl.style.transform = 'translateY(0)';
        headerOculto = false;
    }
    lastScrollY = scrollY;
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ===== HERO CARROSSEL =====
const heroTrack = document.getElementById('joias-hero-track');

if (heroTrack) {
    let heroAtual = 0;

    const slidesOriginais = Array.from(heroTrack.children);
    const totalOriginais = slidesOriginais.length;

    // clona o primeiro slide e adiciona no final
    const primeiroClone = slidesOriginais[0].cloneNode(true);
    heroTrack.appendChild(primeiroClone);

    const totalSlides = heroTrack.children.length;

    function avancarHero() {
        heroAtual++;

        heroTrack.style.transition = 'transform 1.6s cubic-bezier(0.65, 0, 0.35, 1)';
        heroTrack.style.transform = `translateX(-${heroAtual * 100}%)`;

        // quando chega no clone
        if (heroAtual === totalSlides - 1) {
            setTimeout(() => {
                heroTrack.style.transition = 'none';
                heroAtual = 0;
                heroTrack.style.transform = `translateX(0%)`;
            }, 1900); // TEMPO IGUAL AO CSS
        }
    }

    // autoplay mais lento (luxo)
    setInterval(avancarHero, 5500);
}

// ===== FILTRO DE ABAS (ouro/prata/todos) =====
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
const TEXTO_PADRAO    = 'ORDENAR POR ';

if (btnOrdenar && dropdownOrdenar) {
    btnOrdenar.addEventListener('click', e => {
        e.stopPropagation();
        dropdownOrdenar.classList.toggle('aberto');
        btnOrdenar.classList.toggle('aberto');
    });

    // fecha ao clicar fora
    document.addEventListener('click', () => {
        dropdownOrdenar.classList.remove('aberto');
        btnOrdenar.classList.remove('aberto');
    });
}

opcoesOrdenar.forEach(opcao => {
    opcao.addEventListener('click', e => {
        e.stopPropagation();

        const ordem      = opcao.dataset.ordem;
        const jaAtivo    = opcao.classList.contains('ativo');
        const grid       = document.querySelector('.produtos-grid');
        if (!grid) return;

        if (dropdownOrdenar) dropdownOrdenar.classList.remove('aberto');
        if (btnOrdenar)      btnOrdenar.classList.remove('aberto');

        // --- TOGGLE: clicou na opção já ativa → limpa ---
        if (jaAtivo) {
            opcao.classList.remove('ativo');
            if (btnOrdenar) btnOrdenar.childNodes[0].textContent = TEXTO_PADRAO;

            // restaura ordem original
            const cards = Array.from(grid.querySelectorAll('.produto-card'));
            cards.sort((a, b) =>
                parseInt(a.dataset.ordemOrig) - parseInt(b.dataset.ordemOrig)
            );
            cards.forEach(card => grid.appendChild(card));
            aplicarFiltroAtual();
            return;
        }

        // marca nova opção ativa
        opcoesOrdenar.forEach(o => o.classList.remove('ativo'));
        opcao.classList.add('ativo');
        if (btnOrdenar) btnOrdenar.childNodes[0].textContent = opcao.textContent + ' ';

        const cards = Array.from(grid.querySelectorAll('.produto-card'));

        if (ordem === 'maior-preco') {
            cards.sort((a, b) => getPreco(b) - getPreco(a));
            cards.forEach(card => grid.appendChild(card));

        } else if (ordem === 'menor-preco') {
            cards.sort((a, b) => getPreco(a) - getPreco(b));
            cards.forEach(card => grid.appendChild(card));

        } else {
            // filtra por categoria respeitando metal ativo
            const filtroMetalAtivo = document.querySelector('.btn-aba.active')?.dataset.filtro || 'todos';
            cards.forEach(card => {
                const categoriaOk = card.dataset.categoria === ordem;
                const metalOk     = filtroMetalAtivo === 'todos' || card.dataset.metal === filtroMetalAtivo;
                if (categoriaOk && metalOk) {
                    card.classList.remove('oculto');
                } else {
                    card.classList.add('oculto');
                }
            });
        }
    });
});

// helper: reaplica o filtro de metal ativo sem mexer na ordem
function aplicarFiltroAtual() {
    const filtroAtivo = document.querySelector('.btn-aba.active')?.dataset.filtro || 'todos';
    produtos.forEach(card => {
        if (filtroAtivo === 'todos' || card.dataset.metal === filtroAtivo) {
            card.classList.remove('oculto');
        } else {
            card.classList.add('oculto');
        }
    });
}

function getPreco(card) {
    const txt = card.querySelector('.produto-preco')?.textContent || '0';
    return parseFloat(txt.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
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
        if (!estaAberto && content) {
            btn.classList.add('aberto');
            content.classList.add('aberto');
        }
    });
});
