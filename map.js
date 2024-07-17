/**
 * @type { HTMLCanvasElement }
 */

import { GAME_COLUMNS, GAME_ROWS, GAME_TILE_WIDTH } from "./main.js";
import { LEVEL_ONE } from "./levels.js";

export class Map {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("textureSheet");
    // texture sheet sizing
    this.textureTileWidth = 16;
    this.textureSheetWidth = 256;
    this.textureSheetHeight = 128;
    this.textureSheetColumns = this.textureSheetWidth / this.textureTileWidth;
    this.textureSheetRows = this.textureSheetHeight / this.textureTileWidth;
  }
  // retrieve current tile in level map array
  getTile(map, col, row) {
    return map[row * GAME_COLUMNS + col];
  }

  draw(ctx) {
    ctx.save();

    const startCol = Math.floor(this.game.camera.x / GAME_TILE_WIDTH);
    const startRow = Math.floor(this.game.camera.y / GAME_TILE_WIDTH);

    const offsetX = -this.game.camera.x + startCol * GAME_TILE_WIDTH;
    const offsetY = -this.game.camera.y + startRow * GAME_TILE_WIDTH;

    // draw out level map tile by tile
    for (let row = 0; row < GAME_ROWS; row++) {
      for (let col = 0; col < GAME_COLUMNS; col++) {
        const tile = this.getTile(LEVEL_ONE, col, row);
        const x = (col - startCol) * GAME_TILE_WIDTH + offsetX;
        const y = (row - startRow) * GAME_TILE_WIDTH + offsetY;
        ctx.drawImage(
          this.image,
          (tile * this.textureTileWidth) % this.textureSheetWidth,
          Math.floor(tile / this.textureSheetColumns) * this.textureTileWidth,
          this.textureTileWidth,
          this.textureTileWidth,
          Math.round(x),
          Math.round(y),
          GAME_TILE_WIDTH,
          GAME_TILE_WIDTH
        );
      }
    }

    ctx.restore();
  }
}
