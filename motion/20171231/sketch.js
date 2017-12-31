const FRAME_RATE = 30;
const DURATION = 3000;
const TOTAL_FRAME_NUMBER = FRAME_RATE * DURATION / 1000;
const CIRCLE_SIZE = 30;
const RADIUS = 140;
const easings = [
  Easing.circleInOut, Easing.cubicInOut, Easing.sinInOut, Easing.expInOut
];
const fillColors = [
  "#FFCE00", "#2AA2EF", "#81CF28", "#FF0505"
]

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(0);
  let currentTime = (frameCount % TOTAL_FRAME_NUMBER) / TOTAL_FRAME_NUMBER;

  for(let i=0; i<4; i++) {
    let x = width/2 + cos(easings[i](currentTime) * Math.PI * 2 - Math.PI/2) * RADIUS;
    let y = height/2 + sin(easings[i](currentTime) * Math.PI * 2 - Math.PI/2) * RADIUS;
    fill(fillColors[i]);
    ellipse(x, y, CIRCLE_SIZE, CIRCLE_SIZE);
  }
}
