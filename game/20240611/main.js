import { Vector2 } from "./modules/Vector2.js";
import { Player } from "./modules/Player.js";
import { Floor } from "./modules/Floor.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = 500;
const H = 500;

let player = Player.create(new Vector2(W / 2, H / 2));
player.pos.sub(new Vector2(player.size.w / 2, player.size.h));

let floor = new Floor(new Vector2(0, H / 2), { w: W, h: H / 2 });

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
  constructor(ctx, x, y) {
    this.ctx = ctx;
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
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;

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
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;

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
      const x = e.changedTouches[i].clientX - canvasRect.left;
      const y = e.changedTouches[i].clientY - canvasRect.top;

      for (const key of Object.keys(this.buttons)) {
        const button = this.buttons[key];
        if (button.isHit(x, y)) {
          button.touchedId = "";
        }
      };
    }
  }

  render() {
    for (const key of Object.keys(this.buttons)) {
      const button = this.buttons[key];
      button.touchedId ? this.ctx.fillStyle = "red" : this.ctx.fillStyle = "black";
      this.ctx.fillRect(button.x, button.y, button.w, button.h);
    }
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

  // Draw the ground
  ctx.strokeStyle = "black";
  ctx.moveTo(floor.pos.x, floor.pos.y);
  ctx.lineTo(floor.size.w, floor.pos.y);
  ctx.stroke();

  player.update(gamePad.buttons);

  // Check if the player is on the ground
  if (player.pos.y + player.size.h > floor.pos.y) {
    player.pos.y = floor.pos.y - player.size.h;
    player.speed.y = 0;
  }

  // Draw the player
  ctx.fillStyle = "black";
  ctx.fillRect(player.pos.x, player.pos.y, player.size.w, player.size.h);
  ctx.stroke();

  gamePad.render();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  requestAnimationFrame(draw);
};
draw();