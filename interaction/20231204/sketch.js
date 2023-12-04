class Point {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.isOver = false;
    this.size = 10;
  }

  draw() {
    if (this.isOver) {
      fill(255, 0, 0);
      this.size = 20;
    } else {
      fill(0);
      this.size = 10;
    }
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  hitTest(x, y) {
    if (dist(this.x, this.y, x, y) < this.size) {
      this.isOver = true;
      return true;
    } else {
      this.isOver = false;
      return false;
    }
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Segment {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.prevA = Object.assign({}, a);
    this.prevB = Object.assign({}, b);
    this.len = 50;
    this.angle;
  }

  update() {
    if (this.a.x !== this.prevA.x || this.a.y !== this.prevA.y) {
      let dx = this.b.x - this.a.x;
      let dy = this.b.y - this.a.y;
      let angle = atan2(dy, dx);
      this.b.x = this.a.x + cos(angle) * this.len;
      this.b.y = this.a.y + sin(angle) * this.len;
    } else if (this.b.x !== this.prevB.x || this.b.y !== this.prevB.y) {
      let dx = this.a.x - this.b.x;
      let dy = this.a.y - this.b.y;
      let angle = atan2(dy, dx);
      this.a.x = this.b.x + cos(angle) * this.len;
      this.a.y = this.b.y + sin(angle) * this.len;
    }
    this.prevA = Object.assign({}, this.a);
    this.prevB = Object.assign({}, this.b);
  }

  draw() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

const NUM_POINTS = 20;
let segments = [];
let points = [];
let p0, p1, p2, p3;
let pickedId = -1;
function setup() {
  createCanvas(500, 500);
  while (points.length < NUM_POINTS) {
    points.push(new Point(points.length, random(width), random(height)));
  }

  for (let i = 0; i < points.length - 1; i++) {
    segments.push(new Segment(points[i], points[i + 1]));
  }
  strokeWeight(10);
}

function draw() {
  background(255);
  segments.forEach(s => s.update());
  segments.forEach(s => s.draw());
  points.forEach(p => p.draw());
}

function mouseMoved() {
  points.forEach(p => {
    if (p.hitTest(mouseX, mouseY)) {
      p.isOver = true;
    }
  });
}

function mousePressed() {
  points.forEach(p => {
    if (p.hitTest(mouseX, mouseY)) {
      pickedId = p.id;
    }
  });
}

function mouseDragged() {
  points.forEach(p => {
    if (p.id === pickedId) {
      p.setPos(mouseX, mouseY);
    }
  });
}

function mouseReleased() {
  pickedId = -1;
}