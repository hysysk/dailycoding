let cloth;
const GRAVITY = 0.5;

function setup() {
  createCanvas(500, 500);
  background(0);
  cloth = new Cloth();
}

function draw() {
  background(0);
  cloth.update();
}

class Cloth {
  constructor() {
    this.particles = [];
    this.sticks = [];
    this.gridNumber = 10;

    this.createCloth();
  }

  createCloth() {
    for(let j=0; j<this.gridNumber; j++) {
      for(let i=0; i<this.gridNumber; i++) {
        let x = i * 50 + 25;
        let y = j * 50 + 25;
        let isPinned = false;
        let p = new VerletPoint(createVector(x, y));
        this.particles.push(p);
        if(j==0) {
          p.pinTo = createVector(x, y);
        }
      }
    }

    for(let i=0; i<this.gridNumber*this.gridNumber; i++) {
      let col = i%this.gridNumber;
      let row = floor(i/this.gridNumber);
      let stick;

      // Horizontal Sticks
      if(col < this.gridNumber-1) {
        stick = new VerletStick(this.particles[i], this.particles[i+1]);
        this.sticks.push(stick);
      }

      // Vertical Sticks
      if(row < this.gridNumber-1) {
        stick = new VerletStick(this.particles[i], this.particles[i+this.gridNumber]);
        this.sticks.push(stick);
      }

      // Shear Sticks Left to Right
      if(col < this.gridNumber-1 && row < this.gridNumber-1) {
        stick = new VerletStick(this.particles[i], this.particles[i+this.gridNumber+1]);
        this.sticks.push(stick);
      }

      // Shear Sticks Right to Left
      if(row > 0 && col < this.gridNumber-1 && row < this.gridNumber) {
        stick = new VerletStick(this.particles[i], this.particles[i-this.gridNumber+1]);
        this.sticks.push(stick);
      }
    }
  }

  update() {
    for(let i=this.sticks.length-1; i>=0; i--) {
      let a = this.sticks[i].a;
      let b = this.sticks[i].b;
      let f = p5.Vector.sub(a.pos, b.pos);
      let d = f.mag();
      let stretch = (this.sticks[i].length - d) / d;

      f.mult(-1 * stretch * 0.1);
      a.applyForce(f);
      f.mult(-1);
      b.applyForce(f);

      this.sticks[i].update();
      this.sticks[i].draw();
    }

    for(let i=this.particles.length-1; i>=0; i--) {
      this.particles[i].applyForce(createVector(0, GRAVITY));
      this.particles[i].update();
      // this.particles[i].draw();
    }
  }
}

class VerletPoint {
  constructor(pos) {
    this.pos = pos;
    this.prevPos = pos;
    this.pinPos = pos;
    this.size = 10;
    this.isPinned = false;
    this.acc = createVector(0, 0);
  }

  update() {
    let vel = p5.Vector.sub(this.pos, this.prevPos);
    this.prevPos = this.pos.copy();
    vel.add(this.acc);
    // vel.limit(1);
    this.pos.add(vel);
    this.acc.mult(0);

    if(this.isPinned) {
      this.pos = this.pinPos.copy();
    }
  }

  draw() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  applyForce(frc) {
    this.acc.add(frc);
  }

  constrain() {
    this.pos.x = max(0, min(width, this.pos.x));
    this.pos.y = max(0, min(height, this.pos.y));
  }

  set pinTo(pos) {
    this.isPinned = true;
    this.pinPos = pos.copy();
  }

  set position(pos) {
    this.pos = pos;
    this.prevPos = pos;
  }

  set velocity(vel) {
    this.prevPos = p5.Vector.sub(this.pos, vel);
  }
}

class VerletStick {
  constructor(a, b, l) {
    this.a = a;
    this.b = b;
    this.k = 0.4;
    if(!l) {
      let d = p5.Vector.sub(this.b.pos, this.a.pos);
      l = d.mag();
    }
    this.length = l;
  }

  update() {
    let f = p5.Vector.sub(this.a.pos, this.b.pos);
    let d = f.mag();
    let stretch = d - this.length;
    f.normalize();
    f.mult(-1 * this.k * stretch);
    this.a.applyForce(f);
    f.mult(-1);
    this.b.applyForce(f);
  }

  draw() {
    stroke(255);
    line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
  }
}
