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
    this.left = new Button(this.x, H - 100, 60, 40);
    this.up = new Button(this.x + 60, H - 160, 40, 60);
    this.right = new Button(this.x + 100, H - 100, 60, 40);
    this.bottom = new Button(this.x + 60, H - 60, 40, 60);
    this.a = new Button(W - 60, H - 110, 60, 60);
    this.b = new Button(W - 160, H - 110, 60, 60);
    this.pressedButton = "No button";
  }

  render(x, y) {
    if (touch.isPressed && this.left.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "Left";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.left.x, this.left.y, this.left.w, this.left.h);

    if (touch.isPressed && this.up.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "Up";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.up.x, this.up.y, this.up.w, this.up.h);

    if (touch.isPressed && this.right.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "Right";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.right.x, this.right.y, this.right.w, this.right.h);

    if (touch.isPressed && this.bottom.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "Bottom";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.bottom.x, this.bottom.y, this.bottom.w, this.bottom.h);

    if (touch.isPressed && this.a.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "A";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.a.x, this.a.y, this.a.w, this.a.h);

    if (touch.isPressed && this.b.isHit(x, y)) {
      this.ctx.fillStyle = "gray";
      this.pressedButton = "B";
    } else {
      this.ctx.fillStyle = "black";
    }
    this.ctx.fillRect(this.b.x, this.b.y, this.b.w, this.b.h);

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText("B", this.b.x + 30, this.b.y + 40);
    this.ctx.fillText("A", this.a.x + 30, this.a.y + 40);
  }
}

const gamePad = new GamePad(ctx, 0, 0);
let touchPosition = { x: 0, y: 0 };
let touch = {
  isPressed: false,
  positions: { x: 0, y: 0 }
};
let canvasRect = canvas.getBoundingClientRect();

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  touch.isPressed = true;
  touch.positions = { x: e.touches[0].clientX - canvasRect.left, y: e.touches[0].clientY - canvasRect.top };
});

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  touch.isPressed = false;
  gamePad.pressedButton = "No button";
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

ctx.font = "24px sans-serif";

const draw = () => {
  ctx.clearRect(0, 0, W, H);
  gamePad.render(touch.positions.x, touch.positions.y);

  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  if (gamePad.pressedButton !== "No button") {
    ctx.fillText(`${gamePad.pressedButton} is Pressed`, 8, 28);
  }

  requestAnimationFrame(draw);
};
draw();