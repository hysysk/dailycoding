const FRAME_RATE = 30;
const DURATION = 3000;
const TOTAL_FRAME_NUMBER = FRAME_RATE * DURATION / 1000;
const CIRCLE_SIZE = 20;
const easings = [
  Easing.circleIn, Easing.cubicIn, Easing.sinIn, Easing.expIn,
  Easing.circleOut, Easing.cubicOut, Easing.sinOut, Easing.expOut,
  Easing.circleInOut, Easing.cubicInOut, Easing.sinInOut, Easing.expInOut
];

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
  fill(255);
}

function draw() {
  background(0, 50);
  let currentTime = (frameCount % TOTAL_FRAME_NUMBER) / TOTAL_FRAME_NUMBER;
  for(let i=0; i<easings.length; i++) {
    let x = width / easings.length * i + 20;
    let y = easings[i](currentTime) * height;
    ellipse(x, y, CIRCLE_SIZE, CIRCLE_SIZE);
  }
}
