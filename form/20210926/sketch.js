function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let v = height / 2;
  let k = height / 2;
  let h = 0.5;
  let p = PI / 9;
  let c = TWO_PI / width;
  let x1, x2, y1, y2;
  for (let n = 0; n < 10; n++) {
    for (let j = 0; j < width; j += 5) {
      let x = j * c;
      let y = int(v - k * sin(x + n * p) + h);
      if (j == 0) {
        x1 = j;
        y1 = y;
      } else {
        x2 = j;
        y2 = y;
        line(x1, y1, x2, y2);
        x1 = x2;
        y1 = y2;
      }
    }
  }
}