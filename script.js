const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

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

const checkWinner = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return boardState.includes('') ? null : 'Tie';
};

const updateBoard = () => {
  cells.forEach((cell, index) => {
    cell.textContent = boardState[index];
  });
};

const handleCellClick = (e) => {
  const index = e.target.getAttribute('data-index');

  if (boardState[index] !== '' || !isGameActive) {
    return;
  }

  boardState[index] = currentPlayer;
  updateBoard();

  const winner = checkWinner();
  if (winner) {
    isGameActive = false;
    message.textContent = winner === 'Tie' ? 'It\'s a tie!' : `${winner} wins!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${currentPlayer}'s turn`;
};

const resetGame = () => {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  message.textContent = `${currentPlayer}'s turn`;
  updateBoard();
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

message.textContent = `${currentPlayer}'s turn`;

