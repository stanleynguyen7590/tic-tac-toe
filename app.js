const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const playerMoves = {
    X: Array(9).fill(null),
    O: Array(9).fill(null),
  };
  const winCondtions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const cell = document.querySelectorAll(".cell");
  let currentPlayer = "X";
  let winner = null;
  let countMoves = 0;
  const renderBoard = () => {
    cell.forEach(item => {
      item.textContent = board[item.dataset.value];
    });
    renderDisplayStatus();
  };

  const handleRestartGame = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = "";
    }
    currentPlayer = "X";
    playerMoves["X"] = Array(9).fill(null);
    playerMoves["O"] = Array(9).fill(null);
    winner = null;
    countMoves = 0;
    document.querySelector(".game__result>h1").textContent = "";
    renderBoard();
  };

  const restartGame = () => {
    const restartBtn = document.querySelector(".restart__btn>button");
    restartBtn.addEventListener("click", handleRestartGame);
  };

  const renderDisplayStatus = () => {
    statusDisplay = document.querySelector(".status-display");
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  };

  const handleClickCell = e => {
    if (board[e.currentTarget.dataset.value] !== "" || winner !== null) return;
    board[e.currentTarget.dataset.value] = currentPlayer;
    playerMoves[currentPlayer][e.currentTarget.dataset.value] = currentPlayer;
    winner = checkWinner(playerMoves[currentPlayer]);
    if (winner || countMoves === 8) {
      declareWinner();
    } else {
      currentPlayer = currentPlayer === "O" ? "X" : "O";
    }
    countMoves++;
    renderBoard();
  };

  const checkWinner = moves => {
    for (let i = 0; i < winCondtions.length; i++) {
      const [a, b, c] = winCondtions[i];
      if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
        return moves[a];
      }
    }
    return null;
  };

  const declareWinner = () => {
    if (winner) {
      document.querySelector(
        ".game__result>h1"
      ).textContent = `Player ${winner} wins!`;
    } else if (countMoves == 8) {
      document.querySelector(".game__result>h1").textContent = `Draw`;
    }
  };

  cell.forEach(item => item.addEventListener("click", handleClickCell));
  return { restartGame, renderBoard };
})();

gameBoard.restartGame();
gameBoard.renderBoard();
