class Board {
  constructor() {
    this.boardSize = 10;
    this.board = new Array(this.boardSize).fill().map(() => new Array(this.boardSize).fill());
    this.selectedShip = null;
    this.selectedOrientation = null;
  }

  //համարակալում
  printMarker(markerName) {
    const marker = document.getElementById(markerName);
    marker.innerHTML = "";
    for (let i = 1; i <= this.boardSize; i++) {
      const cell = document.createElement("div");
      cell.className = "marker_cell";
      cell.innerHTML = i;
      marker.appendChild(cell);
    }
  }


  printBoard(boardName) {
    const boardElement = document.getElementById(boardName);
    boardElement.innerHTML = "";

    const table = document.createElement("table");

    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement("td");
        cell.className = "cell";
         if (this.board[i][j] === "V") {
            console.log('V')
            cell.className = "ship1-cell"; 
          }
    
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    boardElement.appendChild(table);

    
  }


  createShip(row, col) {
    if (!this.selectedShip || !this.selectedOrientation) {
      return;
    }

    const shipSize = this.selectedShip.size;

    if (
      (this.selectedOrientation === 'x++' && col + shipSize > this.boardSize) ||
      (this.selectedOrientation === 'y--' && row - shipSize + 1 < 0)
    ) {
      return;
    }

    for (let i = row; i < row + shipSize; i++) {
      for (let j = col; j < col + shipSize; j++) {
        if (this.selectedOrientation === 'x++') {
          console.log('BBB');
          this.board[i][j] = 'V';
        } else if (this.selectedOrientation === 'y--') {
          this.board[i][j] = 'V';
        }
      }
    }
  }

  addShip = () => {
    const cells = document.getElementsByClassName('cell');
    
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function() { 
        const row = Math.floor(i / this.boardSize);
        const col = i % this.boardSize;
        console.log('aaaaa')
  
        if (this.selectedShip && this.selectedOrientation) {
          this.createShip(row, col);
          console.log('ccc')
          this.printBoard('my_board'); 
        }
      });
    }
  };


  
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

const ShipExamplesDisplay = (select) => {
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



myBoard.addShip()

// const createShip=(row, col, shipSize, orientationShip) =>{
   
//     if (
//       (orientationShip === 'x++' && col + shipSize > myBoard.boardSize) ||
//       (orientationShip === 'y--' && row - shipSize + 1 < 0)
//     ) {
//       return;
//     }

//     for (let i = row; i < row + shipSize; i++) {
//       for (let j = col; j < col + shipSize; j++) {
//         if (orientationShip === 'x++') {
//           console.log('BBB');
//           myBoard.board[i][j] = 'V';
//         } else if (this.selectedOrientation === 'y--') {
//           myBoard.board[i][j] = 'V';
//         }
//       }
//     }
//   }


  
  
  
