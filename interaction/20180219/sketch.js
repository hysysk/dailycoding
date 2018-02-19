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

  vertices.push(createVector(100, 100));
  vertices.push(createVector(400, 100));
  vertices.push(createVector(400, 400));
  vertices.push(createVector(100, 400));
}

function draw() {
  background(0);

  noStroke();
  fill(255);
  textSize(21);
  textFont('Helvetica');
  textAlign(CENTER);
  text("Click, Move, Release", width/2, height/2);

  noFill();
  stroke(255);
  if(isFixed) {
    line(startX, startY, endX, endY);
  } else {
    line(startX, startY, mouseX, mouseY);
  }

  noFill();
  stroke(255);
  beginShape();
  for(let i=0; i<vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  vertex(vertices[0].x, vertices[0].y);
  endShape();

  let ilen = intersection.length;
  if(ilen > 0) {
    noFill();
    stroke(255, 0, 0);
    beginShape();
    for(let i=0; i<ilen; i++) {
      vertex(intersection[i].x, intersection[i].y);
    }
    endShape();
  }
}

function intersect(a, b, da, db) {
  let b2 = b.copy();
  b2.sub(a);
  b2.mult(da / (da - db));
  return p5.Vector.add(a, b2);
}

function assignIntersection(n, d) {
  let vlen = vertices.length;
  let a = vertices[vlen-1];
  let da = p5.Vector.dot(n, a) - d;

  for(let i=0; i<vlen; i++) {
    let b = vertices[i];
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
  assignStartPoint();
}

function touchEnded() {
  assignEndPoint();
}
