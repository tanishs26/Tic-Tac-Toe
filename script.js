const select = document.querySelectorAll(".box");
const mark = document.querySelectorAll(".mark");
const gameInfo = document.querySelector(".info");
const wininfo = document.querySelector(".wininfo");
const container = document.querySelector(".container");
const resetButton = document.querySelector("#reset");
const wholeInfo = document.querySelector(".gameinfo");

let currentPlayer = "X";
let gameActive = true;

let stateBoard = ["", "", "", "", "", "", "", "", ""];

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function selectBox() {
  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener("click", () => {
      if (select[i].textContent === "" && gameActive) {
        if (currentPlayer === "X") {
          select[i].textContent = "✖️";
          stateBoard[i] = "✖️";
          const mark = document.querySelectorAll(".mark");
          play();
        } else if (currentPlayer == "O") {
          select[i].textContent = "⭕️";
          stateBoard[i] = "⭕️";
          play();
        }
        checkWin();
        changePlayer();
      }
    });
  }
}
function checkWin() {
  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];
    if (
      stateBoard[a] &&
      stateBoard[a] === stateBoard[b] &&
      stateBoard[a] === stateBoard[c]
    ) {
      gameActive = false;
      wininfo.textContent = `🏆️ Congratulations! ${
        currentPlayer === "X" ? "Player one " : "Player two"
      } wins`;
      winplay();
      confetti();
      select[a].style.backgroundColor = "greenyellow";
      select[b].style.backgroundColor = "greenyellow";
      select[c].style.backgroundColor = "greenyellow";
      return;
    }
  }
  if (!stateBoard.includes("")) {
    wininfo.textContent = "It's a Draw!😛️";
    gameActive = false;
  }
}

function changePlayer() {
  gameInfo.textContent = "";
  const playerInfo = document.createElement("p");
  playerInfo.classList.add("playerInfo");
  playerInfo.textContent = currentPlayer === "X" ? "Player 1" : "Player 2";
  gameInfo.appendChild(playerInfo);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

resetButton.addEventListener("click", () => {
  stateBoard = ["", "", "", "", "", "", "", "", ""];
  select.forEach((e) => (e.textContent = ""));
  gameActive = true;
  currentPlayer = "X";
  gameInfo.textContent = "";
  wininfo.textContent = "";
  select.forEach((e) => {
    e.style.backgroundColor = "white";
  });
});
function play() {
  let audio = new Audio("click.mp3");
  audio.play();
}
function winplay() {
  let audio = new Audio("win.mp3");
  audio.play();
}
selectBox();
