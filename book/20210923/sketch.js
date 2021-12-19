function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let k = 5;
  let h = 0.5;
  let x = [40, 460, 460, 40, 40];
  let y = [460, 460, 40, 40, 460];
  let a = new Array(5);
  let b = new Array(5);
  for (let n = 0; n < 15; n++) {
    for (let j = 0; j < 4; j++) {
      line(x[j], y[j], x[j + 1], y[j + 1]);
    }

    for (let j = 0; j < 4; j++) {
      a[j] = x[j] + int((x[j + 1] - x[j]) / k + h);
      b[j] = y[j] + int((y[j + 1] - y[j]) / k + h);
    }

    for (let j = 0; j < 4; j++) {
      x[j] = a[j];
      y[j] = b[j];
    }
    x[4] = x[0];
    y[4] = y[0];
  }
}