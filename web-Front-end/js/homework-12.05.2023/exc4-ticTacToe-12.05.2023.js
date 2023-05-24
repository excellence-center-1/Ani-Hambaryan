// const prompt = require("prompt-sync")({ sigint: true });

let count = 1;
const board_size = parseInt(prompt("Enter the board_size of the board : "));

const defaultValue = "*"; 

const board = new Array(board_size).fill([]).map(() => new Array(board_size).fill(defaultValue));

print_board = () => {
  for (let i = 0; i < board_size; i++) {
    let row = "";
    for (let j = 0; j < board_size; j++) {
      row += board[i][j] + " ";
    }
    console.log(row);
  }
};

const choose_player = (count) => (count % 2 === 0 ? "O" : "X");

let input_value = (player) => {
  console.log(`${player}'s turn.`);
  const choice_row = parseInt(prompt(`Choose a row from 1-${board_size}  - `)) - 1;
  const choice_col = parseInt(prompt(`Choose a column from 1-${board_size}  - `)) - 1;
  const isCorrectRowboard_size = isNaN(choice_row) || choice_row < 0 || choice_row > board_size - 1;
  const isCorrectColboard_size = isNaN(choice_col) || choice_col < 0 || choice_col > board_size - 1;
  if (isCorrectRowboard_size || isCorrectColboard_size) {
    console.log(`Invalid input! Choose a correct position from 1-${board_size}`);
    input_value(player);
  } else if (board[choice_row][choice_col] !== "*") {
    console.log("Invalid input! Position already taken.");
    input_value(player);
  } else {
    board[choice_row][choice_col] = player;
    print_board();
    if (isWinner(player, board)) {
      console.log(`Congratulations! ${player}'s has won`);
      return;
    }
  }
};

const isWinner = (symbol, board) => {
  let diag1HasWon = true;
  let diag2HasWon = true;
  for (let i = 0; i < board_size; i++) {
    let rowHasWon = true;
    let colHasWon = true;
    for (let j = 0; j < board_size; j++) {
      if (board[i][j] !== symbol) {
        rowHasWon = false;
      }
      if (board[j][i] !== symbol) {
        colHasWon = false;
      }
      if (i === j && board[i][j] !== symbol) {
        diag1HasWon = false;
      }
      if (i + j === board_size - 1 && board[i][j] !== symbol) {
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
}

const game = () => {
  console.log("First player - X     second player - O\n-------------------------------------");
  print_board();
  while (true) {
    input_value(choose_player(count));
    if (isWinner(choose_player(count), board)) {
      console.log(`Congratulations! ${choose_player(count)}\`s has won`);
      break;
    } else if (count === board_size**2) {
      console.log("The game end");
      console.log(board_size**2);
      break;
    }
    count++;
  }
}

game()

