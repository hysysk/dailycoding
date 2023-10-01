const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();

const effect = () => {
  let r, g, b;
  let x = 0;
  let y = 0;
  let w = canvas.width;
  let h = canvas.height;

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

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      r = g = b = 0;
      for (let xx = -2; xx <= 2; xx++) {
        let d = getPixel(x + xx, y);
        r += d[0];
        g += d[1];
        b += d[2];
      }

      setPixel(x, y, [r / 5, g / 5, b / 5]);
    }
  }
  ctx.putImageData(outputImageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect();
}

img.src = "../../assets/img.jpg";