const ROTATION = 100;
const DOT_NUMBER = 500;
const SPACING = 10;

function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  beginShape();
  for(let i=1; i<DOT_NUMBER+1; i++) {
    let radius = SPACING * sqrt(i);
    let theta = i * radians(ROTATION);

    let x = radius * cos(theta);
    let y = radius * sin(theta);

    vertex(width/2 + x, height/2 + y);
  }
  endShape();
}
