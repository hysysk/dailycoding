let square;

function setup() {
  createCanvas(500, 500);
  background(0);

  square = new Square(
    createVector(100, 100),
    createVector(200, 100),
    createVector(200, 200),
    createVector(100, 200)
  );

  square.points[0].velocity = createVector(10, 20);
}

function draw() {
  background(0);
  square.update();
}

class Square {
  constructor(a, b, c, d) {
    this.points = [];
    this.sticks = [];

    let pA = new VerletPoint(a);
    let pB = new VerletPoint(b);
    let pC = new VerletPoint(c);
    let pD = new VerletPoint(d);

    this.points.push(pA);
    this.points.push(pB);
    this.points.push(pC);
    this.points.push(pD);

    let s1 = new VerletStick(pA, pB);
    let s2 = new VerletStick(pB, pC);
    let s3 = new VerletStick(pC, pD);
    let s4 = new VerletStick(pD, pA);
    let s5 = new VerletStick(pA, pC);

    this.sticks.push(s1);
    this.sticks.push(s2);
    this.sticks.push(s3);
    this.sticks.push(s4);
    this.sticks.push(s5);
  }

  update() {
    for(let i=0; i<this.points.length; i++) {
      this.points[i].update();
      this.points[i].constrain();
      this.points[i].draw();
    }

    for(let i=0; i<this.sticks.length; i++) {
      this.sticks[i].update();
      this.sticks[i].draw();
    }
  }
}

class VerletPoint {
  constructor(pos) {
    this.pos = pos.copy();
    this.prevPos = pos.copy();
    this.size = 10;
  }

  update() {
    let vel = p5.Vector.sub(this.pos, this.prevPos);
    this.prevPos = this.pos.copy();
    this.pos.add(vel);
  }

  draw() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  constrain() {
    this.pos.x = max(0, min(width, this.pos.x));
    this.pos.y = max(0, min(height, this.pos.y));
  }

  set position(pos) {
    this.pos = pos.copy();
    this.prevPos = pos.copy();
  }

  set velocity(vel) {
    this.prevPos = p5.Vector.sub(this.pos, vel);
  }
}

class VerletStick {
  constructor(a, b, l) {
    this.a = a;
    this.b = b;
    if(!l) {
      let d = p5.Vector.sub(this.b.pos, this.a.pos);
      l = d.mag();
    }
    this.length = l;
  }

  update() {
    let d = p5.Vector.sub(this.b.pos, this.a.pos);
    let dist = d.mag();
    let diff = this.length - dist;
    d.mult(diff);
    d.div(dist);
    d.div(2);
    this.a.pos.sub(d);
    this.b.pos.add(d);
  }

  draw() {
    stroke(255);
    line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
  }
}
