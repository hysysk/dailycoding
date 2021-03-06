function setup() {
  const ROTATION = (1 + sqrt(5)) / 2 + 0.3;
  const DOT_NUMBER = 500;
  const DOT_SIZE = 8;
  const SPACING = 10;

  createCanvas(500, 500);
  background(255);
  noStroke();
  fill(0);

  for (let i = 1; i < DOT_NUMBER + 1; i++) {
    let radius = SPACING * sqrt(i);
    let theta = i * ROTATION;

    let x = radius * cos(theta);
    let y = radius * sin(theta);

    ellipse(width / 2 + x, height / 2 + y, DOT_SIZE, DOT_SIZE);
  }
}
