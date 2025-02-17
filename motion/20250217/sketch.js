let counter = 0;
let rectNumber = 2;

function setup() {
  createCanvas(500, 500);
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  for (let i = 0; i < rectNumber; i++) {
    if (i < rectNumber - 1) {
      rect(0, i * (height - counter) / (rectNumber - 1), width, (height - counter) / (rectNumber - 1), 40);
    } else {
      rect(0, i * (height - counter) / (rectNumber - 1), width, counter, 40);
    }
  }
  counter++;
  if (counter > height) {
    counter = 0;
    rectNumber++;
    if (rectNumber > 4) {
      rectNumber = 2;
    }
  }
}