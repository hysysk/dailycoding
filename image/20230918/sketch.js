const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();

const effect = (ef) => {
  let sumR = [];
  let sumG = [];
  let sumB = [];
  let maskX;
  let sq;
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
    let i = (y * h + x) * 4;
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

  sq = (2 * ef + 1) * (2 * ef + 1);

  for (y = 0; y < h; y++) {
    for (let xx = -ef; xx <= ef; xx++) {
      maskX = xx + ef;
      sumR[maskX] = sumG[maskX] = sumB[maskX] = 0;
      for (let yy = -ef; yy <= ef; yy++) {
        let d = getPixel(xx, y + yy);
        sumR[maskX] += d[0];
        sumG[maskX] += d[1];
        sumB[maskX] += d[2];
      }
    }

    for (x = 0; x < w; x++) {
      r = g = b = 0;
      maskX = ef + ef;
      sumR[maskX] = sumG[maskX] = sumB[maskX] = 0;
      for (let yy = -ef; yy <= ef; yy++) {
        let d = getPixel(x + ef, y + yy);
        sumR[maskX] += d[0];
        sumG[maskX] += d[1];
        sumB[maskX] += d[2];
      }
      for (let xx = 0; xx <= maskX; xx++) {
        r += sumR[xx];
        g += sumG[xx];
        b += sumB[xx];
        sumR[xx] = sumR[xx + 1];
        sumG[xx] = sumG[xx + 1];
        sumB[xx] = sumB[xx + 1];
      }
      setPixel(x, y, [r / sq, g / sq, b / sq]);
    }
  }
  ctx.putImageData(outputImageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect(50);
}

img.src = "../../assets/img.jpg";