/**
 * @type { HTMLCanvasElement }
 */

import { GAME_COLUMNS, GAME_ROWS, GAME_TILE_WIDTH } from "./main.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("knightSpriteSheet");
    /* sprite sheet player cutout dimensions including padding
    (actual player sprite dimensions = 16x16) */
    this.spriteSheetWidth = 48;
    this.spriteSheetHeight = 48;
    // double sprite sheet width and height for game use
    this.spriteWidth = this.spriteSheetWidth * 2;
    this.spriteHeight = this.spriteSheetHeight * 2;
    // player width and height
    this.width = 32;
    this.height = 32;
    // x and y position relative to entire game map
    this.offsetX = this.spriteSheetWidth;
    this.offsetY = this.spriteSheetHeight;
    this.x = 100;
    this.y = 100;
    // this.x = this.offsetX;
    // this.y = this.offsetY;
    // x and y position relative to screen
    this.screenX = 0;
    this.screenY = 0;
    // needed to prevent glitching into / around walls
    this.collisionBuffer = 1;
    // walk speed of 4 tiles per second
    this.speed = GAME_TILE_WIDTH * 4;
    this.maxSpriteFrame = 8;
    this.animationCount = 0;
    this.animationInterval = 0.05;
    this.currentSpriteFrame = 0;
    this.direction = "down";
    this.states = {
      idle: {
        sprite: {
          down: 0,
          right: 48,
          up: 96,
          left: 144,
        },
      },
      walk: {
        sprite: {
          down: 192,
          right: 240,
          up: 288,
          left: 336,
        },
      },
    };
    this.currentState = this.states.idle;
  }

  colide(dir, dirX, dirY) {
    let col = 0;
    let row = 0;

    let left = this.x - this.offsetX + (this.spriteWidth - this.width) / 2;
    let right = this.x - this.offsetX + (this.spriteWidth - this.width);
    let top = this.y - this.offsetY + (this.spriteWidth - this.width) / 2;
    let bottom = this.y - this.offsetY + (this.spriteWidth - this.width);

    let collision =
      this.game.map.isSolidTileAtXY(left, top) ||
      this.game.map.isSolidTileAtXY(right, top) ||
      this.game.map.isSolidTileAtXY(right, bottom) ||
      this.game.map.isSolidTileAtXY(left, bottom);
    if (!collision) {
      return;
    }

    if (dir === "horizontal") {
      if (dirX < 0) {
        col = this.game.map.getCol(left);
        this.x =
          this.width / 2 + this.game.map.getX(col + 1) + this.collisionBuffer;
      } else if (dirX > 0) {
        col = this.game.map.getCol(right);
        this.x =
          -this.width / 2 + this.game.map.getX(col) - this.collisionBuffer;
      }
    } else if (dir === "vertical") {
      if (dirY < 0) {
        row = this.game.map.getRow(top);
        this.y =
          this.height / 2 + this.game.map.getY(row + 1) + this.collisionBuffer;
      } else if (dirY > 0) {
        row = this.game.map.getRow(bottom);
        this.y =
          -this.height / 2 + this.game.map.getY(row) - this.collisionBuffer;
      }
    }
  }

  walk(deltaTime, dirX, dirY) {
    this.x += dirX * this.speed * deltaTime;
    this.colide("horizontal", dirX, dirY);
    this.y += dirY * this.speed * deltaTime;
    this.colide("vertical", dirX, dirY);

    // clamp values
    let minX = this.offsetX - (this.spriteWidth - this.width) / 2;
    let minY = this.offsetY - (this.spriteHeight - this.height) / 2;

    let maxX =
      GAME_COLUMNS * GAME_TILE_WIDTH -
      this.offsetX +
      (this.spriteWidth - this.width) / 2;
    let maxY =
      GAME_ROWS * GAME_TILE_WIDTH -
      this.offsetY +
      (this.spriteHeight - this.height) / 2;

    this.x = Math.max(minX, Math.min(this.x, maxX));
    this.y = Math.max(minY, Math.min(this.y, maxY));
  }

  update(deltaTime) {
    // player key input movement
    let dirX = 0;
    let dirY = 0;
    if (this.game.input.keys.includes("w")) {
      this.direction = "up";
      dirY = -1;
    }
    if (this.game.input.keys.includes("s")) {
      this.direction = "down";
      dirY = 1;
    }
    if (this.game.input.keys.includes("a")) {
      this.direction = "left";
      dirX = -1;
    }
    if (this.game.input.keys.includes("d")) {
      this.direction = "right";
      dirX = 1;
    }
    this.walk(deltaTime, dirX, dirY);
    if (
      this.game.input.keys.includes("w") ||
      this.game.input.keys.includes("s") ||
      this.game.input.keys.includes("a") ||
      this.game.input.keys.includes("d")
    ) {
      this.currentState = this.states.walk;
    } else {
      this.currentState = this.states.idle;
    }
  }

  draw(ctx, deltaTime) {
    ctx.save();

    // delay sprite animation by animationInterval (0.05s)
    if (this.animationCount < this.animationInterval) {
      this.animationCount += deltaTime;
    } else {
      this.currentSpriteFrame++;
      this.animationCount = 0;
    }

    let spriteFrameX =
      (Math.floor(this.currentSpriteFrame) % this.maxSpriteFrame) *
      this.spriteSheetWidth;
    let spriteFrameY = this.currentState.sprite[this.direction];

    ctx.drawImage(
      this.image,
      spriteFrameX,
      spriteFrameY,
      this.spriteSheetWidth,
      this.spriteSheetHeight,
      this.screenX - this.spriteSheetWidth,
      this.screenY - this.spriteSheetHeight,
      this.spriteWidth,
      this.spriteHeight
    );

    ctx.restore();
  }
}
