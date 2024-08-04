/**
 * @type { HTMLCanvasElement }
 */

import { Player } from "./player.js";
import { Map } from "./map.js";
import { Camera } from "./camera.js";
import { InputHandler } from "./inputHandler.js";
import { Debug } from "./debug.js";

// define global variables
export const GAME_COLUMNS = 30;
export const GAME_ROWS = 20;
export const GAME_TILE_WIDTH = 40;

// set up canvas
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 480;

ctx.imageSmoothingEnabled = false;

// set up game
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = new Map(this);
    this.camera = new Camera(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.debug = new Debug(this);
  }
  update(deltaTime) {
    this.player.update(deltaTime);
    this.camera.update(this.player);
  }
  draw(ctx, deltaTime) {
    this.map.draw(ctx);
    this.player.draw(ctx, deltaTime);
    this.debug.draw(ctx);
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
