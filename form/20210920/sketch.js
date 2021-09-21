function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let a = [6, 20, 12];
  let b = [12, 9, -6];
  let x0 = 0, y0 = 170;
  let x = new Array(3);
  let y = new Array(3);
  for (let k = 0; k < 9; k += 0.4) {
    for (let j = 0; j < 3; j++) {
      x[j] = x0 + k * a[j] * 2.8;
      y[j] = y0 + k * b[j] * 2.8;
    }
    triangle(x[0], y[0], x[1], y[1], x[2], y[2]);
  }
}