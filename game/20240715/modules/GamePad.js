class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.touchedId = "";
  }
  isHit(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
  }
}

class GamePad {
  constructor(canvas, x, y, W, H) {
    this.canvas = canvas;
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.buttons = {
      left: new Button(this.x, H - 140, 80, 60),
      up: new Button(this.x + 80, H - 220, 60, 80),
      right: new Button(this.x + 140, H - 140, 80, 60),
      down: new Button(this.x + 80, H - 80, 60, 80),
      a: new Button(W - 60, H - 140, 60, 60),
      b: new Button(W - 160, H - 140, 60, 60)
    };
  }

  handleTouchStart(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - this.canvasRect.left;
      const y = e.changedTouches[i].clientY - this.canvasRect.top;

      for (const key of Object.keys(this.buttons)) {
        const button = this.buttons[key];
        if (button.isHit(x, y)) {
          button.touchedId = e.changedTouches[i].identifier;
        }
      };
    }
  }

  handleTouchMove(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - this.canvasRect.left;
      const y = e.changedTouches[i].clientY - this.canvasRect.top;

      for (const key of Object.keys(this.buttons)) {
        const button = this.buttons[key];
        if (button.isHit(x, y)) {
          button.touchedId = e.changedTouches[i].identifier;
        } else {
          if (button.touchedId === e.changedTouches[i].identifier) {
            button.touchedId = "";
          }
        }
      };
    }
  }

  handleTouchEnd(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - this.canvasRect.left;
      const y = e.changedTouches[i].clientY - this.canvasRect.top;

      for (const key of Object.keys(this.buttons)) {
        const button = this.buttons[key];
        if (button.isHit(x, y)) {
          button.touchedId = "";
        }
      };
    }
  }

  draw() {
    for (const key of Object.keys(this.buttons)) {
      const button = this.buttons[key];
      button.touchedId ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
      this.ctx.fillRect(button.x, button.y, button.w, button.h);
    }
  }
}

export { GamePad }