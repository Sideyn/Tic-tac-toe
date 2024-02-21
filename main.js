const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");

const playerOne = "X";
const playerTwo = "O";

let playerTurn = playerOne;

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", playGame, { once: true });
});

function playGame(e) {
  e.target.innerHTML = playerTurn;

  if (playerTurn === playerOne) {
    e.target.classList.add("X");
  } else {
    e.target.classList.add("O");
  }

  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  updateGameStatus(playerTurn);

  playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne);
}

function checkWin(playerTurn) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case "X":
      statusText = "Player 2's turn ( O )";
      break;
    case "O":
      statusText = "Player 1's turn ( X ) ";
      break;
    case "winsX":
      statusText = "Player 1 wins";
      break;
    case "winsO":
      statusText = "Player 2 wins";
      break;
    case "draw":
      statusText = "Equality";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}

function endGame() {
  document.getElementById("endGame").style.display = "block";
}

function reloadGame() {
  window.location.reload();
}
