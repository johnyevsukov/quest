/**
 * @type { HTMLCanvasElement }
 */

export class Player {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("knightSpriteSheet");
    this.spriteWidth = 48;
    this.spriteHeight = 48;
    this.width = this.spriteWidth * 2;
    this.height = this.spriteHeight * 2;
    this.x = 50;
    this.y = 50;
    this.speed = 100;
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

  update(deltaTime) {
    // player key input movement
    if (this.game.input.keys.includes("w")) {
      this.direction = "up";
      this.y -= this.speed * deltaTime;
      this.game.camera.move(deltaTime, 0, -this.speed);
    }
    if (this.game.input.keys.includes("s")) {
      this.direction = "down";
      this.y += this.speed * deltaTime;
      this.game.camera.move(deltaTime, 0, this.speed);
    }
    if (this.game.input.keys.includes("a")) {
      this.direction = "left";
      this.x -= this.speed * deltaTime;
      this.game.camera.move(deltaTime, -this.speed, 0);
    }
    if (this.game.input.keys.includes("d")) {
      this.direction = "right";
      this.x += this.speed * deltaTime;
      this.game.camera.move(deltaTime, this.speed, 0);
    }
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
      this.spriteWidth;
    let spriteFrameY = this.currentState.sprite[this.direction];

    ctx.drawImage(
      this.image,
      spriteFrameX,
      spriteFrameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    ctx.restore();
  }
}
