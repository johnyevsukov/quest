/**
 * @type { HTMLCanvasElement }
 */

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x = 20;
    this.y = 20;
    this.speed = 5;
    this.color = "blue";
  }
  update(deltaTime) {
    // player key input movement
    if (this.game.input.keys.includes("w")) {
      this.y -= this.speed;
    }
    if (this.game.input.keys.includes("s")) {
      this.y += this.speed;
    }
    if (this.game.input.keys.includes("a")) {
      this.x -= this.speed;
    }
    if (this.game.input.keys.includes("d")) {
      this.x += this.speed;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
