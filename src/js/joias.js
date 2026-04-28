// ===================================================
// joias.js — lógica específica da página de joias
// Menu lateral, rodapé e WhatsApp: components.js
// ===================================================

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
    const primeiroClone   = slidesOriginais[0].cloneNode(true);
    heroTrack.appendChild(primeiroClone);
    const totalSlides = heroTrack.children.length;

    function avancarHero() {
        heroAtual++;
        heroTrack.style.transition = 'transform 1.6s cubic-bezier(0.65, 0, 0.35, 1)';
        heroTrack.style.transform  = `translateX(-${heroAtual * 100}%)`;
        if (heroAtual === totalSlides - 1) {
            setTimeout(() => {
                heroTrack.style.transition = 'none';
                heroAtual = 0;
                heroTrack.style.transform  = 'translateX(0%)';
            }, 1900);
        }
    }
    setInterval(avancarHero, 5500);
}

// ===== ESTADO DOS FILTROS =====
const produtos = document.querySelectorAll('.produto-card');
let filtroAtivo  = null; // 'maior-preco' | 'menor-preco' | 'novo'
let categoriaAtiva = null; // 'aneis' | 'brincos' | etc.

function aplicarEstado() {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;

    let cards = Array.from(grid.querySelectorAll('.produto-card'));

    // 1. Restaura ordem original
    cards.sort((a, b) => parseInt(a.dataset.ordemOrig) - parseInt(b.dataset.ordemOrig));

    // 2. Ordena por preço se necessário
    if (filtroAtivo === 'maior-preco') {
        cards.sort((a, b) => getPreco(b) - getPreco(a));
    } else if (filtroAtivo === 'menor-preco') {
        cards.sort((a, b) => getPreco(a) - getPreco(b));
    }

    cards.forEach(c => grid.appendChild(c));

    // 3. Aplica visibilidade
    cards.forEach(card => {
        const passaCategoria = !categoriaAtiva || card.dataset.categoria === categoriaAtiva;
        const passaFiltro    = filtroAtivo !== 'novo' || card.querySelector('.produto-badge') !== null;
        if (passaCategoria && passaFiltro) card.classList.remove('oculto');
        else card.classList.add('oculto');
    });
}

// ===== DROPDOWN FILTRO =====
const btnFiltro      = document.getElementById('btn-filtro');
const dropdownFiltro = document.getElementById('filtro-dropdown');

if (btnFiltro && dropdownFiltro) {
    btnFiltro.addEventListener('click', e => {
        e.stopPropagation();
        dropdownFiltro.classList.toggle('aberto');
        btnFiltro.classList.toggle('aberto');
        document.getElementById('ordenar-dropdown')?.classList.remove('aberto');
        document.getElementById('btn-ordenar')?.classList.remove('aberto');
    });
}

document.querySelectorAll('.filtro-opcao').forEach(opcao => {
    opcao.addEventListener('click', e => {
        e.stopPropagation();
        const valor   = opcao.dataset.filtro;
        const jaAtivo = opcao.classList.contains('ativo');

        document.querySelectorAll('.filtro-opcao').forEach(o => o.classList.remove('ativo'));
        dropdownFiltro?.classList.remove('aberto');
        btnFiltro?.classList.remove('aberto');

        if (jaAtivo) {
            filtroAtivo = null;
            if (btnFiltro) btnFiltro.childNodes[0].textContent = 'FILTRO ';
        } else {
            opcao.classList.add('ativo');
            filtroAtivo = valor;
            if (btnFiltro) btnFiltro.childNodes[0].textContent = opcao.textContent + ' ';
        }
        aplicarEstado();
    });
});

// ===== DROPDOWN ORDENAR POR =====
const btnOrdenar      = document.getElementById('btn-ordenar');
const dropdownOrdenar = document.getElementById('ordenar-dropdown');

if (btnOrdenar && dropdownOrdenar) {
    btnOrdenar.addEventListener('click', e => {
        e.stopPropagation();
        dropdownOrdenar.classList.toggle('aberto');
        btnOrdenar.classList.toggle('aberto');
        document.getElementById('filtro-dropdown')?.classList.remove('aberto');
        document.getElementById('btn-filtro')?.classList.remove('aberto');
    });
}

document.querySelectorAll('.ordenar-opcao').forEach(opcao => {
    opcao.addEventListener('click', e => {
        e.stopPropagation();
        const valor   = opcao.dataset.ordem;
        const jaAtivo = opcao.classList.contains('ativo');

        document.querySelectorAll('.ordenar-opcao').forEach(o => o.classList.remove('ativo'));
        dropdownOrdenar?.classList.remove('aberto');
        btnOrdenar?.classList.remove('aberto');

        if (jaAtivo) {
            categoriaAtiva = null;
            if (btnOrdenar) btnOrdenar.childNodes[0].textContent = 'ORDENAR POR ';
        } else {
            opcao.classList.add('ativo');
            categoriaAtiva = valor;
            if (btnOrdenar) btnOrdenar.childNodes[0].textContent = opcao.textContent + ' ';
        }
        aplicarEstado();
    });
});

// Fecha dropdowns ao clicar fora
document.addEventListener('click', () => {
    dropdownOrdenar?.classList.remove('aberto');
    btnOrdenar?.classList.remove('aberto');
    dropdownFiltro?.classList.remove('aberto');
    btnFiltro?.classList.remove('aberto');
});

function getPreco(card) {
    const txt = card.querySelector('.produto-preco')?.textContent || '0';
    return parseFloat(txt.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
}

// ===== VISTOS RECENTEMENTE =====
const CHAVE_VISTOS = 'quartzVistos';
const MAX_VISTOS   = 6;

function salvarProdutoVisto(card) {
    const nome  = card.querySelector('.produto-nome')?.textContent.trim();
    const preco = card.querySelector('.produto-preco')?.textContent.trim();
    const img   = card.querySelector('.produto-imagem img')?.src;
    if (!nome || !preco || !img) return;

    let vistos = [];
    try { vistos = JSON.parse(localStorage.getItem(CHAVE_VISTOS) || '[]'); } catch(e) {}
    vistos = vistos.filter(v => v.nome !== nome);
    vistos.unshift({ nome, preco, img });
    if (vistos.length > MAX_VISTOS) vistos = vistos.slice(0, MAX_VISTOS);
    localStorage.setItem(CHAVE_VISTOS, JSON.stringify(vistos));
}

function renderizarVistos() {
    const grid = document.getElementById('vistos-grid');
    if (!grid) return;
    let vistos = [];
    try { vistos = JSON.parse(localStorage.getItem(CHAVE_VISTOS) || '[]'); } catch(e) {}
    if (!vistos.length) return;

    grid.innerHTML = vistos.map(v => `
        <div class="visto-card">
            <div class="visto-imagem"><img src="${v.img}" alt="${v.nome}"></div>
            <span class="visto-nome">${v.nome}</span>
            <span class="visto-preco">${v.preco}</span>
        </div>
    `).join('');
}

document.querySelectorAll('.produto-card').forEach(card => {
    card.addEventListener('click', () => salvarProdutoVisto(card));
});

renderizarVistos();
