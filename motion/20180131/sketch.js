const FRAME_RATE = 30;
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
    this.gridNumber = 4;
    this.springLength = 90;
    this.k = 0.04;

    for(let j=0; j<this.gridNumber; j++) {
      for(let i=0; i<this.gridNumber; i++) {
        let x = i * 100 + 100;
        let y = j * 100 + 100;
        this.particles.push(new Particle(createVector(x, y)));
      }
    }

    this.springs = [];

    for(let i=0; i<this.gridNumber*this.gridNumber; i++) {
      let col = i%this.gridNumber;
      let row = floor(i/this.gridNumber);

      // Horizontal Springs
      if(col < this.gridNumber-1) {
        let spring = new Spring(this.particles[i], this.particles[i+1]);
        this.springs.push(spring);
      }

      // Vertical Springs
      if(row < this.gridNumber-1) {
        let spring = new Spring(this.particles[i], this.particles[i+4]);
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
      let stretch = d - this.springLength;
      f.normalize();
      f.mult(-1 * this.k * stretch);
      a.applyForce(f);
      f.mult(-1);
      b.applyForce(f);

      this.springs[i].draw();
    }

    for(let i=this.particles.length-1; i>=0; i--) {
      this.particles[i].update();
      this.particles[i].draw();
    }
  }
}

class Particle {
  constructor(pos) {
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = 10;
  }

  applyForce(frc) {
    this.acc.add(frc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
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
