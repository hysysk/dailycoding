function setup() {
  createCanvas(500, 500);
  stroke(0);
  strokeWeight(5);
  noFill();

  let center1 = createVector(150, 250);
  let center2 = createVector(350, 250);
  let radius1 = 100;
  let radius2 = 60;

  let diff = p5.Vector.sub(center2, center1);
  let angle = atan2(diff.y, diff.x);
  let dist = diff.mag();
  let spread = acos((radius1 - radius2)/dist);

  let a1 = angle + spread;
  let a2 = angle - spread;
  let a3 = angle + PI - (PI - spread);
  let a4 = angle - PI + (PI - spread);

  let p1 = getPointOfTangency(center1, a1, radius1);
  let p2 = getPointOfTangency(center1, a2, radius1);
  let p3 = getPointOfTangency(center2, a3, radius2);
  let p4 = getPointOfTangency(center2, a4, radius2);

  ellipse(center1.x, center1.y, radius1*2, radius1*2);
  ellipse(center2.x, center2.y, radius2*2, radius2*2);

  beginShape();
  vertex(p1.x, p1.y);
  vertex(p3.x, p3.y);
  endShape();

  beginShape();
  vertex(p2.x, p2.y);
  vertex(p4.x, p4.y);
  endShape();

  beginShape();
  vertex(center1.x, center1.y);
  vertex(p1.x, p1.y);
  endShape();

  beginShape();
  vertex(center2.x, center2.y);
  vertex(p3.x, p3.y);
  endShape();

  beginShape();
  vertex(center1.x, center1.y);
  vertex(p2.x, p2.y);
  endShape();

  beginShape();
  vertex(center2.x, center2.y);
  vertex(p4.x, p4.y);
  endShape();
}

function getPointOfTangency(p, a, r) {
  return createVector(p.x + r * cos(a), p.y + r * sin(a));
}
