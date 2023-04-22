let center1;
let center2;
let radius1;
let radius2;
let velocity1;
let velocity2;

function setup() {
  createCanvas(500, 500);
  fill(0);
  noStroke();

  center1 = createVector(150, 250);
  center2 = createVector(350, 250);
  radius1 = random(50) + 50;
  radius2 = random(50) + 50;
  velocity1 = createVector(1, 1);
  velocity2 = createVector(-1, -1);
}

function draw() {
  background(255);

  let diff = p5.Vector.sub(center2, center1);
  let angle = atan2(diff.y, diff.x);
  let dist = diff.mag();
  let spread = acos((radius1 - radius2) / dist);

  let a1 = angle + spread;
  let a2 = angle - spread;
  let a3 = angle + PI - (PI - spread);
  let a4 = angle - PI + (PI - spread);

  let p1 = getPointOfTangency(center1, a1, radius1);
  let p2 = getPointOfTangency(center1, a2, radius1);
  let p3 = getPointOfTangency(center2, a3, radius2);
  let p4 = getPointOfTangency(center2, a4, radius2);

  ellipse(center1.x, center1.y, radius1 * 2, radius1 * 2);
  ellipse(center2.x, center2.y, radius2 * 2, radius2 * 2);

  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p4.x, p4.y);
  vertex(p3.x, p3.y);
  endShape(CLOSE);

  if (center1.x - radius1 <= 0 || center1.x + radius1 >= width) {
    velocity1.x *= -1;
  }
  if (center1.y - radius1 <= 0 || center1.y + radius1 >= height) {
    velocity1.y *= -1;
  }
  if (center2.x - radius2 <= 0 || center2.x + radius2 >= width) {
    velocity2.x *= -1;
  }
  if (center2.y - radius2 <= 0 || center2.y + radius2 >= height) {
    velocity2.y *= -1;
  }

  center1.add(velocity1);
  center2.add(velocity2);
}

function getPointOfTangency(p, a, r) {
  return createVector(p.x + r * cos(a), p.y + r * sin(a));
}
