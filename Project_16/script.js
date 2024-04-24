const canvas = document.getElementById("gameCanvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
const stat = document.getElementById("gameStat");
const resetBtn = document.getElementById("resetGame");
const mobileBtns = document.querySelectorAll(".mobile-controls button");
const backgroundMusic = new Audio();
backgroundMusic.src = "./music/background-music.mp3"
backgroundMusic.loop = true;
backgroundMusic.volume = 0.6;
const pop = new Audio("./music/pop.mp3");
const scoreMusic = new Audio("./music/score.mp3");



const ctxDimention = {
  height: canvas.height,
  width: canvas.width,
};

const paddleSpeed = 10;
const paddleOne = {
  height: 30,
  weight: 10,
  color: "#41B06E",
  x: 0,
  y: 0,
};

const paddleTwo = {
  height: 30,
  weight: 10,
  color: "#8644A2",
  x: ctxDimention.width - 10,
  y: ctxDimention.height - 30,
};

const ball = {
  radius: 6,
  color: "#DD5746",
  ballSpeed: 0.5,
  ballX: ctxDimention.width / 2,
  ballY: ctxDimention.height / 2,
  ballXDirection: 0,
  ballYDirection: 0,
};

let intervalID;

const score = {
  player1: 0,
  player2: 0,
};

window.addEventListener("keydown", changeDirection);
mobileBtns.forEach((btn) => {
  btn.addEventListener("click", changeDirectionMobile);
});
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  backgroundMusic.play();
  createBall();
  nextTick();
}

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ball.ballX, ball.ballY);
    checkCollision();
    nextTick();
  }, 10);
}

function clearBoard() {
  (ctx.fillStyle = "black"),
    ctx.fillRect(0, 0, ctxDimention.width, ctxDimention.height);
}

function drawPaddles() {
  ctx.strokeStyle = "black";

  ctx.fillStyle = paddleOne.color;
  ctx.fillRect(paddleOne.x, paddleOne.y, paddleOne.weight, paddleOne.height);

  ctx.fillStyle = paddleTwo.color;
  ctx.fillRect(paddleTwo.x, paddleTwo.y, paddleTwo.weight, paddleTwo.height);
}

function createBall() {
  ball.ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ball.ballXDirection = 1;
  } else {
    ball.ballXDirection = -1;
  }

  if (Math.round(Math.random()) == 1) {
    ball.ballYDirection = 1;
  } else {
    ball.ballYDirection = -1;
  }
  ball.ballX = ctxDimention.width / 2;
  ball.ballY = ctxDimention.height / 2;
  drawBall(ball.ballX, ball.ballY);
}

function moveBall() {
  ball.ballX += ball.ballSpeed * ball.ballXDirection;
  ball.ballY += ball.ballSpeed * ball.ballYDirection;
}

function drawBall(ballX = ball.ballX, ballY = ball.ballY) {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
}
function checkCollision() {
  if (ball.ballY <= 0 + ball.radius) {
    ball.ballYDirection *= -1;
    pop.play();
  }
  if (ball.ballY >= ctxDimention.height - ball.radius) {
    ball.ballYDirection *= -1;
    pop.play();
  }
  if (ball.ballX <= 0) {
    scoreMusic.pause();
    scoreMusic.currentTime = 0;
    score.player2 += 1;
    updateScore();
    createBall();
    return;
  }

  if (ball.ballX >= ctxDimention.width) {
    scoreMusic.pause();
    scoreMusic.currentTime = 0;
    score.player1 += 1;
    updateScore();
    createBall();
    return;
  }
  if (ball.ballX <= paddleOne.x + paddleOne.weight + ball.radius) {
    if (
      ball.ballY > paddleOne.y &&
      ball.ballY < paddleOne.y + paddleOne.height
    ) {
      ball.ballXDirection *= -1;
      pop.play();
    }
  }
  if (ball.ballX >= paddleTwo.x - ball.radius) {
    if (
      ball.ballY > paddleTwo.y &&
      ball.ballY < paddleTwo.y + paddleTwo.height
    ) {
      ball.ballXDirection *= -1;
      pop.play();
    }
  }
}

function changeDirectionMobile(e) {
  const btnPressed = e.target.id;

  switch (btnPressed) {
    case "paddle1Up":
      if (paddleOne.y > 0) {
        paddleOne.y -= paddleSpeed;
      }
      break;
    case "paddle1Down":
      if (paddleOne.y < ctxDimention.height - paddleOne.height) {
        paddleOne.y += paddleSpeed;
      }
      break;
    case "paddle2Up":
      if (paddleTwo.y > 0) {
        paddleTwo.y -= paddleSpeed;
      }
      break;
    case "paddle2Down":
      if (paddleTwo.y < ctxDimention.height - paddleTwo.height) {
        paddleTwo.y += paddleSpeed;
      }
      break;
    default:
      break;
  }
}

function changeDirection(e) {
  backgroundMusic.play();
  const keyPressed = e.keyCode;
  // paddle1 is controlled by "w" = 87 and "s" = 83 key
  const paddle1Up = 87;
  const paddle1Down = 83;
  // paddle2 is controlled by up = 38 and down = 40 arrow key
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddleOne.y > 0) {
        paddleOne.y -= paddleSpeed;
      }
      break;
    case paddle1Down:
      if (paddleOne.y < ctxDimention.height - paddleOne.height) {
        paddleOne.y += paddleSpeed;
      }
      break;
    case paddle2Up:
      if (paddleTwo.y > 0) {
        paddleTwo.y -= paddleSpeed;
      }
      break;
    case paddle2Down:
      if (paddleTwo.y < ctxDimention.height - paddleTwo.height) {
        paddleTwo.y += paddleSpeed;
      }
      break;
    default:
      break;
  }
}

function updateScore() {
  scoreMusic.play();
  stat.textContent = `${score.player1} : ${score.player2}`;
}
function resetGame() {
  score.player1 = 0;
  score.player2 = 0;
  paddleOne.x = 0;
  paddleOne.y = 0;
  paddleTwo.x = ctxDimention.width - 10;
  paddleTwo.y = ctxDimention.height - 30;
  ball.ballX = 0;
  ball.ballY = 0;
  ball.ballXDirection = 0;
  ball.ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}
