const CANVAS_SIZE = 500;
let points = [];
let edges = [];
let list = [];
let pIndex = 0;
let qIndex = 0;
let rIndex = 0;
let isValid = true;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  for (let i = 0; i < 20; i++) {
    points.push(createVector(int(random(width)), int(random(height))));
  }

  frameRate(60);
}

function draw() {
  background(255);

  stroke(0);
  strokeWeight(5);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }

  strokeWeight(2);

  const p = points[pIndex];
  const q = points[qIndex];
  const r = points[rIndex];
  if (p !== q) {
    const pq = p5.Vector.sub(q, p);
    if (r !== p || r !== q) {
      const pr = p5.Vector.sub(r, p);
      const cross = pq.cross(pr);
      if (cross.z < 0) {
        isValid = false;
      }
    }
  }

  rIndex++;
  if (rIndex == points.length) {
    if(isValid) {
      edges.push([points[pIndex], points[qIndex]]);
    }
    isValid = true;
    rIndex = 0;
    qIndex++;
    if (qIndex == points.length) {
      qIndex = 0;
      pIndex++;
      if (pIndex == points.length) {
        noLoop();
      }
    }
  }

  strokeWeight(1);
  noFill();
  stroke(255, 0, 0);
  ellipse(p.x, p.y, 8, 8);

  stroke(0, 255, 0);
  ellipse(q.x, q.y, 8, 8);
  line(p.x, p.y, q.x, q.y);

  stroke(0, 0, 255);
  ellipse(r.x, r.y, 8, 8);
  line(p.x, p.y, r.x, r.y);

  stroke(0, 255, 0);
  for(let i=0; i<edges.length; i++) {
    line(edges[i][0].x, edges[i][0].y, edges[i][1].x, edges[i][1].y);
  }
}