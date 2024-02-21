const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const resultPlayer1 = document.getElementById("score-player-1");
const resultPlayer2 = document.getElementById("score-player-2");

const playerOne = "X";
const playerTwo = "O";

let scorePlayer1 = 0;
let scorePlayer2 = 0;

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
    if (playerTurn === playerOne) {
      scorePlayer1++;
    } else {
      scorePlayer2++;
    }
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
      statusText = "Player 1 wins ( X )";
      break;
    case "winsO":
      statusText = "Player 2 wins ( O )";
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

function saveState() {
  localStorage.setItem("scorePlayer1", scorePlayer1);
  localStorage.setItem("scorePlayer2", scorePlayer2);
}

function reloadGame() {
  saveState();
  window.location.reload();
}

window.onload = function () {
  scorePlayer1 = parseInt(localStorage.getItem("scorePlayer1")) || 0;
  scorePlayer2 = parseInt(localStorage.getItem("scorePlayer2")) || 0;
  resultPlayer1.textContent = scorePlayer1;
  resultPlayer2.textContent = scorePlayer2;
};

function resetScore() {
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  resultPlayer1.textContent = scorePlayer1;
  resultPlayer2.textContent = scorePlayer2;
  saveState();
}
