import Ball from "/src/ball";
import InputHandler from "/src/input";

let myCanvas = document.getElementById("myCanvas");
const GAME_WIDTH = myCanvas.width;
const GAME_HEIGHT = myCanvas.height;
let ctx = myCanvas.getContext("2d");
let user = new Ball(GAME_WIDTH, GAME_HEIGHT, 100, 400, 7, 300, ctx, false);

let ballArray = [];

makeBalls(1, 1);
new InputHandler(user);
gameLoop();

function makeBalls(amtSmall, amtBig) {
  ballArray[0] = user;
  user.setColor("#00B2EE");
  let i;
  let index = 1;
  for (i = 0; i < amtSmall; i++) {
    ballArray[index] = new Ball(
      GAME_WIDTH,
      GAME_HEIGHT,
      Math.random() * 900 + 50, // x Pos
      Math.random() * 600 + 50, // y Pos
      Math.random() * (user.radius - 2) + 2, // radius
      Math.random() * 20 + 10, // speed
      ctx, // context
      true //
    );
    index++;
  }

  for (i = 0; i < amtBig; i++) {
    ballArray[index] = new Ball(
      GAME_WIDTH,
      GAME_HEIGHT,
      Math.random() * 900 + 50, // x Pos
      Math.random() * 600 + 50, // y Pos
      Math.random() * 5 + user.radius, // radius
      Math.random() * 20 + 10, // speed
      ctx, // context
      true //
    );
    index++;
  }
}

let lastTime = 0;
let interval = 0;
function gameLoop(timeStamp) {
  let dt = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  spawnBall();
  updateAll(dt);
  displayCord();
  requestAnimationFrame(gameLoop);
}

function spawnBall() {
  interval++;
  let ball;
  if (interval >= 200) {
    ball = new Ball(
      GAME_WIDTH,
      GAME_HEIGHT,
      Math.random() * GAME_WIDTH + 50, // x Pos
      Math.random() * GAME_HEIGHT + 50, // y Pos
      Math.random() * user.radius + user.radius / 2, // radius
      Math.random() * 10 + 5, // speed
      ctx, // context
      true //
    );
    ballArray[ballArray.length] = ball;
    interval = 0;
  }
}

function updateAll(dt) {
  let ball;
  let i;
  for (i = 0; i < ballArray.length; i++) {
    ball = ballArray[i];
    ball.update(dt, user);
  }
}

function displayCord() {
  document.getElementById("x").innerText = "X: " + user.x;
  document.getElementById("y").innerText = "Y: " + user.y;
}
