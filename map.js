/**
 * @type { HTMLCanvasElement }
 */

const LEVEL_ONE = [
  66, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67,
  67, 67, 67, 67, 67, 68, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 82, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 84, 82, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 84, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 82, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 84, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 82, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 84, 82, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 84, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 82, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 84, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 82, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 84, 82, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 84, 82, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 118,
  118, 118, 118, 118, 118, 118, 118, 118, 118, 118, 84, 98, 99, 99, 99, 99, 99,
  99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 100,
];

export class Map {
  constructor(game) {
    this.game = game;
    // texture sheet sizing
    this.textureTileWidth = 16;
    this.textureSheetWidth = 256;
    this.textureSheetHeight = 128;
    this.textureSheetColumns = this.textureSheetWidth / this.textureTileWidth;
    this.textureSheetRows = this.textureSheetHeight / this.textureTileWidth;
    // game sizing
    this.tileWidth = 32;
    this.columns = this.game.width / this.tileWidth;
    this.rows = this.game.height / this.tileWidth;
    this.image = document.getElementById("textureSheet");
  }
  // retrieve current tile in level map array
  getTile(map, col, row) {
    return map[row * this.columns + col];
  }

  draw(ctx) {
    ctx.save();
    // draw out level map tile by tile
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const tile = this.getTile(LEVEL_ONE, col, row);
        ctx.drawImage(
          this.image,
          (tile * this.textureTileWidth) % this.textureSheetWidth,
          Math.floor(tile / this.textureSheetColumns) * this.textureTileWidth,
          this.textureTileWidth,
          this.textureTileWidth,
          col * this.tileWidth,
          row * this.tileWidth,
          this.tileWidth,
          this.tileWidth
        );
      }
    }

    ctx.restore();
  }
}
