let center1;
let center2;
let radius1;
let radius2;

function setup() {
  createCanvas(500, 500);

  center1 = createVector(random(50, 250), random(50, 450));
  center2 = createVector(random(250, 450), random(50, 450));
  radius1 = random(50) + 50;
  radius2 = random(50) + 50;

  strokeWeight(4);
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

  noFill();
  arc(center1.x, center1.y, radius1 * 2, radius1 * 2, a1, a2);
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p3.x, p3.y);
  endShape();

  beginShape();
  vertex(p2.x, p2.y);
  vertex(p4.x, p4.y);
  endShape();
  arc(center2.x, center2.y, radius2 * 2, radius2 * 2, a4, a3);

  fill(0);
  circle(center1.x, center1.y, radius1 * 2 - 16);
  circle(center2.x, center2.y, radius2 * 2 - 16);
}

function getPointOfTangency(p, a, r) {
  return createVector(p.x + r * cos(a), p.y + r * sin(a));
}

function touchEnded() {
  setup();
}