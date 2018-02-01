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
    this.numParticles = 15;
    this.numSprings = this.numParticles;
    this.k = 0.32;
    this.springLength = 10.0;
    this.particles = [];
    for(let i=0; i<this.numParticles; i++) {
      let step = TWO_PI/this.numParticles;
      let x = random(120, 160) * cos(step*i) + width/2;
      let y = random(120, 160) * sin(step*i) + height/2;
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
      let stretch = d - this.springLength;
      f.normalize();
      f.mult(-1 * this.k * stretch);
      a.applyForce(f);
      f.mult(-1);
      b.applyForce(f);
    }

    for(let i=this.particles.length-1; i>=0; i--) {
      for(let j=this.particles.length-1; j>=0; j--) {
        if(i != j) {
          let f = p5.Vector.sub(this.particles[i].pos, this.particles[j].pos);
          let d = f.mag();
          d = constrain(d, 10, 200);
          f.normalize();

          let s = 1500 / (d * d);
          f.mult(s);
          this.particles[i].applyForce(f);
          f.mult(-1);
          this.particles[j].applyForce(f);
        }
      }
      this.particles[i].update();
    }

    noFill();
    stroke(255);
    strokeWeight(2);

    beginShape();
    curveVertex(this.particles[1].pos.x, this.particles[1].pos.y);
    curveVertex(this.particles[0].pos.x, this.particles[0].pos.y);
    for(let i=this.particles.length-1; i>=0; i--) {
      curveVertex(this.particles[i].pos.x, this.particles[i].pos.y);
    }
    curveVertex(this.particles[this.particles.length-1].pos.x, this.particles[this.particles.length-1].pos.y);
    curveVertex(this.particles[this.particles.length-2].pos.x, this.particles[this.particles.length-2].pos.y);
    endShape();
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
}
