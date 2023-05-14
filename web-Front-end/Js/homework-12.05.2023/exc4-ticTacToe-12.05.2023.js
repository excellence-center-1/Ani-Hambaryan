const prompt = require("prompt-sync")({ sigint: true });
let count = 1;
let board = []
const size = parseInt(prompt("Enter the size of the board - 3 or 4: "))
let print_board = () => {};

if(size === 4){
  board = [
  [" ", " ", " ", " "],
  [" ", " ", " ", " "],
  [" ", " ", " ", " "],
  [" ", " ", " ", " "]
];
print_board = () => {
  console.log(`
        1       2        3        4
    ._______.________.________.________.
    |       |        |        |        |             
  1 |   ${board[0][0]}   |   ${board[0][1]}    |   ${board[0][2]}    |   ${board[0][3]}    |
    |_______|________|________|________|
    |       |        |        |        |             
  2 |   ${board[1][0]}   |   ${board[1][1]}    |   ${board[1][2]}    |   ${board[1][3]}    |
    |_______|________|________|________|
    |       |        |        |        |             
  3 |   ${board[2][0]}   |   ${board[2][1]}    |   ${board[2][2]}    |   ${board[2][3]}    |
    |_______|________|________|________|
    |       |        |        |        |             
  4 |   ${board[3][0]}   |   ${board[3][1]}    |   ${board[3][2]}    |   ${board[3][3]}    |
    |_______|________|________|________|  `);
} } else {
  board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
print_board = () => {
  console.log(`
          1       2        3     
    ._______.________.________.
    |       |        |        |
  1 |   ${board[0][0]}   |   ${board[0][1]}    |   ${board[0][2]}    |
    |_______|________|________|
    |       |        |        |
  2 |   ${board[1][0]}   |   ${board[1][1]}    |   ${board[1][2]}    |
    |_______|________|________|
    |       |        |        | 
  3 |   ${board[2][0]}   |   ${board[2][1]}    |   ${board[2][2]}    |
    |_______|________|________|`);
};
};


let choose_player = (count) => {
  if (count % 2 == 0) {
    return "O";
  }
  return "X";
}

let input_value = (player) => {
  console.log(`${player}\'s tourn.`);
  let choice_row, choice_col;
  choice_row = parseInt(prompt(`Choose a row from 1-${size}  - `)) - 1;
  choice_col = parseInt(prompt(`Choose a column from 1-${size}  - `)) - 1;
  if (isNaN(choice_row) || choice_row < 0 || choice_row > size-1 || isNaN(choice_col) || choice_col < 0 || choice_col > size-1) {
    console.log(`Invalid input! Choose a correct position from 1-${size}`);
    input_value(player);
  } else if (board[choice_row][choice_col] != " ") {
    console.log("Invalid input! Position already taken.");
    input_value(player);
  } else {
    board[choice_row][choice_col] = player;
    print_board();
  }
};

const isWinner = (symbol, board) => {
  let diag1HasWon = true;
  let diag2HasWon = true;
  for (let i = 0; i < size; i++) {
    let rowHasWon = true;
    let colHasWon = true;
    for (let j = 0; j < size; j++) {
      if (board[i][j] !== symbol) {
        rowHasWon = false;
      }
      if (board[j][i] !== symbol) {
        colHasWon = false;
      }
      if (i === j && board[i][j] !== symbol) {
        diag1HasWon = false;
      }
      if (i + j === size - 1 && board[i][j] !== symbol) {
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

let game = () => {
  console.log("First player - X     second player - O\n-------------------------------------");
  print_board();
  while (true) {
    input_value(choose_player(count));
    if (isWinner(choose_player(count), board)) {
      console.log(`Congratulations! ${choose_player(count)}\`s has won`);
      break;
    } else if (count == size * size) {
      console.log("The game end");
      break;
    }
    count++;
  }
}

game()





