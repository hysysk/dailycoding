const CANVAS_SIZE = 500;
let points = [];
let edges = [];
let list = [];

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  for (let i = 0; i < 20; i++) {
    points.push(createVector(int(random(width)), int(random(height))));
  }

  strokeWeight(5);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }

  strokeWeight(2);
  // Find convex hull edges
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    for (let j = 0; j < points.length; j++) {
      const q = points[j];
      if (p !== q) {
        const pq = p5.Vector.sub(q, p);
        // Look at the n - 2 other points to see whether they all lie on the right side
        let valid = true;
        for (let k = 0; k < points.length; k++) {
          const r = points[k];
          if (r !== p || r !== q) {
            const pr = p5.Vector.sub(r, p);
            const cross = pq.cross(pr);
            if (cross.z < 0) {
              valid = false;
            }
          }
        }
        if (valid) {
          edges.push([p, q]);
        }
      }
    }
  }

  const e = edges.shift();
  list.push(e[0]);

  let destination = e[1];
  while (edges.length > 0) {
    for (let i = edges.length - 1; i >= 0; i--) {
      if (destination === edges[i][0]) {
        list.push(edges[i][0]);
        destination = edges[i][1];
        edges.splice(i, 1);
      }
    }
  }

  noFill();
  beginShape();
  for (let i = 0; i < list.length; i++) {
    vertex(list[i].x, list[i].y);
  }
  endShape(CLOSE);
}