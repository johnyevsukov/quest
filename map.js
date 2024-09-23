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
    return map[row * GAME_COLUMNS + col] - 1;
  }

  isSolidTileAtXY(x, y) {
    const col = Math.floor(x / 40);
    const row = Math.floor(y / 40);

    const tile = this.getTile(LEVEL_ONE, col, row) + 1;

    return tile !== 118; // ground tile
  }

  getCol(x) {
    return Math.floor(x / 40);
  }
  getRow(y) {
    return Math.floor(y / 40);
  }
  getX(col) {
    return col * 40;
  }
  getY(row) {
    return row * 40;
  }

  draw(ctx) {
    ctx.save();

    const startCol = Math.floor(this.game.camera.x / GAME_TILE_WIDTH);
    const endCol = startCol + this.game.camera.width / GAME_TILE_WIDTH;

    const startRow = Math.floor(this.game.camera.y / GAME_TILE_WIDTH);
    const endRow = startRow + this.game.camera.height / GAME_TILE_WIDTH;

    const offsetX = -this.game.camera.x + startCol * GAME_TILE_WIDTH;
    const offsetY = -this.game.camera.y + startRow * GAME_TILE_WIDTH;

    // draw out level map tile by tile
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
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
