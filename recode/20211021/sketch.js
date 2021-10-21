function setup() {
  createCanvas(500, 500);
  background(255);
  noFill();

  let data = [-100, -100, 100, -100, 100, 100, -100, 100, -100, -100];
  let rz = 30 * Math.PI / 180;
  let mx = 0;
  let my = 0;

  beginShape();

  for (let i = 0; i < data.length; i += 2) {
    let xb = data[i] * cos(rz) - data[i + 1] * sin(rz);
    let yb = data[i] * sin(rz) + data[i + 1] * cos(rz);
    let xa = xb + mx;
    let ya = yb + my;
    vertex(width/2 - xa, height/2 - ya);
  }

  endShape();
}