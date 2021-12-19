const a = -4;
const b = 7;
const c = -360;

function setup() {
  createCanvas(500, 500);
  background(255);
  fill(0);
}

function draw() {
  background(255);
  text("The line formula: ax + by + c = 0", 0, 10); 
  text("a = " + a + ", b = " + b + ", c = " + c, 0, 25);

  let root = 1.0 / (a * a + b * b);
  let factor = -c * root;
  let x0 = a * factor;
  let y0 = b * factor;
  root = sqrt(root);
  let f = b * root;
  let g = -a * root;
  
  line(x0, y0, x0 + f * 1000, y0 + g * 1000);

  let xj = mouseX;
  let yj = mouseY;
  let absq = a * a + b * b;
  let sr = a * xj + b * yj + c;
  let r = sqrt(sr * sr / absq);
  ellipse(xj, yj, 4, 4);
  text("The shortest distance of the point from the line: " + r.toFixed(2), 0, 40);
}