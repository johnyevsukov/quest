/**
 * @type { HTMLCanvasElement }
 */

export class Player {
  constructor(game) {
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 100;
    this.width = this.spriteWidth * 1.5;
    this.height = this.spriteHeight * 1.5;
    this.x = 20;
    this.y = 20;
    this.speed = 100;
    this.image = document.getElementById("playerSprite");
    this.animationCount = 0;
    this.animationInterval = 0.05;
    this.currentSpriteFrame = 0;
    this.states = {
      idle: {
        sprite: {
          frames: 6,
          frameY: 0,
        },
      },
      walk: {
        sprite: {
          frames: 8,
          frameY: 100,
        },
      },
    };
    this.currentState = this.states.idle;
  }

  update(deltaTime) {
    // player key input movement
    if (this.game.input.keys.includes("w")) {
      this.y -= this.speed * deltaTime;
    }
    if (this.game.input.keys.includes("s")) {
      this.y += this.speed * deltaTime;
    }
    if (this.game.input.keys.includes("a")) {
      this.x -= this.speed * deltaTime;
    }
    if (this.game.input.keys.includes("d")) {
      this.x += this.speed * deltaTime;
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
      (Math.floor(this.currentSpriteFrame) % this.currentState.sprite.frames) *
      this.spriteWidth;
    let spriteFrameY = this.currentState.sprite.frameY;

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
