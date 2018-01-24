const FRAME_RATE = 30;
const PARTICLE_SIZE = 30;
const K = 0.04;
const SPRING_LENGTH = 100.0;
let ps;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  strokeWeight(8);

  ps = new ParticleSystem();
}

function draw() {
  background(0);
  ps.run();
}

function mouseReleased() {
  setup();
}

function touchEnded() {
  setup();
}

class ParticleSystem {
  constructor() {
    this.numParticles = 12;
    this.numSprings = this.numParticles-1;
    this.particles = [];
    for(let i=0; i<this.numParticles; i++) {
      this.particles.push(new Particle(createVector(random(100,width-100), random(100,height-100))));
    }

    this.springs = [];
    for(let i=0; i<this.numParticles-1; i++) {
      let spring = new Spring(this.particles[i], this.particles[i+1]);
      this.springs.push(spring);
    }
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
    for(let i=this.particles.length-1; i>=1; i--) {
      line(this.particles[i].pos.x, this.particles[i].pos.y,
      this.particles[i-1].pos.x, this.particles[i-1].pos.y);
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
