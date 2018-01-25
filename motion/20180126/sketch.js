const FRAME_RATE = 30;
const PARTICLE_SIZE = 30;
const K = 0.05;
const SPRING_LENGTH = 60.0;
let ps;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  strokeWeight(8);
  strokeJoin(ROUND);

  ps = new ParticleSystem();
}

function draw() {
  background(0);
  ps.run();
}

class ParticleSystem {
  constructor() {
    this.numParticles = 12;
    this.numSprings = this.numParticles;
    this.particles = [];
    for(let i=0; i<this.numParticles; i++) {
      let step = TWO_PI/this.numParticles;
      let x = 200 * cos(step*i) + width/2;
      let y = 200 * sin(step*i) + height/2;
      this.particles.push(new Particle(createVector(x, y)));
    }

    this.springs = [];
    let spring;
    for(let i=0; i<this.numParticles-1; i++) {
      spring = new Spring(this.particles[i], this.particles[i+1]);
      this.springs.push(spring);
    }
    spring = new Spring(this.particles[this.numParticles-1], this.particles[0])
    this.springs.push(spring);
  }

  run() {
    for(let i=0; i<this.numSprings; i++) {
      let a = this.springs[i].a;
      let b = this.springs[i].b;
      let f = p5.Vector.sub(a.pos, b.pos);
      let d = f.mag();
      let stretch = d - SPRING_LENGTH;
      f.normalize();
      f.mult(-1 * K * stretch);
      a.applyForce(f);
      f.mult(-1);
      b.applyForce(f);
    }

    stroke(255);
    fill(255);
    beginShape();
    for(let i=this.particles.length-1; i>=0; i--) {
      vertex(this.particles[i].pos.x, this.particles[i].pos.y);
    }
    endShape(CLOSE);

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
    ellipse(this.pos.x, this.pos.y, PARTICLE_SIZE, PARTICLE_SIZE);
  }
}

class Spring {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
