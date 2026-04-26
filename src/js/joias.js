// ===== FILTRO DE ABAS =====

// Pega TODOS os botões de aba e guarda numa lista
const abas = document.querySelectorAll('.btn-aba');

// Pega TODOS os cards de produto e guarda numa lista
const produtos = document.querySelectorAll('.produto-card');

// Para cada botão de aba, adiciona um "ouvinte de clique"
// Ou seja: quando o usuário clicar, executa a função
abas.forEach(function(aba) {
    aba.addEventListener('click', function() {

        // Passo 1: remove a classe "active" de TODOS os botões
        // (assim só um pode estar ativo por vez)
        abas.forEach(function(btn) {
            btn.classList.remove('active');
        });

        // Passo 2: adiciona "active" no botão que foi clicado
        // "this" aqui significa o botão que recebeu o clique
        this.classList.add('active');

        // Passo 3: lê qual filtro esse botão representa
        // Exemplo: se o botão tem data-filtro="ouro", filtro = "ouro"
        const filtro = this.dataset.filtro;

        // Passo 4: para cada produto, decide se mostra ou esconde
        produtos.forEach(function(card) {

            // Lê o metal do produto
            // Exemplo: se o card tem data-metal="prata", metal = "prata"
            const metal = card.dataset.metal;

            // Se o filtro for "todos" OU se o metal bater com o filtro:
            // mostra o produto (remove a classe oculto)
            if (filtro === 'todos' || metal === filtro) {
                card.classList.remove('oculto');

            // Se não bater: esconde o produto (adiciona a classe oculto)
            } else {
                card.classList.add('oculto');
            }
        });
    });
});
