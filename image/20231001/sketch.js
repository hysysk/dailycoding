const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();
const blurSize = document.getElementById("size");
const blurDegree = document.getElementById("degree");

const getPatternValue = (mat, n, x, y) => {
  if (x < 0 || y < 0 || x >= n || y >= n) {
    return 0;
  }
  return mat[x + y * n];
}

const linearInterpolate = (mat, n, x1, y1) => {
  let px, py;
  let nx, ny;
  let xRate, yRate;
  let col1, col2, col3, col4;

  nx = Math.floor(x1);
  ny = Math.floor(y1);
  px = Math.floor(nx);
  py = Math.floor(ny);
  xRate = x1 - px;
  yRate = y1 - py;
  col1 = getPatternValue(mat, n, px, py);
  col2 = getPatternValue(mat, n, px, py + 1);
  col3 = getPatternValue(mat, n, px + 1, py);
  col4 = getPatternValue(mat, n, px + 1, py + 1);

  let d = col1 * (1.0 - xRate) + col3 * xRate;
  let e = col2 * (1.0 - xRate) + col4 * xRate;
  f = d * (1.0 - yRate) + e * yRate;
  let res = Math.floor(f + 0.5);
  if (res > 255) {
    res = 255;
  } else if (res < 0) {
    res = 0;
  }
  return res;
}

const createBlurPattern = (n, angle, pattern) => {
  let tmpX, tmpY, tmpV;
  let mat;
  let xx, yy, i;
  let vv;
  let hf = Math.floor(n / 2);
  let rad;
  let fx, fy, tx, ty;
  let sinT, cosT;

  tmpX = new Array(n * n);
  tmpY = new Array(n * n);
  tmpV = new Array(n * n);
  mat = new Array(n * n);

  for (yy = 0; yy < n; yy++) {
    for (xx = 0; xx < n; xx++) {
      mat[xx + yy * n] = 0;
    }
  }

  for (xx = 0; xx < n; xx++) {
    vv = 1;
    mat[xx + hf * n] = vv;
  }
  
  mat[hf + hf * n] = 3;

  rad = angle * Math.PI / 180;
  sinT = Math.sin(rad);
  cosT = Math.cos(rad);

  i = 0;
  for (yy = 0; yy < n; yy++) {
    for (xx = 0; xx < n; xx++) {
      tx = xx - hf;
      ty = yy - hf;
      fx = cosT * tx + sinT * ty + hf;
      fy = -sinT * tx + cosT * ty + hf;
      vv = linearInterpolate(mat, n, fx, fy);
      tmpX[i] = xx - hf;
      tmpY[i] = yy - hf;
      tmpV[i] = vv;
      i++;
    }
  }
  pattern.x = tmpX;
  pattern.y = tmpY;
  pattern.value = tmpV;

  return i;
}

const effect = (ef, angle) => {
  let r, g, b, o;
  let x = 0;
  let y = 0;
  let w = canvas.width;
  let h = canvas.height;
  let pattern = {
    x: [],
    y: [],
    value: [],
  };
  let mx = 2 * ef + 1;
  let n = createBlurPattern(mx, angle, pattern);

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
      r = g = b = o = 0;
      for (let i = 0; i < n; i++) {
        let d = getPixel(x + pattern.x[i], y + pattern.y[i]);
        r += d[0] * pattern.value[i];
        g += d[1] * pattern.value[i];
        b += d[2] * pattern.value[i];
        o += pattern.value[i];
      }

      setPixel(x, y, [r / o, g / o, b / o]);
    }
  }
  ctx.putImageData(outputImageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect(+blurSize.value, +blurDegree.value);

  blurSize.addEventListener("change", (e) => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(img, 0, 0);
    effect(+e.target.value, +blurDegree.value);
  });

  blurDegree.addEventListener("change", (e) => {
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(img, 0, 0);
    effect(+blurSize.value, +e.target.value);
  });
}

img.src = "../../assets/img.jpg";