let w = window.innerWidth;
let h = window.innerHeight;

let windowPixels;
let totalPixelNumber;
let pixelIndex;
let paintPerFrame;
const DURATION = 3000;
const FRAME_PER_SECOND = 60;

function setup() {
  createCanvas(w, h);
  background(255);
  colorMode(HSB, 100);
  stroke(random(0, 100), 100, 100);

  initArray();

  pixelIndex = 0;
  totalPixelNumber = windowPixels.length - 1;
  paintPerFrame = totalPixelNumber / (FRAME_PER_SECOND / 1000 * DURATION);
  frameRate(FRAME_PER_SECOND);
}

function draw() {
  for(let i = 0; i < paintPerFrame; i++) {
    if(pixelIndex <= totalPixelNumber) {
      let value = windowPixels[pixelIndex];
      let x = value % w;
      let y = floor(value / w);
      point(x, y);
    }
    pixelIndex++;
  }
}

function mouseReleased() {
  pixelIndex = 0;
  stroke(random(0, 100), 100, 100);
  initArray();
}

function touchEnded() {
  pixelIndex = 0;
  stroke(random(0, 100), 100, 100);
  initArray();
}

function initArray() {
  windowPixels = [];
  for(let i = 0; i < w * h; i++) {
    windowPixels.push(i);
  }
  shuffleArray(windowPixels);
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let tmp, randomIndex;
  while(currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tmp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmp;
  }
  return array;
}