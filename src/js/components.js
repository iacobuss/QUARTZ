// ===================================================
// components.js — injeta menu lateral, rodapé e botão
// WhatsApp em todas as páginas automaticamente.
//
// Usar em qualquer página:
//   1. No final do <body>, antes do script da página:
//      <div id="site-menu"></div>
//      <div id="site-rodape"></div>
//      <div class="overlay"></div>
//      <script src="./src/js/components.js"></script>
//      <script src="./src/js/SCRIPT-DA-PAGINA.js"></script>
// ===================================================

(function () {

    // ===== MENU LATERAL =====
    const menuHTML = `
        <div id="nav-links" class="menu">
            <div class="menu-header">
                <button class="btn-close" aria-label="Fechar menu">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="menu-section menu-section-principal">
                <ul>
                    <li><a href="joias.html">Joias Finas <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="semi.html">Semi-Joias de Luxo <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Diamantes Lab. <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Coleções <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Novidades <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Promoções <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#" class="menu-item-conta">
                        <i class="fa-regular fa-user"></i> Conta
                        <i class="fa-solid fa-chevron-right"></i>
                    </a></li>
                </ul>
            </div>
            <div class="menu-spacer"></div>
            <div class="menu-section-descubra">
                <div class="menu-logo-bottom">
                    <img src="./src/imagens/logo-preta.png" alt="Quart'z">
                </div>
                <ul>
                    <li><a href="#">Energia das pedras <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Como cuidar das joias <i class="fa-solid fa-chevron-right"></i></a></li>
                    <li><a href="#">Nossa história <i class="fa-solid fa-chevron-right"></i></a></li>
                </ul>
            </div>
        </div>
    `;

    // ===== RODAPÉ =====
    const rodapeHTML = `
        <footer class="rodape">

            <div class="rodape-institucional">
                <h2 class="rodape-marca">Quart'z — Joias com Pedras Naturais</h2>
                <p class="rodape-institucional-texto">Nascida em Foz do Iguaçu, a Quart'z foi criada para quem entende que uma joia vai além do acessório — ela expressa identidade, marca momentos e carrega significado. Desde 2020 com presença física, hoje levamos essa experiência para todo o Brasil.</p>
                <p class="rodape-institucional-texto">Nossa curadoria reúne joias em ouro 18k, prata e semi-joias de luxo com pedras naturais selecionadas com precisão. Cada peça é escolhida para refletir sofisticação, autenticidade e um padrão elevado de acabamento e brilho.</p>
            </div>

            <hr class="rodape-divider">

            <div class="rodape-contato">
                <p class="rodape-contato-titulo">FALE CONOSCO</p>
                <p class="rodape-contato-item"><i class="fa-regular fa-envelope"></i> contato@quartz.com.br</p>
                <p class="rodape-contato-item"><i class="fa-solid fa-headset"></i> Central de Atendimento: (45) 99999-9999</p>
                <p class="rodape-contato-item"><i class="fa-solid fa-location-dot"></i> Loja Física: Avenida das Cataratas, 3570 — Vila Yolanda, Foz do Iguaçu - PR, CEP 85854-430</p>
            </div>

            <p class="rodape-cnpj">CNPJ 37.643.147/0001-00</p>

            <hr class="rodape-divider">

            <div class="rodape-accordion">
                <button class="rodape-accordion-btn">
                    SOBRE A QUART'Z <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="rodape-accordion-content">
                    <a href="#">Nossa história</a>
                    <a href="#">Energia das pedras</a>
                    <a href="#">Como cuidar das joias</a>
                </div>
            </div>

            <hr class="rodape-divider">

            <div class="rodape-accordion">
                <button class="rodape-accordion-btn">
                    CONDIÇÕES LEGAIS <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="rodape-accordion-content">
                    <a href="#">Política de privacidade</a>
                    <a href="#">Termos de uso</a>
                </div>
            </div>

            <hr class="rodape-divider">

            <div class="rodape-bottom">
                <img src="./src/imagens/logo-branco.png" alt="Quart'z" class="rodape-logo">
                <div class="rodape-social">
                    <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                    <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest"></i></a>
                </div>
                <p class="rodape-copyright">© 2026 Quart'z – Todos os direitos reservados</p>
            </div>

        </footer>
    `;

    // ===== BOTÃO WHATSAPP FLUTUANTE =====
    const WHATSAPP_NUMERO   = '5545999999999';
    const WHATSAPP_MENSAGEM = encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.');

    const whatsappHTML = `
        <a class="whatsapp-float"
           href="https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MENSAGEM}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Falar pelo WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    `;

    // ===== INJEÇÃO =====
    // Usa insertAdjacentHTML para não perder a referência ao .overlay que vem depois
    const menuTarget   = document.getElementById('site-menu');
    const rodapeTarget = document.getElementById('site-rodape');

    if (menuTarget)   menuTarget.insertAdjacentHTML('afterend', menuHTML);
    if (rodapeTarget) rodapeTarget.insertAdjacentHTML('afterend', rodapeHTML);
    if (menuTarget)   menuTarget.remove();
    if (rodapeTarget) rodapeTarget.remove();

    document.body.insertAdjacentHTML('beforeend', whatsappHTML);

    // ===== COMPORTAMENTOS — roda após injeção síncrona =====
    // Neste ponto o #nav-links e .overlay já estão no DOM
    const btnMenu  = document.querySelector('.btn-menu');
    const btnClose = document.querySelector('.btn-close');
    const menuEl   = document.getElementById('nav-links');
    const overlay  = document.querySelector('.overlay');

    function openMenu() {
        if (!menuEl || !overlay) return;
        menuEl.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!menuEl || !overlay) return;
        menuEl.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (btnMenu)  btnMenu.addEventListener('click', openMenu);
    if (btnClose) btnClose.addEventListener('click', closeMenu);
    if (overlay)  overlay.addEventListener('click', closeMenu);

    // Accordion do rodapé
    document.querySelectorAll('.rodape-accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content    = btn.nextElementSibling;
            const estaAberto = btn.classList.contains('aberto');
            document.querySelectorAll('.rodape-accordion-btn').forEach(b => {
                b.classList.remove('aberto');
                if (b.nextElementSibling) b.nextElementSibling.classList.remove('aberto');
            });
            if (!estaAberto && content) {
                btn.classList.add('aberto');
                content.classList.add('aberto');
            }
        });
    });

})();
