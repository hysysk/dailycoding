const FRAME_RATE = 30;
const PARTICLE_SIZE = 5;
let particles = [];
let ps;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(500, 500);
  noStroke();

  ps = new ParticleSystem();
  for(let i=0; i<300; i++) {
    ps.addParticle();
  }
}

function draw() {
  background(0);
  ps.run();
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.emissionFlags = [];
  }

  addParticle() {
    this.particles.push(new Particle(createVector(random(width), random(-10, -400))));
    this.emissionFlags.push(false);
  }

  run() {
    for(let i=this.particles.length-1; i>=0; i--) {
      this.particles[i].update();
      this.particles[i].draw();
      if(this.particles[i].pos.y > height + PARTICLE_SIZE) {
        this.particles.splice(i, 1);
        this.emissionFlags[i] = false;
      } else if(this.particles[i].pos.y > height/10 && this.emissionFlags[i] == false) {
        this.addParticle(createVector(random(width), random(-10, -200)));
        this.emissionFlags[i] = true;
      }
    }
  }
}

class Particle {
  constructor(pos) {
    this.pos = pos;
    this.acc = createVector(0, 0.05);
    this.vel = createVector(random(-1, 1), random());
    this.noiseOffset = random(100);
    this.noiseIncrement = 0.11;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.add(createVector((noise(this.noiseOffset)-0.5)*4, 0));
    this.noiseOffset += this.noiseIncrement;
  }

  draw() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, PARTICLE_SIZE, PARTICLE_SIZE);
  }
}
