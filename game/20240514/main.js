const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = 500;
const H = 500;

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isPressed = false;
  }
  isHit(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
  }
}

class GamePad {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.left = new Button(this.x, H - 140, 80, 60);
    this.up = new Button(this.x + 80, H - 220, 60, 80);
    this.right = new Button(this.x + 140, H - 140, 80, 60);
    this.down = new Button(this.x + 80, H - 80, 60, 80);
    this.a = new Button(W - 60, H - 140, 60, 60);
    this.b = new Button(W - 160, H - 140, 60, 60);
  }

  handleTouchStart(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;

      if (this.left.isHit(x, y)) {
        this.left.isPressed = true;
      }
      if (this.up.isHit(x, y)) {
        this.up.isPressed = true;
      }
      if (this.right.isHit(x, y)) {
        this.right.isPressed = true;
      }
      if (this.down.isHit(x, y)) {
        this.down.isPressed = true;
      }
      if (this.a.isHit(x, y)) {
        this.a.isPressed = true;
      }
      if (this.b.isHit(x, y)) {
        this.b.isPressed = true;
      }
    }
  }

  handleTouchMove(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;

      if (this.left.isHit(x, y)) {
        this.left.isPressed = true;
      } else {
        this.left.isPressed = false;
      }

      if (this.up.isHit(x, y)) {
        this.up.isPressed = true;
      } else {
        this.up.isPressed = false;
      }

      if (this.right.isHit(x, y)) {
        this.right.isPressed = true;
      } else {
        this.right.isPressed = false;
      }

      if (this.down.isHit(x, y)) {
        this.down.isPressed = true;
      } else {
        this.down.isPressed = false;
      }

      if (this.a.isHit(x, y)) {
        this.a.isPressed = true;
      } else {
        this.a.isPressed = false;
      }

      if (this.b.isHit(x, y)) {
        this.b.isPressed = true;
      } else {
        this.b.isPressed = false;
      }
    }
  }

  handleTouchEnd(e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;
      
      if (this.left.isHit(x, y)) {
        this.left.isPressed = false;
      }
      if (this.up.isHit(x, y)) {
        this.up.isPressed = false;
      }
      if (this.right.isHit(x, y)) {
        this.right.isPressed = false;
      }
      if (this.down.isHit(x, y)) {
        this.down.isPressed = false;
      }
      if (this.a.isHit(x, y)) {
        this.a.isPressed = false;
      }
      if (this.b.isHit(x, y)) {
        this.b.isPressed = false;
      }
    }
  }

  render() {
    this.left.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.left.x, this.left.y, this.left.w, this.left.h);
    this.up.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.up.x, this.up.y, this.up.w, this.up.h);
    this.right.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.right.x, this.right.y, this.right.w, this.right.h);
    this.down.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.down.x, this.down.y, this.down.w, this.down.h);
    this.a.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.a.x, this.a.y, this.a.w, this.a.h);
    this.b.isPressed ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.b.x, this.b.y, this.b.w, this.b.h);

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("B", this.b.x + 30, this.b.y + 40);
    this.ctx.fillText("A", this.a.x + 30, this.a.y + 40);

    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
  }
}

const gamePad = new GamePad(ctx, 0, 0);

let canvasRect = canvas.getBoundingClientRect();

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  gamePad.handleTouchStart(e);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  gamePad.handleTouchMove(e);
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  gamePad.handleTouchEnd(e);
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ctx.font = "24px sans-serif";

const draw = () => {
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "black";
  ctx.textAlign = "left";

  gamePad.render();

  ctx.textAlign = "center"
  gamePad.left.isPressed ? ctx.fillText("LEFT", 250, 30) : null;
  gamePad.right.isPressed ? ctx.fillText("RIGHT", 250, 60) : null;
  gamePad.up.isPressed ? ctx.fillText("UP", 250, 90) : null;
  gamePad.down.isPressed ? ctx.fillText("DOWN", 250, 120) : null;
  gamePad.a.isPressed ? ctx.fillText("A", 250, 150) : null;
  gamePad.b.isPressed ? ctx.fillText("B", 250, 180) : null;

  requestAnimationFrame(draw);
};
draw();