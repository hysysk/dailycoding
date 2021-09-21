function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let x = new Array(7);
  let y = new Array(7);
  let a = new Array(7);
  let b = new Array(7);
  let u = 250, v = 250;
  let r = 250, h = 0.5;
  let w = 60 * PI / 180;
  for (let j = 0; j < 7; j++) {
    let w1 = j * w;
    x[j] = int(u + r * cos(w1) + h);
    y[j] = int(v + r * sin(w1) + h);
  }

  for (let n = 0; n < 20; n++) {
    for (let j = 0; j < 6; j++) {
      line(x[j], y[j], x[j + 1], y[j + 1]);
    }

    for (let k = 0; k < 6; k++) {
      a[k] = int((x[k] + x[k + 1]) / 2 + h);
      b[k] = int((y[k] + y[k + 1]) / 2 + h);
    }
    a[6] = a[0];
    b[6] = b[0];

    for (let j = 0; j < 7; j++) {
      x[j] = a[j];
      y[j] = b[j];
    }
  }
}