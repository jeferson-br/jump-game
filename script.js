// Seleciona os elementos do HTML
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

/**
 * Função responsável por fazer o Mario pular
 */
const jump = () => {
    // Adiciona a classe que contém a animação de pulo do CSS
    mario.classList.add('jump');

    // Remove a classe após 500ms (tempo da animação) para permitir novos pulos
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

/**
 * Loop principal do jogo (roda a cada 10 milissegundos)
 * Verifica constantemente se houve colisão entre o Mario e o Tubo
 */
const loop = setInterval(() => {
    // Pega a distância do tubo em relação ao canto esquerdo da tela
    const pipePosition = pipe.offsetLeft;
    
    // Pega a altura atual do Mario (captura o valor do 'bottom' do CSS em tempo real)
    // O '+' na frente converte o resultado de texto para número, e o 'replace' remove o 'px'
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // CONDIÇÃO DE COLISÃO:
    // 1. pipePosition <= 120: O tubo chegou na área ocupada pelo corpo do Mario
    // 2. pipePosition > 0: O tubo ainda não passou totalmente pelo Mario
    // 3. marioPosition < 80: O Mario não pulou alto o suficiente para desviar do tubo
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        
        // 1. Para a animação do tubo e o fixa exatamente onde ele bateu
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // 2. Para a animação do Mario e o fixa na altura exata do impacto
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // 3. TROCA DE IMAGEM: Substitui o GIF de corrida pela imagem do Mario Game Over
        mario.src = 'img/game-over.png';
        
        // 4. Ajusta o tamanho e margem da nova imagem para não desconfigurar a tela
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // 5. Encerra este loop para que o jogo pare de processar dados após a derrota
        clearInterval(loop);
    }

}, 10);

// Escuta o teclado: qualquer tecla pressionada dispara a função jump
document.addEventListener('keydown', jump);