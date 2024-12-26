const startBoard = [
  [null, 17, 12, 2, 2, 2],
  [4, 4, 9, 1, 4, 2],
  [6, 6, 6, 9, 1, 4],
  [10, 4, 4, 9, 2, 4],
  [2, 9, 5, 1, 2, 2],
  [13, 9, 2, 2, 6, 9],
];

let currentMode = "erase"; // Default mode
const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

// Initialize the grid
function renderBoard(board) {
  console.log("Rendering board...");
  console.log(board); // Log the board to confirm content

  gameBoard.innerHTML = ""; // Clear the board

  // Set the grid layout based on the number of columns
  gameBoard.style.gridTemplateColumns = `repeat(${board[0].length}, 50px)`;

  // Loop through each row and cell to render them
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      // Handle target cells (first row and column)
      if (rowIndex === 0 || colIndex === 0) {
        cellDiv.dataset.type = "target";
        cellDiv.textContent = cell !== null ? cell.toString() : "";
      } else {
        cellDiv.dataset.type = "editable";
        cellDiv.textContent = cell !== null ? cell.toString() : "";
        cellDiv.dataset.selected = "";

        cellDiv.addEventListener("click", () => {
          if (currentMode === "circle") {
            cellDiv.dataset.selected = "circle";
            startBoard[rowIndex][colIndex] = cell; // Mark as circled
          } else if (currentMode === "erase") {
            cellDiv.dataset.selected = "erase";
            startBoard[rowIndex][colIndex] = null; // Remove marking
          }
          checkWinCondition(); // Check the win condition after each change
        });
      }
      gameBoard.appendChild(cellDiv);
    });
  });
}

// Check for win via API call
function checkWinCondition() {
  fetch("/check-win", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board: startBoard }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.solved) {
        message.textContent = "You win! 🎉";
      } else {
        message.textContent = "Game in progress...";
      }
    })
    .catch((error) => {
      console.error("Error checking win condition:", error);
      message.textContent =
        "Error occurred while checking win condition.";
    });
}

// Function to update the button styles based on the current mode
function updateModeButtons() {
  const circleButton = document.getElementById("circle-mode");
  const eraseButton = document.getElementById("erase-mode");

  // Remove the active class from both buttons
  circleButton.classList.remove("active-mode");
  eraseButton.classList.remove("active-mode");

  // Add the active class to the currently selected button
  if (currentMode === "circle") {
    circleButton.classList.add("active-mode");
  } else if (currentMode === "erase") {
    eraseButton.classList.add("active-mode");
  }
}

// Toggle modes
document.getElementById("circle-mode").addEventListener("click", () => {
  currentMode = "circle";
  updateModeButtons(); // Update button styles
});

document.getElementById("erase-mode").addEventListener("click", () => {
  currentMode = "erase";
  updateModeButtons(); // Update button styles
});

renderBoard(startBoard); // Render the board