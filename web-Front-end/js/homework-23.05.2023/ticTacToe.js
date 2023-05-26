let count = 1;
let boardSize = 0;
let board;


const choose_player = (() => {
  let count = 1;
  return () => (count++ % 2 === 0 ? "O" : "X");
})();

const printBoard = () => {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.textContent = board[i][j];
      cell.addEventListener("click", () => {
        if (cell.textContent === '') {
          cell.textContent = choose_player(count);
          count++;
        } else {
          printBoard();
        }
        updateBoard(i, j, cell.textContent);
      });
      boardElement.appendChild(cell);
    }
    boardElement.appendChild(document.createElement("br"));
  }
};

const game = () => {
  boardSize = parseInt(document.getElementById('sizeb').value);
  board = new Array(boardSize).fill().map(() => new Array(boardSize).fill());
  printBoard();
};

const updateBoard = (row, col, value) => {
  board[row][col] = value;
  if (isWinner(value, board)) {
    document.getElementById("message").textContent = `Congratulations! ${value} has won.`;
  } else if (count === boardSize ** 2) {
    document.getElementById("message").textContent = "The game ended.";
  }
};

const isWinner = (symbol, board) => {
  let diag1HasWon = true;
  let diag2HasWon = true;
  for (let i = 0; i < boardSize; i++) {
    let rowHasWon = true;
    let colHasWon = true;
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== symbol) {
        rowHasWon = false;
      }
      if (board[j][i] !== symbol) {
        colHasWon = false;
      }
      if (i === j && board[i][j] !== symbol) {
        diag1HasWon = false;
      }
      if (i + j === boardSize - 1 && board[i][j] !== symbol) {
        diag2HasWon = false;
      }
    }
    if (rowHasWon || colHasWon) {
      return true;
    }
  }
  if (diag1HasWon || diag2HasWon) {
    return true;
  }
  return false;
};

game();
