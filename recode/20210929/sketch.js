function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let v = width / 2;
  let k = height / 2;
  let c = 2 * Math.PI / 255;
  let h = 0.5;
  for (let j = 0; j < width; j++) {
    let x = j * c - Math.PI;
    y = Math.cos(x) - Math.cos(3 * x) / 3 + Math.cos(5 * x) / 5 - Math.cos(7 * x) / 7;
    y = int(v + k * y + h);
    line(j, v, j, y);
  }
}