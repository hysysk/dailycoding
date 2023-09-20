const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;

const offCanvas = document.getElementById("offCanvas");
const offCtx = offCanvas.getContext("2d");

let frame = 0;
const gridNumber = 50;
const tileSize = W / gridNumber;

offCtx.font = "bold 500px sans-serif";
const text = offCtx.measureText("A");
const textWidth = text.width;
const textHeight = text.actualBoundingBoxAscent + text.actualBoundingBoxDescent;
offCtx.fillText("A", (W - textWidth) / 2, textHeight + (H - textHeight) / 2);

const draw = () => {
  ctx.clearRect(0, 0, 500, 500);
  for (let x = 0; x < gridNumber; x++) {
    for (let y = 0; y < gridNumber; y++) {
      const distortion = Math.sin(frame * 0.025 + x * 0.125 + y * 0.125) * 30;
      const sx = x * tileSize + distortion;
      const sy = y * tileSize;
      const sw = tileSize;
      const sh = tileSize;
      const dx = x * tileSize;
      const dy = y * tileSize;
      const dw = tileSize;
      const dh = tileSize;
      ctx.drawImage(offCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
  frame++;
  requestAnimationFrame(draw);
};
requestAnimationFrame(draw);