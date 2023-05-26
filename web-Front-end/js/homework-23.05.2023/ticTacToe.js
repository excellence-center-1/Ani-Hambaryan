let count = 1;
let boardSize;
let board;
const defaultValue = "?";
const choose_player = (count) => (count % 2 === 0 ? "O" : "X");

const printBoard = () => {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const button_cell = document.createElement("button");
      button_cell.className = "cell";
      button_cell.textContent = board[i][j];
      button_cell.addEventListener("click", () => {
        if (button_cell.textContent === defaultValue) {
          button_cell.textContent = choose_player(count);
        }
        updateBoard(i, j, button_cell.textContent);
      });
      boardElement.appendChild(button_cell);
    }
    boardElement.appendChild(document.createElement("br"));
  }
};

const game = () => {
  boardSize = parseInt(document.getElementById('sizeb').value);
  board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(defaultValue));
  printBoard();
};

const updateBoard = (row, col, value) => {
  board[row][col] = value;
  count++;
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
