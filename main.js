/**
 * @type { HTMLCanvasElement }
 */

import { Player } from "./player.js";
import { InputHandler } from "./inputHandler.js";

// set up canvas
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

ctx.imageSmoothingEnabled = false;

// set up game
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.fps = 60;
  }
  update(deltaTime) {
    this.player.update(deltaTime);
  }
  draw(ctx, deltaTime) {
    this.player.draw(ctx, deltaTime);
  }
}

const game = new Game(canvas.width, canvas.height);

let lastTime = 0;

// animation loop
function animate(timeStamp) {
  // ensure delta time is calculated in seconds
  timeStamp *= 0.001;
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(deltaTime);
  game.draw(ctx, deltaTime);
  requestAnimationFrame(animate);
}

animate(0);
