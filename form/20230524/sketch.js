class Point2D {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Line {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  static fromPoints(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return new Line(dy, -dx, dx * y1 - dy * x1);
  }

  getIntersectionPoint(l) {
    const d = this.a * l.b - l.a * this.b;
    if (Math.abs(d) <= 0.001) {
      return null;
    }
    const x = (this.b * l.c - l.b * this.c) / d;
    const y = (l.a * this.c - this.a * l.c) / d;
    return new Point2D(x, y);
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
for (let i = 0; i < 4; i++) {
  points.push(Math.random() * 500);
}

const l1 = Line.fromPoints(0, points[0], 500, points[1]);
const l2 = Line.fromPoints(points[2], 0, points[3], 500);
const p = l1.getIntersectionPoint(l2);

ctx.strokeStyle = "rgb(0, 0, 0)";

// Line 1
ctx.beginPath();
ctx.moveTo(0, points[0]);
ctx.lineTo(500, points[1]);
ctx.stroke();

// Line 2
ctx.beginPath();
ctx.moveTo(points[2], 0);
ctx.lineTo(points[3], 500);
ctx.stroke();

// Intersection
ctx.beginPath();
ctx.arc(p.a, p.b, 8, 0, Math.PI * 2);
ctx.stroke();