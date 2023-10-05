const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();
const blurSize = document.getElementById("size");
const NN = 17;
const NF = 8;

const effect = (ef) => {
  let r, g, b, o;
  let x = 0;
  let y = 0;
  let w = canvas.width;
  let h = canvas.height;
  let pattern;

  let inputImageData = ctx.getImageData(0, 0, w, h);
  let inputData = inputImageData.data;
  let outputImageData = ctx.createImageData(w, h);
  let outputData = outputImageData.data;

  const getPixel = (x, y) => {
    if (x < 0) x = 0;
    if (x >= w) x = w - 1;
    if (y < 0) y = 0;
    if (y >= h) y = h - 1;
    let i = (y * w + x) * 4;
    return [inputData[i], inputData[i + 1], inputData[i + 2]];
  }

  const setPixel = (x, y, color) => {
    if (x < 0) return;
    if (x >= w) return;
    if (y < 0) return;
    if (y >= h) return;

    outputData[(y * w + x) * 4] = Math.floor(color[0]);
    outputData[(y * w + x) * 4 + 1] = Math.floor(color[1]);
    outputData[(y * w + x) * 4 + 2] = Math.floor(color[2]);
    outputData[(y * w + x) * 4 + 3] = 255;
  }

  let ox = w / 2;
  let oy = h / 2;
  let dx = w - ox;
  let dy = h - oy;
  let distMax = Math.sqrt(dx * dx + dy * dy);
  let rad;
  let dist;

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      r = g = b = o = 0;
      dx = x - ox;
      dy = y - oy;
      if (dx !== 0) {
        rad = Math.atan(dy / dx);
      } else {
        rad = Math.PI / 2;
      }

      dist = Math.sqrt(dx * dx + dy * dy);
      let rate = ef * dist / distMax;
      rate /= NF;

      for (let i = 0; i < NN; i++) {
        if (i === NF) {
          pattern = 3;
        } else {
          pattern = 1;
        }
        let distI = (i - NF) * rate;
        let xx = Math.floor(distI * Math.cos(rad)) + x;
        let yy = Math.floor(distI * Math.sin(rad)) + y;

        let d = getPixel(xx, yy);
        r += d[0] * pattern;
        g += d[1] * pattern;
        b += d[2] * pattern;
        o += pattern;
      }

      setPixel(x, y, [r / o, g / o, b / o]);
    }
  }
  ctx.putImageData(outputImageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect(+blurSize.value);

  blurSize.addEventListener("change", (e) => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(img, 0, 0);
    effect(+e.target.value);
  });
}

img.src = "../../assets/img.jpg";