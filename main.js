const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("click", function (event) {
    if (!event.target.textContent) {
      event.target.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});
