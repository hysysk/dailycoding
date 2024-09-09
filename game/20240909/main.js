import { GamePad } from "./modules/GamePad.js";

const init = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  canvas.width = W;
  canvas.height = H;

  const gamePad = new GamePad(canvas, 40, 0, W, H);

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

  let counter = 0;

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "aquamarine";
    ctx.rect(0, 0, W, H - 390);
    ctx.fill();

    gamePad.draw();
    requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", init);