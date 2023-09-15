const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();

const effect = () => {
  let p1 = Number.POSITIVE_INFINITY;
  let p2 = Number.NEGATIVE_INFINITY;
  let pValue;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    pValue = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (p1 > pValue) p1 = pValue;
    if (p2 < pValue) p2 = pValue;
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i] = (255 * (data[i] - p1) / (p2 - p1));
    data[i + 1] = (255 * (data[i + 1] - p1) / (p2 - p1));
    data[i + 2] = (255 * (data[i + 2] - p1) / (p2 - p1));
  }

  ctx.putImageData(imageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect();
}

img.src = "../../assets/img.jpg";