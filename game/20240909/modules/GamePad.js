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
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasRect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext("2d");
    this.x = 30;
    this.y = this.canvasRect.height - 330;
    this.w = this.canvasRect.width - 60;
    this.h = 280;
    this.buttons = {
      left: new Button(this.x, this.y + 100, 100, 80),
      up: new Button(this.x + 100, this.y, 80, 100),
      right: new Button(this.x + 180, this.y + 100, 100, 80),
      down: new Button(this.x + 100, this.y + 180, 80, 100),
      a: new Button(this.w - 60, this.y + 85, 90, 90),
      b: new Button(this.w - 170, this.y + 105, 90, 90)
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
      if (key === "a" || key === "b") {
        this.ctx.beginPath();
        this.ctx.arc(button.x + button.w / 2, button.y + button.h / 2, button.w / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.beginPath();
        this.ctx.roundRect(button.x, button.y, button.w, button.h, 20);
        this.ctx.fill();
      }
    }
  }
}

export { GamePad }