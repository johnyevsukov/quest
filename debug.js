import { GAME_COLUMNS, GAME_ROWS, GAME_TILE_WIDTH } from "./main.js";

export class Debug {
  constructor(game) {
    this.game = game;
    this.debugSettingsOn = false;
    this.gridColor = "yellow";
    this.textureSheet = document.getElementById("textureSheet");
    this.textureTileWidth = 16;
    this.textureSheetWidth = 256;
    this.textureSheetHeight = 128;
    this.textureSheetScale = 3;
    this.textureSheetColumns = this.textureSheetWidth / this.textureTileWidth;
    this.textureSheetRows = this.textureSheetHeight / this.textureTileWidth;
    this.centeredTextureSheetWidth =
      this.game.width * 0.5 -
      this.textureSheetWidth * this.textureSheetScale * 0.5;
    this.centeredTextureSheetHeight =
      this.game.height * 0.5 -
      this.textureSheetHeight * this.textureSheetScale * 0.5;
  }
  getTile(map, col, row) {
    return map[row * GAME_COLUMNS + col];
  }
  displayGrid(ctx) {
    ctx.strokeStyle = this.gridColor;

    for (let row = 0; row < GAME_ROWS; row++) {
      for (let col = 0; col < GAME_COLUMNS; col++) {
        ctx.strokeRect(
          col * GAME_TILE_WIDTH,
          row * GAME_TILE_WIDTH,
          GAME_TILE_WIDTH,
          GAME_TILE_WIDTH
        );
      }
    }
  }
  displayTextureSheet(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, this.game.width, this.game.height);
    ctx.drawImage(
      this.textureSheet,
      0,
      0,
      this.textureSheetWidth,
      this.textureSheetHeight,
      this.centeredTextureSheetWidth,
      this.centeredTextureSheetHeight,
      this.textureSheetWidth * this.textureSheetScale,
      this.textureSheetHeight * this.textureSheetScale
    );
    ctx.fillStyle = "rgba(250, 0, 0, 0.7)";
    ctx.font = "16px serif";
    for (let row = 0; row < this.textureSheetRows; row++) {
      for (let col = 0; col < this.textureSheetColumns; col++) {
        ctx.fillText(
          row * this.textureSheetColumns + col,
          col * this.textureTileWidth * this.textureSheetScale +
            this.centeredTextureSheetWidth +
            8,
          row * this.textureTileWidth * this.textureSheetScale +
            this.centeredTextureSheetHeight +
            16
        );
        ctx.strokeRect(
          col * this.textureTileWidth * this.textureSheetScale +
            this.centeredTextureSheetWidth,
          row * this.textureTileWidth * this.textureSheetScale +
            this.centeredTextureSheetHeight,
          this.textureTileWidth * this.textureSheetScale,
          this.textureTileWidth * this.textureSheetScale
        );
      }
    }
  }
  draw(ctx) {
    ctx.save();
    if (this.debugSettingsOn) {
      this.displayGrid(ctx);
      this.displayTextureSheet(ctx);
    }
    ctx.restore();
  }
}
