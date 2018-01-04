const FRAME_RATE = 30;
const DURATION = 1000;
const TOTAL_FRAME_NUMBER = FRAME_RATE * DURATION / 1000;
const GRID_SIZE = 10;
const CIRCLE_SIZE = 20;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(0);
  for(let j=0; j<GRID_SIZE; j++) {
    for(let i=0; i<GRID_SIZE; i++) {
      push();
      translate(i * width/GRID_SIZE + 25, j * height/GRID_SIZE + 25);
      let delay = i*5 + j*5;
      let progress = max(frameCount-delay, 0)%TOTAL_FRAME_NUMBER/TOTAL_FRAME_NUMBER;
      let radian = Easing.expOut(progress) * TWO_PI;
      rotate(radian);
      arc(0, 0, CIRCLE_SIZE, CIRCLE_SIZE, 0, PI);
      pop();
    }
  }
}
