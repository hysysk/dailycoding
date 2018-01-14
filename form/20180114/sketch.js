const CIRCLE_RADIUS = 50;
const GRID_SIZE = 120;
const OFFSET = 70;

function setup() {
  createCanvas(500, 500);
  background(0);

  stroke(255);
  noFill();

  let x = 0;
  let y = height/2;
  let size = 30;
  let nextSize = size;
  let nextAngle = 0;

  beginShape();
  while(x < width + size) {
    ellipse(x, y, size, size);
    vertex(x, y);

    nextSize = random(30, 100);
    nextAngle = random(-HALF_PI/2, HALF_PI/2);
    x = x + cos(nextAngle) * (nextSize/2 + size/2);
    y = y + sin(nextAngle) * (nextSize/2 + size/2);
    size = nextSize;
  }
  endShape();
}

function mouseReleased() {
  setup();
}

function touchEnded() {
  setup();
}
