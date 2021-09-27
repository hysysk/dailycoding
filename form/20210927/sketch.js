function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let u = width / 2;
  let v = height / 2;
  let h = 0.5;
  for (let k = -height / 2; k < height / 2; k += 20) {
    for (let x = -width / 2; x < width / 2; x += 5) {
      let xx = int(u + x + h);
      let y = -k * x * x / (width * 50) + k;
      y = int(v + y + h);
      if (x == -width / 2) {
        x1 = xx;
        y1 = y;
      } else {
        x2 = xx;
        y2 = y;
        line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
      }
    }
  }
}