// Seleciona todos os elementos com a clase "cell" - (células do tabuleiro)
const cells = document.querySelectorAll('.cell');

// Selecionar o botão de reiniciar jogo
const restartButton = document.querySelector('.restart-btn');

// Seleciona onde o status do jogo sera exibido
const gameStatus = document.querySelector('.game-status');


// Armazena o estado atual do jogo = Array[]
let gameState = ["", "", "", "", "", "", "", "", ""];

// Define o jogador inicial ("X" ou "O")
let initialPlayer = 'X';

// Combinações vencedoras do jogo
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função de clique na célula
function cellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // Verifica se a célula está preenchida ou se o jogo acabou
    if (gameState[cellIndex] !== "" || checkWinner()) {
        return;
    }

    // Preenche a célula com o simbulo do jogador atual
    gameState[cellIndex] = initialPlayer;
    cell.textContent = initialPlayer;
    
    // Verifica se há um vencedor ou empate
    if (checkWinner()) {
        gameStatus.textContent = `Jogador ${initialPlayer} venceu!`;
    } else if (!gameState.includes("")) {
        gameStatus.textContent = 'Enpate!';        
    } else {
        // Passa para o priximo JoJo
       initialPlayer = initialPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
       return combination.every(index => {
        return gameState[index] === initialPlayer
       });
    });
}

// Função para reiniciar o jogo
function restartGame() {
   gameState = ["", "", "", "", "", "", "", "", "",];
   initialPlayer = 'X';
   cells.forEach(cell => {
    cell.textContent = '';
   }); 
   gameStatus.textContent = '';
}

// Adicionando um ouvinte de evento de clique a cada célula
cells.forEach(cell =>{
    cell.addEventListener('click', cellClick)
})

// Adicionando um ouvinte de evento de clique ao botão reiniciar
restartButton.addEventListener('click', restartGame);