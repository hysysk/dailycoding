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

const trackKeys = (keys) => {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
};
const inputKeys = trackKeys(["ArrowLeft", "ArrowRight", " "]);

const draw = () => {
  ctx.clearRect(0, 0, W, H);

  // Draw the ground
  ctx.strokeStyle = "black";
  ctx.moveTo(floor.pos.x, floor.pos.y);
  ctx.lineTo(floor.size.w, floor.pos.y);

  // Update the player position
  player.update(inputKeys);

  // Check if the player is on the ground
  if (player.pos.y + player.size.h > floor.pos.y) {
    player.pos.y = floor.pos.y - player.size.h;
    player.speed.y = 0;
  }

  // Draw the player
  ctx.fillStyle = "black";
  ctx.fillRect(player.pos.x, player.pos.y, player.size.w, player.size.h);
  ctx.stroke();

  requestAnimationFrame(draw);
};
draw();