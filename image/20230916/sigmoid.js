const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const gammaSlider = document.getElementById("gamma");
const img = new Image();
let gamma = +gammaSlider.value / 100;
let colorTable = [];

gammaSlider.addEventListener("input", () => {
  gamma = +gammaSlider.value / 100;
  ctx.drawImage(img, 0, 0);
  effect();
});

const effect = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Create a color table
  let a = 0;
  for (let i = 0; i < 256; i++) {
    a = (i - 128) / 255;
    a *= gamma;
    colorTable[i] = Math.floor(255 / (1 + Math.exp(-a)));
  }

  // Get a pixel value and look up the color table
  for (let i = 0; i < data.length; i += 4) {
    data[i] = colorTable[data[i]];
    data[i + 1] = colorTable[data[i + 1]];
    data[i + 2] = colorTable[data[i + 2]];
  }

  ctx.putImageData(imageData, 0, 0);
}

img.onload = () => {
  ctx.drawImage(img, 0, 0);
  effect();
}

img.src = "../../assets/img.jpg";