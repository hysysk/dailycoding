const FRAME_RATE = 30;
const EPSILON = 0.0001;
let startX, startY, endX, endY;
let isFixed = false;
let vertices = [];
let intersection = [];

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  background(0);
  strokeWeight(8);
  strokeCap(SQUARE);

  vertices.push(createVector(0, height/2));
  vertices.push(createVector(width, height/2));
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  textSize(36);
  textFont('Helvetica');
  textAlign(CENTER);
  text("Click, Move, Release", width/2, height/2 - 24);

  noFill();
  stroke(255);
  if(isFixed) {
    line(startX, startY, endX, endY);
  } else {
    line(startX, startY, mouseX, mouseY);
  }

  noFill();
  stroke(255);
  line(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y);

  if(intersection.length > 0) {
    noStroke();
    fill(255, 0, 0);
    ellipse(intersection[0].x, intersection[0].y, 10, 10);
  }
}

function intersect(a, b, da, db) {
  let b2 = b.copy();
  b2.sub(a);
  b2.mult(da / (da - db));
  return p5.Vector.add(a, b2);
}

function assignIntersection(n, d) {
  let s = vertices.length;
  let a = vertices[1];
  let da = p5.Vector.dot(n, a) - d;

  let b = vertices[0];
  let db = p5.Vector.dot(n, b) - d;

  if(db > EPSILON) {
    if(da < -EPSILON) {
      let p = intersect(b, a, db, da);
      intersection.push(p);
    }
  } else if(db < -EPSILON) {
    if(da > EPSILON) {
      let p = intersect(a, b, da, db);
      intersection.push(p);
    }
  }

  a = b;
  da = db;
}

function assignStartPoint() {
  isFixed = false;
  startX = mouseX;
  startY = mouseY;
}

function assignEndPoint() {
  isFixed = true;
  endX = mouseX;
  endY = mouseY;
  intersection = [];

  let start = createVector(startX, startY);
  let end = createVector(endX, endY);
  let n = p5.Vector.sub(end, start);
  let l = n.mag();
  n.normalize();
  n.set(-n.y, n.x);
  let d = p5.Vector.dot(end, n);
  assignIntersection(n, d);
}

function mousePressed() {
  assignStartPoint();
}

function mouseReleased() {
  assignEndPoint();
}

function touchStarted() {
  assignStart();
}

function touchEnded() {
  assignEndPoint();
}
