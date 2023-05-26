const boardSize = 11;
const defaultValue = "";
 const board = new Array(boardSize).fill().map(() => new Array(boardSize).fill());

const printBoard = (boardName) => {
    
    const boardElement = document.getElementById(boardName);
    boardElement.innerHTML = "";
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement("button");
            cell.className = "cell";
            if (i === 0 && j > 0){
                cell.textContent = j;
            } else if (j === 0 && i > 0){
                cell.textContent = i;
            } else cell.textContent = defaultValue;
            cell.addEventListener("click", () => {
               
                // if (cell.textContent === defaultValue) {
                //     cell.textContent = "X";
                // }
            });
            boardElement.appendChild(cell);
        }
        boardElement.appendChild(document.createElement("br"));
    }
};

printBoard("my_board");
printBoard("players_board");

