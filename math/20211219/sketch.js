const CANVAS_SIZE = 500;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  const u = createVector(-1, 1);
  const v = createVector(1, 1);

  strokeWeight(10);

  for (let i = 0; i < 500; i++) {
    let v1 = p5.Vector.mult(u, random(-150, 150));
    let v2 = p5.Vector.mult(v, random(-50, 50));
    let p = p5.Vector.add(v1, v2);
    point(p.x + width/2, p.y + height/2);
  }
}
