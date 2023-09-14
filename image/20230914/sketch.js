const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
const img = new Image();
let p1 = 0;
let p2 = 255;

const p1Slider = document.getElementById("p1");
const p2Slider = document.getElementById("p2");

p1Slider.addEventListener("input", () => {
  p1 = +p1Slider.value;
  effect();
});

p2Slider.addEventListener("input", () => {
  p2 = +p2Slider.value;
  effect();
});


const effect = () => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = ((p2 - p1) * data[i]) / 255 + p1;
    data[i + 1] = ((p2 - p1) * data[i + 1]) / 255 + p1;
    data[i + 2] = ((p2 - p1) * data[i + 2]) / 255 + p1;
  }
  ctx.putImageData(imageData, 0, 0);
}

img.onload = () => {
  effect();
}

img.src = "../../assets/img.jpg";