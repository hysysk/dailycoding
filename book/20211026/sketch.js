const ELLIPSE_SIZE = 4;
const TEXT_OFFSET = 5;

function setup() {
  createCanvas(500, 500);
  background(255);
  fill(0);
}

function draw() {
  background(255);

  let xk = width / 2;
  let yk = height / 2;
  let xl = mouseX;
  let yl = mouseY;

  let xlk = xl - xk;
  let ylk = yl - yk;
  let rsq = xlk * xlk + ylk * ylk;
  let r = sqrt(rsq);

  line(xk, yk, xl, yl);
  ellipse(xk, yk, ELLIPSE_SIZE, ELLIPSE_SIZE);
  ellipse(xl, yl, ELLIPSE_SIZE, ELLIPSE_SIZE);
  text("K", xk + TEXT_OFFSET, yk + TEXT_OFFSET);
  text("L", xl + TEXT_OFFSET, yl + TEXT_OFFSET);
  text("r: " + r.toFixed(2), (xk + xl)/2 + TEXT_OFFSET, (yk+yl)/2 + TEXT_OFFSET);
}