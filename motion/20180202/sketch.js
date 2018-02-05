const FRAME_RATE = 30;
const GRAVITY = 0.5;
let ps;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  background(0);
  strokeJoin(ROUND);

  ps = new ParticleSystem();
}

function draw() {
  background(0);
  ps.run();
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.gridNumber = 10;
    this.k = 0.4;

    for(let j=0; j<this.gridNumber; j++) {
      for(let i=0; i<this.gridNumber; i++) {
        let x = i * 50 + 25;
        let y = j * 50 + 25;
        let isPinned = false;
        if(j==0) {
          isPinned = true;
        }
        let p = new Particle(createVector(x, y), isPinned);
        this.particles.push(p);
      }
    }

    this.springs = [];

    for(let i=0; i<this.gridNumber*this.gridNumber; i++) {
      let col = i%this.gridNumber;
      let row = floor(i/this.gridNumber);
      let spring;

      // Horizontal Springs
      if(col < this.gridNumber-1) {
        spring = new Spring(this.particles[i], this.particles[i+1]);
        this.springs.push(spring);
      }

      // Vertical Springs
      if(row < this.gridNumber-1) {
        spring = new Spring(this.particles[i], this.particles[i+this.gridNumber]);
        this.springs.push(spring);
      }

      // Shear Springs Left to Right
      if(col < this.gridNumber-1 && row < this.gridNumber-1) {
        spring = new Spring(this.particles[i], this.particles[i+this.gridNumber+1]);
        this.springs.push(spring);
      }

      // Shear Springs Right to Left
      if(row > 0 && col < this.gridNumber-1 && row < this.gridNumber) {
        spring = new Spring(this.particles[i], this.particles[i-this.gridNumber+1]);
        this.springs.push(spring);
      }
    }
  }

  run() {
    for(let i=0; i<this.springs.length; i++) {
      let a = this.springs[i].a;
      let b = this.springs[i].b;
      let f = p5.Vector.sub(a.pos, b.pos);
      let d = f.mag();
      let stretch = d - this.springs[i].restLength;
      f.normalize();
      f.mult(-1 * this.k * stretch);
      a.applyForce(f);
      f.mult(-1);
      b.applyForce(f);

      this.springs[i].draw();
    }

    for(let i=this.particles.length-1; i>=0; i--) {
      this.particles[i].applyForce(createVector(0, GRAVITY));
      this.particles[i].update();
      // this.particles[i].draw();
    }
  }
}

class Particle {
  constructor(pos, pinned) {
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.isPinned = pinned;
    this.pinTo = pos.copy();
    this.size = 10;
  }

  applyForce(frc) {
    this.acc.add(frc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if(this.isPinned) {
      this.pos = this.pinTo.copy();
    }
  }

  draw() {
    fill(0);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

class Spring {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.restLength = p5.Vector.sub(a.pos, b.pos).mag();
  }

  draw() {
    noFill();
    stroke(255);
    beginShape();
    vertex(this.a.pos.x, this.a.pos.y);
    vertex(this.b.pos.x, this.b.pos.y);
    endShape();
  }
}
