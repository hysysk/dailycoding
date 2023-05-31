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

class LineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  getLineIntersectionPoint(l) {
    if (!this.intersects(l)) {
      return null;
    }
    return l.getIntersectionPoint(this.toLine());
  }

  getSegmentIntersectionPoint(s) {
    if (!this.intersectSegments(s)) {
      return null;
    }
    return s.toLine().getIntersectionPoint(this.toLine());
  }

  toLine() {
    return Line.fromPoints(this.x1, this.y1, this.x2, this.y2);
  }

  intersects(l) {
    const t1 = l.a * this.x1 + l.b * this.y1 + l.c;
    const t2 = l.a * this.x2 + l.b * this.y2 + l.c;
    return (t1 * t2) < 0;
  }

  intersectSegments(s) {
    return this.intersects(s.toLine()) && s.intersects(this.toLine());
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
for (let i = 0; i < 8; i++) {
  points.push(Math.random() * 500);
}

const s1 = new LineSegment(points[0], points[1], points[2], points[3]);
const s2 = new LineSegment(points[4], points[5], points[6], points[7]);
const p = s1.getSegmentIntersectionPoint(s2);

ctx.strokeStyle = "rgb(0, 0, 0)";

// Line 1
ctx.beginPath();
ctx.moveTo(points[0], points[1]);
ctx.lineTo(points[2], points[3]);
ctx.stroke();

// Line 2
ctx.beginPath();
ctx.moveTo(points[4], points[5]);
ctx.lineTo(points[6], points[7]);
ctx.stroke();

// Intersection
if (p) {
  ctx.beginPath();
  ctx.arc(p.a, p.b, 8, 0, Math.PI * 2);
  ctx.stroke();
}