/**
 * @type { HTMLCanvasElement }
 */

import { GAME_COLUMNS, GAME_ROWS, GAME_TILE_WIDTH } from "./main.js";

export class Camera {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.map = this.game.map;
    this.width = this.game.width;
    this.height = this.game.height;
    this.maxX = GAME_COLUMNS * GAME_TILE_WIDTH - this.game.width;
    this.maxY = GAME_ROWS * GAME_TILE_WIDTH - this.game.width;
  }

  move(deltaTime, speedX, speedY) {
    this.x += speedX * deltaTime;
    this.y += speedY * deltaTime;

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
  }
}
