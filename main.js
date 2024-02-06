const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let board = [];

cells.forEach((cell) => {
  cell.addEventListener("click", function (event) {
    if (!event.target.textContent) {
      event.target.textContent = currentPlayer;
      event.target.classList.add(currentPlayer);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});


