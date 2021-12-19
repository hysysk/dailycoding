function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let data = [-100, -100, 100, -100, 100, 100, -100, 100, -100, -100];
  let a = 1;
  let b = 0.5;
  let c = 0;
  let d = 1;
  let mx = 0;
  let my = 0;

  beginShape();

  for (let i = 0; i < data.length; i += 2) {
    let xb = data[i] * a + data[i + 1] * c;
    let yb = data[i] * b + data[i + 1] * d;
    let xa = xb + mx;
    let ya = yb + my;
    vertex(width/2 - xa, height/2 - ya);
  }

  endShape();
}