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

class Intersection {
  constructor(segment1, segment2) {
    this.segment1 = segment1;
    this.segment2 = segment2;
  }

  getIntersectionPoint() {
    return this.segment1.getSegmentIntersectionPoint(this.segment2);
  }

  equals(obj) {
    if (obj === this) {
      return true;
    } else if (obj instanceof Intersection) {
      let other = new Intersection(obj.segment1, obj.segment2);
      if (this.segment1.equals(other.segment1) && this.segment2.equals(other.segment2)) {
        return true;
      } else if (this.segment1.equals(other.segment2) && this.segment2.equals(other.segment1)) {
        return true;
      }
    }
  }

  hashCode() {
    return this.segment1.hashCode() + this.segment2.hashCode();
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
let segments = [];
let intersects = [];

const LINES_NUMBER = 10;
for (let i = 0; i < 4 * LINES_NUMBER; i++) {
  let p = Math.random() * 500;
  points.push(p);
  if (i % 4 === 3) {
    let s = new LineSegment(points[i - 3], points[i - 2], points[i - 1], points[i]);
    segments.push(s);
  }
}

ctx.strokeStyle = "rgb(0, 0, 0)";

for (let i = 0; i < segments.length; i++) {
  ctx.beginPath();
  ctx.moveTo(segments[i].x1, segments[i].y1);
  ctx.lineTo(segments[i].x2, segments[i].y2);
  ctx.stroke();

  let s1 = segments[i];
  for (let j = i + 1; j < segments.length; j++) {
    let s2 = segments[j];
    if (s1.intersectSegments(s2)) {
      intersects.push(new Intersection(s1, s2));
    }
  }
}

for (let i = 0; i < intersects.length; i++) {
  let p = intersects[i].getIntersectionPoint();
  ctx.beginPath();
  ctx.arc(p.a, p.b, 4, 0, Math.PI * 2);
  ctx.fill();
}