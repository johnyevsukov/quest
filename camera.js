/**
 * @type { HTMLCanvasElement }
 */

import { GAME_COLUMNS, GAME_ROWS, GAME_TILE_WIDTH } from "./main.js";

export class Camera {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
    this.centerWidth = this.width / 2;
    this.centerHeight = this.height / 2;
    this.maxX = GAME_COLUMNS * GAME_TILE_WIDTH - this.width;
    this.maxY = GAME_ROWS * GAME_TILE_WIDTH - this.height;
  }
  update(player) {
    // assume followed sprite should be placed at the center of the screen
    // whenever possible
    player.screenX = this.centerWidth;
    player.screenY = this.centerHeight;

    // make the camera follow the sprite
    this.x = player.x - this.centerWidth;
    this.y = player.y - this.centerHeight;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates

    // left and right sides
    if (player.x < this.width / 2 || player.x > this.maxX + this.width / 2) {
      player.screenX = player.x - this.x;
    }
    // top and bottom sides
    if (player.y < this.height / 2 || player.y > this.maxY + this.height / 2) {
      player.screenY = player.y - this.y;
    }
  }
}
