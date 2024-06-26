/* listen for player key interaction */

export class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "w" || e.key === "s" || e.key === "a" || e.key === "d") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
