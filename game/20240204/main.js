import { Vector2 } from "./modules/Vector2.js";
import { Player } from "./modules/Player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = 500;
const H = 500;

let player = Player.create(new Vector2(W / 2, H / 2));
player.pos.sub(new Vector2(player.size.w / 2, player.size.h));

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
const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight"]);

const draw = () => {
  ctx.clearRect(0, 0, W, H);

  // Draw the ground
  ctx.strokeStyle = "black";
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);

  // Update the player position
  player.update(arrowKeys);

  // Draw the player
  ctx.fillStyle = "black";
  ctx.fillRect(player.pos.x, player.pos.y, player.size.w, player.size.h);
  ctx.stroke();

  requestAnimationFrame(draw);
};
draw();