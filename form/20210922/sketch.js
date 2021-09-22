function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let a = 200;
  let b = 200;
  let n = 12;
  let x = new Array(n);
  let y = new Array(n);
  let u = 250, v = 250;
  let h = 0.5;
  let w = (360 / n) * PI / 180;
  for (let j = 0; j < n; j++) {
    w1 = j * w;
    x[j] = int(u + a * cos(w1) + h);
    y[j] = int(v + b * sin(w1) + h);
  }

  for (let i = 0; i < n - 1; i++) {
    for (let j = i; j < n; j++) {
      line(x[i], y[i], x[j], y[j]);
    }
  }
}