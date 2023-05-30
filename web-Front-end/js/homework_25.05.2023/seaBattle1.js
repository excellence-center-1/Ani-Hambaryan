class Board {
  constructor() {
    this.boardSize = 10;
    this.board = new Array(this.boardSize).fill().map(() => new Array(this.boardSize).fill());
    //this.selectedShip = null;
    // this.selectedOrientation = null;
  }

  //համարակալում
  printMarker(markerName) {
    const marker = document.getElementById(markerName);
    marker.innerHTML = '';
    for (let i = 1; i <= this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'marker_cell';
      cell.innerHTML = i;
      marker.appendChild(cell);
    }
  }

  printBoard(boardName) {
    const boardElement = document.getElementById(boardName);
    boardElement.innerHTML = '';
    const table = document.createElement('table');
    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement('td');
        cell.className = 'cell';
        if (this.board[i][j] === 'V') {
          cell.className = 'ship1-cell';
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    boardElement.appendChild(table);
  }
};

const myBoard = new Board();
const boardPlayer = new Board();

myBoard.printMarker('marker_row');
myBoard.printMarker('marker_col');
myBoard.printBoard('my_board');
boardPlayer.printMarker('marker_row1');
boardPlayer.printMarker('marker_col1');
boardPlayer.printBoard('players_board');

class Ship {
  constructor(shipType, count, size) {
    this.shipType = shipType;
    this.count = count;
    this.size = size;
  }
}

const shipTypes = [
  new Ship('battleship', 1, 4),
  new Ship('cruiser', 2, 3),
  new Ship('destroyer', 3, 2),
  new Ship('submarine', 4, 1)
];

const shipDisplayContainer = document.getElementById('ship-display');
const ShipExamplesDisplay = () => {
  shipDisplayContainer.innerHTML = '';
  for (const ship of shipTypes) {
    const count = ship.count;
    const cell = ship.size;
    const shipContainer = document.createElement('div');
    shipContainer.className = 'ship-container';
    const shipType = document.createElement('button');
    shipType.textContent = ship.shipType;
    shipType.className = 'ship-type';
    shipType.addEventListener('click', () => {
      myBoard.selectedShip = ship;
    });

    const shipMarkers = document.createElement('div');
    shipMarkers.className = 'ship-markers';
    for (let i = 0; i < cell; i++) {
      const shipMarker = document.createElement('td');
      shipMarker.className = 'ship-cell';
      shipMarkers.appendChild(shipMarker);
    }
    shipContainer.appendChild(shipType);
    shipContainer.appendChild(shipMarkers);
    shipContainer.appendChild(document.createTextNode(` count: ${count}  `));
    shipDisplayContainer.appendChild(shipContainer);
  }
};


const orientation_ship = document.getElementById('select_orientation');
const print_orientation = () => {
  const orientation_data = ['x++', 'y--'];
  for (let i = 0; i < orientation_data.length; i++) {
    let option = document.createElement('option');
    option.setAttribute('value', orientation_data[i]);
    let optionText = document.createTextNode(orientation_data[i]);
    option.appendChild(optionText);

    option.addEventListener('click', () => {
      myBoard.selectedOrientation = orientation_data[i];
    });

    orientation_ship.appendChild(option);
  }
};

ShipExamplesDisplay();
print_orientation();

const addShipsRandom = () => {
  const shipCounts = [1, 2, 3, 4];
  const shipSizes = [4, 3, 2, 1];
  for (let i = 0; i < shipSizes.length; i++) {
    const size = shipSizes[i];
    const count = shipCounts[i];
    for (let j = 0; j < count; j++) {
      let shipPlaced = false;
      while (!shipPlaced) {
        const row = Math.floor(Math.random() * myBoard.boardSize);
        const col = Math.floor(Math.random() * myBoard.boardSize);
        const orientation = Math.random() < 0.5 ? 'vertical' : 'horizontal';
        if (canPlaceShip(row, col, size, orientation)) {
          placeShip(row, col, size, orientation);
          shipPlaced = true;
        }
      }
    }
  }
  myBoard.printBoard('my_board');

  setTimeout(() => {
    coverShips()
  }, 2000)

}

const canPlaceShip = (row, col, size, orientation) => {
  if (orientation === 'vertical') {
    if (row + size > myBoard.boardSize) {
      return false;
    }
    for (let i = row; i < row + size; i++) {
      if (
        (col - 1 >= 0 && myBoard.board[i][col - 1]) || // ձախ վանդակ
        (col + 1 < myBoard.boardSize && myBoard.board[i][col + 1]) || // աջ
        (i - 1 >= 0 && myBoard.board[i - 1][col]) || // վերև
        (i + 1 < myBoard.boardSize && myBoard.board[i + 1][col]) || // ներքև
        (col - 1 >= 0 && i - 1 >= 0 && myBoard.board[i - 1][col - 1]) || // ձախ վերև
        (col + 1 < myBoard.boardSize && i - 1 >= 0 && myBoard.board[i - 1][col + 1]) || // աջ վերև
        (col - 1 >= 0 && i + 1 < myBoard.boardSize && myBoard.board[i + 1][col - 1]) || // ձախ ներքև
        (col + 1 < myBoard.boardSize && i + 1 < myBoard.boardSize && myBoard.board[i + 1][col + 1]) // աջ ներքև
      ) {
        return false;
      }
    }
  } else if (orientation === 'horizontal') {
    if (col + size > myBoard.boardSize) {
      return false;
    }

    for (let j = col; j < col + size; j++) {
      if (
        (row - 1 >= 0 && myBoard.board[row - 1][j]) ||
        (row + 1 < myBoard.boardSize && myBoard.board[row + 1][j]) ||
        (j - 1 >= 0 && myBoard.board[row][j - 1]) ||
        (j + 1 < myBoard.boardSize && myBoard.board[row][j + 1]) ||
        (row - 1 >= 0 && j - 1 >= 0 && myBoard.board[row - 1][j - 1]) ||
        (row - 1 >= 0 && j + 1 < myBoard.boardSize && myBoard.board[row - 1][j + 1]) ||
        (row + 1 < myBoard.boardSize && j - 1 >= 0 && myBoard.board[row + 1][j - 1]) ||
        (row + 1 < myBoard.boardSize && j + 1 < myBoard.boardSize && myBoard.board[row + 1][j + 1])
      ) {
        return false;
      }
    }
  }

  return true;
}
const addShipsRandomButton = document.getElementById('add_ships');
addShipsRandomButton.addEventListener('click', addShipsRandom);

const coverShips = () => {
  const boardElement = document.getElementById('my_board');
  const cells = boardElement.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = 'black';
  }
}
const placeShip = (row, col, size, orientation) => {
  if (orientation === 'vertical') {
    for (let i = row; i < row + size; i++) {
      myBoard.board[i][col] = 'V';
    }
  } else if (orientation === 'horizontal') {
    for (let j = col; j < col + size; j++) {
      myBoard.board[row][j] = 'V';
    }
  }
}



const playGame = () => {
  const boardElement = document.getElementById('players_board');
  const cells = boardElement.getElementsByTagName('td');
  const won = document.getElementById('game_over');
  let count = 0;
  let count1 = 0;
  for (let i = 0; i < boardPlayer.boardSize; i++) {
    for (let j = 0; j < boardPlayer.boardSize; j++) {
      const cell = cells[i * boardPlayer.boardSize + j];
      cell.addEventListener('click', () => {
        count1++;
        if (myBoard.board[i][j] === 'V') {
          cell.textContent = 'O';
          cell.className = 'ship2-cell';
          boardPlayer.board[i][j] = 'O';
          count++;
          if (count === 20) {
            won.textContent = 'You won';
            won.className = 'won game-over';
            return;
          }
        } else {
          cell.textContent = 'X';
          cell.className = 'ship3-cell';
        }
        if (count1 == 60) {
          won.textContent = 'Game Over';
          return;
        }
      });
    }
  }
};

playGame();





