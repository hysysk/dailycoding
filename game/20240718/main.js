import { Vector2 } from "./modules/Vector2.js";
import { Player } from "./modules/Player.js";
import { Floor } from "./modules/Floor.js";
import { GamePad } from "./modules/GamePad.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = 500;
const H = 500;
const camera = new Vector2(0, 0);

let player = new Player(ctx, new Vector2(W / 2, 0), new Vector2(0, 0));
player.pos.sub(new Vector2(player.size.w / 2, player.size.h));

let floors = [];
for (let i = 0; i < 5; i++) {
  floors.push(new Floor(ctx, new Vector2(i * 100, H / 2), 100, 8));
}

const gamePad = new GamePad(canvas, 0, 0, W, H);

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

  ctx.save();
  camera.x = player.pos.x - W / 2 + player.size.w / 2;
  camera.y = player.pos.y - H / 2 + player.size.h / 2;
  ctx.translate(-camera.x, -camera.y);

  floors.forEach((floor) => {
    player.checkFloor(floor);
    floor.draw();
  });

  player.checkBounds(W, H);
  player.update(gamePad.buttons);
  player.draw();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  gamePad.draw();
  requestAnimationFrame(draw);
};
draw();