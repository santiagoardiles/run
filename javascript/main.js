/* Enviroment Initialisation */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const background = (canvas.style.background = "Black");

/* Assets Initialisation */
const difficulty = 975;
const yTile = canvas.height + 50;

const ball = new Ball(Math.floor(canvas.width / 2), 50, 10, "#7df9ff");
const initialTile = new Tile(0, yTile, canvas.width, 5, "#39ff14");
const initialGap = new Gap(initialTile.y, 40, 10);

const tiles = [initialTile];
tiles[0].addGap(initialGap);
let j = 0; // Current Tile Index

/* Score */
const currentScore = document.querySelector("#currentScore");

/* Start Button */
let gameStarted = false;
const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  currentScore.style.display = "flex";
  canvas.style.display = "flex";
  currentSong.play();
  gameStarted = true;
});

/* Ball Direction Detector */
let rightArrow = false;
let leftArrow = false;

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    rightArrow = true;
    leftArrow = false;
  } else if (event.key == "ArrowLeft") {
    rightArrow = false;
    leftArrow = true;
  }
});

/* Main Game Function */
function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tileGenerator();
  moveBall();
  detectCollision();

  if (ball.y === 0) {
    gameOver();
  }

  ball.draw();
}

/* Main Interval */
const gameInterval = setInterval(() => {
  if (gameStarted) {
    requestAnimationFrame(startGame);
  }
}, 1);
